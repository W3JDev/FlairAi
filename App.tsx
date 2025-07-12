

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
 * Unless required by applicable law || agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import AgentEdit from './components/AgentEdit';
import ControlTray from './components/console/control-tray/ControlTray';
import ErrorScreen from './components/demo/ErrorSreen';
import KeynoteCompanion from './components/demo/keynote-companion/KeynoteCompanion';
import Header from './components/Header';
import UserSettings from './components/UserSettings';
import LandingPage from './components/LandingPage'; // Import LandingPage
import { LiveAPIProvider } from './contexts/LiveAPIContext';
import { useUI } from './lib/state';
import React, { useState, useEffect } from 'react';

// Use process.env.API_KEY as per guidelines and assume it's pre-configured and valid.
// Cast to string to satisfy downstream type expectations.
const API_KEY = process.env.API_KEY as string;

/**
 * Main application component that provides a streaming interface for Live API.
 * Manages video streaming state and provides controls for webcam/screen capture.
 */
function App() {
  const { showUserConfig, showAgentEdit } = useUI();
  const [showLandingPage, setShowLandingPage] = useState(true);
  const [animatedFooterText, setAnimatedFooterText] = useState<React.ReactNode>(<>My ❤️ with Love</>);
  const [footerTextOpacity, setFooterTextOpacity] = useState(1);

  useEffect(() => {
    if (showLandingPage) return; // Don't run animation if landing page is shown

    const sequenceTimer = setTimeout(() => {
      setFooterTextOpacity(0); // Start fade out
      setTimeout(() => {
        setAnimatedFooterText(
          <>
            Love by <a href="https://www.github.com/w3jdev" target="_blank" rel="noopener noreferrer" style={{color: 'var(--Accent-Blue-Primary)'}}>W3JDEV</a>
          </>
        );
        setFooterTextOpacity(1); // Start fade in
      }, 500);
    }, 3000);

    return () => clearTimeout(sequenceTimer);
  }, [showLandingPage]);

  if (showLandingPage) {
    return <LandingPage onLaunchApp={() => setShowLandingPage(false)} />;
  }

  return (
    <div className="App">
      <LiveAPIProvider apiKey={API_KEY}>
        <ErrorScreen />
        <Header />

        {showUserConfig && <UserSettings />}
        {showAgentEdit && <AgentEdit />}
        <div className="streaming-console">
          <main>
            <div className="main-app-area">
              <KeynoteCompanion />
            </div>
            <ControlTray />
          </main>
        </div>
      </LiveAPIProvider>
      <div className="brandmark-feedback-container">
        <div 
          className="brandmark-item" 
          style={{ opacity: footerTextOpacity, transition: 'opacity 0.5s ease-in-out' }}
          aria-live="polite"
        >
          {animatedFooterText}
        </div>
        <a href="#feedback" className="feedback-link" onClick={(e) => { e.preventDefault(); alert('Feedback system coming soon!'); }}>Feedback</a>
      </div>
    </div>
  );
}

export default App;
