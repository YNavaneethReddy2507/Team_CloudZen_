import React from 'react';
import { Shield, CloudRain, Zap } from 'lucide-react';

const Hero = ({ scrollToSection }) => (
  <section id="home" className="hero-section">
    <div className="hero-content">
      <div className="badge">AI-Powered Parametric Insurance</div>
      <h1 className="hero-title">
        Protect Your Delivery<br />
        Income with Smart<br />
        Insurance
      </h1>
      <p className="hero-description">
        Automatic income protection for gig workers during heavy rain, floods, 
        pollution alerts, and curfews. Get instant payouts without filing claims.
      </p>
      <div className="hero-actions">
        <button className="primary-btn">
          <Shield size={20} />
          Get Coverage
        </button>
        <button className="secondary-btn" onClick={() => scrollToSection('about')}>
          Learn More
        </button>
      </div>
    </div>
    
    <div className="hero-image-container">
      <div className="coverage-card">
        <div className="coverage-card-header">
          <div className="coverage-status">
            <span className="status-label">Active Coverage</span>
            <span className="status-badge">Active</span>
          </div>
          <div className="coverage-amount-container">
            <h2 className="coverage-amount">₹2,500</h2>
            <p className="coverage-period">Weekly Protection</p>
          </div>
        </div>
        <div className="coverage-features">
          <div className="feature-item">
            <CloudRain size={20} />
            <span>Weather Protection</span>
          </div>
          <div className="feature-item">
            <Zap size={20} />
            <span>Instant Payout</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
