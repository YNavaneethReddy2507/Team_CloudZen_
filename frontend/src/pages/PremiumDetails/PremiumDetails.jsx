import React from 'react';
import {
  Shield, LayoutDashboard, FileText, AlertTriangle,
  CreditCard, Bell, User, LogOut, TrendingUp, CloudRain, MapPin
} from 'lucide-react';
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip
} from 'recharts';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import { useUser } from '../../context/UserContext';
import './PremiumDetails.css';

const pieData = [
  { name: 'Base Premium', value: 40, color: '#1a4f78' },
  { name: 'Weather Adjustment', value: 15, color: '#2dd4bf' },
  { name: 'Zone Risk', value: 12, color: '#a78bfa' },
  { name: 'Pollution Factor', value: 8, color: '#1d4ed8' },
];

const riskFactors = [
  { label: 'Weather Risk', value: 65, color: '#1a4f78', desc: 'Based on historical rainfall and weather patterns' },
  { label: 'Zone Safety', value: 75, color: '#2dd4bf', desc: 'Area traffic and disruption history' },
  { label: 'Pollution Index', value: 45, color: '#1d4ed8', desc: 'Average AQI levels in your zone' },
  { label: 'Traffic Disruption', value: 55, color: '#a78bfa', desc: 'Historical traffic congestion data' },
];

const zones = [
  { name: 'South Mumbai', level: 'Low Risk', pct: 35, color: '#f0fdf4', border: '#86efac', dot: '#22c55e', badge: '' },
  { name: 'Andheri East', level: 'Medium', pct: 60, color: '#fffbeb', border: '#fde68a', dot: '#f59e0b', badge: 'Your Zone', current: true },
  { name: 'Kurla', level: 'High Risk', pct: 85, color: '#fef2f2', border: '#fca5a5', dot: '#ef4444', badge: '' },
  { name: 'Bandra', level: 'Medium', pct: 55, color: '#fffbeb', border: '#fde68a', dot: '#f59e0b', badge: '' },
];

const weeks = [
  { label: 'Week 1', amount: 72, change: null },
  { label: 'Week 2', amount: 75, change: '+₹3' },
  { label: 'Week 3', amount: 73, change: '+₹2' },
  { label: 'Week 4', amount: 75, change: '+₹2' },
];

const RADIAN = Math.PI / 180;
const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight={600}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const PremiumDetails = () => {
  const { user } = useUser();
  const risk = user.riskProfile || { level: 'Medium', score: 60, premium: 75, riskFactors: { weather: 65, safety: 75, pollution: 45, traffic: 55 } };

  const dynamicPieData = [
    { name: 'Base Premium', value: 40, color: '#1a4f78' },
    { name: 'Weather Adjustment', value: Math.round(risk.premium * 0.2), color: '#2dd4bf' },
    { name: 'Zone Risk', value: Math.round(risk.premium * 0.16), color: '#a78bfa' },
    { name: 'Pollution Factor', value: Math.round(risk.premium * 0.1), color: '#1d4ed8' },
  ];

  const dynamicRiskFactors = [
    { label: 'Weather Risk', value: risk.riskFactors.weather, color: '#1a4f78', desc: 'Based on historical rainfall and weather patterns' },
    { label: 'Zone Safety', value: risk.riskFactors.safety, color: '#2dd4bf', desc: 'Area traffic and disruption history' },
    { label: 'Pollution Index', value: risk.riskFactors.pollution, color: '#1d4ed8', desc: 'Average AQI levels in your zone' },
    { label: 'Traffic Disruption', value: risk.riskFactors.traffic, color: '#a78bfa', desc: 'Historical traffic congestion data' },
  ];

  const totalPremium = user.currentPremium || 75;

  return (
    <div className="dashboard-layout">
      <Sidebar activePage="premium" />

      {/* Main Content */}
      <main className="main-content">
        <header className="main-header">
          <h1>AI Premium Calculation</h1>
          <p>Your personalized premium based on <span className="highlight-link">intelligent risk assessment</span></p>
        </header>

        {/* Premium Summary Card */}
        <div className="premium-summary-card">
          <div className="premium-summary-grid">
            <div className="premium-metric">
              <div className="metric-icon-label">
                <Shield size={16} />
                <span className="metric-label">Base Premium</span>
              </div>
              <div className="metric-value">₹40</div>
              <div className="metric-sub">Standard weekly rate</div>
            </div>
            <div className="premium-metric">
              <div className="metric-icon-label">
                <TrendingUp size={16} />
                <span className="metric-label">Risk Adjustment</span>
              </div>
              <div className="metric-value">+₹35</div>
              <div className="metric-sub">Based on AI analysis</div>
            </div>
            <div className="premium-metric">
              <div className="metric-icon-label">
                <TrendingUp size={16} />
                <span className="metric-label">Final Premium</span>
              </div>
              <div className="metric-value">₹{user.currentPremium || 75}</div>
              <div className="metric-sub">Your weekly payment</div>
            </div>
          </div>
          <div className="coverage-row">
            <span className="coverage-label-text">Coverage Amount</span>
            <span className="coverage-value-text">₹3,000</span>
          </div>
        </div>

        {/* Risk Score + Pie Grid */}
        <div className="premium-charts-grid">
          {/* Risk Score Gauge */}
          <div className="pd-card">
            <h3>Overall Risk Score</h3>
            <div className="gauge-wrapper">
              <svg viewBox="0 0 200 120" className="gauge-svg">
                {/* Background arc */}
                <path
                  d="M 20 100 A 80 80 0 0 1 180 100"
                  fill="none"
                  stroke="#e2e8f0"
                  strokeWidth="16"
                  strokeLinecap="round"
                />
                {/* Filled arc — 60/100 = 60% of 180deg */}
                <path
                  d="M 20 100 A 80 80 0 0 1 180 100"
                  fill="none"
                  stroke="url(#gaugeGrad)"
                  strokeWidth="16"
                  strokeLinecap="round"
                  strokeDasharray="251.2"
                  strokeDashoffset={251.2 * (1 - 0.6)}
                />
                <defs>
                  <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#1a4f78" />
                    <stop offset="100%" stopColor="#2dd4bf" />
                  </linearGradient>
                </defs>
                <text x="100" y="90" textAnchor="middle" fontSize="28" fontWeight="700" fill="#0f172a">{risk.score}</text>
                <text x="100" y="108" textAnchor="middle" fontSize="11" fill="#64748b">Risk Score</text>
              </svg>
            </div>
            <div className="risk-badge-row">
              <span className={`risk-badge ${risk.level.toLowerCase().includes('high') ? 'high' : risk.level.toLowerCase().includes('low') ? 'low' : 'medium'}`}>
                {risk.level} Zone
              </span>
            </div>
            <div className="risk-location">
              <MapPin size={14} />
              <span>{user.city} - {user.area}</span>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="pd-card">
            <h3>Premium Breakdown</h3>
            <div className="pie-wrapper">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    innerRadius={0}
                    dataKey="value"
                    labelLine={false}
                    label={renderCustomLabel}
                  >
                    {pieData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(val) => `₹${val}`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="pie-legend">
              {pieData.map((item, i) => (
                <div key={i} className="pie-legend-row">
                  <span className="pie-dot" style={{ background: item.color }} />
                  <span className="pie-legend-name">{item.name}</span>
                  <span className="pie-legend-val">₹{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Risk Factors */}
        <div className="pd-card" style={{ marginBottom: 24 }}>
          <h3>Risk Factors Analysis</h3>
          <div className="risk-factors-grid">
            {riskFactors.map((f, i) => (
              <div key={i} className="risk-factor-item">
                <div className="rf-header">
                  <span className="rf-label">{f.label}</span>
                  <span className="rf-pct" style={{ color: f.color }}>{f.value}%</span>
                </div>
                <div className="rf-bar-bg">
                  <div className="rf-bar-fill" style={{ width: `${f.value}%`, background: f.color }} />
                </div>
                <div className="rf-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Zone Heatmap */}
        <div className="pd-card" style={{ marginBottom: 24 }}>
          <h3>Zone Risk Heatmap</h3>
          <div className="zone-grid">
            {zones.map((z, i) => (
              <div key={i} className="zone-card" style={{ background: z.color, borderColor: z.border }}>
                <div className="zone-icon" style={{ color: z.dot }}>
                  <MapPin size={28} />
                </div>
                <div className="zone-name">{z.name}</div>
                <div className="zone-level">{z.level} · {z.pct}%</div>
                {z.badge && <div className="zone-badge">{z.badge}</div>}
              </div>
            ))}
          </div>
        </div>

        {/* AI Insight Cards */}
        <div className="insight-grid" style={{ marginBottom: 24 }}>
          <div className="insight-card blue-tint">
            <div className="insight-header">
              <CloudRain size={20} className="insight-icon blue" />
              <span className="insight-title">Weather Prediction</span>
            </div>
            <p className="insight-body">
              Our AI predicts <strong>65% chance of heavy rainfall</strong> in your zone next week, which may trigger automatic claims.
            </p>
            <div className="insight-meta">Updated 2 hours ago</div>
          </div>
          <div className="insight-card purple-tint">
            <div className="insight-header">
              <TrendingUp size={20} className="insight-icon purple" />
              <span className="insight-title">Premium Optimization</span>
            </div>
            <p className="insight-body">
              Your premium is optimized based on real-time data. Switching to a different zone could reduce your premium by <strong>₹10–15/week</strong>.
            </p>
            <div className="insight-meta ai-tag">AI Recommendation</div>
          </div>
        </div>

        {/* Premium Trend */}
        <div className="pd-card" style={{ marginBottom: 24 }}>
          <h3>Premium Trend (Last 4 Weeks)</h3>
          <div className="trend-weeks-grid">
            {weeks.map((w, i) => (
              <div key={i} className="trend-week-card">
                <div className="tw-label">{w.label}</div>
                <div className="tw-amount">₹{w.amount}</div>
                {w.change && <div className="tw-change">{w.change}</div>}
              </div>
            ))}
          </div>
        </div>

        {/* How is your premium calculated */}
        <div className="pd-card" style={{ marginBottom: 40 }}>
          <h3>How is your premium calculated?</h3>
          <div className="calc-steps">
            <div className="calc-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <div className="step-title">AI analyzes your zone</div>
                <div className="step-desc">Historical weather, traffic, and pollution data for your delivery area</div>
              </div>
            </div>
            <div className="calc-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <div className="step-title">Risk factors are weighted</div>
                <div className="step-desc">Each risk factor contributes to your personalized premium calculation</div>
              </div>
            </div>
            <div className="calc-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <div className="step-title">Dynamic adjustment</div>
                <div className="step-desc">Your premium updates weekly based on changing conditions</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PremiumDetails;
