import React from 'react';
import {
  Shield, LayoutDashboard, FileText, AlertTriangle,
  CreditCard, Bell, User, LogOut, TrendingUp,
  CloudRain, Wind, Clock, CheckCircle2, XCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import './Claims.css';

const claimsData = [
  {
    id: 'CLM-2026-0312',
    type: 'Heavy Rainfall',
    date: 'March 12, 2026',
    amount: 900,
    status: 'Paid',
    duration: '6 hours',
    triggerTime: '2:00 PM - 8:00 PM',
    description: 'Rainfall exceeded 65mm/hour threshold. Automatic claim triggered.',
    paidOn: 'Paid on March 13, 2026 9:15 AM',
    icon: 'rain',
  },
  {
    id: 'CLM-2026-0310',
    type: 'Pollution Alert',
    date: 'March 10, 2026',
    amount: 450,
    status: 'Processing',
    duration: '4 hours',
    triggerTime: '10:00 AM - 2:00 PM',
    description: 'AQI exceeded 350 (hazardous level). Claim under verification.',
    paidOn: null,
    icon: 'wind',
  },
  {
    id: 'CLM-2026-0305',
    type: 'Heavy Rainfall',
    date: 'March 5, 2026',
    amount: 450,
    status: 'Paid',
    duration: '3 hours',
    triggerTime: '4:00 PM - 7:00 PM',
    description: 'Rainfall exceeded threshold. Payout processed successfully.',
    paidOn: 'Paid on March 6, 2026 11:30 AM',
    icon: 'rain',
  },
  {
    id: 'CLM-2026-0228',
    type: 'Traffic Disruption',
    date: 'February 28, 2026',
    amount: 0,
    status: 'Rejected',
    duration: '2 hours',
    triggerTime: '6:00 PM - 8:00 PM',
    description: 'Disruption duration below minimum threshold of 3 hours.',
    paidOn: null,
    icon: 'alert',
  },
  {
    id: 'CLM-2026-0224',
    type: 'Heavy Rainfall',
    date: 'February 24, 2026',
    amount: 750,
    status: 'Paid',
    duration: '5 hours',
    triggerTime: '1:00 PM - 6:00 PM',
    description: 'Severe weather event. Automatic payout completed.',
    paidOn: 'Paid on February 25, 2026 8:45 AM',
    icon: 'rain',
  },
];

const ClaimIcon = ({ type }) => {
  if (type === 'rain') return <div className="claim-type-icon rain"><CloudRain size={22} /></div>;
  if (type === 'wind') return <div className="claim-type-icon wind"><Wind size={22} /></div>;
  return <div className="claim-type-icon alert"><AlertTriangle size={22} /></div>;
};

const StatusBadge = ({ status }) => {
  const cls = status === 'Paid' ? 'paid' : status === 'Processing' ? 'processing' : 'rejected';
  return <span className={`claim-status-badge ${cls}`}>{status}</span>;
};

const Claims = () => {
  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <Shield size={24} />
          <span>DeliveryShield</span>
        </div>

        <div className="user-profile">
          <div className="avatar">RK</div>
          <div className="user-info">
            <span className="user-name">Rahul Kumar</span>
            <span className="user-role">Zomato Partner</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <Link to="/dashboard" className="nav-item">
            <LayoutDashboard size={20} /><span>Dashboard</span>
          </Link>
          <Link to="/policy" className="nav-item">
            <Shield size={20} /><span>My Policy</span>
          </Link>
          <Link to="/premium" className="nav-item">
            <TrendingUp size={20} /><span>Premium Details</span>
          </Link>
          <Link to="/claims" className="nav-item active">
            <FileText size={20} /><span>Claims</span>
          </Link>
          <a href="/" className="nav-item">
            <CreditCard size={20} /><span>Payments</span>
          </a>
          <Link to="/alerts" className="nav-item">
            <Bell size={20} /><span>Alerts</span>
          </Link>
          <a href="/" className="nav-item">
            <User size={20} /><span>Profile</span>
          </a>
        </nav>

        <a href="/login" className="logout-btn">
          <LogOut size={20} /><span>Logout</span>
        </a>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="main-header">
          <h1>Claims History</h1>
          <p>Track your <span className="claims-highlight">automatic claim triggers</span> and payouts</p>
        </header>

        {/* Stats */}
        <div className="stats-grid" style={{ marginBottom: 24 }}>
          <div className="stat-card">
            <div className="stat-header">
              <div className="icon-wrapper blue"><FileText size={20} /></div>
              <span className="period">Total Claims</span>
            </div>
            <h2>12</h2>
            <span className="trend green">↗ +3 this month</span>
          </div>
          <div className="stat-card">
            <div className="stat-header">
              <div className="icon-wrapper green"><CheckCircle2 size={20} /></div>
              <span className="period">Approved Claims</span>
            </div>
            <h2>9</h2>
            <span className="sub-text">75% approval rate</span>
          </div>
          <div className="stat-card">
            <div className="stat-header">
              <div className="icon-wrapper teal"><TrendingUp size={20} /></div>
              <span className="period">Total Payout</span>
            </div>
            <h2>₹4,050</h2>
            <span className="trend green">↗ +₹900 this week</span>
          </div>
          <div className="stat-card">
            <div className="stat-header">
              <div className="icon-wrapper blue"><Clock size={20} /></div>
              <span className="period">Avg Processing Time</span>
            </div>
            <h2>18 hrs</h2>
            <span className="claims-improvement">2 hrs improvement</span>
          </div>
        </div>

        {/* Automated Claim Process */}
        <div className="claims-process-card">
          <h3>Automated Claim Process</h3>
          <div className="process-steps">
            {[
              { num: 1, title: 'Disruption Detected', sub: 'AI monitors weather & environment' },
              { num: 2, title: 'Claim Triggered', sub: 'Automatic claim generation' },
              { num: 3, title: 'Verification', sub: 'GPS & fraud detection check' },
              { num: 4, title: 'Instant Payout', sub: 'Direct to your account' },
            ].map((step, i) => (
              <div key={i} className="process-step">
                <div className="process-num">{step.num}</div>
                <div>
                  <div className="process-title">{step.title}</div>
                  <div className="process-sub">{step.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* All Claims */}
        <h3 className="section-heading">All Claims</h3>
        <div className="claims-list-container">
          {claimsData.map((claim, i) => (
            <div key={i} className="claim-row">
              <div className="claim-row-top">
                <div className="claim-row-left">
                  <ClaimIcon type={claim.icon} />
                  <div>
                    <div className="claim-title">{claim.type}</div>
                    <div className="claim-meta">
                      <FileText size={12} /> {claim.id} &nbsp;&nbsp; {claim.date}
                    </div>
                  </div>
                </div>
                <div className="claim-row-right">
                  <div className="claim-amount-text">₹{claim.amount.toLocaleString()}</div>
                  <StatusBadge status={claim.status} />
                </div>
              </div>

              <div className="claim-row-details">
                <div className="claim-detail-col">
                  <div className="cd-label">Duration</div>
                  <div className="cd-value">{claim.duration}</div>
                </div>
                <div className="claim-detail-col">
                  <div className="cd-label">Trigger Time</div>
                  <div className="cd-value">{claim.triggerTime}</div>
                </div>
              </div>

              <div className="claim-description">{claim.description}</div>
              {claim.paidOn && (
                <div className="claim-paid-on">
                  <CheckCircle2 size={13} /> {claim.paidOn}
                </div>
              )}
              {claim.status === 'Rejected' && (
                <div className="claim-rejected-note">
                  <XCircle size={13} /> {claim.description}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Claim Eligibility Criteria */}
        <h3 className="section-heading" style={{ marginTop: 32 }}>Claim Eligibility Criteria</h3>
        <div className="eligibility-grid">
          <div className="eligibility-card">
            <div className="elig-header rain-header">
              <CloudRain size={18} /> <span>Heavy Rainfall</span>
            </div>
            <ul>
              <li>Rainfall ≥ 50mm per hour</li>
              <li>Minimum 3 hours duration</li>
              <li>Coverage: ₹150/hour</li>
            </ul>
          </div>
          <div className="eligibility-card">
            <div className="elig-header wind-header">
              <Wind size={18} /> <span>Pollution Alert</span>
            </div>
            <ul>
              <li>AQI ≥ 300 (Hazardous)</li>
              <li>Minimum 3 hours duration</li>
              <li>Coverage: ₹100/hour</li>
            </ul>
          </div>
          <div className="eligibility-card">
            <div className="elig-header alert-header">
              <AlertTriangle size={18} /> <span>Traffic Disruption</span>
            </div>
            <ul>
              <li>Major road closure</li>
              <li>Minimum 4 hours duration</li>
              <li>Coverage: ₹120/hour</li>
            </ul>
          </div>
          <div className="eligibility-card">
            <div className="elig-header curfew-header">
              <Clock size={18} /> <span>Curfews &amp; Lockdowns</span>
            </div>
            <ul>
              <li>Government-imposed restrictions</li>
              <li>Full day coverage</li>
              <li>Coverage: ₹200/hour</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Claims;
