
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from './lib/supabaseClient';
import { useAgent, useUI, useUser } from './lib/state';

import AgentEdit from './components/AgentEdit';
import ControlTray from '../components/console/control-tray/ControlTray';
import ErrorScreen from '../components/demo/ErrorSreen';
import KeynoteCompanion from './components/demo/keynote-companion/KeynoteCompanion';
import Header from '../components/Header';
import UserSettings from './components/UserSettings';
import BusinessLandingPage from './components/BusinessLandingPage';
import Auth from '../components/auth/Auth';
import { LiveAPIProvider } from './contexts/LiveAPIContext';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string;

function BusinessApp() {
  const { showUserConfig, showAgentEdit } = useUI();
  const [animatedFooterText, setAnimatedFooterText] = useState<React.ReactNode>(<>My ❤️ with Love</>);
  const [footerTextOpacity, setFooterTextOpacity] = useState(1);
  const { profileComplete } = useUser();

  useEffect(() => {
    const sequenceTimer = setTimeout(() => {
      setFooterTextOpacity(0);
      setTimeout(() => {
        setAnimatedFooterText(
          <>
            Love by <a href="https://www.github.com/w3jdev" target="_blank" rel="noopener noreferrer" style={{color: 'var(--Accent-Blue-Primary)'}}>W3JDEV</a>
          </>
        );
        setFooterTextOpacity(1);
      }, 500);
    }, 3000);

    return () => clearTimeout(sequenceTimer);
  }, []);

  return (
    <div className="App">
      <LiveAPIProvider apiKey={API_KEY}>
        <ErrorScreen />
        <Header />

        {(showUserConfig || !profileComplete) && <UserSettings />}
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

function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { initializeUser } = useUser();
  const { initializeAgents } = useAgent();

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setLoading(false);

      if (session) {
        await initializeUser(session.user);
        await initializeAgents(session.user.id);
      }
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        if (session) {
          await initializeUser(session.user);
          await initializeAgents(session.user.id);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [initializeUser, initializeAgents]);

  if (loading) {
    return null; // Or a loading spinner
  }

  if (!session) {
    return <BusinessLandingPage onLaunchApp={() => {
      // This is a placeholder for the authentication flow.
      // In a real application, this would redirect to a login page.
      setSession(null);
    }}/>;
  }

  // Once logged in, show the main application.
  return <BusinessApp />;
}

export default App;
