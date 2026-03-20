import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
// import VerifyOtpPage from './pages/Auth/VerifyOtpPage'; // Removed as per request
import Dashboard from './pages/Dashboard/Dashboard';
import Policy from './pages/Policy/Policy';
import Alerts from './pages/Alerts/Alerts';
import PremiumDetails from './pages/PremiumDetails/PremiumDetails';
import Claims from './pages/Claims/Claims';
import Payments from './pages/Payments/Payments';
import Profile from './pages/Profile/Profile';

import { UserProvider } from './context/UserContext';

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            {/* <Route path="/verify-otp" element={<VerifyOtpPage />} /> */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/policy" element={<Policy />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/premium" element={<PremiumDetails />} />
            <Route path="/claims" element={<Claims />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
