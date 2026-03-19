import React from 'react';
import {
  Shield, LayoutDashboard, FileText, PieChart, AlertTriangle,
  CreditCard, Bell, User, LogOut, TrendingUp, CloudRain, Wind,
  MapPin, CheckCircle2, Sun, Cloud
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import { useUser } from '../../context/UserContext';
import { XCircle } from 'lucide-react';
import './Alerts.css';

const Alerts = () => {
  const { user, weatherData } = useUser();
  const [showModal, setShowModal] = React.useState(false);
  const [modalType, setModalType] = React.useState('weather');

  return (
    <div className="alerts-layout dashboard-layout">
      <Sidebar activePage="alerts" />

      {/* Main Content */}
      <main className="main-content">
        <header className="main-header">
          <h1>Disruption Monitoring & Alerts</h1>
          <p>Real-time weather and environmental alerts for your zone</p>
        </header>

        {/* Active Alerts */}
        <section className="active-alerts-section">
          <h3 className="section-title">Active Alerts</h3>

          {user.riskProfile?.score > 40 ? (
            <div className="alert-card critical">
              <div className="alert-icon-wrapper">
                <CloudRain size={24} />
              </div>
              <div className="alert-content">
                <div className="alert-header-row">
                  <h4>{user.riskProfile.score > 70 ? 'Heavy Rain Warning' : 'Rain Alert'}</h4>
                  <span className={`probability-badge ${user.riskProfile.score > 70 ? 'high' : 'medium'}`}>
                    {user.riskProfile.score}% Probability
                  </span>
                </div>
                <div className="alert-meta">
                  <span><MapPin size={14} /> {user.area}, {user.city}</span>
                  <span><AlertTriangle size={14} /> 2:00 PM - 9:00 PM Today</span>
                </div>
                <p className="alert-description">
                  {user.riskProfile.score > 70
                    ? 'High disruption expected. Automatic claim will be triggered if conditions persist.'
                    : 'Showers expected. Monitor conditions for potential disruption.'}
                </p>
                <div className="alert-actions">
                  <button className="btn-view-details dark" onClick={() => { setModalType('weather'); setShowModal(true); }}>View Details</button>
                  <button className="btn-dismiss">Dismiss Alert</button>
                </div>
              </div>
            </div>
          ) : (
            <div className="alert-card safe">
              <div className="alert-icon-wrapper">
                <Sun size={24} />
              </div>
              <div className="alert-content">
                <div className="alert-header-row">
                  <h4>Clear Weather</h4>
                  <span className="probability-badge low">Low Risk</span>
                </div>
                <div className="alert-meta">
                  <span><MapPin size={14} /> {user.area}, {user.city}</span>
                  <span><CheckCircle2 size={14} /> Conditions: Optimal</span>
                </div>
                <p className="alert-description">
                  No significant weather disruptions predicted for your zone today.
                </p>
              </div>
            </div>
          )}

          {user.riskProfile?.riskFactors.pollution > 40 && (
            <div className="alert-card warning">
              <div className="alert-icon-wrapper">
                <Wind size={24} />
              </div>
              <div className="alert-content">
                <div className="alert-header-row">
                  <h4>Pollution Alert</h4>
                  <span className={`probability-badge ${user.riskProfile.riskFactors.pollution > 70 ? 'high' : 'medium'}`}>
                    {user.riskProfile.riskFactors.pollution}% Probability
                  </span>
                </div>
                <div className="alert-meta">
                  <span><MapPin size={14} /> {user.area} & nearby zones</span>
                  <span><AlertTriangle size={14} /> Next 4 hours</span>
                </div>
                <p className="alert-description">
                  AQI expected to reach {Math.round(user.riskProfile.riskFactors.pollution * 4 + 100)}. Monitor for claim eligibility.
                </p>
                <div className="alert-actions">
                  <button className="btn-view-details dark" onClick={() => { setModalType('pollution'); setShowModal(true); }}>View Details</button>
                  <button className="btn-dismiss">Dismiss Alert</button>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Forecast and Zone Map Grid */}
        <div className="forecast-zone-grid">

          {/* 5-Day Weather Forecast */}
          <section className="forecast-section">
            <h3 className="section-title">5-Day Weather Forecast</h3>
            <div className="forecast-cards">

              <div className={`day-card ${user.riskProfile?.score > 40 || weatherData.rainfall > 0 ? 'active-risk' : ''}`}>
                <div className="day-header">Today (Live)</div>
                {weatherData.condition === 'Heavy Rain' ? <CloudRain size={32} className="weather-icon text-blue" /> : weatherData.condition === 'Rainy' || weatherData.condition === 'Partly Cloudy' ? <Cloud size={32} className="weather-icon text-blue" /> : <Sun size={32} className="weather-icon text-yellow" />}
                <div className="weather-desc">{weatherData.loading ? 'Fetching...' : weatherData.condition}</div>
                <div className="temperature">{weatherData.loading ? '--' : weatherData.temp}°C</div>
                <div className="weather-stats">
                  <div className="stat-row"><span>Rainfall</span><span>{weatherData.loading ? '--' : weatherData.rainfall}mm</span></div>
                  <div className="stat-row"><span>AQI</span><span>{user.riskProfile?.riskFactors.pollution * 2}</span></div>
                </div>
                <div className={`risk-indicator ${weatherData.rainfall > 5 ? 'high' : 'low'}`}>
                  {weatherData.rainfall > 5 ? 'High Risk' : 'Optimal'}
                </div>
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
              {/* Primary User Area */}
              <div className={`zone-card ${user.riskProfile?.score > 70 ? 'critical' : user.riskProfile?.score > 40 ? 'warning' : 'safe'}`}>
                <div className="zone-header">
                  <MapPin size={16} /> <span>{user.area} (Your Zone)</span>
                  <span className={`badge-${user.riskProfile?.level.toLowerCase().includes('high') ? 'high' : user.riskProfile?.level.toLowerCase().includes('low') ? 'low' : 'medium'}`}>
                    {user.riskProfile?.level.toUpperCase()}
                  </span>
                </div>
                <div className="zone-stats">
                  <div className="z-stat"><span>Active Alerts</span><span>{user.riskProfile?.score > 40 ? '1' : '0'}</span></div>
                  <div className="z-stat"><span>Coverage</span><span className="text-active">Active</span></div>
                </div>
              </div>

              {/* Dynamic Nearby Zones (50km) */}
              {weatherData.nearbyZones.map((zone, idx) => (
                <div key={idx} className={`zone-card ${zone.riskScore > 70 ? 'critical' : zone.riskScore > 40 ? 'warning' : 'safe'}`}>
                  <div className="zone-header">
                    <MapPin size={16} /> <span>{zone.name}</span>
                    <span className={`badge-${zone.riskScore > 70 ? 'high' : zone.riskScore > 40 ? 'medium' : 'low'}`}>
                      {zone.riskScore > 70 ? 'HIGH' : zone.riskScore > 40 ? 'MEDIUM' : 'LOW'}
                    </span>
                  </div>
                  <div className="zone-stats">
                    <div className="z-stat"><span>Active Alerts</span><span>{zone.activeAlerts}</span></div>
                    <div className="z-stat"><span>Coverage</span><span className="text-active">Active</span></div>
                  </div>
                </div>
              ))}
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
                <p>March 12, 2026 • <MapPin size={12} /> {user.area}</p>
              </div>
              <div className="h-status text-right">
                <div className="status-text text-green"><CheckCircle2 size={14} /> Claim Triggered</div>
                <div className="amount">₹900</div>
              </div>
            </div>

            <div className="history-item">
              <div className="h-icon-wrapper green-bg"><Wind size={20} className="text-green" /></div>
              <div className="h-content">
                <h4>Pollution Spike</h4>
                <p>March 10, 2026 • <MapPin size={12} /> Kurla</p>
              </div>
              <div className="h-status text-right">
                <div className="status-text text-green"><CheckCircle2 size={14} /> Claim Triggered</div>
                <div className="amount">₹450</div>
              </div>
            </div>

            <div className="history-item">
              <div className="h-icon-wrapper gray-bg"><AlertTriangle size={20} className="text-gray" /></div>
              <div className="h-content">
                <h4>Traffic Disruption</h4>
                <p>March 8, 2026 • <MapPin size={12} /> Bandra</p>
              </div>
              <div className="h-status text-right">
                <div className="status-text text-gray">No Claim</div>
              </div>
            </div>

            <div className="history-item">
              <div className="h-icon-wrapper green-bg"><CloudRain size={20} className="text-green" /></div>
              <div className="h-content">
                <h4>Weather Warning</h4>
                <p>March 5, 2026 • <MapPin size={12} /> Andheri East</p>
              </div>
              <div className="h-status text-right">
                <div className="status-text text-green"><CheckCircle2 size={14} /> Claim Triggered</div>
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

        {/* Premium Details Modal */}
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

      </main>
    </div>
  );
};

export default Alerts;
