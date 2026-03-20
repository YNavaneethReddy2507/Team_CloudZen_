import React, { useEffect } from 'react';
import { X, CheckCircle2, Shield, Clock, AlertTriangle, TrendingUp, Zap } from 'lucide-react';

const PlanModal = ({ isOpen, onClose, planData }) => {
  // Handle ESC key to close
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  // Backdrop click handler
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleBackdropClick}>
      <div className="modal-container">
        <button className="modal-close-btn" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="modal-header">
          <div className="modal-title-wrapper">
            <h2 className="modal-title">Your Current Plan</h2>
            <div className="status-badge-wrapper">
              <span className="status-dot"></span>
              <span className="status-text">Active</span>
            </div>
          </div>
        </div>

        <div className="modal-body">
          {/* Plan Summary Section */}
          <div className="plan-summary-box">
            <div className="plan-main-info">
              <h3 className="plan-name">{planData.name}</h3>
              <p className="plan-price">{planData.price}<span className="price-period">/week</span></p>
            </div>
            <div className="plan-icon">
              <Shield size={40} className="text-teal" />
            </div>
          </div>

          {/* Coverage Details Grid */}
          <div className="modal-details-grid">
            <div className="modal-detail-item">
              <div className="detail-icon blue"><TrendingUp size={18} /></div>
              <div className="detail-info">
                <span className="detail-label">Coverage Amount</span>
                <span className="detail-value">{planData.coverage}</span>
              </div>
            </div>
            <div className="modal-detail-item">
              <div className="detail-icon teal"><Zap size={18} /></div>
              <div className="detail-info">
                <span className="detail-label">Payout per Hour</span>
                <span className="detail-value">{planData.payout}</span>
              </div>
            </div>
            <div className="modal-detail-item">
              <div className="detail-icon orange"><Clock size={18} /></div>
              <div className="detail-info">
                <span className="detail-label">Max Hours</span>
                <span className="detail-value">{planData.maxHours}</span>
              </div>
            </div>
            <div className="modal-detail-item">
              <div className="detail-icon purple"><AlertTriangle size={18} /></div>
              <div className="detail-info">
                <span className="detail-label">Next Renewal</span>
                <span className="detail-value">{planData.renewalDate}</span>
              </div>
            </div>
          </div>

          {/* Benefits List */}
          <div className="benefits-section">
            <h4 className="section-label">Plan Benefits</h4>
            <ul className="modal-benefits-list">
              {planData.benefits.map((benefit, index) => (
                <li key={index}>
                  <CheckCircle2 size={16} className="text-teal" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="modal-footer">
          <div className="primary-actions">
            <button className="modal-btn btn-upgrade" onClick={() => console.log('Upgrade clicked')}>Upgrade Plan</button>
            <button className="modal-btn btn-downgrade" onClick={() => console.log('Downgrade clicked')}>Downgrade Plan</button>
          </div>
          <button className="modal-btn btn-cancel" onClick={() => console.log('Cancel clicked')}>Cancel Plan</button>
        </div>
      </div>
    </div>
  );
};

export default PlanModal;
