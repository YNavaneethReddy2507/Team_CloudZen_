import React from 'react';
import { 
  Shield, LayoutDashboard, FileText, PieChart, AlertTriangle, 
  CreditCard, Bell, User, LogOut, TrendingUp, CloudRain, Wind, 
  MapPin, CheckCircle2, Sun, Cloud
} from 'lucide-react';
import { Link } from 'react-router-dom';
import './Alerts.css';

const Alerts = () => {
  return (
    <div className="alerts-layout dashboard-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <Shield size={24} />
          <span>DeliveryShield</span>
        </div>
        
        <div className="user-profile">
          <div className="avatar">RK</div>
          <div className="user-info">
            <span className="user-name">Rahul Kumar</span>
            <span className="user-role">Zomato Partner</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <Link to="/dashboard" className="nav-item">
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </Link>
          <Link to="/policy" className="nav-item">
            <Shield size={20} />
            <span>My Policy</span>
          </Link>
          <Link to="/premium" className="nav-item">
            <TrendingUp size={20} />
            <span>Premium Details</span>
          </Link>
          <Link to="/claims" className="nav-item">
            <FileText size={20} />
            <span>Claims</span>
          </Link>
          <Link to="/payments" className="nav-item">
            <CreditCard size={20} />
            <span>Payments</span>
          </Link>
          <Link to="/alerts" className="nav-item active">
            <Bell size={20} />
            <span>Alerts</span>
          </Link>
          <Link to="/profile" className="nav-item">
            <User size={20} />
            <span>Profile</span>
          </Link>
        </nav>

        <a href="/login" className="logout-btn">
          <LogOut size={20} />
          <span>Logout</span>
        </a>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="main-header">
          <h1>Disruption Monitoring & Alerts</h1>
          <p>Real-time weather and environmental alerts for your zone</p>
        </header>

        {/* Active Alerts */}
        <section className="active-alerts-section">
          <h3 className="section-title">Active Alerts</h3>
          
          <div className="alert-card critical">
            <div className="alert-icon-wrapper">
              <CloudRain size={24} />
            </div>
            <div className="alert-content">
              <div className="alert-header-row">
                <h4>Heavy Rain Warning</h4>
                <span className="probability-badge high">85% Probability</span>
              </div>
              <div className="alert-meta">
                <span><MapPin size={14} /> Andheri East, Mumbai</span>
                <span><AlertTriangle size={14} /> 2:00 PM - 9:00 PM Today</span>
              </div>
              <p className="alert-description">
                High disruption expected. Automatic claim will be triggered if conditions persist.
              </p>
              <div className="alert-actions">
                <button className="btn-view-details dark">View Details</button>
                <button className="btn-dismiss">Dismiss Alert</button>
              </div>
            </div>
          </div>

          <div className="alert-card warning">
            <div className="alert-icon-wrapper">
              <Wind size={24} />
            </div>
            <div className="alert-content">
              <div className="alert-header-row">
                <h4>Pollution Alert</h4>
                <span className="probability-badge medium">65% Probability</span>
              </div>
              <div className="alert-meta">
                <span><MapPin size={14} /> Multiple zones</span>
                <span><AlertTriangle size={14} /> Next 4 hours</span>
              </div>
              <p className="alert-description">
                AQI expected to reach 320. Monitor for claim eligibility.
              </p>
              <div className="alert-actions">
                <button className="btn-view-details dark">View Details</button>
                <button className="btn-dismiss">Dismiss Alert</button>
              </div>
            </div>
          </div>
        </section>

        {/* Forecast and Zone Map Grid */}
        <div className="forecast-zone-grid">
          
          {/* 5-Day Weather Forecast */}
          <section className="forecast-section">
            <h3 className="section-title">5-Day Weather Forecast</h3>
            <div className="forecast-cards">
              
              <div className="day-card active-risk">
                <div className="day-header">Today</div>
                <CloudRain size={32} className="weather-icon text-blue" />
                <div className="weather-desc">Heavy Rain</div>
                <div className="temperature">28°C</div>
                <div className="weather-stats">
                  <div className="stat-row"><span>Rainfall</span><span>75mm</span></div>
                  <div className="stat-row"><span>AQI</span><span>145</span></div>
                </div>
                <div className="risk-indicator high">High Risk</div>
              </div>

              <div className="day-card">
                <div className="day-header">Tomorrow</div>
                <CloudRain size={32} className="weather-icon text-blue" />
                <div className="weather-desc">Light Rain</div>
                <div className="temperature">29°C</div>
                <div className="weather-stats">
                  <div className="stat-row"><span>Rainfall</span><span>15mm</span></div>
                  <div className="stat-row"><span>AQI</span><span>165</span></div>
                </div>
              </div>

              <div className="day-card">
                <div className="day-header">Wed</div>
                <Cloud size={32} className="weather-icon text-yellow" />
                <div className="weather-desc">Cloudy</div>
                <div className="temperature">30°C</div>
                <div className="weather-stats">
                  <div className="stat-row"><span>Rainfall</span><span>5mm</span></div>
                  <div className="stat-row"><span>AQI</span><span>180</span></div>
                </div>
              </div>

              <div className="day-card">
                <div className="day-header">Thu</div>
                <Sun size={32} className="weather-icon text-yellow" />
                <div className="weather-desc">Partly Cloudy</div>
                <div className="temperature">31°C</div>
                <div className="weather-stats">
                  <div className="stat-row"><span>Rainfall</span><span>0mm</span></div>
                  <div className="stat-row"><span>AQI</span><span>155</span></div>
                </div>
              </div>

              <div className="day-card">
                <div className="day-header">Fri</div>
                <Sun size={32} className="weather-icon text-yellow" />
                <div className="weather-desc">Clear</div>
                <div className="temperature">32°C</div>
                <div className="weather-stats">
                  <div className="stat-row"><span>Rainfall</span><span>0mm</span></div>
                  <div className="stat-row"><span>AQI</span><span>140</span></div>
                </div>
              </div>

            </div>
          </section>

          {/* Zone Risk Map */}
          <section className="zone-risk-section">
            <h3 className="section-title">Zone Risk Map</h3>
            <div className="zone-cards-grid">
              
              <div className="zone-card critical">
                <div className="zone-header">
                  <MapPin size={16} /> <span>Andheri East</span>
                  <span className="badge-high">HIGH</span>
                </div>
                <div className="zone-stats">
                  <div className="z-stat"><span>Active Alerts</span><span>3</span></div>
                  <div className="z-stat"><span>Coverage</span><span className="text-active">Active</span></div>
                </div>
              </div>

              <div className="zone-card critical">
                <div className="zone-header">
                  <MapPin size={16} /> <span>Kurla</span>
                  <span className="badge-high">HIGH</span>
                </div>
                <div className="zone-stats">
                  <div className="z-stat"><span>Active Alerts</span><span>5</span></div>
                  <div className="z-stat"><span>Coverage</span><span className="text-active">Active</span></div>
                </div>
              </div>

              <div className="zone-card warning">
                <div className="zone-header">
                  <MapPin size={16} /> <span>Bandra</span>
                  <span className="badge-medium">MEDIUM</span>
                </div>
                <div className="zone-stats">
                  <div className="z-stat"><span>Active Alerts</span><span>2</span></div>
                  <div className="z-stat"><span>Coverage</span><span className="text-active">Active</span></div>
                </div>
              </div>

              <div className="zone-card safe">
                <div className="zone-header">
                  <MapPin size={16} /> <span>South Mumbai</span>
                  <span className="badge-low">LOW</span>
                </div>
                <div className="zone-stats">
                  <div className="z-stat"><span>Active Alerts</span><span>1</span></div>
                  <div className="z-stat"><span>Coverage</span><span className="text-active">Active</span></div>
                </div>
              </div>

              <div className="zone-card warning">
                <div className="zone-header">
                  <MapPin size={16} /> <span>Powai</span>
                  <span className="badge-medium">MEDIUM</span>
                </div>
                <div className="zone-stats">
                  <div className="z-stat"><span>Active Alerts</span><span>2</span></div>
                  <div className="z-stat"><span>Coverage</span><span className="text-active">Active</span></div>
                </div>
              </div>

            </div>
          </section>

        </div>

        {/* Recent Alert History */}
        <section className="alert-history-section">
          <h3 className="section-title">Recent Alert History</h3>
          <div className="history-list">
            
            <div className="history-item">
              <div className="h-icon-wrapper green-bg"><CloudRain size={20} className="text-green" /></div>
              <div className="h-content">
                <h4>Heavy Rainfall</h4>
                <p>March 12, 2026 • <MapPin size={12}/> Andheri East</p>
              </div>
              <div className="h-status text-right">
                <div className="status-text text-green"><CheckCircle2 size={14}/> Claim Triggered</div>
                <div className="amount">₹900</div>
              </div>
            </div>

            <div className="history-item">
              <div className="h-icon-wrapper green-bg"><Wind size={20} className="text-green" /></div>
              <div className="h-content">
                <h4>Pollution Spike</h4>
                <p>March 10, 2026 • <MapPin size={12}/> Kurla</p>
              </div>
              <div className="h-status text-right">
                <div className="status-text text-green"><CheckCircle2 size={14}/> Claim Triggered</div>
                <div className="amount">₹450</div>
              </div>
            </div>

            <div className="history-item">
              <div className="h-icon-wrapper gray-bg"><AlertTriangle size={20} className="text-gray" /></div>
              <div className="h-content">
                <h4>Traffic Disruption</h4>
                <p>March 8, 2026 • <MapPin size={12}/> Bandra</p>
              </div>
              <div className="h-status text-right">
                <div className="status-text text-gray">No Claim</div>
              </div>
            </div>

            <div className="history-item">
              <div className="h-icon-wrapper green-bg"><CloudRain size={20} className="text-green" /></div>
              <div className="h-content">
                <h4>Weather Warning</h4>
                <p>March 5, 2026 • <MapPin size={12}/> Andheri East</p>
              </div>
              <div className="h-status text-right">
                <div className="status-text text-green"><CheckCircle2 size={14}/> Claim Triggered</div>
                <div className="amount">₹450</div>
              </div>
            </div>

          </div>
        </section>

        {/* Alert Notification Settings */}
        <section className="alert-settings-section">
          <h3 className="section-title">Alert Notification Settings</h3>
          <div className="settings-list">
            
            <div className="setting-item">
              <div className="s-icon"><Bell size={20} /></div>
              <div className="s-content">
                <h4>Weather Alerts</h4>
                <p>Receive notifications for weather warnings</p>
              </div>
              <label className="toggle-switch">
                <input type="checkbox" defaultChecked />
                <span className="slider round"></span>
              </label>
            </div>

            <div className="setting-item">
              <div className="s-icon"><Bell size={20} /></div>
              <div className="s-content">
                <h4>Pollution Alerts</h4>
                <p>Get notified when AQI exceeds limits</p>
              </div>
              <label className="toggle-switch">
                <input type="checkbox" defaultChecked />
                <span className="slider round"></span>
              </label>
            </div>

            <div className="setting-item">
              <div className="s-icon"><Bell size={20} /></div>
              <div className="s-content">
                <h4>Claim Notifications</h4>
                <p>Updates on claim triggers and payouts</p>
              </div>
              <label className="toggle-switch">
                <input type="checkbox" defaultChecked />
                <span className="slider round"></span>
              </label>
            </div>

            <div className="setting-item">
              <div className="s-icon"><Bell size={20} /></div>
              <div className="s-content">
                <h4>SMS Alerts</h4>
                <p>Receive SMS for critical alerts</p>
              </div>
              <label className="toggle-switch">
                <input type="checkbox" />
                <span className="slider round"></span>
              </label>
            </div>

          </div>
        </section>

      </main>
    </div>
  );
};

export default Alerts;
