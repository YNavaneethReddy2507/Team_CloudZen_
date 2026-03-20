import React from 'react';
import { Shield } from 'lucide-react';

const Footer = ({ scrollToSection }) => {
  const handleScroll = (e, id) => {
    e.preventDefault();
    scrollToSection(id);
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand-section">
          <div className="footer-logo">
            <Shield size={20} />
            <span>DeliveryShield</span>
          </div>
          <p className="footer-description">
            AI-powered parametric insurance protecting delivery workers from income loss.
          </p>
        </div>
        
        <div className="footer-links">
          <div className="footer-column">
            <h4>Product</h4>
            <ul>
              <li><a href="#features" onClick={(e) => handleScroll(e, 'features')}>Features</a></li>
              <li><a href="#about" onClick={(e) => handleScroll(e, 'about')}>About</a></li>
              <li><a href="#faq" onClick={(e) => handleScroll(e, 'faq')}>FAQ</a></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h4>Company</h4>
            <ul>
              <li><a href="#about" onClick={(e) => handleScroll(e, 'about')}>Our Story</a></li>
              <li><a href="#contact" onClick={(e) => handleScroll(e, 'contact')}>Support</a></li>
              <li><a href="#contact" onClick={(e) => handleScroll(e, 'contact')}>Contact</a></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h4>Legal</h4>
            <ul>
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms of Service</a></li>
              <li><a href="#compliance">Compliance</a></li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>@ Copyright 2026 by Team CloudZen.All Rights Reserves.</p>
      </div>
    </footer>
  );
};

export default Footer;
