import React from 'react';
import { Mail, MapPin, User, MessageSquare, Send } from 'lucide-react';

const Contact = () => (
  <section id="contact" className="contact-section">
    <div className="contact-grid">
      <div className="contact-info">
        <h2 className="section-title text-left">Get in Touch</h2>
        <p className="contact-desc">
          Have questions about our coverage plans or need help setting up your account? 
          Our support team is here to help you 24/7.
        </p>
        
        <div className="contact-details">
          <div className="contact-item">
            <div className="contact-icon-wrapper"><Mail size={20} className="contact-icon" /></div>
            <span>support@ShieldPath.com</span>
          </div>
          <div className="contact-item">
            <div className="contact-icon-wrapper"><MapPin size={20} className="contact-icon" /></div>
            <span>123 Innovation Drive, Tech Hub, Mumbai</span>
          </div>
        </div>
      </div>
      
      <div className="contact-form-container">
        <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label>Full Name</label>
            <div className="input-wrapper">
              <User size={18} className="input-icon" />
              <input type="text" placeholder="John Doe" required />
            </div>
          </div>
          
          <div className="form-group">
            <label>Email Address</label>
            <div className="input-wrapper">
              <Mail size={18} className="input-icon" />
              <input type="email" placeholder="john@example.com" required />
            </div>
          </div>
          
          <div className="form-group">
            <label>Message</label>
            <div className="input-wrapper textarea-wrapper">
              <MessageSquare size={18} className="input-icon" />
              <textarea placeholder="How can we help you?" rows="4" required></textarea>
            </div>
          </div>
          
          <button type="submit" className="submit-btn">
            <span>Send Message</span>
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  </section>
);

export default Contact;
