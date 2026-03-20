import React, { useState } from 'react';
import { 
  Shield, LayoutDashboard, FileText, PieChart, AlertTriangle, 
  CreditCard, Bell, User, LogOut, TrendingUp, CheckCircle2, Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import PlanModal from './components/PlanModal';
import './Policy.css';

const Policy = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentPlan = {
    name: "Standard Shield",
    price: "₹75",
    coverage: "₹3,000",
    payout: "₹150",
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
          
          <h2 className="plan-name">Standard Shield</h2>
          <p className="plan-subtitle">Your weekly protection plan</p>

          <div className="coverage-details-grid">
            <div className="detail-item">
              <div className="detail-label">
                <span>₹</span> Weekly Premium
              </div>
              <div className="detail-value">₹75</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">
                <Shield size={16} /> Coverage Amount
              </div>
              <div className="detail-value">₹3,000</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">
                <Clock size={16} /> Per Hour Payout
              </div>
              <div className="detail-value">₹150</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">
                <AlertTriangle size={16} /> Valid Until
              </div>
              <div className="detail-value text-medium">Mar 21, 2026</div>
            </div>
          </div>

          <div className="coverage-actions">
            <button className="btn-renew">Renew Policy</button>
            <button className="btn-details">View Premium Details</button>
          </div>
        </section>

        {/* Available Plans */}
        <section className="available-plans-section">
          <h3 className="section-title">Available Plans</h3>
          <div className="plans-grid">
            
            <div className="plan-card">
              <div className="plan-header">
                <h4>Basic Protection</h4>
                <div className="price-tag">
                  <span className="amount">₹49</span><span className="period">/week</span>
                </div>
                <div className="risk-level">Risk Level: Low</div>
              </div>
              <div className="plan-limits">
                <div className="limit-row"><span>Coverage</span><span>₹2,000</span></div>
                <div className="limit-row"><span>Payout/Hour</span><span>₹100</span></div>
                <div className="limit-row"><span>Max Hours</span><span>20 hrs/week</span></div>
              </div>
              <ul className="plan-features">
                <li><CheckCircle2 size={16} className="text-teal" /> Weather protection</li>
                <li><CheckCircle2 size={16} className="text-teal" /> Basic fraud detection</li>
                <li><CheckCircle2 size={16} className="text-teal" /> Email support</li>
              </ul>
              <button className="btn-select">Select Plan</button>
            </div>

            <div className="plan-card recommended">
              <div className="recommended-badge">Recommended</div>
              <div className="plan-header mt-badge">
                <h4>Standard Shield</h4>
                <div className="price-tag">
                  <span className="amount">₹75</span><span className="period">/week</span>
                </div>
                <div className="risk-level">Risk Level: Medium</div>
              </div>
              <div className="plan-limits">
                <div className="limit-row"><span>Coverage</span><span>₹3,000</span></div>
                <div className="limit-row"><span>Payout/Hour</span><span>₹150</span></div>
                <div className="limit-row"><span>Max Hours</span><span>20 hrs/week</span></div>
              </div>
              <ul className="plan-features">
                <li><CheckCircle2 size={16} className="text-teal" /> All weather events</li>
                <li><CheckCircle2 size={16} className="text-teal" /> Pollution alerts</li>
                <li><CheckCircle2 size={16} className="text-teal" /> Advanced fraud detection</li>
                <li><CheckCircle2 size={16} className="text-teal" /> Priority support</li>
                <li><CheckCircle2 size={16} className="text-teal" /> Instant payouts</li>
              </ul>
              <button className="btn-current" onClick={() => setIsModalOpen(true)}>Current Plan</button>
            </div>

            <div className="plan-card">
              <div className="plan-header">
                <h4>Premium Guard</h4>
                <div className="price-tag">
                  <span className="amount">₹120</span><span className="period">/week</span>
                </div>
                <div className="risk-level">Risk Level: High</div>
              </div>
              <div className="plan-limits">
                <div className="limit-row"><span>Coverage</span><span>₹5,000</span></div>
                <div className="limit-row"><span>Payout/Hour</span><span>₹250</span></div>
                <div className="limit-row"><span>Max Hours</span><span>20 hrs/week</span></div>
              </div>
              <ul className="plan-features">
                <li><CheckCircle2 size={16} className="text-teal" /> Complete coverage</li>
                <li><CheckCircle2 size={16} className="text-teal" /> All disruptions</li>
                <li><CheckCircle2 size={16} className="text-teal" /> Premium fraud detection</li>
                <li><CheckCircle2 size={16} className="text-teal" /> 24/7 support</li>
                <li><CheckCircle2 size={16} className="text-teal" /> Instant payouts</li>
                <li><CheckCircle2 size={16} className="text-teal" /> Bonus protection</li>
              </ul>
              <button className="btn-select">Select Plan</button>
            </div>

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
                <tr>
                  <td>Mar 7 - Mar 14, 2026</td>
                  <td>₹75</td>
                  <td><span className="status-badge active">Active</span></td>
                  <td>2</td>
                  <td className="payout-amount active">₹900</td>
                </tr>
                <tr>
                  <td>Feb 28 - Mar 6, 2026</td>
                  <td>₹75</td>
                  <td><span className="status-badge completed">Completed</span></td>
                  <td>1</td>
                  <td className="payout-amount active">₹450</td>
                </tr>
                <tr>
                  <td>Feb 21 - Feb 27, 2026</td>
                  <td>₹75</td>
                  <td><span className="status-badge completed">Completed</span></td>
                  <td>0</td>
                  <td className="payout-amount inactive">₹0</td>
                </tr>
                <tr>
                  <td>Feb 14 - Feb 20, 2026</td>
                  <td>₹75</td>
                  <td><span className="status-badge completed">Completed</span></td>
                  <td>3</td>
                  <td className="payout-amount active">₹1350</td>
                </tr>
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
    </div>
  );
};

export default Policy;
