import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import { Shield, CloudRain, Zap, Lock, MapPin, TrendingUp, HelpCircle, CheckCircle2 } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="homepage">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-brand">
          <Shield className="brand-icon" size={24} />
          <span className="brand-text">DeliveryShield</span>
        </div>
        <div className="nav-links">
          <Link to="/login" className="login-btn" style={{ textDecoration: 'none' }}>Login</Link>
          <Link to="/register" className="get-started-btn" style={{ textDecoration: 'none' }}>Get Started</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
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
            <button className="secondary-btn">Learn More</button>
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

      {/* Why Choose DeliveryShield Section */}
      <section className="why-choose-section">
        <h2 className="section-title">Why Choose DeliveryShield?</h2>
        <p className="section-subtitle">Smart, automated insurance designed specifically for delivery workers</p>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon-wrapper ai-icon">
              <TrendingUp size={24} />
            </div>
            <h3 className="feature-title">AI Risk Assessment</h3>
            <p className="feature-description">
              Advanced AI analyzes weather, traffic, and zone data to calculate personalized premiums.
            </p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon-wrapper micro-icon">
              <Shield size={24} />
            </div>
            <h3 className="feature-title">Weekly Micro Insurance</h3>
            <p className="feature-description">
              Affordable weekly coverage starting from just ₹49. No long-term commitment required.
            </p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon-wrapper instant-icon">
              <Zap size={24} />
            </div>
            <h3 className="feature-title">Instant Claim Payout</h3>
            <p className="feature-description">
              Automatic payouts within hours when disruptions occur. No manual claims needed.
            </p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon-wrapper fraud-icon">
              <Lock size={24} />
            </div>
            <h3 className="feature-title">Fraud Detection System</h3>
            <p className="feature-description">
              Advanced GPS verification and AI-powered fraud prevention for secure operations.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <h2 className="section-title">How It Works</h2>
        <p className="section-subtitle">Get protected in three simple steps</p>
        
        <div className="steps-container">
          <div className="step-item">
            <div className="step-number step-1">1</div>
            <h3 className="step-title">Register as Delivery Worker</h3>
            <p className="step-description">
              Sign up with your phone number and select your delivery platform (Zomato, Swiggy, Amazon)
            </p>
          </div>
          
          <div className="step-item">
            <div className="step-number step-2">2</div>
            <h3 className="step-title">Subscribe to Weekly Coverage</h3>
            <p className="step-description">
              Choose your coverage plan based on AI assessed risk for your zone and working hours
            </p>
          </div>
          
          <div className="step-item">
            <div className="step-number step-3">3</div>
            <h3 className="step-title">Automatic Payout During Disruptions</h3>
            <p className="step-description">
              Get instant compensation when weather or disruptions affect your earning hours
            </p>
          </div>
        </div>
      </section>

      {/* Coverage Section */}
      <section className="coverage-section">
        <div className="coverage-details">
          <h2 className="section-title text-left">What's Covered?</h2>
          
          <div className="coverage-list">
            <div className="coverage-item">
              <div className="check-icon-wrapper">
                <CheckCircle2 className="check-icon" size={20} />
              </div>
              <div className="coverage-item-content">
                <h4 className="coverage-item-title">Heavy Rainfall & Floods</h4>
                <p className="coverage-item-desc">Protection when rainfall exceeds 50mm/hour</p>
              </div>
            </div>
            
            <div className="coverage-item">
              <div className="check-icon-wrapper">
                <CheckCircle2 className="check-icon" size={20} />
              </div>
              <div className="coverage-item-content">
                <h4 className="coverage-item-title">Severe Pollution Alerts</h4>
                <p className="coverage-item-desc">Coverage when AQI exceeds 300 (hazardous levels)</p>
              </div>
            </div>
            
            <div className="coverage-item">
              <div className="check-icon-wrapper">
                <CheckCircle2 className="check-icon" size={20} />
              </div>
              <div className="coverage-item-content">
                <h4 className="coverage-item-title">Curfews & Lockdowns</h4>
                <p className="coverage-item-desc">Income protection during government-imposed restrictions</p>
              </div>
            </div>
            
            <div className="coverage-item">
              <div className="check-icon-wrapper">
                <CheckCircle2 className="check-icon" size={20} />
              </div>
              <div className="coverage-item-content">
                <h4 className="coverage-item-title">Extreme Weather Events</h4>
                <p className="coverage-item-desc">Coverage for cyclones, storms, and severe weather warnings</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="sample-plan-card-container">
          <div className="sample-plan-card">
            <h3 className="sample-plan-title">Sample Coverage Plan</h3>
            <p className="sample-plan-subtitle">Mumbai Zone - High Risk</p>
            
            <div className="plan-details-list">
              <div className="plan-detail-row">
                <span className="plan-detail-label">Weekly Premium</span>
                <span className="plan-detail-value">₹75</span>
              </div>
              <div className="divider"></div>
              
              <div className="plan-detail-row">
                <span className="plan-detail-label">Coverage Amount</span>
                <span className="plan-detail-value">₹3,000</span>
              </div>
              <div className="divider"></div>
              
              <div className="plan-detail-row">
                <span className="plan-detail-label">Payout per Hour</span>
                <span className="plan-detail-value">₹150</span>
              </div>
              <div className="divider"></div>
              
              <div className="plan-detail-row">
                <span className="plan-detail-label">Maximum Hours Covered</span>
                <span className="plan-detail-value">20 hrs/week</span>
              </div>
            </div>
            
            <button className="subscribe-btn">Subscribe Now</button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <h2 className="section-title">What Workers Say</h2>
        <p className="section-subtitle">Trusted by thousands of delivery partners</p>
        
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="stars">★★★★★</div>
            <p className="testimonial-text">
              "Got ₹900 payout automatically during heavy rains last week. No hassle, no paperwork. This is a game-changer!"
            </p>
            <div className="author">
              <div className="author-avatar rs">RS</div>
              <div className="author-info">
                <div className="author-name">Rajesh Sharma</div>
                <div className="author-role">Zomato Delivery Partner, Delhi</div>
              </div>
            </div>
          </div>
          
          <div className="testimonial-card">
            <div className="stars">★★★★★</div>
            <p className="testimonial-text">
              "Just ₹75 per week and my income is protected. The AI premium is fair and the alerts keep me informed."
            </p>
            <div className="author">
              <div className="author-avatar pk">PK</div>
              <div className="author-info">
                <div className="author-name">Priya Kumar</div>
                <div className="author-role">Swiggy Delivery Partner, Mumbai</div>
              </div>
            </div>
          </div>
          
          <div className="testimonial-card">
            <div className="stars">★★★★★</div>
            <p className="testimonial-text">
              "During the pollution spike, I received instant compensation. Peace of mind while working outdoors!"
            </p>
            <div className="author">
              <div className="author-avatar am">AM</div>
              <div className="author-info">
                <div className="author-name">Arjun Mehta</div>
                <div className="author-role">Amazon Delivery Partner, Bengaluru</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
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
                <li><a href="/">Features</a></li>
                <li><a href="/">Pricing</a></li>
                <li><a href="/">Coverage</a></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h4>Company</h4>
              <ul>
                <li><a href="/">About</a></li>
                <li><a href="/">Support</a></li>
                <li><a href="/">Contact</a></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h4>Legal</h4>
              <ul>
                <li><a href="/">Privacy Policy</a></li>
                <li><a href="/">Terms of Service</a></li>
                <li><a href="/">Compliance</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>@ Coptright 2026 by Team CloudZen.All Rights Reserves.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
