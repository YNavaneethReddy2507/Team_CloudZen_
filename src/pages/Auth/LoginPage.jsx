import React, { useState } from 'react';
import { Shield, Mail, Lock, Phone } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Toast from '../../components/Toast/Toast';
import { useUser } from '../../context/UserContext';
import { APP_USER } from '../../constants/userConfig';
import { transactions, claimsData } from '../../constants/mockData';
import Logo from '../../components/Logo/Logo';
import './Auth.css';

const LoginPage = () => {
  const { updateUser } = useUser();
  const [loginMethod, setLoginMethod] = useState('email'); // 'email' or 'phone'
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    const email = e.target.querySelector('input[type="email"]')?.value || 'Phone Login';
    const password = e.target.querySelector('input[type="password"]')?.value;

    setTimeout(() => {
      // Check for Demo Credentials
      if (email === 'CloudZen@gmail.com' && password === 'CloudZen123') {
        handleDemoLogin();
        return;
      }

      // Check for Registered Users in LocalStorage
      const savedData = localStorage.getItem('delivery_shield_user');
      const existingUser = savedData ? JSON.parse(savedData) : null;

      if (existingUser && existingUser.email === email && existingUser.password === password) {
        // Successful login for registered user
        setToast({ 
          message: 'Login successful! Welcome back.', 
          type: 'success' 
        });
        updateUser(existingUser);
        
        setTimeout(() => {
          navigate('/dashboard', { state: { loginSuccess: true } });
        }, 1500);
      } else {
        setLoading(false);
        setToast({ 
          message: 'Invalid credentials. Please try again or use Demo Login.', 
          type: 'error' 
        });
      }
    }, 1000);
  };

  const handleDemoLogin = () => {
    setLoading(true);
    setToast({ 
      message: 'Logging in as Demo User...', 
      type: 'success' 
    });
    
    // Check if we already have a saved demo user to preserve changes
    const savedData = localStorage.getItem('delivery_shield_user');
    const existingUser = savedData ? JSON.parse(savedData) : null;
    
    if (existingUser && existingUser.email === 'CloudZen@gmail.com') {
      // Just use the existing data to preserve persistence
      // (Optionally sync fields if APP_USER changed since last login)
      updateUser({
        ...existingUser,
        role: APP_USER.role, // Force role consistency
        memberSince: APP_USER.memberSince // Force date consistency
      });
    } else {
      // First time demo login or different user was logged in, initialize with full mock set
      updateUser({
        ...APP_USER,
        transactions: transactions,
        claimsData: claimsData,
        recentClaims: [
          { title: 'Heavy Rain', date: 'Mar 12', amount: 900, status: 'Paid', description: '6 hours disruption' },
          { title: 'Pollution Alert', date: 'Mar 10', amount: 450, status: 'Processing', description: '4 hours disruption' },
          { title: 'Traffic Disruption', date: 'Mar 8', amount: 0, status: 'Not eligible', description: 'No claim triggered' }
        ],
        earningsData: [
          { name: 'Mon', protected: 2400, actual: 2400 },
          { name: 'Tue', protected: 2400, actual: 2200 },
          { name: 'Wed', protected: 2400, actual: 2700 },
          { name: 'Thu', protected: 2400, actual: 2500 },
          { name: 'Fri', protected: 2400, actual: 2600 },
          { name: 'Sat', protected: 3200, actual: 3000 },
          { name: 'Sun', protected: 3200, actual: 2900 },
        ],
        paymentMethods: [
          { id: 1, type: 'UPI', name: 'UPI Handle', details: 'cloudzen@okaxis', isPrimary: true, icon: 'upi', expiry: '', cvv: '', startDate: '' },
          { id: 2, type: 'Card', name: 'Credit Card', details: '124563254896', isPrimary: false, icon: 'card', expiry: '2028-01-09', cvv: '123', startDate: '2022-01-01' },
        ]
      });
    }

    setTimeout(() => {
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="auth-container">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="auth-header">
        <div className="auth-brand">
          <Logo size={40} />
          <span>ShieldPath</span>
        </div>
        <p className="auth-subtitle">Welcome back! Login to your account</p>
      </div>

      <div className="auth-card">
        <h2 className="auth-title">Login</h2>

        <div className="auth-method-toggle">
          <button
            className={`toggle-btn ${loginMethod === 'email' ? 'active' : ''}`}
            onClick={() => setLoginMethod('email')}
            disabled={loading}
          >
            Email
          </button>
          <button
            className={`toggle-btn ${loginMethod === 'phone' ? 'active' : ''}`}
            onClick={() => setLoginMethod('phone')}
            disabled={loading}
          >
            Phone
          </button>
        </div>

        <form className="auth-form" onSubmit={handleLogin}>
          {loginMethod === 'email' ? (
            <div className="form-group">
              <label>Email Address</label>
              <div className="input-wrapper">
                <Mail size={18} className="input-icon" />
                <input type="email" placeholder="your@email.com" required disabled={loading} />
              </div>
            </div>
          ) : (
            <div className="form-group">
              <label>Phone Number</label>
              <div className="input-wrapper">
                <Phone size={18} className="input-icon" />
                <input type="tel" placeholder="+91 98765 43210" required disabled={loading} />
              </div>
            </div>
          )}

          <div className="form-group">
            <label>Password</label>
            <div className="input-wrapper">
              <Lock size={18} className="input-icon" />
              <input type="password" placeholder="Enter your password" required disabled={loading} />
            </div>
          </div>

          <div className="form-options">
            <label className="checkbox-label">
              <input type="checkbox" disabled={loading} />
              <span className="checkmark"></span>
              Remember me
            </label>
            <a href="/" className="forgot-password">Forgot password?</a>
          </div>

          <button
            type="submit"
            className={`auth-submit-btn ${loading ? 'loading' : ''}`}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Login'}
          </button>

          <div className="demo-hint-box">
            <p><strong>Reviewer Demo Account:</strong></p>
            <p>Email: <code>CloudZen@gmail.com</code></p>
            <p>Password: <code>CloudZen123</code></p>
            <button
              type="button"
              className="demo-quick-login"
              onClick={handleDemoLogin}
              disabled={loading}
            >
              Quick Login as Demo User
            </button>
          </div>

        </form>

        <p className="auth-redirect">
          Don't have an account? <Link to="/register">Register now</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
