import React from 'react';
import { Shield, CloudRain, Zap } from 'lucide-react';

const About = () => (
  <section id="about" className="about-section">
    <div className="about-container">
      <h2 className="section-title">About ShieldPath</h2>
      <p className="section-subtitle">Empowering the driving force of the gig economy</p>
      
      <div className="about-content">
        <div className="about-card mission-card">
          <div className="about-icon"><Shield size={32} /></div>
          <h3>Our Mission</h3>
          <p>To provide financial stability and peace of mind for gig workers by leveraging modern technology to offer accessible, fair, and automated income protection.</p>
        </div>
        
        <div className="about-card problem-card">
          <div className="about-icon"><CloudRain size={32} /></div>
          <h3>The Problem</h3>
          <p>Every day, gig workers face unpredictable income losses due to severe weather, pollution alerts, and curfews. Traditional insurance is too slow, expensive, and complicated.</p>
        </div>
        
        <div className="about-card solution-card">
          <div className="about-icon"><Zap size={32} /></div>
          <h3>The Solution</h3>
          <p>AI-powered parametric insurance. Subscribing takes minutes, premiums are dynamically assessed by zone, and payouts are triggered instantly when disruptions happen.</p>
        </div>
      </div>
    </div>
  </section>
);

export default About;
