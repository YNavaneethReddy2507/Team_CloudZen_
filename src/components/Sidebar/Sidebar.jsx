import React from 'react';
import {
  Shield, LayoutDashboard, FileText,
  CreditCard, Bell, User, LogOut, TrendingUp
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import './Sidebar.css';

const Sidebar = ({ activePage }) => {
  const { user, logoutUser } = useUser();

  const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard', id: 'dashboard' },
    { name: 'My Policy', icon: <Shield size={20} />, path: '/policy', id: 'policy' },
    { name: 'Premium Details', icon: <TrendingUp size={20} />, path: '/premium', id: 'premium' },
    { name: 'Claims', icon: <FileText size={20} />, path: '/claims', id: 'claims' },
    { name: 'Payments', icon: <CreditCard size={20} />, path: '/payments', id: 'payments' },
    { name: 'Alerts', icon: <Bell size={20} />, path: '/alerts', id: 'alerts' },
    { name: 'Profile', icon: <User size={20} />, path: '/profile', id: 'profile' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <img src="/logo.png" alt="ShieldPath" className="sidebar-logo-img" />
        <span>ShieldPath</span>
      </div>

      <div className="user-profile">
        <div className="avatar-container">
          <div className="avatar">
            {user.profileImage ? (
              <img src={user.profileImage} alt="Profile" className="avatar-img" />
            ) : (
              (user.fullName || 'User').split(' ').map(n => n[0]).join('')
            )}
          </div>
        </div>
        <div className="user-info">
          <span className="user-name">{user.fullName}</span>
          <span className="user-role">{user.role}</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <Link
            key={item.id}
            to={item.path}
            className={`nav-item ${activePage === item.id ? 'active' : ''}`}
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>

      <Link 
        to="/login" 
        className="logout-btn"
        onClick={() => logoutUser()}
      >
        <LogOut size={20} />
        <span>Logout</span>
      </Link>
    </aside>
  );
};

export default Sidebar;
