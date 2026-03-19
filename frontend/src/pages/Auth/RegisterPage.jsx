import React from 'react';
import { Shield, User, Phone, Briefcase, MapPin, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Auth.css';

const RegisterPage = () => {
  return (
    <div className="auth-container">
      <div className="auth-header">
        <div className="auth-brand">
          <Shield size={32} />
          <span>DeliveryShield</span>
        </div>
        <p className="auth-subtitle">Join thousands of protected delivery workers</p>
      </div>

      <div className="auth-card">
        <h2 className="auth-title">Create Account</h2>

        <form className="auth-form">
          <div className="form-group">
            <label>Full Name</label>
            <div className="input-wrapper">
              <User size={18} className="input-icon" />
              <input type="text" placeholder="Enter your full name" />
            </div>
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <div className="input-wrapper">
              <Phone size={18} className="input-icon" />
              <input type="tel" placeholder="+91 98765 43210" />
            </div>
          </div>

          <div className="form-group">
            <label>Delivery Platform</label>
            <div className="input-wrapper">
              <Briefcase size={18} className="input-icon" />
              <select defaultValue="" className="auth-select">
                <option value="" disabled hidden>Select your platform</option>
                <option value="zomato">Zomato</option>
                <option value="swiggy">Swiggy</option>
                <option value="amazon">Amazon</option>
                <option value="flipkart">Flipkart</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Operating City</label>
            <div className="input-wrapper">
              <MapPin size={18} className="input-icon" />
              <select defaultValue="" className="auth-select">
                <option value="" disabled hidden>Select your city</option>
                <option value="mumbai">Mumbai</option>
                <option value="delhi">Delhi</option>
                <option value="bengaluru">Bengaluru</option>
                <option value="chennai">Chennai</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="input-wrapper">
              <Lock size={18} className="input-icon" />
              <input type="password" placeholder="Create a strong password" />
            </div>
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <div className="input-wrapper">
              <Lock size={18} className="input-icon" />
              <input type="password" placeholder="Confirm your password" />
            </div>
          </div>

          <div className="form-options register-options">
            <label className="checkbox-label">
              <input type="checkbox" />
              <span className="checkmark"></span>
              <span>I agree to the <a href="/">Terms of Service</a> and <a href="/">Privacy Policy</a></span>
            </label>
          </div>

          <button type="submit" className="auth-submit-btn">Create Account</button>
        </form>

        <p className="auth-redirect">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
