import React from 'react';
import { 
  Shield, FileText, PieChart, AlertTriangle, 
  CheckCircle2, Clock,
  X, Key, Lock
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import './Policy.css';
import { useUser } from '../../context/UserContext';

import { PLANS } from '../../constants/plans';

const Policy = () => {
  const { user, updateUser } = useUser();
  const [renewed, setRenewed] = React.useState(false);
  const [showPasswordModal, setShowPasswordModal] = React.useState(false);
  const [pendingPlan, setPendingPlan] = React.useState(null);
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');

  const currentPlanName = user.planName || 'Standard Shield';
  const currentPlan = PLANS.find(p => p.name === currentPlanName) || PLANS[1];

  const handleRenew = () => {
    setRenewed(true);
    // Auto-hide alert after 3 seconds
    setTimeout(() => setRenewed(false), 3000);
  };

  const handleSelectPlan = (name) => {
    setPendingPlan(name);
    setShowPasswordModal(true);
    setConfirmPassword('');
    setPasswordError('');
  };

  const handleConfirmPlanChange = () => {
    if (confirmPassword === user.password) {
      updateUser({ planName: pendingPlan });
      setShowPasswordModal(false);
      setPendingPlan(null);
      setConfirmPassword('');
      setPasswordError('');
    } else {
      setPasswordError('Incorrect password. Please try again.');
    }
  };

  return (
    <div className="policy-layout dashboard-layout">
      <Sidebar activePage="policy" />

      {/* Main Content */}
      <main className="main-content">
        <header className="main-header">
          <h1>My Insurance Policy</h1>
          <p>Manage your coverage and view available plans</p>
        </header>

        {/* Active Coverage Card */}
        <section className="active-coverage-card">
          <div className="coverage-header-banner">
            <div className="coverage-title-group">
              <Shield className="coverage-icon" size={24} />
              <span className="coverage-label">Active Coverage</span>
            </div>
            <span className="badge-active">Active</span>
          </div>
          
          <h2 className="plan-name">{currentPlan.name}</h2>
          <p className="plan-subtitle">Your weekly protection plan</p>

          <div className="coverage-details-grid">
            <div className="detail-item">
              <div className="detail-label">
                <span>₹</span> Weekly Premium
              </div>
              <div className="detail-value">₹{currentPlan.premium}</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">
                <Shield size={16} /> Coverage Amount
              </div>
              <div className="detail-value">₹{currentPlan.coverage.toLocaleString()}</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">
                <Clock size={16} /> Per Hour Payout
              </div>
              <div className="detail-value">₹{currentPlan.payout}</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">
                <AlertTriangle size={16} /> Valid Until
              </div>
              <div className="detail-value text-medium">Mar 21, 2026</div>
            </div>
          </div>

          <div className="coverage-actions" style={{ position: 'relative' }}>
            {renewed && (
              <div className="renewal-success-toast">
                <CheckCircle2 size={16} /> Policy Renewed Successfully!
              </div>
            )}
            <button className="btn-renew" onClick={handleRenew}>Renew Policy</button>
            <Link to="/premium" className="btn-details" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              View Premium Details
            </Link>
          </div>
        </section>

        {/* Available Plans */}
        <section className="available-plans-section">
          <h3 className="section-title">Available Plans</h3>
          <div className="plans-grid">
            {PLANS.map((plan, i) => {
              const isActive = plan.name === currentPlanName;
              return (
                <div key={i} className={`plan-card ${plan.recommended ? 'recommended' : ''} ${isActive ? 'active-border' : ''}`}>
                  {plan.recommended && <div className="recommended-badge">Recommended</div>}
                  <div className={`plan-header ${plan.recommended ? 'mt-badge' : ''}`}>
                    <h4>{plan.name}</h4>
                    <div className="price-tag">
                      <span className="amount">₹{plan.premium}</span><span className="period">/week</span>
                    </div>
                    <div className="risk-level">Risk Level: {plan.risk}</div>
                  </div>
                  <div className="plan-limits">
                    <div className="limit-row"><span>Coverage</span><span>₹{plan.coverage.toLocaleString()}</span></div>
                    <div className="limit-row"><span>Payout/Hour</span><span>₹{plan.payout}</span></div>
                    <div className="limit-row"><span>Max Hours</span><span>{plan.maxHours} hrs/week</span></div>
                  </div>
                  <ul className="plan-features">
                    {plan.features.map((feat, fi) => (
                      <li key={fi}><CheckCircle2 size={16} className="text-teal" /> {feat}</li>
                    ))}
                  </ul>
                  {isActive ? (
                    <button className="btn-current">Current Plan</button>
                  ) : (
                    <button className="btn-select" onClick={() => handleSelectPlan(plan.name)}>Select Plan</button>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Info Banner */}
        <div className="info-banner">
          <AlertTriangle className="info-icon" size={24} />
          <div className="info-content">
            <h4>How does weekly coverage work?</h4>
            <ul>
              <li>Your policy automatically renews every week unless you cancel</li>
              <li>Premium is calculated based on AI-assessed risk for your zone</li>
              <li>Claims are triggered automatically when disruptions are detected</li>
              <li>You can upgrade or downgrade your plan anytime</li>
            </ul>
          </div>
        </div>

        {/* Policy History */}
        <section className="policy-history-section">
          <h3 className="section-title">Policy History</h3>
          <div className="table-container">
            <table className="history-table">
              <thead>
                <tr>
                  <th>Period</th>
                  <th>Premium</th>
                  <th>Status</th>
                  <th>Claims</th>
                  <th>Total Payout</th>
                </tr>
              </thead>
              <tbody>
                {(user.policyHistory || []).map((p, i) => (
                  <tr key={i}>
                    <td>{p.period}</td>
                    <td>₹{p.premium}</td>
                    <td><span className={`status-badge ${p.status.toLowerCase()}`}>{p.status}</span></td>
                    <td>{p.claims}</td>
                    <td className={`payout-amount ${p.totalPayout > 0 ? 'active' : 'inactive'}`}>₹{p.totalPayout}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Password Verification Modal */}
        {showPasswordModal && (
          <div className="policy-modal-overlay">
            <div className="policy-modal confirm-modal">
              <div className="modal-header">
                <h3>Confirm Plan Change</h3>
                <button className="close-btn" onClick={() => setShowPasswordModal(false)}><X size={20} /></button>
              </div>
              <div className="modal-body">
                <div className="plan-change-warning">
                  <Lock size={24} />
                  <p>
                    You are switching to the <strong>{pendingPlan}</strong>. 
                    Please enter your password to authorize this coverage change.
                  </p>
                </div>
                <div className="prof-field" style={{ marginTop: 20 }}>
                  <div className="pf-label">Account Password</div>
                  <div className="password-input-wrap">
                    <Key size={16} className="input-icon" />
                    <input 
                      type="password" 
                      className="pf-input" 
                      placeholder="Enter password to confirm"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleConfirmPlanChange()}
                    />
                  </div>
                  {passwordError && <div className="error-text">{passwordError}</div>}
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn-cancel" onClick={() => setShowPasswordModal(false)}>Cancel</button>
                <button className="btn-confirm" onClick={handleConfirmPlanChange}>Confirm Change</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Policy;
