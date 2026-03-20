import React, { useState } from 'react';
import { 
  Shield, LayoutDashboard, FileText, AlertTriangle, 
  CreditCard, Bell, User, LogOut, TrendingUp, CheckCircle2, Clock, Lock
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import PlanModal from './components/PlanModal';
import Toast from '../../components/Toast/Toast';
import { useUser } from '../../context/UserContext';
import './Policy.css';

const Policy = () => {
  const { user, updateUser } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [inputPassword, setInputPassword] = useState('');
  const [pendingPlan, setPendingPlan] = useState(null);
  const navigate = useNavigate();

  const handleRenew = () => {
    setToast({ 
      message: 'Policy successfully renewed! Your coverage has been extended until March 28, 2026.', 
      type: 'success' 
    });
  };

  const handleSelectPlan = (plan) => {
    setPendingPlan(plan);
    setShowPasswordPrompt(true);
    setInputPassword('');
  };

  const confirmPlanChange = () => {
    const isDemo = user.email === 'CloudZen@gmail.com';
    const isPasswordCorrect = isDemo 
      ? inputPassword === 'CloudZen123' 
      : (user.password && inputPassword === user.password);

    if (isPasswordCorrect) {
      updateUser({
        riskProfile: {
          ...user.riskProfile,
          level: pendingPlan.level,
          score: pendingPlan.score,
          premium: pendingPlan.premium,
          coverage: pendingPlan.coverage,
          payout: pendingPlan.payout,
          name: pendingPlan.name
        },
        currentPremium: pendingPlan.premium,
        isManualPlan: true
      });
      setToast({ message: `Successfully switched to ${pendingPlan.name}!`, type: 'success' });
      setShowPasswordPrompt(false);
    } else {
      alert('Incorrect password. Please try again.');
    }
  };

  const currentPlan = {
    name: user.riskProfile?.name || "Standard Shield",
    price: `₹${user.riskProfile?.premium || 75}`,
    coverage: `₹${user.riskProfile?.coverage || '3,000'}`,
    payout: `₹${user.riskProfile?.payout || '150'}`,
    maxHours: "20 hrs/week",
    renewalDate: "Mar 21, 2026",
    benefits: [
      "All weather events covered",
      "Pollution alerts up to 500 AQI",
      "Advanced AI fraud detection",
      "Priority 24/7 support",
      "Instant automated payouts"
    ]
  };

  const availablePlans = [
    { name: "Basic Protection", premium: 49, coverage: "2,000", payout: "100", level: "Low", score: 35 },
    { name: "Standard Shield", premium: 75, coverage: "3,000", payout: "150", level: "Medium", score: 60 },
    { name: "Premium Guard", premium: 120, coverage: "5,000", payout: "250", level: "High", score: 85 }
  ];

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
              <div className="detail-value">{currentPlan.price}</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">
                <Shield size={16} /> Coverage Amount
              </div>
              <div className="detail-value">{currentPlan.coverage}</div>
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

          <div className="coverage-actions">
            <button className="btn-renew" onClick={handleRenew}>Renew Policy</button>
            <button className="btn-details" onClick={() => navigate('/premium')}>View Premium Details</button>
          </div>
        </section>

        {toast && (
          <Toast 
            message={toast.message} 
            type={toast.type} 
            onClose={() => setToast(null)} 
          />
        )}

        {/* Available Plans */}
        <section className="available-plans-section">
          <h3 className="section-title">Available Plans</h3>
          <div className="plans-grid">
            {availablePlans.map((plan, index) => {
              const isCurrent = plan.name === currentPlan.name;
              return (
                <div key={index} className={`plan-card ${index === 1 ? 'recommended' : ''} ${isCurrent ? 'current-plan-card' : ''}`}>
                  {index === 1 && <div className="recommended-badge">Recommended</div>}
                  <div className={`plan-header ${index === 1 ? 'mt-badge' : ''}`}>
                    <h4>{plan.name}</h4>
                    <div className="price-tag">
                      <span className="amount">₹{plan.premium}</span><span className="period">/week</span>
                    </div>
                    <div className="risk-level">Risk Level: {plan.level}</div>
                  </div>
                  <div className="plan-limits">
                    <div className="limit-row"><span>Coverage</span><span>₹{plan.coverage}</span></div>
                    <div className="limit-row"><span>Payout/Hour</span><span>₹{plan.payout}</span></div>
                    <div className="limit-row"><span>Max Hours</span><span>20 hrs/week</span></div>
                  </div>
                  <ul className="plan-features">
                    <li><CheckCircle2 size={16} className="text-teal" /> {index === 0 ? 'Weather protection' : index === 1 ? 'All weather events' : 'Complete coverage'}</li>
                    <li><CheckCircle2 size={16} className="text-teal" /> {index === 0 ? 'Basic fraud detection' : index === 1 ? 'Pollution alerts' : 'All disruptions'}</li>
                    <li><CheckCircle2 size={16} className="text-teal" /> {index === 2 ? 'Premium fraud detection' : 'Advanced fraud detection'}</li>
                    {index > 0 && <li><CheckCircle2 size={16} className="text-teal" /> Priority support</li>}
                    {index > 0 && <li><CheckCircle2 size={16} className="text-teal" /> Instant payouts</li>}
                    {index === 2 && <li><CheckCircle2 size={16} className="text-teal" /> Bonus protection</li>}
                  </ul>
                  {isCurrent ? (
                    <button className="btn-current" onClick={() => setIsModalOpen(true)}>Current Plan</button>
                  ) : (
                    <button className="btn-select" onClick={() => handleSelectPlan(plan)}>Select Plan</button>
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
                {user.transactions?.filter(t => t.type === 'Premium Payment').length > 0 ? (
                  user.transactions.filter(t => t.type === 'Premium Payment').map((t, i) => (
                    <tr key={i}>
                      <td>{t.details}</td>
                      <td>{t.amount} ({user.riskProfile?.name || 'Standard Shield'})</td>
                      <td><span className="status-badge completed">Completed</span></td>
                      <td>{Math.floor(Math.random() * 3)}</td>
                      <td className="payout-amount active">₹{Math.floor(Math.random() * 1000)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="empty-table-msg">No policy history found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

      </main>

      {/* Plan Modal */}
      <PlanModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        planData={currentPlan}
      />

      {/* Password Verification Overlay */}
      {showPasswordPrompt && (
        <div className="password-overlay">
          <div className="password-card">
            <Lock size={32} className="password-icon" />
            <h3>Verify Identity</h3>
            <p>Enter your password to authorize plan change to <strong>{pendingPlan?.name}</strong>.</p>
            <input 
              type="password" 
              placeholder="Enter password" 
              value={inputPassword} 
              onChange={(e) => setInputPassword(e.target.value)}
              className="password-input"
              autoFocus
              onKeyDown={(e) => e.key === 'Enter' && confirmPlanChange()}
            />
            <div className="password-actions">
              <button className="confirm-btn" onClick={confirmPlanChange}>Confirm Change</button>
              <button className="cancel-btn" onClick={() => setShowPasswordPrompt(false)}>Cancel</button>
            </div>
            {user.email === 'CloudZen@gmail.com' && (
              <p className="password-hint">Demo Password: <code>CloudZen123</code></p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Policy;
