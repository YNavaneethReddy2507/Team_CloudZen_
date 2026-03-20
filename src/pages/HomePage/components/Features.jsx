import React from 'react';
import { Shield, CloudRain, Zap, TrendingUp } from 'lucide-react';

const Features = () => (
  <section id="features" className="features-section">
    <h2 className="section-title">Core Features</h2>
    <p className="section-subtitle">Why delivery workers choose ShieldPath</p>
    
    <div className="features-grid">
      <div className="feature-card">
        <div className="feature-icon-wrapper micro-icon">
          <CloudRain size={24} />
        </div>
        <h3 className="feature-title">Weather Protection</h3>
        <p className="feature-description">
          Income coverage during heavy rainfalls exceeding 50mm, floods, or extreme heat.
        </p>
      </div>
      
      <div className="feature-card">
        <div className="feature-icon-wrapper instant-icon">
          <Zap size={24} />
        </div>
        <h3 className="feature-title">Instant Payouts</h3>
        <p className="feature-description">
          No forms, no waiting. Get automatic payouts within hours when disruptions happen.
        </p>
      </div>

      <div className="feature-card">
        <div className="feature-icon-wrapper ai-icon">
          <TrendingUp size={24} />
        </div>
        <h3 className="feature-title">AI Risk Detection</h3>
        <p className="feature-description">
          Smart algorithms analyze real-time climate & zone data to calculate personalized premiums.
        </p>
      </div>
      
      <div className="feature-card">
        <div className="feature-icon-wrapper fraud-icon">
          <Shield size={24} />
        </div>
        <h3 className="feature-title">Affordable Weekly Plans</h3>
        <p className="feature-description">
          Flexible micro-insurance starting at just ₹49/week. Zero long-term lock-ins.
        </p>
      </div>
    </div>
  </section>
);

export default Features;
