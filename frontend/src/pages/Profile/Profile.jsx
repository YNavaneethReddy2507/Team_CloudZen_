import React, { useState } from 'react';
import {
  Shield, LayoutDashboard, FileText, AlertTriangle,
  CreditCard, Bell, User, LogOut, TrendingUp,
  Mail, Phone, MapPin, Settings, Lock,
  Camera, Briefcase, Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';
import './Profile.css';

const Toggle = ({ defaultOn = false, color = '#1a4f78' }) => {
  const [on, setOn] = useState(defaultOn);
  return (
    <button
      className={`prof-toggle ${on ? 'on' : ''}`}
      style={on ? { background: color } : {}}
      onClick={() => setOn(!on)}
      aria-label="toggle"
    >
      <span className="prof-toggle-knob" />
    </button>
  );
};

const Profile = () => {
  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-brand"><Shield size={24} /><span>DeliveryShield</span></div>
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
          <Link to="/payments" className="nav-item"><CreditCard size={20} /><span>Payments</span></Link>
          <Link to="/alerts" className="nav-item"><Bell size={20} /><span>Alerts</span></Link>
          <Link to="/profile" className="nav-item active"><User size={20} /><span>Profile</span></Link>
        </nav>
        <a href="/login" className="logout-btn"><LogOut size={20} /><span>Logout</span></a>
      </aside>

      {/* Main */}
      <main className="main-content">
        <header className="main-header">
          <h1>My Profile</h1>
          <p>Manage your account settings and preferences</p>
        </header>

        {/* Profile Banner */}
        <div className="profile-banner">
          <div className="profile-avatar-wrap">
            <div className="profile-avatar-lg">RK</div>
            <button className="avatar-camera-btn"><Camera size={14} /></button>
          </div>
          <div className="profile-banner-info">
            <div className="profile-banner-name">Rahul Kumar</div>
            <div className="profile-banner-sub">Zomato Delivery Partner • Mumbai</div>
            <div className="profile-banner-stats">
              <div className="banner-stat">
                <div className="bs-label">Member Since</div>
                <div className="bs-value">October 2025</div>
              </div>
              <div className="banner-stat">
                <div className="bs-label">Coverage Status</div>
                <div className="bs-value">Active</div>
              </div>
              <div className="banner-stat">
                <div className="bs-label">Total Claims</div>
                <div className="bs-value">12</div>
              </div>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="prof-section-card">
          <div className="prof-section-header">
            <h3>Personal Information</h3>
            <button className="prof-edit-btn">Edit</button>
          </div>
          <div className="prof-fields-grid">
            <div className="prof-field">
              <div className="pf-label">Full Name</div>
              <div className="pf-value"><User size={15} /> Rahul Kumar</div>
            </div>
            <div className="prof-field">
              <div className="pf-label">Email Address</div>
              <div className="pf-value"><Mail size={15} /> rahul.kumar@email.com</div>
            </div>
            <div className="prof-field">
              <div className="pf-label">Phone Number</div>
              <div className="pf-value"><Phone size={15} /> +91 98765 43210</div>
            </div>
            <div className="prof-field">
              <div className="pf-label">Operating City</div>
              <div className="pf-value"><MapPin size={15} /> Mumbai – Andheri East</div>
            </div>
          </div>
        </div>

        {/* Work Information */}
        <div className="prof-section-card">
          <div className="prof-section-header">
            <h3>Work Information</h3>
            <button className="prof-edit-btn">Edit</button>
          </div>
          <div className="prof-fields-grid">
            <div className="prof-field">
              <div className="pf-label">Delivery Platform</div>
              <div className="pf-value select-style">
                <Briefcase size={15} /> Zomato
                <span className="select-arrow">▾</span>
              </div>
            </div>
            <div className="prof-field">
              <div className="pf-label">Partner ID</div>
              <div className="pf-value"><Settings size={15} /> ZOM-2025-MB-45821</div>
            </div>
            <div className="prof-field">
              <div className="pf-label">Average Working Hours</div>
              <div className="pf-value"><Clock size={15} /> 8–10 hours/day</div>
            </div>
            <div className="prof-field">
              <div className="pf-label">Primary Zone</div>
              <div className="pf-value">
                <MapPin size={15} />
                <span>Andheri East, <span className="zone-highlight">Kurla</span>, <span className="zone-highlight">Bandra</span></span>
              </div>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="prof-section-card">
          <h3 className="prof-standalone-title">Security Settings</h3>
          <div className="security-item highlighted">
            <div className="si-left">
              <Lock size={18} className="si-icon" />
              <div>
                <div className="si-title">Change Password</div>
                <div className="si-sub">Last changed 45 days ago</div>
              </div>
            </div>
            <button className="prof-edit-btn">Update</button>
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
          <div className="account-action">
            <div className="aa-title">Download My Data</div>
            <div className="aa-sub teal-link">Export all your insurance data</div>
          </div>
          <div className="account-action">
            <div className="aa-title">Privacy Settings</div>
            <div className="aa-sub teal-link">Manage your data and privacy preferences</div>
          </div>
          <div className="account-action danger">
            <div className="aa-title danger-text">Deactivate Account</div>
            <div className="aa-sub danger-sub">Temporarily pause your insurance coverage</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
