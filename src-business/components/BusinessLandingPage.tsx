
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, a useRef, useEffect, useState } from 'react';
import BasicFace from '../../components/demo/basic-face/BasicFace'; // Reusing the avatar
import { AGENT_COLORS, AuraAssist } from '../../lib/presets/agents';

interface BusinessLandingPageProps {
  onLaunchApp: () => void;
}

const BusinessLandingPage: React.FC<BusinessLandingPageProps> = ({ onLaunchApp }) => {
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
          <span role="img" aria-label="Flare Sparkle" style={{fontSize: '1.5em', marginRight: '8px'}}>🚀</span> FlareAI for Business
        </div>
        <button onClick={onLaunchApp} className="lp-button primary lp-header-launch-button">
          Launch App
        </button>
      </header>

      {/* Hero Section */}
      <section className="lp-section lp-hero">
        <div className="lp-hero-content">
          <h1 className="lp-headline">Empower Your Business with AI Agents.</h1>
          <p className="lp-subheadline">
            Create and train AI agents to automate customer support, sales, and onboarding.
            Boost efficiency, reduce costs, and increase revenue with customizable AI agents.
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
        <h2>Why FlareAI for Business?</h2>
        <div className="lp-why-columns">
          <div className="lp-why-column">
            <h3><span className="icon">sentiment_dissatisfied</span> The Old Way...</h3>
            <ul>
              <li><span className="icon">hourglass_empty</span> Repetitive & Time-Consuming Tasks</li>
              <li><span className="icon">groups_off</span> Difficult to Scale Operations</li>
              <li><span className="icon">psychology_alt</span> Lack of Personalized Customer Interactions</li>
              <li><span className="icon">quiz</span> Poor Knowledge Management</li>
            </ul>
          </div>
          <div className="lp-why-column">
            <h3><span className="icon">model_training</span> The FlareAI Way!</h3>
            <ul>
              <li><span className="icon">checklist</span> AI-Powered Automation</li>
              <li><span className="icon">supervisor_account</span> Scalable for Any Business Size</li>
              <li><span className="icon">record_voice_over</span> Engaging & Personalized Interactions</li>
              <li><span className="icon">school</span> Centralized Knowledge Base</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="lp-section lp-features">
        <h2>Experience the Future of Business Automation</h2>
        <div className="lp-features-grid">
          <div className="lp-feature-card" style={{'--card-index': 0} as React.CSSProperties}>
            <span className="icon lp-feature-icon">record_voice_over</span>
            <h3>Realistic AI Agents</h3>
            <p>Engage in dynamic voice-based conversations with AI agents that adapt to your business's unique needs and customer types.</p>
          </div>
          <div className="lp-feature-card" style={{'--card-index': 1} as React.CSSProperties}>
            <span className="icon lp-feature-icon">smart_toy</span>
            <h3>Customizable Agents</h3>
            <p>Design AI agents with specific personalities and in-depth knowledge of your products, services, and operational procedures.</p>
          </div>
          <div className="lp-feature-card" style={{'--card-index': 2} as React.CSSProperties}>
            <span className="icon lp-feature-icon">translate</span>
            <h3>Multilingual Support</h3>
            <p>Equip your agents to serve a global audience with dedicated language support for various languages.</p>
          </div>
           <div className="lp-feature-card" style={{'--card-index': 3} as React.CSSProperties}>
            <span className="icon lp-feature-icon">bar_chart</span>
            <h3>Performance Analytics</h3>
            <p>Track the performance of your agents and identify areas for improvement with our built-in analytics dashboard.</p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="lp-section lp-benefits">
        <h2>Unlock Peak Performance</h2>
        <ul className="lp-benefits-list">
          <li className="lp-benefit-item" style={{'--item-index': 0} as React.CSSProperties}><span className="icon">check_circle_outline</span> Automate Repetitive Tasks & Free Up Your Team</li>
          <li className="lp-benefit-item" style={{'--item-index': 1} as React.CSSProperties}><span className="icon">check_circle_outline</span> Boost Sales & Lead Generation</li>
          <li className="lp-benefit-item" style={{'--item-index': 2} as React.CSSProperties}><span className="icon">check_circle_outline</span> Improve Customer Satisfaction & Loyalty</li>
          <li className="lp-benefit-item" style={{'--item-index': 3} as React.CSSProperties}><span className="icon">check_circle_outline</span> Reduce Onboarding Time for New Hires</li>
          <li className="lp-benefit-item" style={{'--item-index': 4} as React.CSSProperties}><span className="icon">check_circle_outline</span> Empower Your Team with AI-Powered Tools</li>
        </ul>
      </section>

      {/* How It Works Section */}
      <section className="lp-section lp-how-it-works">
        <h2>Simple Steps to Success</h2>
        <div className="lp-steps-container">
          <div className="lp-step" style={{'--step-index': 0} as React.CSSProperties}>
            <div className="lp-step-icon-container"><span className="icon lp-step-icon">person_add</span></div>
            <h3>1. Personalize</h3>
            <p>Set up your organization and create your first AI agent with a unique persona.</p>
          </div>
          <div className="lp-step" style={{'--step-index': 1} as React.CSSProperties}>
            <div className="lp-step-icon-container"><span className="icon lp-step-icon">menu_book</span></div>
            <h3>2. Educate</h3>
            <p>Define your business's knowledge base, such as products, services, and procedures.</p>
          </div>
          <div className="lp-step" style={{'--step-index': 2} as React.CSSProperties}>
           <div className="lp-step-icon-container"> <span className="icon lp-step-icon">spatial_audio_off</span></div>
            <h3>3. Deploy</h3>
            <p>Deploy your AI agents to your website, mobile app, or other channels.</p>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="lp-section lp-final-cta">
        <h2>Ready to Transform Your Business?</h2>
        <p>Step into the future of business automation with FlareAI for Business. Empower your team, delight your customers, and watch your business thrive.</p>
        <button onClick={onLaunchApp} className="lp-button primary lp-cta-button">
          Launch FlareAI for Business Now <span className="icon" style={{marginLeft: '8px'}}>rocket_launch</span>
        </button>
      </section>

      <footer className="lp-footer">
        <div className="lp-footer-brandmark">
            Love by <a href="https://www.github.com/w3jdev" target="_blank" rel="noopener noreferrer">W3JDEV</a>
        </div>
        <p>&copy; {new Date().getFullYear()} FlareAI for Business. Revolutionizing Business Automation.</p>
      </footer>
    </div>
  );
};

export default BusinessLandingPage;
