import React, { useState, useEffect } from 'react';
import {
  Shield, LayoutDashboard, FileText, AlertTriangle,
  CreditCard, Bell, User, LogOut, TrendingUp, CheckCircle2, CloudRain
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import Toast from '../../components/Toast/Toast';
import { useUser } from '../../context/UserContext';
import './Dashboard.css';

// Moved datasets to context to ensure user-specific data isolation

const Dashboard = () => {
  const { user, weatherData } = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);

  useEffect(() => {
    // Show success toast if we came from OTP verification
    if (location.state?.loginSuccess) {
      setToast({ message: 'You have logged into your account.', type: 'success' });
      
      // Clear location state to prevent toast on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  return (
    <div className="dashboard-layout">
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}
      <Sidebar activePage="dashboard" />

      {/* Main Content */}
      <main className="main-content">
        <header className="main-header">
          <h1>Welcome back, {user.firstName}!</h1>
          <p>Here's your insurance overview for this week</p>
        </header>

        {/* Alert Banner - Dynamic based on risk */}
        {user.riskProfile?.score > 60 && (
          <div className="alert-banner">
            <AlertTriangle className="alert-icon" size={24} />
            <div className="alert-content">
              <h3>Weather Alert: {user.riskProfile.score > 80 ? 'Heavy Rain' : 'Rain'} Warning</h3>
              <p>Considerable disruption predicted for {user.area} today. Your automated protection is active.</p>
            </div>
            <button className="view-details-btn" onClick={() => navigate('/alerts')}>View Details</button>
          </div>
        )}

        {/* Stats Row */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-header">
              <div className="icon-wrapper blue"><Shield size={20} /></div>
              <span className="badge green">Active</span>
            </div>
            <h2>₹{user.riskProfile?.coverage || '3,000'}</h2>
            <p>Active Coverage</p>
            <span className="trend green">↗ Valid until Mar 21</span>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <div className="icon-wrapper blue"><CloudRain size={20} /></div>
              <span className="badge teal">Live</span>
            </div>
            <h2>{weatherData.loading ? '--' : `${weatherData.temp}°C`}</h2>
            <p>{weatherData.loading ? 'Fetching...' : weatherData.condition}</p>
            <span className="trend blue">Current Temp in {user.area}</span>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <div className="icon-wrapper teal"><TrendingUp size={20} /></div>
              <span className="period">This week</span>
            </div>
            <h2>₹{user.earningsData?.reduce((acc, d) => acc + d.protected, 0).toLocaleString() || 0}</h2>
            <p>Income Protected</p>
            <span className="trend green">↗ Based on your shifts</span>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <div className="icon-wrapper green"><CheckCircle2 size={20} /></div>
              <span className="period">Last 30 days</span>
            </div>
            <h2>{user.claimsData?.filter(c => c.status === 'Paid').length || 0}</h2>
            <p>Claims Approved</p>
            <span className="sub-text">Total payout: ₹{user.claimsData?.reduce((acc, c) => acc + (c.status === 'Paid' ? c.amount : 0), 0).toLocaleString() || 0}</span>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <div className="icon-wrapper blue"><CloudRain size={20} /></div>
              <span className="period">Risk level</span>
            </div>
            <h2>{user.riskProfile?.level || 'Medium'}</h2>
            <p>Risk in {user.city}</p>
            <span className={`trend ${user.riskProfile?.level.includes('High') ? 'orange' : 'green'}`}>
              {user.riskProfile?.score}% risk score
            </span>
          </div>
        </div>

        {/* Charts Row */}
        <div className="charts-grid">
          <div className="chart-card">
            <div className="chart-header">
              <h3>Protected vs Actual Earnings</h3>
              <p>Last 7 days comparison</p>
            </div>
            <div className="chart-container">
              {user.earningsData?.length > 0 ? (
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={user.earningsData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Line type="monotone" dataKey="protected" stroke="#1d4ed8" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="actual" stroke="#2dd4bf" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="empty-chart-msg">Start working to see your protection stats!</div>
              )}
              <div className="chart-legend">
                <span className="legend-item"><span className="dot blue"></span>Protected Amount</span>
                <span className="legend-item"><span className="dot teal"></span>Actual Earnings</span>
              </div>
            </div>
          </div>

          <div className="chart-card">
            <div className="chart-header">
              <h3>Claims Trend</h3>
              <p>Monthly claim amounts (₹)</p>
            </div>
            <div className="chart-container">
              {user.claimsData?.length > 0 ? (
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={user.claimsData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Bar dataKey="amount" fill="#2dd4bf" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="empty-chart-msg">Your claims history will appear here.</div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="bottom-grid">
          <div className="recent-claims-card">
            <div className="card-header">
              <h3>Recent Claims</h3>
              <button className="text-link-btn" onClick={() => navigate('/claims')}>View all</button>
            </div>
            <div className="claims-list">
              {user.recentClaims?.length > 0 ? (
                user.recentClaims.map((claim, idx) => (
                  <div key={idx} className={`claim-item ${claim.status.toLowerCase()}`}>
                    <div className="claim-icon">
                      {claim.status === 'Paid' ? <CheckCircle2 size={20} /> : <div className="claim-icon dot"></div>}
                    </div>
                    <div className="claim-info">
                      <h4>{claim.title} - {claim.date}</h4>
                      <p>{claim.description}</p>
                    </div>
                    <div className="claim-amount">
                      <span className="amount">₹{claim.amount}</span>
                      <span className="status">{claim.status}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-claims-msg">No claims submitted yet.</div>
              )}
            </div>
          </div>

          <div className="quick-actions-card">
            <h3>Quick Actions</h3>
            <div className="actions-list">
              <button className="action-btn primary" onClick={() => navigate('/policy')}>
                <Shield size={20} />
                <span>Renew Weekly Policy</span>
                <span className="arrow">↗</span>
              </button>
              <button className="action-btn" onClick={() => navigate('/premium')}>
                <TrendingUp size={20} />
                <span>View Premium Calculation</span>
                <span className="arrow">↗</span>
              </button>
              <button className="action-btn" onClick={() => navigate('/alerts')}>
                <CloudRain size={20} />
                <span>Check Weather Alerts</span>
                <span className="arrow">↗</span>
              </button>
              <button className="action-btn outline" onClick={() => navigate('/payments')}>
                <CheckCircle2 size={20} />
                <span>Payment History</span>
                <span className="arrow">↗</span>
              </button>
            </div>

            <div className="coverage-status-box">
              <Shield size={20} className="shield-icon" />
              <div className="status-info">
                <h4>Your Coverage Status</h4>
                <p>Active until <strong>March 21, 2026</strong></p>
                <div className="status-details">
                  <span>Weekly Premium: ₹{user.riskProfile?.premium || 75}</span> • <span>Coverage: ₹{user.riskProfile?.coverage || '3,000'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
