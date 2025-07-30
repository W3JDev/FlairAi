import React, { useState, useEffect } from 'react';
import './DatabaseAlert.css';

interface DatabaseAlertProps {
  show: boolean;
  onDismiss: () => void;
}

export default function DatabaseAlert({ show, onDismiss }: DatabaseAlertProps) {
  if (!show) return null;

  const setupUrl = 'https://wrdfqnydraeyvjnpbiri.supabase.co/project/default/sql/new';

  return (
    <div className="database-alert-overlay">
      <div className="database-alert">
        <div className="alert-header">
          <h3>🔧 Database Setup Required</h3>
          <button className="close-btn" onClick={onDismiss}>×</button>
        </div>
        
        <div className="alert-content">
          <p>FlairAi needs database tables to store your FlareBots and training data.</p>
          
          <div className="setup-steps">
            <div className="step">
              <span className="step-number">1</span>
              <div className="step-content">
                <strong>Open Supabase Dashboard</strong>
                <a href={setupUrl} target="_blank" rel="noopener noreferrer" className="setup-link">
                  Open SQL Editor →
                </a>
              </div>
            </div>
            
            <div className="step">
              <span className="step-number">2</span>
              <div className="step-content">
                <strong>Copy & Paste SQL</strong>
                <details className="sql-details">
                  <summary>Show SQL Commands</summary>
                  <pre className="sql-code">{`-- Essential FlairAi Tables
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS flarebots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  personality TEXT,
  voice VARCHAR(50) DEFAULT 'Charon',
  knowledge_base TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE flarebots ENABLE ROW LEVEL SECURITY;

-- Basic policies
CREATE POLICY "Users can manage own data" ON profiles FOR ALL USING (auth.uid() = id);
CREATE POLICY "Users can manage own flarebots" ON flarebots FOR ALL USING (auth.uid() = user_id);`}</pre>
                </details>
              </div>
            </div>
            
            <div className="step">
              <span className="step-number">3</span>
              <div className="step-content">
                <strong>Click RUN</strong>
                <p>Execute the SQL in the Supabase editor</p>
              </div>
            </div>
            
            <div className="step">
              <span className="step-number">4</span>
              <div className="step-content">
                <strong>Refresh App</strong>
                <p>Come back and refresh this page</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="alert-footer">
          <button className="btn-primary" onClick={() => window.open(setupUrl, '_blank')}>
            Open Supabase Dashboard
          </button>
          <button className="btn-secondary" onClick={onDismiss}>
            I'll do this later
          </button>
        </div>
      </div>
    </div>
  );
}
