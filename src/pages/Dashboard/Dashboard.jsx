import React from 'react';
import {
  Shield, LayoutDashboard, FileText, PieChart, AlertTriangle,
  CreditCard, Bell, User, LogOut, TrendingUp, CheckCircle2, CloudRain, MapPin, XCircle, CheckCircle
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import { useUser } from '../../context/UserContext';
import { PLANS } from '../../constants/plans';
import './Dashboard.css';

const earningsData = [
  { name: 'Mon', protected: 2400, actual: 2400 },
  { name: 'Tue', protected: 2400, actual: 2200 },
  { name: 'Wed', protected: 2400, actual: 2700 },
  { name: 'Thu', protected: 2400, actual: 2500 },
  { name: 'Fri', protected: 2400, actual: 2600 },
  { name: 'Sat', protected: 3200, actual: 3000 },
  { name: 'Sun', protected: 3200, actual: 2900 },
];

const claimsData = [
  { name: 'Jan', amount: 300 },
  { name: 'Feb', amount: 600 },
  { name: 'Mar', amount: 450 },
  { name: 'Apr', amount: 800 },
  { name: 'May', amount: 650 },
  { name: 'Jun', amount: 900 },
];

const Dashboard = () => {
  const { user, weatherData } = useUser();
  const [showModal, setShowModal] = React.useState(false);
  const [modalType, setModalType] = React.useState('weather');
  const [renewed, setRenewed] = React.useState(false);

  const currentPlan = PLANS.find(p => p.name === (user.planName || 'Standard Shield')) || PLANS[1];

  const handleRenew = () => {
    setRenewed(true);
    setTimeout(() => setRenewed(false), 3000);
  };

  return (
    <div className="dashboard-layout">
      <Sidebar activePage="dashboard" />

      {/* Main Content */}
      <main className="main-content">
        <header className="main-header">
          <div className="header-text">
            <h1>Welcome back, {user.firstName}!</h1>
            <p>Here's your insurance overview for this week</p>
          </div>
          <div className="user-profile-header">
            <div className="user-info-header">
              <span className="user-name-header">{user.fullName}</span>
              <span className="user-plan-header">{user.planName}</span>
            </div>
            <div className="user-avatar-header">
              {user.profileImage ? (
                <img src={user.profileImage} alt="Profile" className="avatar-img-header" />
              ) : (
                user.avatarInitials
              )}
            </div>
          </div>
        </header>

        {/* Alert Banner */}
        <div className="alert-banner">
          <AlertTriangle className="alert-icon" size={24} />
          <div className="alert-content">
            <h3>Weather Alert: Heavy Rain Expected</h3>
            <p>Heavy rainfall predicted between 2 PM - 6 PM today. Your coverage is active and automatic payouts are enabled.</p>
          </div>
          <button className="view-details-btn" onClick={() => { setModalType('weather'); setShowModal(true); }}>
            View Details
          </button>
        </div>

        {/* Stats Row */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-header">
              <div className="icon-wrapper blue"><Shield size={20} /></div>
              <span className="badge green">Active</span>
            </div>
            <h2>₹{currentPlan.coverage.toLocaleString()}</h2>
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
            <span className="trend blue">In {user.area}</span>
          </div>

          {/* ... keeping others mostly same since they are aggregate or static for now ... */}
          <div className="stat-card">
            <div className="stat-header">
              <div className="icon-wrapper teal"><TrendingUp size={20} /></div>
              <span className="period">This week</span>
            </div>
            <h2>₹{(currentPlan.premium * 240).toLocaleString()}</h2>
            <p>Income Protected</p>
            <span className="trend green">↗ Based on current plan</span>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <div className="icon-wrapper green"><CheckCircle2 size={20} /></div>
              <span className="period">Last 30 days</span>
            </div>
            <h2>3</h2>
            <p>Claims Approved</p>
            <span className="sub-text">Total payout: ₹1,350</span>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <div className="icon-wrapper blue"><CloudRain size={20} /></div>
              <span className="period">Risk level</span>
            </div>
            <h2>{currentPlan.risk}</h2>
            <p>Plan Risk Level</p>
            <span className={`trend ${currentPlan.risk === 'High' ? 'orange' : 'green'}`}>
              {currentPlan.totalScore}% risk score
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
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={earningsData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Line type="monotone" dataKey="protected" stroke="#1d4ed8" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="actual" stroke="#2dd4bf" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
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
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={claimsData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Bar dataKey="amount" fill="#2dd4bf" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="bottom-grid">
          <div className="recent-claims-card">
            <div className="card-header">
              <h3>Recent Claims</h3>
              <Link to="/claims">View all</Link>
            </div>
            <div className="claims-list">
              {(user.claims || []).slice(0, 5).map((claim) => (
                <div key={claim.id} className={`claim-item ${claim.type}`}>
                  <div className="claim-icon">
                    {claim.type === 'success' ? <CheckCircle2 size={20} /> : claim.type === 'processing' ? <div className="claim-icon dot"></div> : <CheckCircle2 size={20} color="#9ca3af" />}
                  </div>
                  <div className="claim-info">
                    <h4>{claim.title}</h4>
                    <p>{claim.detail}</p>
                  </div>
                  <div className="claim-amount">
                    <span className="amount">₹{claim.amount}</span>
                    <span className="status">{claim.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="quick-actions-card">
            <h3>Quick Actions</h3>
            <div className="actions-list">
              <button className="action-btn primary" onClick={handleRenew}>
                <Shield size={20} />
                <span>Renew Weekly Policy</span>
                <span className="arrow">↗</span>
              </button>
              <Link to="/premium" className="action-btn">
                <TrendingUp size={20} />
                <span>View Premium Calculation</span>
                <span className="arrow">↗</span>
              </Link>
              <Link to="/alerts" className="action-btn">
                <CloudRain size={20} />
                <span>Check Weather Alerts</span>
                <span className="arrow">↗</span>
              </Link>
              <Link to="/payments" className="action-btn outline">
                <CheckCircle2 size={20} />
                <span>Payment History</span>
                <span className="arrow">↗</span>
              </Link>
            </div>

            <div className="coverage-status-box">
              <Shield size={20} className="shield-icon" />
              <div className="status-info">
                <h4>Your Coverage Status</h4>
                <p>Active until <strong>March 21, 2026</strong></p>
                <div className="status-details">
                  <span>Weekly Premium: ₹{currentPlan.premium}</span> • <span>Coverage: ₹{currentPlan.coverage.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Premium Details Modal (Mirrored from Alerts) */}
        {showModal && (
          <div className="alert-modal-overlay">
            <div className="alert-modal">
              <div className="modal-header">
                <h3>{modalType === 'weather' ? 'Meteorological Deep-Dive' : 'Air Quality Insights'}</h3>
                <button className="close-btn" onClick={() => setShowModal(false)}><XCircle size={24} /></button>
              </div>
              <div className="modal-body">
                <div className="location-context">
                  <MapPin size={16} /> <span>{user.area}, {user.city}</span>
                  <span className="live-status"><div className="pulse"></div> LIVE FROM MET DEPT</span>
                </div>

                <div className="metrics-grid-modal">
                  <div className="m-card">
                    <span className="m-label">Temperature</span>
                    <span className="m-value">{weatherData.temp}°C</span>
                  </div>
                  <div className="m-card">
                    <span className="m-label">Rainfall</span>
                    <span className="m-value">{weatherData.rainfall}mm</span>
                  </div>
                  <div className="m-card">
                    <span className="m-label">Wind Speed</span>
                    <span className="m-value">{weatherData.windSpeed} km/h</span>
                  </div>
                  <div className="m-card">
                    <span className="m-label">Humidity</span>
                    <span className="m-value">{weatherData.humidity}%</span>
                  </div>
                  <div className="m-card highlight">
                    <span className="m-label">US-AQI</span>
                    <span className="m-value">{weatherData.aqi}</span>
                  </div>
                  <div className="m-card highlight">
                    <span className="m-label">PM 2.5</span>
                    <span className="m-value">{weatherData.pm25} µg/m³</span>
                  </div>
                </div>

                <div className="impact-box">
                  <h4>Atmospheric Impact on Coverage</h4>
                  <p>
                    {modalType === 'weather'
                      ? 'Current rainfall levels are being monitored for automated claim triggers. No immediate action required.'
                      : 'Air quality levels are currently within safe operational limits for delivery shifts.'}
                  </p>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn-primary" onClick={() => setShowModal(false)}>Acknowledge Insight</button>
              </div>
            </div>
          </div>
        )}

        {/* Floating Icons Import for Modal (since they are used in the modal structure) */}
        {!showModal && <div style={{ display: 'none' }}><MapPin /></div>}

        {/* Renewal Success Toast (from Policy module style) */}
        {renewed && (
          <div className="renewal-success-toast">
            <div className="toast-content">
              <CheckCircle size={20} className="success-icon" />
              <span>Policy Renewed Successfully!</span>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default Dashboard;
