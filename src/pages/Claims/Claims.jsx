import React from 'react';
import {
  Shield, LayoutDashboard, FileText, AlertTriangle,
  CreditCard, Bell, User, LogOut, TrendingUp,
  CloudRain, Wind, Clock, CheckCircle2, XCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import { useUser } from '../../context/UserContext';
import { claimsData } from '../../constants/mockData';
import './Claims.css';


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
  const { user, simulateClaim } = useUser();

  const handleDownloadCSV = () => {
    const headers = ['Claim ID', 'Type', 'Date', 'Amount (INR)', 'Status', 'Duration', 'Trigger Time'];
    const rows = (user.claims || []).map(c => [
      c.id, c.type, c.date, c.amount, c.status, c.duration, c.triggerTime
    ]);
    
    // Properly handle commas by wrapping in quotes
    const csvContent = [headers, ...rows]
      .map(row => row.map(val => `"${val}"`).join(','))
      .join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'CloudZen_Claims_History.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="dashboard-layout">
      <Sidebar activePage="claims" />

      {/* Main Content */}
      <main className="main-content">
        <header className="main-header flex-header">
          <div>
            <h1>Claims History</h1>
            <p>Track your <span className="claims-highlight">automatic claim triggers</span> and payouts</p>
          </div>
          <button className="simulate-btn" onClick={simulateClaim}>
            <AlertTriangle size={14} /> Simulate Disruption
          </button>
        </header>

        {/* Stats */}
        <div className="stats-grid" style={{ marginBottom: 24 }}>
          <div className="stat-card">
            <div className="stat-header">
              <div className="icon-wrapper blue"><FileText size={20} /></div>
              <span className="period">Total Claims</span>
            </div>
            <h2>{user.totalClaims}</h2>
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
        <div className="section-header-flex">
          <h3 className="section-heading">All Claims</h3>
          <button className="download-csv-btn-claims" onClick={handleDownloadCSV}>
            <FileText size={14} /> Download CSV
          </button>
        </div>
        <div className="claims-list-container">
          {(user.claims || []).length > 0 ? (
            (user.claims || []).map((claim, i) => (
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
                    <div className="claim-amount-text">₹{(claim.amount || 0).toLocaleString()}</div>
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
            ))
          ) : (
            <div className="empty-claims-state">
              <Shield size={40} className="empty-icon" />
              <h4>No claims triggered yet</h4>
              <p>Your automatic shield is active. Relax and focus on deliveries!</p>
            </div>
          )}
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
