import React, { useState } from 'react';
import { Shield, User, Phone, Briefcase, MapPin, Lock, Mail, Truck, FileText } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import Logo from '../../components/Logo/Logo';
import './Auth.css';

const RegisterPage = () => {
  const { updateUser } = useUser();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    platform: '',
    city: '',
    vehicleNo: '',
    licenseNo: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);

    // Initializing new user based on form data
    const newUser = {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      vehicleNo: formData.vehicleNo,
      licenseNo: formData.licenseNo,
      password: formData.password,
      platform: formData.platform.charAt(0).toUpperCase() + formData.platform.slice(1),
      city: formData.city.charAt(0).toUpperCase() + formData.city.slice(1),
      area: formData.city === 'mumbai' ? 'Andheri East' : formData.city.charAt(0).toUpperCase() + formData.city.slice(1),
      status: 'Active',
      isManualPlan: false, // Start fresh
      totalClaims: 0,
      memberSince: 'March 2026',
      partnerId: `ZEN-${Math.floor(10000 + Math.random() * 90000)}`,
      workingHours: '8 hrs/day',
      primaryZones: [formData.city === 'mumbai' ? 'Andheri East' : formData.city.charAt(0).toUpperCase() + formData.city.slice(1)],
      claimsData: [],
      recentClaims: [],
      earningsData: [],
      transactions: [],
      paymentMethods: []
    };

    updateUser(newUser);

    setTimeout(() => {
      navigate('/dashboard', { state: { loginSuccess: true } });
    }, 1500);
  };

  return (
    <div className="auth-container">
      <div className="auth-header">
        <div className="auth-brand">
          <Logo size={40} />
          <span>ShieldPath</span>
        </div>
        <p className="auth-subtitle">Join thousands of protected delivery workers</p>
      </div>

      <div className="auth-card">
        <h2 className="auth-title">Create Account</h2>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <div className="input-wrapper">
              <User size={18} className="input-icon" />
              <input 
                type="text" 
                name="fullName"
                placeholder="Enter your full name" 
                value={formData.fullName}
                onChange={handleChange}
                required 
                disabled={loading} 
              />
            </div>
          </div>

          <div className="form-group">
            <label>Gmail Address</label>
            <div className="input-wrapper">
              <Mail size={18} className="input-icon" />
              <input 
                type="email" 
                name="email"
                placeholder="Enter your gmail address" 
                value={formData.email}
                onChange={handleChange}
                required 
                disabled={loading} 
              />
            </div>
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <div className="input-wrapper">
              <Phone size={18} className="input-icon" />
              <input 
                type="tel" 
                name="phone"
                placeholder="+91 98765 43210" 
                value={formData.phone}
                onChange={handleChange}
                required 
                disabled={loading} 
              />
            </div>
          </div>

          <div className="form-group">
            <label>Delivery Platform</label>
            <div className="input-wrapper">
              <Briefcase size={18} className="input-icon" />
              <select 
                name="platform"
                value={formData.platform}
                onChange={handleChange}
                className="auth-select" 
                required 
                disabled={loading}
              >
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
              <select 
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="auth-select" 
                required 
                disabled={loading}
              >
                 <option value="" disabled hidden>Select your city</option>
                <option value="ahmedabad">Ahmedabad</option>
                <option value="bengaluru">Bengaluru</option>
                <option value="chennai">Chennai</option>
                <option value="delhi">Delhi</option>
                <option value="hyderabad">Hyderabad</option>
                <option value="jaipur">Jaipur</option>
                <option value="kolkata">Kolkata</option>
                <option value="lucknow">Lucknow</option>
                <option value="mumbai">Mumbai</option>
                <option value="pune">Pune</option>
                <option value="surat">Surat</option>
                <option value="visakhapatnam">Visakhapatnam</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Vehicle Number</label>
            <div className="input-wrapper">
              <Truck size={18} className="input-icon" />
              <input 
                type="text" 
                name="vehicleNo"
                placeholder="MH 04 AB 1234" 
                value={formData.vehicleNo}
                onChange={handleChange}
                required 
                disabled={loading} 
              />
            </div>
          </div>

          <div className="form-group">
            <label>Driving License Number</label>
            <div className="input-wrapper">
              <FileText size={18} className="input-icon" />
              <input 
                type="text" 
                name="licenseNo"
                placeholder="DL-1234567890123" 
                value={formData.licenseNo}
                onChange={handleChange}
                required 
                disabled={loading} 
              />
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="input-wrapper">
              <Lock size={18} className="input-icon" />
              <input 
                type="password" 
                name="password"
                placeholder="Create a strong password" 
                value={formData.password}
                onChange={handleChange}
                required 
                disabled={loading} 
              />
            </div>
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <div className="input-wrapper">
              <Lock size={18} className="input-icon" />
              <input 
                type="password" 
                name="confirmPassword"
                placeholder="Confirm your password" 
                value={formData.confirmPassword}
                onChange={handleChange}
                required 
                disabled={loading} 
              />
            </div>
          </div>

          <div className="form-options register-options">
            <label className="checkbox-label">
              <input type="checkbox" required disabled={loading} />
              <span className="checkmark"></span>
              <span>I agree to the <a href="/">Terms of Service</a> and <a href="/">Privacy Policy</a></span>
            </label>
          </div>

          <button type="submit" className="auth-submit-btn" disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <p className="auth-redirect">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
