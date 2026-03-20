import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Menu, X } from 'lucide-react';

const Navbar = ({ scrollToSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMobileClick = (section) => {
    setMobileMenuOpen(false);
    scrollToSection(section);
  };

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-brand" onClick={() => scrollToSection('home')} style={{cursor: 'pointer'}}>
          <Shield className="brand-icon" size={24} />
          <span className="brand-text">DeliveryShield</span>
        </div>
        
        <div className="nav-links desktop-menu">
          <button className="nav-link" onClick={() => scrollToSection('home')}>Home</button>
          <button className="nav-link" onClick={() => scrollToSection('about')}>About</button>
          <button className="nav-link" onClick={() => scrollToSection('features')}>Features</button>
          <button className="nav-link" onClick={() => scrollToSection('contact')}>Contact</button>
          <button className="nav-link" onClick={() => scrollToSection('faq')}>FAQ / Help</button>
        </div>

        <div className="nav-actions desktop-menu">
          <Link to="/login" className="login-btn" style={{ textDecoration: 'none' }}>Login</Link>
          <Link to="/register" className="get-started-btn" style={{ textDecoration: 'none' }}>Get Started</Link>
        </div>

        <div className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </div>
      </nav>

      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-nav-links">
          <button onClick={() => handleMobileClick('home')}>Home</button>
          <button onClick={() => handleMobileClick('about')}>About</button>
          <button onClick={() => handleMobileClick('features')}>Features</button>
          <button onClick={() => handleMobileClick('contact')}>Contact</button>
          <button onClick={() => handleMobileClick('faq')}>FAQ / Help</button>
        </div>
        <div className="mobile-nav-actions">
          <Link to="/login" className="login-btn mobile-login" onClick={() => setMobileMenuOpen(false)}>Login</Link>
          <Link to="/register" className="get-started-btn mobile-start" onClick={() => setMobileMenuOpen(false)}>Get Started</Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
