import React, { useState } from 'react';
import {
  Shield, AlertTriangle,
  CreditCard, Bell, User,
  Mail, Phone, MapPin, Settings, Lock,
  Camera, Briefcase, Clock, Save, X,
  ZoomIn, ZoomOut, Move, ShieldCheck,
  Key, Truck
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import { useUser } from '../../context/UserContext';
import { claimsData } from '../../constants/mockData';
import './Profile.css';

// Demographic Engine: 50 Unique Profiles for High-Fidelity Demo
const MOCK_PROFILES = Array.from({ length: 50 }, (_, i) => {
  const names = ['Arjun', 'Siddharth', 'Aditya', 'Vikram', 'Rohan', 'Karan', 'Ishaan', 'Aarav', 'Vivaan', 'Kabir', 'Ananya', 'Priya', 'Saira', 'Zara', 'Meera', 'Riya', 'Kiara', 'Myra', 'Diya', 'Sana'];
  const lastNames = ['Sharma', 'Verma', 'Gupta', 'Malhotra', 'Kapoor', 'Singhania', 'Mehta', 'Reddy', 'Nair', 'Patel'];
  const platforms = ['Zomato', 'Swiggy', 'Zepto', 'Blinkit'];
  const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Pune'];
  const areas = ['Andheri East', 'Kurla', 'South Mumbai', 'Bandra', 'Powai'];
  
  const fName = names[i % names.length];
  const lName = lastNames[i % lastNames.length];
  const fullName = `${fName} ${lName}`;
  const city = cities[i % cities.length];
  const area = areas[i % areas.length];
  
  return {
    fullName,
    firstName: fName,
    lastName: lName,
    role: `${platforms[i % platforms.length]} Partner`,
    profileImage: null, // Hard reset for demo profiles
    email: `${fName.toLowerCase()}.${lName.toLowerCase()}${i}@email.com`,
    phone: `+91 ${90000 + i} ${10000 + i}`,
    city,
    area,
    platform: platforms[i % platforms.length],
    partnerId: `${platforms[i % platforms.length].toUpperCase().slice(0,3)}-2026-CH-${10000 + i}`,
    workingHours: `${6 + (i % 6)} hours/day`,
    primaryZones: [area, areas[(i + 1) % areas.length]],
    status: i % 5 === 0 ? 'Suspended' : 'Active',
    coverageStatus: i % 7 === 0 ? 'Paused' : 'Active',
    totalClaims: Math.floor(Math.random() * 20),
    memberSince: 'January 2026',
    password: '123456',
    planName: i % 3 === 0 ? 'Premium Pulse' : i % 3 === 1 ? 'Standard Shield' : 'Lite Guard',
    vehicleType: i % 3 === 0 ? 'Four-Wheeler' : i % 2 === 0 ? 'Three-Wheeler' : 'Two-Wheeler',
    vehicleNumber: `MH-01-BK-${1000 + i}`,
    licenseNumber: `DL-2026-${5000 + i}`
  };
});

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
  const fileInputRef = React.useRef(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const [showCropModal, setShowCropModal] = useState(false);
  const [tempCropImg, setTempCropImg] = useState(null);
  const [cropPos, setCropPos] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          setTempCropImg(event.target.result);
          setShowCropModal(true);
          
          // Calculate initial fit zoom for 400x400 container
          // We want the image to cover the 350x350 square at minimum
          // If width=1000, 400/1000 = 0.4.
          const fitZoom = Math.min(400 / img.width, 400 / img.height);
          setZoom(fitZoom);
          
          // Center the image in the 400x400 container
          setCropPos({
            x: (400 - img.width * fitZoom) / 2,
            y: (400 - img.height * fitZoom) / 2
          });
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const startDrag = (e) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - cropPos.x,
      y: e.clientY - cropPos.y
    });
  };

  const onDrag = (e) => {
    if (!isDragging) return;
    setCropPos({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const endDrag = () => setIsDragging(false);

  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const [deactivatePass, setDeactivatePass] = useState('');
  const [deactivateError, setDeactivateError] = useState('');
  const [privacyPrefs, setPrivacyPrefs] = useState({
    marketing: true,
    dataSharing: false,
    analytics: true
  });

  const handleConfirmDeactivation = () => {
    if (deactivatePass === user.password) {
      const newStatus = user.coverageStatus === 'Active' ? 'Paused' : 'Active';
      updateUser({ coverageStatus: newStatus });
      setShowDeactivateModal(false);
      setDeactivatePass('');
      setDeactivateError('');
      alert(`Account ${newStatus === 'Paused' ? 'deactivated' : 'reactivated'} successfully.`);
    } else {
      setDeactivateError('Incorrect password. Please try again.');
    }
  };
  const applyCrop = () => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const size = 400;
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');

      // Anchored math for anchored transformOrigin: '0 0'
      const cropX = (25 - cropPos.x) / zoom;
      const cropY = (25 - cropPos.y) / zoom;
      const cropSize = 350 / zoom;

      // Draw with safety bounds to prevent black images
      ctx.drawImage(img, 
        Math.max(0, cropX), Math.max(0, cropY), 
        Math.min(img.width - cropX, cropSize), Math.min(img.height - cropY, cropSize),
        0, 0, size, size
      );
      updateUser({ profileImage: canvas.toDataURL('image/jpeg', 0.9) });
      setShowCropModal(false);
    };
    img.src = tempCropImg;
  };

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
    vehicleType: user.vehicleType || 'Two-Wheeler',
    vehicleNumber: user.vehicleNumber || 'MH-01-BK-4512',
    licenseNumber: user.licenseNumber || 'DL-2025-IND-8845',
  });

  // Password temp state
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    current: '',
    new: '',
    confirm: '',
  });

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
      vehicleType: user.vehicleType || 'Two-Wheeler',
      vehicleNumber: user.vehicleNumber || 'MH-01-BK-4512',
      licenseNumber: user.licenseNumber || 'DL-2025-IND-8845',
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
    // Simulate API call
    alert('Password updated successfully!');
    setIsChangingPassword(false);
    setPasswordForm({ current: '', new: '', confirm: '' });
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
    const paymentRows = (user.transactions || []).map(t => [
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
      'UPI (rahul@paytm)' // Matching Payments.jsx
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
            <div className="profile-avatar-lg" onClick={handleImageClick} style={{ cursor: 'pointer' }}>
              {user.profileImage ? (
                <img src={user.profileImage} alt="Profile" className="avatar-img-lg" />
              ) : (
                user.fullName.split(' ').map(n => n[0]).join('')
              )}
            </div>
            <button className="avatar-camera-btn" onClick={handleImageClick}>
              <Camera size={14} />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              style={{ display: 'none' }}
              accept="image/*"
            />
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
            <div className="prof-field">
              <div className="pf-label">Vehicle Type</div>
              {isEditingWork ? (
                <select
                  className="pf-input"
                  value={tempWork.vehicleType}
                  onChange={(e) => setTempWork({ ...tempWork, vehicleType: e.target.value })}
                >
                  <option value="Two-Wheeler">Two-Wheeler</option>
                  <option value="Three-Wheeler">Three-Wheeler</option>
                  <option value="Four-Wheeler">Four-Wheeler</option>
                </select>
              ) : (
                <div className="pf-value"><Truck size={15} /> {user.vehicleType || 'Two-Wheeler'}</div>
              )}
            </div>
            <div className="prof-field">
              <div className="pf-label">Vehicle Registration Number</div>
              {isEditingWork ? (
                <input
                  type="text"
                  className="pf-input"
                  value={tempWork.vehicleNumber}
                  onChange={(e) => setTempWork({ ...tempWork, vehicleNumber: e.target.value })}
                />
              ) : (
                <div className="pf-value"><CreditCard size={15} /> {user.vehicleNumber || 'MH-01-BK-4512'}</div>
              )}
            </div>
            <div className="prof-field">
              <div className="pf-label">Driving License Number</div>
              {isEditingWork ? (
                <input
                  type="text"
                  className="pf-input"
                  value={tempWork.licenseNumber}
                  onChange={(e) => setTempWork({ ...tempWork, licenseNumber: e.target.value })}
                />
              ) : (
                <div className="pf-value"><Shield size={15} /> {user.licenseNumber || 'DL-2025-IND-8845'}</div>
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
        <div className="prof-section-card">
          <h3 className="prof-standalone-title">Account Actions</h3>
          <div className="account-action" onClick={handleExportData} style={{ cursor: 'pointer' }}>
            <div className="aa-title">Download My Data</div>
            <div className="aa-sub teal-link">Export all your insurance data</div>
          </div>
          <div className="account-action" onClick={() => setShowPrivacyModal(true)}>
            <div className="aa-title">Privacy Settings</div>
            <div className="aa-sub teal-link">Manage your data and privacy preferences</div>
          </div>
          <div className={`account-action ${user.coverageStatus === 'Active' ? 'danger' : 'success-action'}`} onClick={() => setShowDeactivateModal(true)}>
            <div className="aa-title">{user.coverageStatus === 'Active' ? 'Deactivate Account' : 'Reactivate Account'}</div>
            <div className="aa-sub">{user.coverageStatus === 'Active' ? 'Temporarily pause your insurance coverage' : 'Resume your insurance coverage'}</div>
          </div>
        </div>

        {/* Demo Profiles Switcher (50 Profiles) */}
        <div className="prof-section-card" style={{ marginBottom: 40 }}>
          <div className="prof-section-header">
            <h3>Demographic Demo Engine</h3>
            <span className="badge-demo">50 Active Profiles</span>
          </div>
          <p className="section-intro">Quickly switch between these 50 identities to test different risk profiles, platforms, and coverage states across the platform.</p>
          <div className="demo-profiles-strip">
            {MOCK_PROFILES.map((p, idx) => (
              <div 
                key={idx} 
                className={`demo-profile-card ${user.email === p.email ? 'active' : ''}`}
                onClick={() => {
                  updateUser(p);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <div className="demo-avatar">
                  {p.firstName[0]}{p.lastName[0]}
                  {p.coverageStatus === 'Paused' && <div className="status-dot paused" />}
                  {p.status === 'Suspended' && <div className="status-dot suspended" />}
                </div>
                <div className="demo-info">
                  <div className="demo-name">{p.fullName}</div>
                  <div className="demo-platform">{p.platform} • {p.area}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy Modal */}
        {showPrivacyModal && (
          <div className="crop-modal-overlay">
            <div className="crop-modal privacy-modal">
              <div className="crop-header">
                <h3>Privacy Settings</h3>
                <button className="close-btn" onClick={() => setShowPrivacyModal(false)}><X size={20} /></button>
              </div>
              <div className="privacy-body">
                <div className="security-item">
                  <div className="si-left">
                    <ShieldCheck size={18} className="si-icon" />
                    <div>
                      <div className="si-title">Marketing Communications</div>
                      <div className="si-sub">Receive product updates and offers</div>
                    </div>
                  </div>
                  <Toggle 
                    defaultOn={privacyPrefs.marketing} 
                    onToggle={(val) => setPrivacyPrefs({...privacyPrefs, marketing: val})} 
                  />
                </div>
                <div className="security-item">
                  <div className="si-left">
                    <AlertTriangle size={18} className="si-icon muted" />
                    <div>
                      <div className="si-title">Data Sharing</div>
                      <div className="si-sub">Share anonymized data with partners</div>
                    </div>
                  </div>
                  <Toggle 
                    defaultOn={privacyPrefs.dataSharing} 
                    onToggle={(val) => setPrivacyPrefs({...privacyPrefs, dataSharing: val})} 
                  />
                </div>
              </div>
              <div className="crop-footer">
                <button className="prof-save-btn" onClick={() => setShowPrivacyModal(false)}>Save Preferences</button>
              </div>
            </div>
          </div>
        )}

        {/* Deactivate Modal */}
        {showDeactivateModal && (
          <div className="crop-modal-overlay">
            <div className="crop-modal deactivate-modal">
              <div className="crop-header">
                <h3>{user.coverageStatus === 'Active' ? 'Confirm Deactivation' : 'Confirm Reactivation'}</h3>
                <button className="close-btn" onClick={() => setShowDeactivateModal(false)}><X size={20} /></button>
              </div>
              <div className="deactivate-body">
                <div className="warning-banner">
                  <AlertTriangle size={24} />
                  <p>
                    {user.coverageStatus === 'Active' 
                      ? "You are about to temporarily pause your insurance coverage. You will not be covered for any incidents until you reactivate."
                      : "You are about to resume your insurance coverage. Your standard premiums will apply."}
                  </p>
                </div>
                <div className="prof-field" style={{ marginTop: 20 }}>
                  <div className="pf-label">Enter Password to Confirm</div>
                  <div className="pf-input-wrap">
                    <Key size={16} className="input-icon" />
                    <input 
                      type="password" 
                      className="pf-input" 
                      placeholder="Your account password"
                      value={deactivatePass}
                      onChange={(e) => setDeactivatePass(e.target.value)}
                    />
                  </div>
                  {deactivateError && <div className="error-text">{deactivateError}</div>}
                </div>
              </div>
              <div className="crop-footer">
                <button className="prof-cancel-btn" onClick={() => setShowDeactivateModal(false)}>Cancel</button>
                <button 
                  className={user.coverageStatus === 'Active' ? 'prof-save-btn danger-bg' : 'prof-save-btn'} 
                  onClick={handleConfirmDeactivation}
                >
                  Confirm {user.coverageStatus === 'Active' ? 'Deactivation' : 'Reactivation'}
                </button>
              </div>
            </div>
          </div>
        )}

        {showCropModal && (
          <div className="crop-modal-overlay">
            <div className="crop-modal">
              <div className="crop-header">
                <h3>Adjust Profile Photo</h3>
                <button className="close-btn" onClick={() => setShowCropModal(false)}><X size={20} /></button>
              </div>
              <div className="crop-container" onMouseMove={onDrag} onMouseUp={endDrag} onMouseLeave={endDrag}>
                <div className="crop-viewfinder">
                  <div className="crop-grid-overlay" />
                  <img 
                    src={tempCropImg} 
                    alt="To Crop" 
                    className="crop-preview-img"
                    style={{
                      transform: `translate(${cropPos.x}px, ${cropPos.y}px) scale(${zoom})`,
                      transformOrigin: '0 0',
                      cursor: isDragging ? 'grabbing' : 'grab'
                    }}
                    onMouseDown={startDrag}
                    draggable="false"
                  />
                </div>
              </div>
              <div className="crop-controls">
                <div className="zoom-slider-wrap">
                  <ZoomOut size={16} />
                  <input 
                    type="range" 
                    min="1" 
                    max="3" 
                    step="0.1" 
                    value={zoom} 
                    onChange={(e) => setZoom(parseFloat(e.target.value))} 
                  />
                  <ZoomIn size={16} />
                </div>
                <div className="crop-instructions">
                  <Move size={12} /> Drag to position your photo
                </div>
              </div>
              <div className="crop-footer">
                <button className="prof-cancel-btn" onClick={() => setShowCropModal(false)}>Cancel</button>
                <button className="prof-save-btn" onClick={applyCrop}>Apply Crop</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Profile;
