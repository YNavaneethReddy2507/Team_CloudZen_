import React from 'react';
import { 
  Shield, LayoutDashboard, FileText, AlertTriangle,
  CreditCard, Bell, User, LogOut, TrendingUp,
  CheckCircle2, Clock, Smartphone, ArrowDownLeft, ArrowUpRight, Building2,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  ResponsiveContainer, Tooltip, Legend
} from 'recharts';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import { transactions } from '../../constants/mockData';
import { useUser } from '../../context/UserContext';
import './Payments.css';

const cashflowData = [
  { month: 'Oct', payouts: 750, premiums: -75 },
  { month: 'Nov', payouts: 1300, premiums: -75 },
  { month: 'Dec', payouts: 500, premiums: -75 },
  { month: 'Jan', payouts: 900, premiums: -150 },
  { month: 'Feb', payouts: 1350, premiums: -150 },
  { month: 'Mar', payouts: 1350, premiums: -150 },
];

const handleDownloadCSV = () => {
  const headers = ['Date', 'Transaction ID', 'Type', 'Details', 'Method', 'Amount', 'Status'];
  const rows = transactions.map(t => [
    t.date,
    t.txn,
    t.type,
    t.details,
    t.method,
    t.amount.replace('₹', ''),
    'Completed'
  ]);
  
  // Properly handle commas by wrapping in quotes
  const csvContent = [headers, ...rows]
    .map(row => row.map(val => `"${val}"`).join(','))
    .join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'CloudZen_Transactions.csv';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

const Payments = () => {
  const { user, updateUser } = useUser();
  const methods = user.paymentMethods || [];

  const [isAdding, setIsAdding] = React.useState(false);
  const [editingId, setEditingId] = React.useState(null);
  const [formData, setFormData] = React.useState({ 
    details: '', 
    type: 'Card',
    expiry: '',
    cvv: '',
    startDate: ''
  });

  const handleDeleteMethod = (id) => {
    if (methods.length <= 1) {
      alert('You must have at least one payment method for insurance premiums.');
      return;
    }

    if (window.confirm('Are you sure you want to remove this payment method?')) {
      const deletedMethod = methods.find(m => m.id === id);
      const updatedMethods = methods.filter(m => m.id !== id);
      
      // If we deleted the primary method, set the next available one as primary
      if (deletedMethod?.isPrimary && updatedMethods.length > 0) {
        updatedMethods[0].isPrimary = true;
      }
      
      updateUser({ paymentMethods: updatedMethods });
      if (editingId === id) {
        setEditingId(null);
      }
    }
  };

  const handleSetPrimary = (id) => {
    if (editingId) return; 
    const updatedMethods = methods.map(m => ({ ...m, isPrimary: m.id === id }));
    updateUser({ paymentMethods: updatedMethods });
  };

  const handleStartAdd = () => {
    setFormData({ details: '', type: 'Card', expiry: '', cvv: '', startDate: '' });
    setIsAdding(true);
    setEditingId(null);
  };

  const handleStartEdit = (m) => {
    setFormData({ 
      details: m.details, 
      type: m.type,
      expiry: m.expiry || '',
      cvv: m.cvv || '',
      startDate: m.startDate || ''
    });
    setEditingId(m.id);
    setIsAdding(false);
  };

  const getDisplayName = (type) => {
    const maps = { 'Card': 'Credit Card', 'Debit': 'Debit Card', 'Bank': 'Net Banking', 'UPI': 'UPI Handle' };
    return maps[type] || type;
  };

  const formatDetails = (m) => {
    if (m.type === 'UPI') return m.details;
    // For 12-digit cards as per user request: mask first 8, show last 4
    const clean = m.details.replace(/\s/g, '');
    if (clean.length > 4) {
      return `•••• •••• ${clean.slice(-4)}`;
    }
    return m.details;
  };

  const handleSave = () => {
    if (formData.type === 'UPI') {
      if (!formData.details || !formData.details.includes('@')) {
        alert('Please enter a valid UPI ID (e.g. name@bank)');
        return;
      }
    } else {
      // Basic 12-digit check for card number
      if (!formData.details || formData.details.replace(/\D/g, '').length !== 12) {
        alert('Please enter a valid 12-digit card number');
        return;
      }

      if (!formData.expiry || !formData.cvv) {
        alert('Please fill Expiry and CVV');
        return;
      }
    }

    const name = formData.type === 'UPI' ? 'UPI Handle' : (formData.type === 'Debit' ? 'Debit Card' : 'Credit Card');
    let updatedMethods;

    if (editingId) {
      updatedMethods = methods.map(m => 
        m.id === editingId ? { 
          ...m, 
          name, 
          details: formData.details, 
          type: formData.type,
          expiry: formData.type === 'UPI' ? '' : formData.expiry,
          cvv: formData.type === 'UPI' ? '' : formData.cvv,
          startDate: formData.type === 'UPI' ? '' : formData.startDate
        } : m
      );
    } else {
      const newMethod = {
        id: Date.now(),
        type: formData.type,
        name,
        details: formData.details,
        expiry: formData.type === 'UPI' ? '' : formData.expiry,
        cvv: formData.type === 'UPI' ? '' : formData.cvv,
        startDate: formData.type === 'UPI' ? '' : formData.startDate,
        isPrimary: false,
        icon: formData.type === 'UPI' ? 'upi' : 'card'
      };
      updatedMethods = [...methods, newMethod];
    }
    
    updateUser({ paymentMethods: updatedMethods });
    setIsAdding(false);
    setEditingId(null);
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
  };

  const [activePicker, setActivePicker] = React.useState(null);
  const pickerRef = React.useRef(null);

  React.useEffect(() => {
    const handleClickOutside = (e) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target)) {
        setActivePicker(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const CustomDatePicker = ({ label, value, onSelect, pickerKey }) => {
    const [viewDate, setViewDate] = React.useState(new Date(value || Date.now()));
    const [showYearPicker, setShowYearPicker] = React.useState(false);
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    const adjustedFirstDay = (firstDay + 6) % 7; 
    
    const days = [];
    for (let i = 0; i < adjustedFirstDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(i);

    const isSelected = (d) => {
      if (!d || !value) return false;
      const sel = new Date(value);
      return sel.getDate() === d && sel.getMonth() === month && sel.getFullYear() === year;
    };

    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear - 10; i <= currentYear + 20; i++) years.push(i);

    return (
      <div className="input-with-label" style={{ position: 'relative' }} ref={activePicker === pickerKey ? pickerRef : null}>
        <span className="small-label">{label}</span>
        <div 
          className={`date-trigger-input ${activePicker === pickerKey ? 'active' : ''}`}
          onClick={() => {
            setActivePicker(activePicker === pickerKey ? null : pickerKey);
            setShowYearPicker(false);
          }}
        >
          {value || 'Select Date'}
          <CalendarIcon size={14} className="date-input-icon" />
        </div>

        {activePicker === pickerKey && (
          <div className="calendar-popup">
            <div className="calendar-header">
              <button className="calendar-nav-btn" onClick={() => {
                if (showYearPicker) return;
                setViewDate(new Date(year, month - 1, 1));
              }} disabled={showYearPicker}><ChevronLeft size={16} /></button>
              
              <div className="calendar-title-group" onClick={() => setShowYearPicker(!showYearPicker)}>
                <span className="calendar-title">{months[month]} <span className="highlight-year">{year}</span></span>
              </div>

              <button className="calendar-nav-btn" onClick={() => {
                if (showYearPicker) return;
                setViewDate(new Date(year, month + 1, 1));
              }} disabled={showYearPicker}><ChevronRight size={16} /></button>
            </div>

            {showYearPicker ? (
              <div className="calendar-year-grid">
                {years.map(y => (
                  <div 
                    key={y} 
                    className={`calendar-year-cell ${y === year ? 'selected' : ''}`}
                    onClick={() => {
                      setViewDate(new Date(y, month, 1));
                      setShowYearPicker(false);
                    }}
                  >
                    {y}
                  </div>
                ))}
              </div>
            ) : (
              <>
                <div className="calendar-days-row">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
                    <div key={d} className="calendar-day-label">{d}</div>
                  ))}
                </div>
                <div className="calendar-days-grid">
                  {days.map((d, i) => (
                    <div 
                      key={i} 
                      className={`calendar-day-cell ${!d ? 'empty' : ''} ${isSelected(d) ? 'selected' : ''}`}
                      onClick={() => {
                        if (d) {
                          onSelect(`${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`);
                          setActivePicker(null);
                        }
                      }}
                    >
                      {d}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="dashboard-layout">
      <Sidebar activePage="payments" />

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
            <div className="methods-list">
              {methods.map((m) => (
                editingId === m.id ? (
                  <div key={m.id} className="method-item editing full-form">
                    <div className="method-form-inline detailed">
                      <div className="card-type-toggle">
                        <button className={formData.type === 'Debit' ? 'active' : ''} onClick={() => setFormData({...formData, type: 'Debit'})}>Debit</button>
                        <button className={formData.type === 'Card' ? 'active' : ''} onClick={() => setFormData({...formData, type: 'Card'})}>Credit</button>
                        <button className={formData.type === 'UPI' ? 'active' : ''} onClick={() => setFormData({...formData, type: 'UPI'})}>UPI</button>
                      </div>
                      
                      {formData.type === 'UPI' ? (
                        <div className="input-with-label" style={{ flex: 1 }}>
                          <span className="small-label">UPI ID</span>
                          <input 
                            type="text" 
                            value={formData.details} 
                            onChange={e => setFormData({...formData, details: e.target.value})}
                            placeholder="username@bank"
                            autoFocus
                          />
                        </div>
                      ) : (
                        <div className="card-input-group">
                          <div className="input-with-label">
                            <span className="small-label">Card Number (12 Digits)</span>
                            <input 
                              type="text" 
                              value={formData.details} 
                              onChange={e => {
                                const val = e.target.value.replace(/\D/g, '');
                                if (val.length <= 12) setFormData({...formData, details: val});
                              }}
                              placeholder="0000 0000 0000"
                              autoFocus
                            />
                          </div>
                          <div className="triple-grid">
                            <CustomDatePicker 
                              label="Start Date" 
                              value={formData.startDate} 
                              onSelect={val => setFormData({...formData, startDate: val})} 
                              pickerKey="edit-start"
                            />
                            <CustomDatePicker 
                              label="Expiry Date" 
                              value={formData.expiry} 
                              onSelect={val => setFormData({...formData, expiry: val})} 
                              pickerKey="edit-expiry"
                            />
                            <div className="input-with-label">
                              <span className="small-label">CVV</span>
                              <input type="password" value={formData.cvv} onChange={e => setFormData({...formData, cvv: e.target.value})} placeholder="CVV" maxLength="3" />
                            </div>
                          </div>
                        </div>
                      )}
                      <div className="form-actions-detailed">
                        <button className="save-btn" onClick={handleSave}>Update Wallet</button>
                        <button className="remove-btn-inline" onClick={() => handleDeleteMethod(m.id)}>Remove</button>
                        <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div 
                    key={m.id} 
                    className={`method-item ${m.isPrimary ? 'primary' : ''}`}
                    onClick={() => handleSetPrimary(m.id)}
                  >
                    <div className={`method-icon-container ${m.type === 'UPI' ? 'upi' : ''}`}>
                      {m.type === 'UPI' ? <Smartphone size={20} /> : <CreditCard size={20} />}
                    </div>
                    <div className="method-info">
                      <div className="method-name">{m.name}</div>
                      <div className="method-sub">
                        {formatDetails(m)} 
                        {m.expiry && <span className="card-expiry-tag">Exp: {m.expiry}</span>}
                      </div>
                    </div>
                    <div className="method-actions">
                      <button 
                        className="edit-btn" 
                        onClick={(e) => { e.stopPropagation(); handleStartEdit(m); }}
                      >
                        Edit
                      </button>
                      <button 
                        className="remove-btn" 
                        onClick={(e) => { e.stopPropagation(); handleDeleteMethod(m.id); }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                )
              ))}
          </div>

            {isAdding ? (
              <div className="method-item adding full-form">
                <div className="method-form-inline detailed">
                  <div className="card-type-toggle">
                    <button className={formData.type === 'Debit' ? 'active' : ''} onClick={() => setFormData({...formData, type: 'Debit'})}>Debit</button>
                    <button className={formData.type === 'Card' ? 'active' : ''} onClick={() => setFormData({...formData, type: 'Card'})}>Credit</button>
                    <button className={formData.type === 'UPI' ? 'active' : ''} onClick={() => setFormData({...formData, type: 'UPI'})}>UPI</button>
                  </div>

                  {formData.type === 'UPI' ? (
                    <div className="input-with-label" style={{ flex: 1 }}>
                      <span className="small-label">UPI ID</span>
                      <input 
                        type="text" 
                        value={formData.details} 
                        onChange={e => setFormData({...formData, details: e.target.value})}
                        placeholder="username@bank"
                        autoFocus
                      />
                    </div>
                  ) : (
                    <div className="card-input-group">
                      <div className="input-with-label">
                        <span className="small-label">Card Number (12 Digits)</span>
                        <input 
                          type="text" 
                          value={formData.details} 
                          onChange={e => {
                            const val = e.target.value.replace(/\D/g, '');
                            if (val.length <= 12) setFormData({...formData, details: val});
                          }}
                          placeholder="0000 0000 0000"
                          autoFocus
                        />
                      </div>
                    <div className="triple-grid">
                      <CustomDatePicker 
                        label="Start Date" 
                        value={formData.startDate} 
                        onSelect={val => setFormData({...formData, startDate: val})} 
                        pickerKey="add-start"
                      />
                      <CustomDatePicker 
                        label="Expiry Date" 
                        value={formData.expiry} 
                        onSelect={val => setFormData({...formData, expiry: val})} 
                        pickerKey="add-expiry"
                      />
                      <div className="input-with-label">
                        <span className="small-label">CVV</span>
                        <input type="password" value={formData.cvv} onChange={e => setFormData({...formData, cvv: e.target.value})} placeholder="CVV" maxLength="3" />
                      </div>
                    </div>
                    </div>
                  )}
                  <div className="form-actions-detailed">
                    <button className="save-btn" onClick={handleSave}>Add Method</button>
                    <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
                  </div>
                </div>
              </div>
            ) : (
              <button className="add-method-btn" onClick={handleStartAdd}>+ Add Payment Method</button>
            )}
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
          <div className="pay-card-header flex-header">
            <h3 className="pay-section-title">Transaction History</h3>
            <button className="download-csv-btn" onClick={handleDownloadCSV}>
              <ArrowDownLeft size={14} /> Download CSV
            </button>
          </div>
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
                {user.transactions?.length > 0 ? (
                  user.transactions.map((t, i) => (
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
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="empty-table-msg">No transactions found for your account yet.</td>
                  </tr>
                )}
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
