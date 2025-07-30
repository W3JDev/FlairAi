/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState } from 'react';
import { supabase } from '../../src-business/lib/supabaseClient';
import './Auth.css';

const Auth: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [message, setMessage] = useState('');

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/`
          }
        });
        if (error) throw error;
        setMessage('Check your email for confirmation link');
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        // No manual redirect needed - App.tsx handles auth state
      }
    } catch (error: any) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
        <form onSubmit={handleAuth}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Loading...' : isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
        </form>

        {message && <p className="message">{message}</p>}

        <div className="demo-section">
          <button
            type="button"
            className="demo-button"
            onClick={async () => {
              setLoading(true);
              try {
                // Use demo credentials
                const { error } = await supabase.auth.signInWithPassword({
                  email: 'demo@flairai.com',
                  password: 'demo123'
                });
                if (error) {
                  // If demo user doesn't exist, create it
                  const { error: signUpError } = await supabase.auth.signUp({
                    email: 'demo@flairai.com',
                    password: 'demo123'
                  });
                  if (signUpError) throw signUpError;
                  setMessage('Demo user created! Please check demo@flairai.com for confirmation or try signing in again.');
                }
              } catch (error: any) {
                setMessage(error.message);
              }
              setLoading(false);
            }}
            disabled={loading}
          >
            Try Demo Mode
          </button>
          <p className="demo-note">Experience FlairAi with our demo account</p>
        </div>

        <p>
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            type="button"
            className="link-button"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;