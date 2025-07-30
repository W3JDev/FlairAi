import React, { useState } from 'react';
import LandingPage from './components/LandingPage';

// Simple test app to debug navigation
function SimpleApp() {
  const [showLandingPage, setShowLandingPage] = useState(true);

  console.log('SimpleApp render - showLandingPage:', showLandingPage);

  const handleLaunchApp = () => {
    console.log('SimpleApp - handleLaunchApp called');
    setShowLandingPage(false);
  };

  if (showLandingPage) {
    console.log('Rendering LandingPage');
    return <LandingPage onLaunchApp={handleLaunchApp} />;
  }

  console.log('Rendering main app content');
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>🎉 FlairAi Main Application!</h1>
      <p>Navigation successful! The Get Started button works.</p>
      <p>This confirms the basic navigation is working.</p>
      <button onClick={() => setShowLandingPage(true)}>
        Go Back to Landing Page
      </button>
    </div>
  );
}

export default SimpleApp;
