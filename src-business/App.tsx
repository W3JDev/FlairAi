
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from './lib/supabaseClient';
import { useAgent, useUI, useUser } from './lib/state';

import AgentEdit from './components/AgentEdit';
import ControlTray from './components/console/control-tray/ControlTray';
import ErrorScreen from './components/demo/ErrorSreen';
import KeynoteCompanion from './components/demo/keynote-companion/KeynoteCompanion';
import Header from './components/Header';
import UserSettings from './components/UserSettings';
import BusinessLandingPage from './components/BusinessLandingPage';
import Auth from './components/auth/Auth';
import DatabaseAlert from './components/DatabaseAlert';
import { LiveAPIProvider } from './contexts/LiveAPIContext';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string;

function BusinessApp() {
  const { showUserConfig, showAgentEdit } = useUI();
  const [animatedFooterText, setAnimatedFooterText] = useState<React.ReactNode>(<>My ❤️ with Love</>);
  const [footerTextOpacity, setFooterTextOpacity] = useState(1);
  const [showDatabaseAlert, setShowDatabaseAlert] = useState(false);
  const { profileComplete } = useUser();

  console.log('BusinessApp rendering - profileComplete:', profileComplete, 'showUserConfig:', showUserConfig);

  useEffect(() => {
    const sequenceTimer = setTimeout(() => {
      setFooterTextOpacity(0);
      setTimeout(() => {
        setAnimatedFooterText(
          <>
            Love by <a href="https://www.github.com/w3jdev" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--Accent-Blue-Primary)' }}>W3JDEV</a>
          </>
        );
        setFooterTextOpacity(1);
      }, 500);
    }, 3000);

    // Check for database setup issues after a delay
    const dbCheckTimer = setTimeout(() => {
      // Listen for console errors that indicate missing tables
      const originalError = console.error;
      console.error = (...args) => {
        const errorMessage = args.join(' ');
        if (errorMessage.includes('relation "public.profiles" does not exist') ||
          errorMessage.includes('relation "public.flarebots" does not exist')) {
          setShowDatabaseAlert(true);
        }
        originalError.apply(console, args);
      };
    }, 2000);

    return () => {
      clearTimeout(sequenceTimer);
      clearTimeout(dbCheckTimer);
    };
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

        <DatabaseAlert
          show={showDatabaseAlert}
          onDismiss={() => setShowDatabaseAlert(false)}
        />
      </LiveAPIProvider>
    </div>
  );
}

function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAuth, setShowAuth] = useState(false);
  const [demoMode, setDemoMode] = useState(false);
  const [testMode, setTestMode] = useState(false);
  const { initializeUser } = useUser();
  const { initializeAgents } = useAgent();

  useEffect(() => {
    // Emergency timeout - if loading takes too long, force it to stop
    const emergencyTimeout = setTimeout(() => {
      console.warn('Emergency timeout - forcing loading to stop');
      setLoading(false);
    }, 5000); // 5 seconds max (reduced from 10)

    const getSession = async () => {
      console.log('Getting initial session...');
      try {
        // Try to get session with a longer timeout and better error handling
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) {
          console.warn('Supabase auth error:', error.message);
          // Continue with no session instead of failing
          setSession(null);
        } else {
          console.log('Initial session:', session ? 'Found' : 'None');
          setSession(session);

          if (session) {
            console.log('Initializing user and agents...');
            try {
              await initializeUser(session.user);
              await initializeAgents(session.user.id);
              console.log('User and agents initialized successfully');
            } catch (error) {
              console.error('Error initializing user/agents:', error);
              // Continue anyway - don't block the app for database issues
            }
          }
        }
      } catch (error) {
        console.error('Error getting session:', error);
        // Continue with no session - don't block the app
        setSession(null);
      } finally {
        console.log('Setting loading to false');
        setLoading(false);
        clearTimeout(emergencyTimeout); // Clear the emergency timeout since we're done
      }
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session ? 'Session exists' : 'No session');
        try {
          setSession(session);
          if (session) {
            console.log('Initializing user and agents after auth change...');
            try {
              await initializeUser(session.user);
              await initializeAgents(session.user.id);
              console.log('User and agents initialized after auth change');
              // Hide auth screen if it was showing
              setShowAuth(false);
            } catch (error) {
              console.error('Error initializing after auth change:', error);
              // Continue anyway - don't block the app for database issues
              setShowAuth(false); // Still hide auth screen
            }
          }
        } catch (error) {
          console.error('Error in auth state change handler:', error);
          // Continue anyway
        }
      }
    );

    return () => {
      subscription.unsubscribe();
      clearTimeout(emergencyTimeout);
    };
  }, [initializeUser, initializeAgents]);

  console.log('App render - session:', session ? 'exists' : 'none', 'loading:', loading, 'showAuth:', showAuth, 'demoMode:', demoMode, 'testMode:', testMode);

  // Quick test mode to bypass everything and see if BusinessApp renders
  if (testMode) {
    return (
      <div style={{
        padding: '2rem',
        background: '#0D1117',
        color: 'white',
        minHeight: '100vh'
      }}>
        <h1>🔥 FlairAi Test Mode</h1>
        <p>This confirms the app is rendering correctly!</p>
        <button
          onClick={() => setTestMode(false)}
          style={{
            padding: '0.5rem 1rem',
            margin: '1rem 0',
            background: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Go Back
        </button>
        <div style={{ marginTop: '2rem', border: '1px solid #333', padding: '1rem' }}>
          <h3>BusinessApp Component:</h3>
          <BusinessApp />
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: '#1a1a1a',
        color: 'white'
      }}>
        <div style={{ textAlign: 'center' }}>
          <h2>🔥 FlairAi Loading...</h2>
          <p>Initializing your AI training platform</p>
          <div style={{ margin: '1rem 0' }}>
            <button
              onClick={() => {
                console.log('Skip loading clicked');
                setLoading(false);
                setSession(null);
              }}
              style={{
                marginRight: '1rem',
                padding: '0.5rem 1rem',
                background: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Skip Loading (Debug)
            </button>
            <button
              onClick={() => {
                console.log('Test mode clicked');
                setTestMode(true);
                setLoading(false);
              }}
              style={{
                padding: '0.5rem 1rem',
                background: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Test Mode (Direct Access)
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Demo mode - skip authentication for testing
  if (demoMode) {
    return <BusinessApp />;
  }

  // Show authentication component if user wants to launch app
  if (showAuth && !session) {
    return (
      <div>
        <Auth />
        <div style={{ textAlign: 'center', padding: '1rem' }}>
          <button
            onClick={() => {
              console.log('Entering demo mode');
              setDemoMode(true);
            }}
            style={{
              background: '#007bff',
              color: 'white',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Skip Authentication (Demo Mode)
          </button>
        </div>
      </div>
    );
  }

  if (!session) {
    return <BusinessLandingPage
      onLaunchApp={() => {
        console.log('Launch App clicked - showing authentication');
        setShowAuth(true);
      }}
      onTestMode={() => {
        console.log('Test Mode clicked from landing page');
        setTestMode(true);
      }}
    />;
  }

  // Once logged in, show the main application.
  console.log('Rendering BusinessApp - session exists');
  return <BusinessApp />;
}

export default App;
