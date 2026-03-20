import React, { useState, useEffect } from 'react';
import { KeyRound, ArrowLeft } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import Toast from '../../components/Toast/Toast';
import Logo from '../../components/Logo/Logo';
import './Auth.css';

const VerifyOtpPage = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input
    if (element.nextSibling && element.value !== '') {
      element.nextSibling.focus();
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === 'Backspace' && e.target.value === '' && e.target.previousSibling) {
      e.target.previousSibling.focus();
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();
    const otpValue = otp.join('');

    if (otpValue.length < 6) {
      setError('Please enter all 6 digits.');
      return;
    }

    setLoading(true);
    setError('');

    // Simulate verification
    setTimeout(() => {
      if (otpValue === '123456') {
        // Success
        setToast({ message: 'Verification successful! Redirecting...', type: 'success' });
        setTimeout(() => {
          navigate('/dashboard', { state: { loginSuccess: true } });
        }, 1500);
      } else {
        // Error
        setError('Invalid OTP. Please try again.');
        setLoading(false);
      }
    }, 1000);
  };

  const handleResend = () => {
    setToast({ message: 'A new OTP has been sent to your mobile phone.', type: 'success' });
    setOtp(['', '', '', '', '', '']);
    setError('');
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
        <p className="auth-subtitle">Secure verification for your account</p>
      </div>

      <div className="auth-card">
        <Link to="/login" className="back-link">
          <ArrowLeft size={18} />
          <span>Back to Login</span>
        </Link>

        <h2 className="auth-title">Verify OTP</h2>
        <p className="otp-instruction">
          Enter the 6-digit code sent to your mobile device.
        </p>

        <form onSubmit={handleVerify}>
          <div className="otp-input-container">
            {otp.map((data, index) => (
              <input
                className="otp-field"
                type="text"
                name="otp"
                maxLength="1"
                key={index}
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleBackspace(e, index)}
                onFocus={(e) => e.target.select()}
                disabled={loading}
              />
            ))}
          </div>

          {error && <p className="error-message-inline">{error}</p>}

          <button 
            type="submit" 
            className={`auth-submit-btn ${loading ? 'loading' : ''}`}
            disabled={loading}
          >
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>

          <div className="resend-container">
            <span>Didn't receive the code?</span>
            <button type="button" className="resend-btn" onClick={handleResend}>
              Resend OTP
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtpPage;
