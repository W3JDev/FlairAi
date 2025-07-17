
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { useEffect, useRef } from 'react';
import { Modality } from '@google/genai';

import BasicFace from '../../../../components/demo/basic-face/BasicFace';
import { useLiveAPIContext } from '../../../contexts/LiveAPIContext';
import { createSystemInstructions } from '../../../lib/prompts';
import { useAgent, useUser } from '../../../lib/state';

export default function KeynoteCompanion() {
  const { client, connected, setConfig } = useLiveAPIContext();
  const faceCanvasRef = useRef<HTMLCanvasElement>(null);
  const { profile } = useUser();
  const { current: agent, loading: agentLoading } = useAgent();
  const hasSentGreeting = useRef(false);

  // Set the configuration for the Live API
  useEffect(() => {
    if (agent && profile) {
      setConfig({
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: agent.voice },
          },
        },
        systemInstruction: {
          parts: [
            {
              text: createSystemInstructions(agent, profile),
            },
          ],
        },
      });
    }
  }, [setConfig, profile, agent]);

  // Initiate the session when the Live API connection is established
  // Instruct the model to send an initial greeting message
  useEffect(() => {
    // Reset greeting flag when connection drops or agent changes
    if (!connected || !agent) {
      hasSentGreeting.current = false;
      return;
    }

    const beginSession = async () => {
      // Ensure we have an agent, are connected, and haven't greeted yet
      if (agent && connected && !hasSentGreeting.current) {
        hasSentGreeting.current = true; // Set flag immediately to prevent re-sends
        client.send(
          {
            text: 'Greet the user and introduce yourself and your role.',
          },
          true
        );
      }
    };

    beginSession();

  }, [client, connected, agent]);


  if (!agent || agentLoading) {
    return <div>Loading agent...</div>; // Or a spinner
  }

  return (
    <div className="keynote-companion">
      <BasicFace canvasRef={faceCanvasRef!} color={agent.bodyColor} />
    </div>
  );
}
