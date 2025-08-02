/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
/**
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { GenAILiveClient, LiveClientEventTypes } from '../../lib/genai-live-client';
import { LiveConnectConfig } from '@google/genai';
import { AudioStreamer } from '../../lib/audio-streamer';
import { audioContext } from '../../lib/utils';
import VolMeterWorket from '../../lib/worklets/vol-meter';
import { DEFAULT_LIVE_API_MODEL } from '../../lib/constants';
import EventEmitter from 'eventemitter3';

export type UseLiveApiResults = {
  client: GenAILiveClient;
  setConfig: (config: LiveConnectConfig) => void;
  config: LiveConnectConfig;

  connect: () => Promise<void>;
  disconnect: () => void;
  connected: boolean;

  volume: number;
};

export function useLiveApi({
  apiKey,
  model = DEFAULT_LIVE_API_MODEL,
}: {
  apiKey: string;
  model?: string;
}): UseLiveApiResults {
  const client = useMemo(() => new GenAILiveClient(apiKey, model), [apiKey, model]); // Added model to dependency array

  const audioStreamerRef = useRef<AudioStreamer | null>(null);

  const [volume, setVolume] = useState(0);
  const [connected, setConnected] = useState(false);
  const [config, setConfig] = useState<LiveConnectConfig>({});

  // register audio for streaming server -> speakers
  useEffect(() => {
    if (!audioStreamerRef.current) {
      audioContext({ id: 'audio-out' }).then((audioCtx: AudioContext) => {
        audioStreamerRef.current = new AudioStreamer(audioCtx);
        audioStreamerRef.current
          .addWorklet<any>('vumeter-out', VolMeterWorket, (ev: any) => {
            setVolume(ev.data.volume);
          })
          .then(() => {
            // Successfully added worklet
          })
          .catch(err => {
            console.error('Error adding worklet:', err);
          });
      });
    }
  }, [audioStreamerRef]); // Ensure this effect runs correctly

  useEffect(() => {
    const onOpen = () => {
      setConnected(true);
    };

    const onClose = () => {
      setConnected(false);
    };

    const stopAudioStreamer = () => {
      if (audioStreamerRef.current) {
        audioStreamerRef.current.stop();
      }
    };

    const onAudio = (data: ArrayBuffer) => {
      if (audioStreamerRef.current) {
        audioStreamerRef.current.addPCM16(new Uint8Array(data));
      }
    };

    // Bind event listeners with type assertions
    (client as EventEmitter<LiveClientEventTypes>).on('open', onOpen);
    (client as EventEmitter<LiveClientEventTypes>).on('close', onClose);
    (client as EventEmitter<LiveClientEventTypes>).on('interrupted', stopAudioStreamer);
    (client as EventEmitter<LiveClientEventTypes>).on('audio', onAudio);

    return () => {
      // Clean up event listeners with type assertions
      (client as EventEmitter<LiveClientEventTypes>).off('open', onOpen);
      (client as EventEmitter<LiveClientEventTypes>).off('close', onClose);
      (client as EventEmitter<LiveClientEventTypes>).off('interrupted', stopAudioStreamer);
      (client as EventEmitter<LiveClientEventTypes>).off('audio', onAudio);
    };
  }, [client]);

  const connect = useCallback(async () => {
    if (!config) { // This check might be problematic if config is an empty object initially
      // Consider a more robust check, e.g., if(!config.systemInstruction) or similar key property
      throw new Error('config has not been set meaningfully');
    }
    client.disconnect(); // Ensure any existing connection is closed
    await client.connect(config);
  }, [client, config]); // Removed setConnected from deps as it's not used in connect

  const disconnect = useCallback(async () => {
    client.disconnect();
    // setConnected(false); // This will be handled by the 'close' event listener
  }, [client]); // Removed setConnected

  return {
    client,
    config,
    setConfig,
    connect,
    connected,
    disconnect,
    volume,
  };
}
