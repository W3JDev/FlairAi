
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useRef, useEffect, useState } from 'react';
import BasicFace from '../../components/demo/basic-face/BasicFace'; // Reusing the avatar
import { AGENT_COLORS, AuraAssist } from '../../lib/presets/agents';

interface LandingPageProps {
  onLaunchApp: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLaunchApp }) => {
  const faceCanvasRef = useRef<HTMLCanvasElement>(null);
  // const [avatarColor] = useState(AGENT_COLORS[0]); // Using AuraAssist's color directly

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the element is visible
    );

    const sections = document.querySelectorAll('.lp-section, .lp-feature-card, .lp-benefit-item, .lp-step');
    sections.forEach((section) => observer.observe(section));

    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  return (
    <div className="landing-page">
      <header className="lp-header">
        <div className="lp-logo">
          <span role="img" aria-label="Flare Sparkle" style={{fontSize: '1.5em', marginRight: '8px'}}>🔥</span> FlareAI
        </div>
        <button onClick={onLaunchApp} className="lp-button primary lp-header-launch-button">
          Launch App
        </button>
      </header>

      {/* Hero Section */}
      <section className="lp-section lp-hero">
        <div className="lp-hero-content">
          <h1 className="lp-headline">Ignite Your Restaurant's Potential.</h1>
          <p className="lp-subheadline">
            Train Smarter, Serve Better. Interactive AI roleplay for elite restaurant teams.
            Master customer service, upselling, and menu knowledge with customizable AI Flarebots.
          </p>
          <button onClick={onLaunchApp} className="lp-button primary lp-cta-button">
            Get Started Now <span className="icon" style={{marginLeft: '8px'}}>arrow_forward</span>
          </button>
        </div>
        <div className="lp-hero-avatar">
          <BasicFace canvasRef={faceCanvasRef} color={AuraAssist.bodyColor} radius={180} isStatic={true} />
        </div>
      </section>

      {/* Why FlareAI Section */}
      <section className="lp-section lp-why">
        <h2>Why FlareAI?</h2>
        <div className="lp-why-columns">
          <div className="lp-why-column">
            <h3><span className="icon">sentiment_dissatisfied</span> The Old Way...</h3>
            <ul>
              <li><span className="icon">hourglass_empty</span> Inconsistent & Time-Consuming Training</li>
              <li><span className="icon">groups_off</span> Difficult to Scale for Teams</li>
              <li><span className="icon">psychology_alt</span> Lack of Realistic Practice</li>
              <li><span className="icon">quiz</span> Poor Knowledge Retention</li>
            </ul>
          </div>
          <div className="lp-why-column">
            <h3><span className="icon">model_training</span> The FlareAI Way!</h3>
            <ul>
              <li><span className="icon">checklist</span> Consistent, AI-Powered Scenarios</li>
              <li><span className="icon">supervisor_account</span> Scalable for Any Team Size</li>
              <li><span className="icon">record_voice_over</span> Engaging & Realistic Roleplay</li>
              <li><span className="icon">school</span> Master Menu & Procedures</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="lp-section lp-features">
        <h2>Experience the Future of Training</h2>
        <div className="lp-features-grid">
          <div className="lp-feature-card" style={{'--card-index': 0} as React.CSSProperties}>
            <span className="icon lp-feature-icon">record_voice_over</span>
            <h3>Realistic Roleplay</h3>
            <p>Engage in dynamic voice-based scenarios with AI agents that adapt to your restaurant's unique needs and customer types.</p>
          </div>
          <div className="lp-feature-card" style={{'--card-index': 1} as React.CSSProperties}>
            <span className="icon lp-feature-icon">smart_toy</span>
            <h3>Customizable Flarebots</h3>
            <p>Design AI trainers with specific personalities and in-depth knowledge of your menu, specials, and operational procedures.</p>
          </div>
          <div className="lp-feature-card" style={{'--card-index': 2} as React.CSSProperties}>
            <span className="icon lp-feature-icon">translate</span>
            <h3>Multilingual Mastery</h3>
            <p>Equip your team to serve diverse customers with dedicated language training agents for various languages.</p>
          </div>
           <div className="lp-feature-card" style={{'--card-index': 3} as React.CSSProperties}>
            <span className="icon lp-feature-icon">bar_chart</span>
            <h3>Skill Enhancement</h3>
            <p>Hone critical skills like upselling, complaint resolution, and detailed menu explanations in a safe, repeatable environment.</p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="lp-section lp-benefits">
        <h2>Unlock Peak Performance</h2>
        <ul className="lp-benefits-list">
          <li className="lp-benefit-item" style={{'--item-index': 0} as React.CSSProperties}><span className="icon">check_circle_outline</span> Elevate Service Quality & Guest Satisfaction</li>
          <li className="lp-benefit-item" style={{'--item-index': 1} as React.CSSProperties}><span className="icon">check_circle_outline</span> Boost Upselling Techniques & Increase Sales</li>
          <li className="lp-benefit-item" style={{'--item-index': 2} as React.CSSProperties}><span className="icon">check_circle_outline</span> Ensure Consistent Training Standards Across Your Team</li>
          <li className="lp-benefit-item" style={{'--item-index': 3} as React.CSSProperties}><span className="icon">check_circle_outline</span> Reduce Onboarding Time for New Hires</li>
          <li className="lp-benefit-item" style={{'--item-index': 4} as React.CSSProperties}><span className="icon">check_circle_outline</span> Empower Staff with Confidence & Competence</li>
        </ul>
      </section>
      
      {/* How It Works Section */}
      <section className="lp-section lp-how-it-works">
        <h2>Simple Steps to Success</h2>
        <div className="lp-steps-container">
          <div className="lp-step" style={{'--step-index': 0} as React.CSSProperties}>
            <div className="lp-step-icon-container"><span className="icon lp-step-icon">person_add</span></div>
            <h3>1. Personalize</h3>
            <p>Set up your profile and select or create your AI Flarebot with a unique persona.</p>
          </div>
          <div className="lp-step" style={{'--step-index': 1} as React.CSSProperties}>
            <div className="lp-step-icon-container"><span className="icon lp-step-icon">menu_book</span></div>
            <h3>2. Educate</h3>
            <p>Define your restaurant's menu, procedures, and specific training goals in the knowledge base.</p>
          </div>
          <div className="lp-step" style={{'--step-index': 2} as React.CSSProperties}>
           <div className="lp-step-icon-container"> <span className="icon lp-step-icon">spatial_audio_off</span></div>
            <h3>3. Practice</h3>
            <p>Engage in interactive voice scenarios to master skills and build confidence.</p>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="lp-section lp-final-cta">
        <h2>Ready to Transform Your Team?</h2>
        <p>Step into the future of restaurant training with FlareAI. Empower your staff, delight your guests, and watch your business thrive.</p>
        <button onClick={onLaunchApp} className="lp-button primary lp-cta-button">
          Launch FlareAI Now <span className="icon" style={{marginLeft: '8px'}}>rocket_launch</span>
        </button>
      </section>

      <footer className="lp-footer">
        <div className="lp-footer-brandmark">
            Love by <a href="https://www.github.com/w3jdev" target="_blank" rel="noopener noreferrer">W3JDEV</a>
        </div>
        <p>&copy; {new Date().getFullYear()} FlareAI. Revolutionizing Restaurant Training.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
