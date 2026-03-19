import React from 'react';
import {
  Shield, LayoutDashboard, FileText, AlertTriangle,
  CreditCard, Bell, User, LogOut, TrendingUp,
  CheckCircle2, Clock, Smartphone, ArrowDownLeft, ArrowUpRight
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  ResponsiveContainer, Tooltip, Legend
} from 'recharts';
import { Link } from 'react-router-dom';
import './Payments.css';

const cashflowData = [
  { month: 'Oct', payouts: 750, premiums: -75 },
  { month: 'Nov', payouts: 1300, premiums: -75 },
  { month: 'Dec', payouts: 500, premiums: -75 },
  { month: 'Jan', payouts: 900, premiums: -150 },
  { month: 'Feb', payouts: 1350, premiums: -150 },
  { month: 'Mar', payouts: 1350, premiums: -150 },
];

const transactions = [
  { date: 'March 13, 2026', txn: 'TXN-20260313-8945', type: 'Claim Payout', details: 'CLM-2026-0312', method: 'UPI', amount: '+₹900', isCredit: true },
  { date: 'March 7, 2026', txn: 'TXN-20260307-4521', type: 'Premium Payment', details: 'Mar 7 – Mar 14', method: 'Card', amount: '₹75', isCredit: false },
  { date: 'March 6, 2026', txn: 'TXN-20260306-7832', type: 'Claim Payout', details: 'CLM-2026-0305', method: 'UPI', amount: '+₹450', isCredit: true },
  { date: 'February 28, 2026', txn: 'TXN-20260228-3214', type: 'Premium Payment', details: 'Feb 28 – Mar 6', method: 'UPI', amount: '₹75', isCredit: false },
  { date: 'February 25, 2026', txn: 'TXN-20260225-9876', type: 'Claim Payout', details: 'CLM-2026-0224', method: 'UPI', amount: '+₹750', isCredit: true },
  { date: 'February 21, 2026', txn: 'TXN-20260221-5432', type: 'Premium Payment', details: 'Feb 21 – Feb 27', method: 'Card', amount: '₹75', isCredit: false },
];

const Payments = () => {
  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <Shield size={24} /><span>DeliveryShield</span>
        </div>
        <div className="user-profile">
          <div className="avatar">RK</div>
          <div className="user-info">
            <span className="user-name">Rahul Kumar</span>
            <span className="user-role">Zomato Partner</span>
          </div>
        </div>
        <nav className="sidebar-nav">
          <Link to="/dashboard" className="nav-item"><LayoutDashboard size={20} /><span>Dashboard</span></Link>
          <Link to="/policy" className="nav-item"><Shield size={20} /><span>My Policy</span></Link>
          <Link to="/premium" className="nav-item"><TrendingUp size={20} /><span>Premium Details</span></Link>
          <Link to="/claims" className="nav-item"><FileText size={20} /><span>Claims</span></Link>
          <Link to="/payments" className="nav-item active"><CreditCard size={20} /><span>Payments</span></Link>
          <Link to="/alerts" className="nav-item"><Bell size={20} /><span>Alerts</span></Link>
          <a href="/" className="nav-item"><User size={20} /><span>Profile</span></a>
        </nav>
        <a href="/login" className="logout-btn"><LogOut size={20} /><span>Logout</span></a>
      </aside>

      {/* Main */}
      <main className="main-content">
        <header className="main-header">
          <h1>Payments &amp; Payouts</h1>
          <p>Track your insurance payments and <span className="pay-highlight">claim payouts</span></p>
        </header>

        {/* Stat Cards */}
        <div className="stats-grid" style={{ marginBottom: 24 }}>
          <div className="stat-card">
            <div className="stat-header">
              <div className="icon-wrapper teal"><ArrowDownLeft size={20} /></div>
            </div>
            <h2>₹2,100</h2>
            <p>Total Payouts</p>
            <span className="sub-text">All time</span>
          </div>
          <div className="stat-card">
            <div className="stat-header">
              <div className="icon-wrapper red"><ArrowUpRight size={20} /></div>
            </div>
            <h2>₹225</h2>
            <p>Total Premiums</p>
            <span className="sub-text">All time</span>
          </div>
          <div className="stat-card">
            <div className="stat-header">
              <div className="icon-wrapper green"><TrendingUp size={20} /></div>
            </div>
            <h2 className="net-gain">+₹1875</h2>
            <p>Net Gain</p>
            <span className="sub-text green-text">Positive ROI</span>
          </div>
          <div className="stat-card">
            <div className="stat-header">
              <div className="icon-wrapper blue"><CreditCard size={20} /></div>
            </div>
            <h2>₹900</h2>
            <p>Last Payout</p>
            <span className="sub-text">March 13, 2026</span>
          </div>
        </div>

        {/* Cashflow Chart */}
        <div className="pay-card" style={{ marginBottom: 24 }}>
          <div className="pay-card-header">
            <h3>Cashflow Analysis</h3>
            <p>Payouts vs Premiums over time</p>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={cashflowData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="payoutsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2dd4bf" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#2dd4bf" stopOpacity={0.05} />
                </linearGradient>
                <linearGradient id="premiumsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f87171" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#f87171" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <Tooltip formatter={(val) => `₹${Math.abs(val)}`} />
              <Legend
                iconType="circle"
                iconSize={8}
                formatter={(val) => val === 'payouts' ? 'Payouts Received' : 'Premiums Paid'}
              />
              <Area type="monotone" dataKey="payouts" stroke="#2dd4bf" strokeWidth={2} fill="url(#payoutsGrad)" name="payouts" />
              <Area type="monotone" dataKey="premiums" stroke="#f87171" strokeWidth={2} fill="url(#premiumsGrad)" name="premiums" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Payment Methods + Instant Payout Status */}
        <div className="pay-methods-grid" style={{ marginBottom: 24 }}>
          {/* Payment Methods */}
          <div className="pay-card">
            <h3 className="pay-section-title">Payment Methods</h3>
            <div className="method-item primary-method">
              <Smartphone size={18} className="method-icon" />
              <div className="method-info">
                <div className="method-name">UPI</div>
                <div className="method-sub">rahul@paytm</div>
              </div>
              <span className="method-badge primary">Primary</span>
            </div>
            <div className="method-item">
              <CreditCard size={18} className="method-icon" />
              <div className="method-info">
                <div className="method-name">Credit Card</div>
                <div className="method-sub">•••• •••• •••• 4532</div>
              </div>
              <button className="method-edit">Edit</button>
            </div>
            <button className="add-method-btn">+ Add Payment Method</button>
          </div>

          {/* Instant Payout Status */}
          <div className="instant-payout-card">
            <div className="instant-header">
              <span className="instant-title">Instant Payout Status</span>
              <CheckCircle2 size={20} className="instant-check" />
            </div>
            <div className="instant-stat">
              <div className="is-label">Average Payout Time</div>
              <div className="is-value">12 hours</div>
            </div>
            <div className="instant-stat">
              <div className="is-label">Fastest Payout</div>
              <div className="is-value">6 hours</div>
            </div>
            <div className="instant-stat next-due">
              <div className="is-label">Next Premium Due</div>
              <div className="is-value large">March 21, 2026</div>
              <div className="is-sub">₹75 will be auto-debited</div>
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <div className="pay-card" style={{ marginBottom: 24 }}>
          <h3 className="pay-section-title">Transaction History</h3>
          <div className="txn-table-wrapper">
            <table className="txn-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Details</th>
                  <th>Method</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((t, i) => (
                  <tr key={i}>
                    <td>
                      <div className="txn-date">{t.date}</div>
                      <div className="txn-id">{t.txn}</div>
                    </td>
                    <td>
                      <span className={`txn-type ${t.isCredit ? 'credit' : 'debit'}`}>
                        {t.isCredit
                          ? <ArrowDownLeft size={13} />
                          : <ArrowUpRight size={13} />}
                        {t.type}
                      </span>
                    </td>
                    <td className="txn-details">{t.details}</td>
                    <td>
                      <span className="txn-method">
                        {t.method === 'UPI' ? <Smartphone size={13} /> : <CreditCard size={13} />}
                        {t.method}
                      </span>
                    </td>
                    <td className={`txn-amount ${t.isCredit ? 'credit' : 'debit'}`}>{t.amount}</td>
                    <td>
                      <span className="txn-status completed">
                        <CheckCircle2 size={12} /> Completed
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* How Instant Payouts Work */}
        <div className="how-payouts-card" style={{ marginBottom: 40 }}>
          <div className="how-icon"><Clock size={20} /></div>
          <div>
            <h4>How Instant Payouts Work</h4>
            <ul>
              <li>Claims are triggered automatically when disruptions are detected</li>
              <li>AI verifies your location and working hours using GPS data</li>
              <li>Payouts are processed within 6–18 hours directly to your UPI/Bank account</li>
              <li>No manual claim filing required – completely automated</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Payments;
