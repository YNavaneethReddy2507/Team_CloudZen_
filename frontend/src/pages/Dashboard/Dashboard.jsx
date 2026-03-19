import React from 'react';
import {
  Shield, LayoutDashboard, FileText, PieChart, AlertTriangle,
  CreditCard, Bell, User, LogOut, TrendingUp, CheckCircle2, CloudRain
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import { useUser } from '../../context/UserContext';
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

  return (
    <div className="dashboard-layout">
      <Sidebar activePage="dashboard" />

      {/* Main Content */}
      <main className="main-content">
        <header className="main-header">
          <h1>Welcome back, {user.firstName}!</h1>
          <p>Here's your insurance overview for this week</p>
        </header>

        {/* Alert Banner */}
        <div className="alert-banner">
          <AlertTriangle className="alert-icon" size={24} />
          <div className="alert-content">
            <h3>Weather Alert: Heavy Rain Expected</h3>
            <p>Heavy rainfall predicted between 2 PM - 6 PM today. Your coverage is active and automatic payouts are enabled.</p>
          </div>
          <button className="view-details-btn">View Details</button>
        </div>

        {/* Stats Row */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-header">
              <div className="icon-wrapper blue"><Shield size={20} /></div>
              <span className="badge green">Active</span>
            </div>
            <h2>₹{(user.currentPremium || 75) * 40}</h2>
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
            <h2>₹18,450</h2>
            <p>Income Protected</p>
            <span className="trend green">↗ +12% from last week</span>
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
              <a href="/">View all</a>
            </div>
            <div className="claims-list">
              <div className="claim-item success">
                <div className="claim-icon"><CheckCircle2 size={20} /></div>
                <div className="claim-info">
                  <h4>Heavy Rain - Mar 12</h4>
                  <p>6 hours disruption</p>
                </div>
                <div className="claim-amount">
                  <span className="amount">₹900</span>
                  <span className="status">Paid</span>
                </div>
              </div>
              <div className="claim-item processing">
                <div className="claim-icon dot"></div>
                <div className="claim-info">
                  <h4>Pollution Alert - Mar 10</h4>
                  <p>4 hours disruption</p>
                </div>
                <div className="claim-amount">
                  <span className="amount">₹450</span>
                  <span className="status">Processing</span>
                </div>
              </div>
              <div className="claim-item eligibility">
                <div className="claim-icon"><CheckCircle2 size={20} color="#9ca3af" /></div>
                <div className="claim-info">
                  <h4>Traffic Disruption - Mar 8</h4>
                  <p>No claim triggered</p>
                </div>
                <div className="claim-amount">
                  <span className="amount">₹0</span>
                  <span className="status">Not eligible</span>
                </div>
              </div>
            </div>
          </div>

          <div className="quick-actions-card">
            <h3>Quick Actions</h3>
            <div className="actions-list">
              <button className="action-btn primary">
                <Shield size={20} />
                <span>Renew Weekly Policy</span>
                <span className="arrow">↗</span>
              </button>
              <button className="action-btn">
                <TrendingUp size={20} />
                <span>View Premium Calculation</span>
                <span className="arrow">↗</span>
              </button>
              <button className="action-btn">
                <CloudRain size={20} />
                <span>Check Weather Alerts</span>
                <span className="arrow">↗</span>
              </button>
              <button className="action-btn outline">
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
                  <span>Weekly Premium: ₹75</span> • <span>Coverage: ₹3,000</span>
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
