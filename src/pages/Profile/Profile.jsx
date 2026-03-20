import React, { useState } from 'react';
import {
  Camera, Briefcase, Clock, Save, X,
  Mail, Phone, MapPin, Settings, Lock,
  Bell, User
} from 'lucide-react';
import Sidebar from '../../components/Sidebar/Sidebar';
import { useUser } from '../../context/UserContext';
import { transactions, claimsData } from '../../constants/mockData';
import './Profile.css';

const Toggle = ({ defaultOn = false, color = '#1a4f78' }) => {
  const [on, setOn] = useState(defaultOn);
  return (
    <button
      className={`prof-toggle ${on ? 'on' : ''}`}
      style={on ? { background: color } : {}}
      onClick={() => setOn(!on)}
    >
      <span className="prof-toggle-knob" />
    </button>
  );
};

const Profile = () => {
  const { user, updateUser } = useUser();

  // Personal Info temp state
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [tempPersonal, setTempPersonal] = useState({
    fullName: user.fullName,
    email: user.email,
    phone: user.phone,
    area: user.area,
    city: user.city,
  });

  // Work Info temp state
  const [isEditingWork, setIsEditingWork] = useState(false);
  const [tempWork, setTempWork] = useState({
    platform: user.platform,
    partnerId: user.partnerId,
    workingHours: user.workingHours,
    primaryZones: user.primaryZones.join(', '),
  });

  // Password temp state
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  // Deactivation state
  const [isDeactivating, setIsDeactivating] = useState(false);
  const [deactivationPassword, setDeactivationPassword] = useState('');

  // Handlers
  const handleEditPersonal = () => {
    setTempPersonal({
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      area: user.area,
      city: user.city,
    });
    setIsEditingPersonal(true);
  };

  const handleSavePersonal = () => {
    updateUser({ ...tempPersonal });
    setIsEditingPersonal(false);
  };

  const handleCancelPersonal = () => {
    setIsEditingPersonal(false);
  };

  const handleEditWork = () => {
    setTempWork({
      platform: user.platform,
      partnerId: user.partnerId,
      workingHours: user.workingHours,
      primaryZones: user.primaryZones.join(', '),
    });
    setIsEditingWork(true);
  };

  const handleSaveWork = () => {
    updateUser({
      ...tempWork,
      primaryZones: tempWork.primaryZones.split(',').map(s => s.trim())
    });
    setIsEditingWork(false);
  };

  const handleCancelWork = () => {
    setIsEditingWork(false);
  };

  const handleSavePassword = () => {
    if (!passwordForm.current || !passwordForm.new || !passwordForm.confirm) {
      alert('Please fill in all fields');
      return;
    }
    if (passwordForm.new !== passwordForm.confirm) {
      alert('New passwords do not match');
      return;
    }

    if (passwordForm.current !== user.password) {
      alert('Current password is incorrect');
      return;
    }
    // Update user password
    updateUser({ password: passwordForm.new });

    alert('Password updated successfully! This password will be required for plan changes and deactivation.');
    setIsChangingPassword(false);
    setPasswordForm({ current: '', new: '', confirm: '' });
  };

  const handleDeactivate = () => {
    if (!deactivationPassword) {
      alert('Please enter your password to deactivate');
      return;
    }

    if (deactivationPassword !== user.password) {
      alert('Incorrect password. Deactivation cancelled.');
      return;
    }
    if (window.confirm('Are you sure you want to deactivate your account? This will pause your insurance coverage.')) {
      alert('Account deactivated successfully. Redirecting to login...');
      // Clear user data or set status to inactive
      updateUser({ status: 'Inactive' });
      setTimeout(() => {
        window.location.href = '/login';
      }, 1000);
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateUser({ avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleExportData = () => {
    // 1. Profile Section
    const profileHeaders = ['SECTION: PROFILE', '', '', '', '', '', '', '', '', '', '', '', '', ''];
    const profileColumns = [
      'Full Name', 'Email', 'Phone', 'City', 'Area', 'Platform',
      'Partner ID', 'Working Hours', 'Status', 'Risk Score',
      'Risk Level', 'Monthly Premium', 'Total Claims', 'Export Date'
    ];
    const profileRow = [
      user.fullName, user.email, user.phone, user.city, user.area,
      user.platform, user.partnerId, user.workingHours, user.status,
      user.riskProfile?.score, user.riskProfile?.level, user.riskProfile?.premium,
      user.totalClaims, new Date().toISOString()
    ].map(val => `"${val}"`);

    // 2. Payments Section
    const paymentHeaders = ['', '', '', '', '', '', ''];
    const paymentTitle = ['SECTION: PAYMENT TRANSACTIONS', '', '', '', '', '', ''];
    const paymentColumns = ['Date', 'Transaction ID', 'Type', 'Details', 'Method', 'Amount', 'Status'];
    const paymentRows = transactions.map(t => [
      t.date, t.txn, t.type, t.details, t.method, t.amount.replace('₹', ''), 'Completed'
    ].map(val => `"${val}"`));

    // 3. Claims Section
    const claimHeaders = ['', '', '', '', '', '', ''];
    const claimTitle = ['SECTION: CLAIMS HISTORY', '', '', '', '', '', ''];
    const claimColumns = ['Claim ID', 'Type', 'Date', 'Amount (INR)', 'Status', 'Duration', 'Trigger Time'];
    const claimRows = claimsData.map(c => [
      c.id, c.type, c.date, c.amount, c.status, c.duration, c.triggerTime
    ].map(val => `"${val}"`));

    // 4. Premium Details Section (Risk Factors)
    const riskTitle = ['SECTION: PREMIUM RISK FACTORS', '', ''];
    const riskColumns = ['Factor Name', 'Impact Level', 'Description'];
    let riskRows = [];
    const factors = user.riskProfile?.riskFactors;

    if (factors) {
      if (Array.isArray(factors)) {
        riskRows = factors.map(r => [
          r.name, r.impact || r.score || 'N/A',
          r.name === 'Weather' ? 'Based on real-time Met Dept data' : r.name === 'Pollution' ? 'Based on live AQI data' : 'Based on local safety trends'
        ].map(val => `"${val}"`));
      } else if (typeof factors === 'object') {
        riskRows = Object.entries(factors).map(([key, val]) => [
          key.charAt(0).toUpperCase() + key.slice(1),
          val > 70 ? 'High' : val > 40 ? 'Medium' : 'Low',
          `Score: ${val} - Based on live environmental metrics`
        ].map(v => `"${v}"`));
      }
    }

    // 5. Subscription Details
    const subTitle = ['SECTION: SUBSCRIPTION DETAILS', '', ''];
    const subColumns = ['Policy Status', 'Monthly Premium', 'Next Due Date', 'Payment Method'];
    const subRow = [
      user.status,
      `₹${user.riskProfile?.premium}`,
      'March 21, 2026', // Matching Payments.jsx
      user.paymentMethods?.[0] ? `${user.paymentMethods[0].type} (${user.paymentMethods[0].details})` : 'None'
    ].map(val => `"${val}"`);

    // Combine all
    const csvContent = [
      profileHeaders.join(','),
      profileColumns.join(','),
      profileRow.join(','),
      '',
      subTitle.join(','),
      subColumns.join(','),
      subRow.join(','),
      '',
      paymentTitle.join(','),
      paymentColumns.join(','),
      ...paymentRows.map(r => r.join(',')),
      '',
      claimTitle.join(','),
      claimColumns.join(','),
      ...claimRows.map(r => r.join(',')),
      '',
      riskTitle.join(','),
      riskColumns.join(','),
      ...riskRows.map(r => r.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `CloudZen_Master_Export_${user.fullName.replace(/\s+/g, '_')}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="dashboard-layout">
      <Sidebar activePage="profile" />

      {/* Main */}
      <main className="main-content">
        <header className="main-header">
          <h1>My Profile</h1>
          <p>Manage your account settings and preferences</p>
        </header>

        {/* Profile Banner */}
        <div className="profile-banner">
          <div className="profile-avatar-wrap">
            {user.avatar ? (
              <img src={user.avatar} alt="Profile" className="profile-avatar-lg" style={{ objectFit: 'cover' }} />
            ) : (
              <div className="profile-avatar-lg">{user.fullName.split(' ').map(n => n[0]).join('')}</div>
            )}
            <input
              type="file"
              id="avatarInput"
              hidden
              accept="image/*"
              onChange={handleAvatarChange}
            />
            <button
              className="avatar-camera-btn"
              onClick={() => document.getElementById('avatarInput').click()}
            >
              <Camera size={14} />
            </button>
          </div>
          <div className="profile-banner-info">
            <div className="profile-banner-name">{user.fullName}</div>
            <div className="profile-banner-sub">{user.role} • {user.city}</div>
            <div className="profile-banner-stats">
              <div className="banner-stat">
                <div className="bs-label">Member Since</div>
                <div className="bs-value">{user.memberSince}</div>
              </div>
              <div className="banner-stat">
                <div className="bs-label">Coverage Status</div>
                <div className="bs-value">{user.status}</div>
              </div>
              <div className="banner-stat">
                <div className="bs-label">Total Claims</div>
                <div className="bs-value">{user.totalClaims}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="prof-section-card">
          <div className="prof-section-header">
            <h3>Personal Information</h3>
            {isEditingPersonal ? (
              <div className="edit-actions">
                <button className="prof-save-btn" onClick={handleSavePersonal}><Save size={14} /> Save</button>
                <button className="prof-cancel-btn" onClick={handleCancelPersonal}><X size={14} /> Cancel</button>
              </div>
            ) : (
              <button className="prof-edit-btn" onClick={handleEditPersonal}>Edit</button>
            )}
          </div>
          <div className="prof-fields-grid">
            <div className="prof-field">
              <div className="pf-label">Full Name</div>
              {isEditingPersonal ? (
                <input
                  type="text"
                  className="pf-input"
                  value={tempPersonal.fullName}
                  onChange={(e) => setTempPersonal({ ...tempPersonal, fullName: e.target.value })}
                />
              ) : (
                <div className="pf-value"><User size={15} /> {user.fullName}</div>
              )}
            </div>
            <div className="prof-field">
              <div className="pf-label">Email Address</div>
              {isEditingPersonal ? (
                <input
                  type="email"
                  className="pf-input"
                  value={tempPersonal.email}
                  onChange={(e) => setTempPersonal({ ...tempPersonal, email: e.target.value })}
                />
              ) : (
                <div className="pf-value"><Mail size={15} /> {user.email}</div>
              )}
            </div>
            <div className="prof-field">
              <div className="pf-label">Phone Number</div>
              {isEditingPersonal ? (
                <input
                  type="text"
                  className="pf-input"
                  value={tempPersonal.phone}
                  onChange={(e) => setTempPersonal({ ...tempPersonal, phone: e.target.value })}
                />
              ) : (
                <div className="pf-value"><Phone size={15} /> {user.phone}</div>
              )}
            </div>
            <div className="prof-field">
              <div className="pf-label">Operating City & Area</div>
              {isEditingPersonal ? (
                <div className="dual-input">
                  <input
                    type="text"
                    className="pf-input"
                    value={tempPersonal.city}
                    placeholder="City"
                    onChange={(e) => setTempPersonal({ ...tempPersonal, city: e.target.value })}
                  />
                  <input
                    type="text"
                    className="pf-input"
                    value={tempPersonal.area}
                    placeholder="Area"
                    onChange={(e) => setTempPersonal({ ...tempPersonal, area: e.target.value })}
                  />
                </div>
              ) : (
                <div className="pf-value"><MapPin size={15} /> {user.city} – {user.area}</div>
              )}
            </div>
          </div>
        </div>

        {/* Work Information */}
        <div className="prof-section-card">
          <div className="prof-section-header">
            <h3>Work Information</h3>
            {isEditingWork ? (
              <div className="edit-actions">
                <button className="prof-save-btn" onClick={handleSaveWork}><Save size={14} /> Save</button>
                <button className="prof-cancel-btn" onClick={handleCancelWork}><X size={14} /> Cancel</button>
              </div>
            ) : (
              <button className="prof-edit-btn" onClick={handleEditWork}>Edit</button>
            )}
          </div>
          <div className="prof-fields-grid">
            <div className="prof-field">
              <div className="pf-label">Delivery Platform</div>
              {isEditingWork ? (
                <select
                  className="pf-input"
                  value={tempWork.platform}
                  onChange={(e) => setTempWork({ ...tempWork, platform: e.target.value })}
                >
                  <option value="Zomato">Zomato</option>
                  <option value="Swiggy">Swiggy</option>
                  <option value="Zepto">Zepto</option>
                  <option value="Blinkit">Blinkit</option>
                </select>
              ) : (
                <div className="pf-value"><Briefcase size={15} /> {user.platform}</div>
              )}
            </div>
            <div className="prof-field">
              <div className="pf-label">Partner ID</div>
              {isEditingWork ? (
                <input
                  type="text"
                  className="pf-input"
                  value={tempWork.partnerId}
                  onChange={(e) => setTempWork({ ...tempWork, partnerId: e.target.value })}
                />
              ) : (
                <div className="pf-value"><Settings size={15} /> {user.partnerId}</div>
              )}
            </div>
            <div className="prof-field">
              <div className="pf-label">Average Working Hours</div>
              {isEditingWork ? (
                <input
                  type="text"
                  className="pf-input"
                  value={tempWork.workingHours}
                  onChange={(e) => setTempWork({ ...tempWork, workingHours: e.target.value })}
                />
              ) : (
                <div className="pf-value"><Clock size={15} /> {user.workingHours}</div>
              )}
            </div>
            <div className="prof-field">
              <div className="pf-label">Primary Zone (comma separated)</div>
              {isEditingWork ? (
                <input
                  type="text"
                  className="pf-input"
                  value={tempWork.primaryZones}
                  onChange={(e) => setTempWork({ ...tempWork, primaryZones: e.target.value })}
                />
              ) : (
                <div className="pf-value">
                  <MapPin size={15} />
                  <span>{user.primaryZones.map((z, i) => (
                    <React.Fragment key={i}>
                      {i > 0 && ', '}
                      <span className="zone-highlight">{z}</span>
                    </React.Fragment>
                  ))}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="prof-section-card">
          <h3 className="prof-standalone-title">Security Settings</h3>
          <div className={`security-item highlighted ${isChangingPassword ? 'expanded' : ''}`}>
            <div className="si-left">
              <Lock size={18} className="si-icon" />
              <div>
                <div className="si-title">Change Password</div>
                <div className="si-sub">Last changed 45 days ago</div>
              </div>
            </div>
            {!isChangingPassword ? (
              <button className="prof-edit-btn" onClick={() => setIsChangingPassword(true)}>Update</button>
            ) : (
              <button className="prof-cancel-btn" onClick={() => setIsChangingPassword(false)}>Cancel</button>
            )}

            {isChangingPassword && (
              <div className="password-form-overlay">
                <div className="prof-fields-grid" style={{ marginTop: 20 }}>
                  <div className="prof-field full-width">
                    <div className="pf-label">Current Password</div>
                    <input
                      type="password"
                      className="pf-input"
                      value={passwordForm.current}
                      onChange={(e) => setPasswordForm({ ...passwordForm, current: e.target.value })}
                    />
                  </div>
                  <div className="prof-field">
                    <div className="pf-label">New Password</div>
                    <input
                      type="password"
                      className="pf-input"
                      value={passwordForm.new}
                      onChange={(e) => setPasswordForm({ ...passwordForm, new: e.target.value })}
                    />
                  </div>
                  <div className="prof-field">
                    <div className="pf-label">Confirm New Password</div>
                    <input
                      type="password"
                      className="pf-input"
                      value={passwordForm.confirm}
                      onChange={(e) => setPasswordForm({ ...passwordForm, confirm: e.target.value })}
                    />
                  </div>
                </div>
                <div className="prof-section-footer" style={{ marginTop: 15 }}>
                  <button className="prof-save-btn" onClick={handleSavePassword}>Save Password</button>
                </div>
              </div>
            )}
          </div>
          <div className="security-item">
            <div className="si-left">
              <Settings size={18} className="si-icon muted" />
              <div>
                <div className="si-title">Two-Factor Authentication</div>
                <div className="si-sub teal-link">Extra security for your account</div>
              </div>
            </div>
            <Toggle defaultOn={false} />
          </div>
          <div className="security-item">
            <div className="si-left">
              <MapPin size={18} className="si-icon muted" />
              <div>
                <div className="si-title">GPS Verification</div>
                <div className="si-sub teal-link">Required for claim processing</div>
              </div>
            </div>
            <span className="enabled-badge">Enabled</span>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="prof-section-card">
          <h3 className="prof-standalone-title">Notification Preferences</h3>
          <div className="security-item">
            <div className="si-left">
              <Bell size={18} className="si-icon muted" />
              <div>
                <div className="si-title">Email Notifications</div>
                <div className="si-sub">Receive updates via email</div>
              </div>
            </div>
            <Toggle defaultOn={true} color="#1a4f78" />
          </div>
          <div className="security-item">
            <div className="si-left">
              <Bell size={18} className="si-icon muted" />
              <div>
                <div className="si-title">SMS Alerts</div>
                <div className="si-sub teal-link">Critical alerts via SMS</div>
              </div>
            </div>
            <Toggle defaultOn={true} color="#2dd4bf" />
          </div>
          <div className="security-item">
            <div className="si-left">
              <Bell size={18} className="si-icon muted" />
              <div>
                <div className="si-title">Push Notifications</div>
                <div className="si-sub">In-app notifications</div>
              </div>
            </div>
            <Toggle defaultOn={true} color="#1a4f78" />
          </div>
        </div>

        {/* Account Actions */}
        <div className="prof-section-card" style={{ marginBottom: 40 }}>
          <h3 className="prof-standalone-title">Account Actions</h3>
          <div className="account-action" onClick={handleExportData} style={{ cursor: 'pointer' }}>
            <div className="aa-title">Download My Data</div>
            <div className="aa-sub teal-link">Export all your insurance data</div>
          </div>
          <div className="account-action">
            <div className="aa-title">Privacy Settings</div>
            <div className="aa-sub teal-link">Manage your data and privacy preferences</div>
          </div>
          <div className={`account-action danger ${isDeactivating ? 'expanded' : ''}`} onClick={() => !isDeactivating && setIsDeactivating(true)}>
            <div className="si-left">
              <div>
                <div className="aa-title danger-text">Deactivate Account</div>
                <div className="aa-sub danger-sub">Temporarily pause your insurance coverage</div>
              </div>
            </div>
            {!isDeactivating ? (
              <button className="prof-edit-btn danger-text">Deactivate</button>
            ) : (
              <button className="prof-cancel-btn" onClick={(e) => { e.stopPropagation(); setIsDeactivating(false); }}>Cancel</button>
            )}

            {isDeactivating && (
              <div className="deactivate-form-overlay" onClick={(e) => e.stopPropagation()}>
                <div className="prof-field full-width" style={{ marginTop: 20 }}>
                  <div className="pf-label">Enter Password to Confirm</div>
                  <input
                    type="password"
                    className="pf-input"
                    placeholder="Enter your current password"
                    value={deactivationPassword}
                    onChange={(e) => setDeactivationPassword(e.target.value)}
                  />
                </div>
                <div className="prof-section-footer" style={{ marginTop: 15 }}>
                  <button className="prof-save-btn danger-bg" onClick={handleDeactivate}>Confirm Deactivation</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
