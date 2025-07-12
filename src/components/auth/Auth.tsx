
import React, { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

const Auth: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAuth = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isSignUp) {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              username: username,
            }
          }
        });
        if (signUpError) throw signUpError;
        alert('Check your email for the confirmation link!');
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) throw signInError;
      }
    } catch (error: any) {
      setError(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h1><span role="img" aria-label="Flare Sparkle">🔥</span> Welcome to FlareAI</h1>
          <p>{isSignUp ? 'Create an account to start training.' : 'Sign in to continue your journey.'}</p>
        </div>
        <form className="auth-form" onSubmit={handleAuth}>
          {isSignUp && (
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                placeholder="Your username"
                value={username}
                required
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Your password"
              value={password}
              required
              minLength={6}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="button primary auth-button" type="submit" disabled={loading}>
            {loading ? <span>Loading...</span> : (isSignUp ? 'Sign Up' : 'Sign In')}
          </button>
          {error && <p className="error-message">{error}</p>}
        </form>
        <div className="auth-toggle">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}
          <button onClick={() => { setIsSignUp(!isSignUp); setError(null); }} disabled={loading}>
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
