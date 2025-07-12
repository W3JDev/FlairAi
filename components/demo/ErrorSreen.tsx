/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { useLiveAPIContext } from '@/contexts/LiveAPIContext';
import { LiveClientEventTypes } from '@/lib/genai-live-client';
import EventEmitter from 'eventemitter3';
import React, { useEffect, useState } from 'react';

export interface ExtendedErrorType {
  code?: number;
  message?: string;
  status?: string;
}

export default function ErrorScreen() {
  const { client } = useLiveAPIContext();
  const [error, setError] = useState<{ message?: string } | null>(null);

  useEffect(() => {
    function onError(errorEvent: ErrorEvent | Error) { // Can be ErrorEvent or general Error
      console.error(errorEvent);
      setError({ message: (errorEvent as ErrorEvent)?.message || (errorEvent as Error)?.message || 'Unknown error' });
    }

    // Use type assertion for client.on
    (client as EventEmitter<LiveClientEventTypes>).on('error', onError);

    return () => {
      // Use type assertion for client.off
      (client as EventEmitter<LiveClientEventTypes>).off('error', onError);
    };
  }, [client]);

  const quotaErrorMessage =
    'Gemini Live API in AI Studio has a limited free quota each day. Come back tomorrow to continue.';

  let errorMessage = 'Something went wrong. Please try again.';
  let rawMessage: string | null = error?.message || null;
  let tryAgainOption = true;
  if (error?.message?.includes('RESOURCE_EXHAUSTED')) {
    errorMessage = quotaErrorMessage;
    rawMessage = null;
    tryAgainOption = false;
  }

  if (!error) {
    return <div style={{ display: 'none' }} />;
  }

  return (
    <div className="error-screen">
      <div
        style={{
          fontSize: 48,
        }}
      >
        💔
      </div>
      <div
        className="error-message-container"
        style={{
          fontSize: 22,
          lineHeight: 1.2,
          opacity: 0.5,
        }}
      >
        {errorMessage}
      </div>
      {tryAgainOption ? (
        <button
          className="close-button"
          onClick={() => {
            setError(null);
          }}
        >
          Close
        </button>
      ) : null}
      {rawMessage ? (
        <div
          className="error-raw-message-container"
          style={{
            fontSize: 15,
            lineHeight: 1.2,
            opacity: 0.4,
          }}
        >
          {rawMessage}
        </div>
      ) : null}
    </div>
  );
}
