import React, { useState } from 'react';
import { User, Mail, Lock, Phone } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import './Auth.css';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { registerUser } = useUser();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    platform: 'Zomato'
  });
  const [error, setError] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    const res = registerUser(formData);
    if (res.success) {
      navigate('/dashboard');
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-header">
        <div className="auth-brand">
          <img src="/logo.png" alt="ShieldPath Logo" className="auth-logo-main" />
          <span>ShieldPath</span>
        </div>
        <p className="auth-subtitle">Secure your delivery income today</p>
      </div>

      <div className="auth-card">
        <h2 className="auth-title">Create Account</h2>
        <form className="auth-form" onSubmit={handleRegister}>
          {error && <div className="error-banner" style={{ color: '#ef4444', marginBottom: 15, fontSize: 14 }}>{error}</div>}
          
          <div className="form-group">
            <label>Full Name</label>
            <div className="input-wrapper">
              <User size={18} className="input-icon" />
              <input 
                type="text" 
                placeholder="Rahul Kumar" 
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <div className="input-wrapper">
              <Mail size={18} className="input-icon" />
              <input 
                type="email" 
                placeholder="rahul.kumar@email.com" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <div className="input-wrapper">
              <Phone size={18} className="input-icon" />
              <input 
                type="tel" 
                placeholder="+91 98765 43210" 
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="input-wrapper">
              <Lock size={18} className="input-icon" />
              <input 
                type="password" 
                placeholder="Create a strong password" 
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Primary Delivery Platform</label>
            <select 
              className="pf-select"
              value={formData.platform}
              onChange={(e) => setFormData({...formData, platform: e.target.value})}
              required
            >
              <option value="Zomato">Zomato</option>
              <option value="Swiggy">Swiggy</option>
              <option value="Zepto">Zepto</option>
              <option value="Blinkit">Blinkit</option>
              <option value="Amazon">Amazon</option>
              <option value="Dunzo">Dunzo</option>
              <option value="Direct">Other / Direct Partner</option>
            </select>
          </div>

          <p className="terms-text">
            By registering, you agree to our <a href="/">Terms and Conditions</a> and <a href="/">Privacy Policy</a>.
          </p>

          <button type="submit" className="auth-submit-btn">Register</button>
        </form>

        <p className="auth-redirect">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
