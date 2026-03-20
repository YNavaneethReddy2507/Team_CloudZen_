import React, { useState } from 'react';
import { Shield, Mail, Lock, Phone } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Toast from '../../components/Toast/Toast';
import './Auth.css';

const LoginPage = () => {
  const [loginMethod, setLoginMethod] = useState('email'); // 'email' or 'phone'
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate OTP generation
    setTimeout(() => {
      setToast({ 
        message: 'OTP has been sent to your mobile phone. Please check.', 
        type: 'success' 
      });
      
      setTimeout(() => {
        navigate('/verify-otp');
      }, 2000);
    }, 1000);
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
          <Shield size={32} />
          <span>DeliveryShield</span>
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

          {!loading && (
            <>
              <div className="divider">
                <span>Or continue with</span>
              </div>

              <button type="button" className="google-btn">
                <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Login with Google
              </button>
            </>
          )}
        </form>

        <p className="auth-redirect">
          Don't have an account? <Link to="/register">Register now</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
