import React, { createContext, useState, useContext, useEffect } from 'react';
import { APP_USER } from '../constants/userConfig';

const UserContext = createContext();

const riskMapping = {
  'Andheri East': { level: 'Medium', score: 60, premium: 75, riskFactors: { weather: 65, safety: 75, pollution: 45, traffic: 55 }, coords: { lat: 19.1176, lon: 72.8633 } },
  'Kurla': { level: 'High Risk', score: 85, premium: 110, riskFactors: { weather: 80, safety: 90, pollution: 70, traffic: 85 }, coords: { lat: 19.0652, lon: 72.8797 } },
  'South Mumbai': { level: 'Low Risk', score: 35, premium: 55, riskFactors: { weather: 30, safety: 40, pollution: 25, traffic: 30 }, coords: { lat: 18.9067, lon: 72.8147 } },
  'Bandra': { level: 'Medium', score: 55, premium: 72, riskFactors: { weather: 60, safety: 70, pollution: 40, traffic: 50 }, coords: { lat: 19.0596, lon: 72.8295 } },
  'Powai': { level: 'Medium', score: 58, premium: 73, riskFactors: { weather: 62, safety: 72, pollution: 42, traffic: 52 }, coords: { lat: 19.1176, lon: 72.9060 } },
};

const DB_KEY = 'delivery_shield_users_db';
const ACTIVE_USER_KEY = 'delivery_shield_user';

export const UserProvider = ({ children }) => {
  const [usersList, setUsersList] = useState(() => {
    const saved = localStorage.getItem(DB_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem(ACTIVE_USER_KEY);
    const defaultUser = { 
      ...APP_USER, 
      password: '123456',
      coverageStatus: 'Active',
      planName: 'Standard Shield',
      claims: [
        { id: 'C1', type: 'Heavy Rainfall', icon: 'rain', date: 'March 12, 2026', duration: '6 hours', amount: 900, status: 'Paid', triggerTime: '2:00 PM - 8:00 PM', description: 'Rainfall exceeded 65mm/hour threshold. Automatic claim triggered.', paidOn: 'Paid on March 13, 2026 9:15 AM' }
      ],
      policyHistory: [
        { period: 'Mar 15 - Mar 22, 2026', premium: 75, status: 'Active', claims: 0, totalPayout: 0 },
        { period: 'Mar 7 - Mar 14, 2026', premium: 75, status: 'Completed', claims: 2, totalPayout: 900 }
      ],
      vehicleType: APP_USER.vehicleType || 'Two-Wheeler',
      vehicleNumber: APP_USER.vehicleNumber || 'MH-01-BK-4512',
      licenseNumber: APP_USER.licenseNumber || 'DL-2025-IND-8845',
      paymentMethods: [],
      transactions: []
    };
    return saved ? { ...defaultUser, ...JSON.parse(saved) } : defaultUser;
  });

  const [weatherData, setWeatherData] = useState({
    temp: 28,
    rainfall: 0,
    condition: 'Clear',
    nearbyZones: [],
    loading: true,
  });

  useEffect(() => {
    const fetchLiveStats = async () => {
      const area = user.area || 'Andheri East';
      const city = user.city || 'Mumbai';
      
      try {
        setWeatherData(prev => ({ ...prev, loading: true }));
        const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(area + ' ' + city)}&count=1&language=en&format=json`);
        const geoData = await geoResponse.json();
        
        let lat = 19.1176, lon = 72.8633;
        if (geoData.results && geoData.results.length > 0) {
          lat = geoData.results[0].latitude;
          lon = geoData.results[0].longitude;
        }

        const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,rain,weather_code,relative_humidity_2m,wind_speed_10m&timezone=GMT`);
        const wData = await weatherResponse.json();

        const airResponse = await fetch(`https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=us_aqi,pm2_5,pm10`);
        const aData = await airResponse.json();

        const nearbyResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=4&language=en&format=json`);
        const nearbyData = await nearbyResponse.json();
        
        let zones = [];
        if (nearbyData.results) {
          const seenNames = new Set([area.toLowerCase()]);
          zones = nearbyData.results
            .map(r => ({ ...r, normalizedName: r.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "") }))
            .filter(r => {
              const nameLower = r.normalizedName.toLowerCase();
              if (seenNames.has(nameLower)) return false;
              seenNames.add(nameLower);
              return true;
            })
            .slice(0, 3)
            .map(r => ({
              name: r.normalizedName,
              lat: r.latitude,
              lon: r.longitude,
              riskScore: Math.round(40 + Math.random() * 40), 
              activeAlerts: Math.floor(Math.random() * 3)
            }));
        }
        
        if (wData.current && aData.current) {
          const wCode = wData.current.weather_code;
          let desc = 'Clear';
          if (wCode >= 1 && wCode <= 3) desc = 'Partly Cloudy';
          if (wCode >= 51 && wCode <= 67) desc = 'Rainy';
          if (wCode >= 80) desc = 'Heavy Rain';

          setWeatherData({
            temp: Math.round(wData.current.temperature_2m),
            rainfall: wData.current.rain,
            humidity: wData.current.relative_humidity_2m,
            windSpeed: wData.current.wind_speed_10m,
            condition: desc,
            aqi: aData.current.us_aqi,
            pm25: aData.current.pm2_5,
            pm10: aData.current.pm10,
            nearbyZones: zones,
            loading: false,
          });
        }
      } catch (err) {
        console.error('Failed to fetch stats:', err);
        setWeatherData(prev => ({ ...prev, loading: false }));
      }
    };

    fetchLiveStats();
  }, [user.area, user.city]);

  const updateUser = (newData) => {
    setUser(prev => {
      const updated = { ...prev, ...newData };
      if (newData.fullName) {
        updated.firstName = newData.fullName.split(' ')[0];
        updated.avatarInitials = newData.fullName.split(' ').map(n => n[0]).join('').toUpperCase();
      }
      if (newData.platform) {
        updated.role = `${newData.platform} Partner`;
        const prefix = newData.platform.toUpperCase().slice(0,3);
        if (!updated.partnerId || !updated.partnerId.startsWith(prefix)) {
          updated.partnerId = `${prefix}-2026-CH-${Math.floor(Math.random() * 90000) + 10000}`;
        }
      }
      if (newData.area) {
        const risk = riskMapping[newData.area] || { level: 'Medium', score: 60, premium: 75 };
        updated.riskProfile = risk;
      }
      localStorage.setItem(ACTIVE_USER_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const registerUser = (userData) => {
    const exists = usersList.find(u => u.email === userData.email);
    if (exists) return { success: false, message: 'Account already exists' };

    const newUser = {
      ...APP_USER,
      ...userData,
      profileImage: null,
      role: `${userData.platform || 'Direct'} Partner`,
      partnerId: `${(userData.platform || 'DIR').toUpperCase().slice(0,3)}-2026-CH-${Math.floor(Math.random() * 90000) + 10000}`,
      status: 'Active',
      coverageStatus: 'Active',
      planName: 'Standard Shield',
      totalClaims: 0,
      memberSince: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      claims: [],
      policyHistory: [
        { period: 'Mar 15 - Mar 22, 2026', premium: 75, status: 'Active', claims: 0, totalPayout: 0 }
      ],
      paymentMethods: [],
      transactions: [],
      firstName: (userData.fullName || '').split(' ')[0],
      avatarInitials: (userData.fullName || '').split(' ').map(n => n[0]).join('').toUpperCase()
    };

    setUser(newUser);
    localStorage.setItem(ACTIVE_USER_KEY, JSON.stringify(newUser));
    setUsersList(prev => {
      const newList = [...prev, newUser];
      localStorage.setItem(DB_KEY, JSON.stringify(newList));
      return newList;
    });
    return { success: true };
  };

  const loginUser = (idAt, password) => {
    const match = usersList.find(u => (u.email === idAt || u.phone === idAt) && u.password === password);
    if (match) {
      setUser(match);
      localStorage.setItem(ACTIVE_USER_KEY, JSON.stringify(match));
      return { success: true };
    }
    if ((idAt === APP_USER.email || idAt === APP_USER.phone) && password === '123456') {
      const defaultUser = {
        ...APP_USER,
        password: '123456',
        coverageStatus: 'Active',
        planName: 'Standard Shield',
        claims: [
          { id: 'C1', type: 'Heavy Rainfall', icon: 'rain', date: 'March 12, 2026', duration: '6 hours', amount: 900, status: 'Paid', triggerTime: '2:00 PM - 8:00 PM', description: 'Rainfall exceeded 65mm/hour threshold. Automatic claim triggered.', paidOn: 'Paid on March 13, 2026 9:15 AM' }
        ],
        policyHistory: [
          { period: 'Mar 15 - Mar 22, 2026', premium: 75, status: 'Active', claims: 0, totalPayout: 0 },
          { period: 'Mar 7 - Mar 14, 2026', premium: 75, status: 'Completed', claims: 2, totalPayout: 900 },
          { period: 'Feb 28 - Mar 6, 2026', premium: 75, status: 'Completed', claims: 1, totalPayout: 450 }
        ],
        paymentMethods: [],
        transactions: []
      };
      setUser(defaultUser);
      localStorage.setItem(ACTIVE_USER_KEY, JSON.stringify(defaultUser));
      return { success: true };
    }
    return { success: false, message: 'Invalid credentials' };
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem(ACTIVE_USER_KEY);
  };

  const simulateClaim = () => {
    const types = [
      { type: 'Heavy Rainfall', icon: 'rain', amount: 900, duration: '6 hours', description: 'Rainfall exceeded 65mm/hour threshold. Automatic claim triggered.' },
      { type: 'Pollution Alert', icon: 'wind', amount: 450, duration: '4 hours', description: 'AQI exceeded 350 (hazardous level). Claim under verification.' }
    ];
    const random = types[Math.floor(Math.random() * types.length)];
    const newClaim = {
      id: `CLM-2026-${Math.floor(Math.random() * 9000) + 1000}`,
      type: random.type,
      icon: random.icon,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      amount: random.amount,
      status: 'Paid',
      duration: random.duration,
      triggerTime: '2:00 PM - 8:00 PM',
      description: random.description,
      paidOn: `Paid on ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} 9:15 AM`
    };

    const updatedHistory = [...(user.policyHistory || [])];
    if (updatedHistory.length > 0) {
      updatedHistory[0] = { ...updatedHistory[0], claims: updatedHistory[0].claims + 1, totalPayout: updatedHistory[0].totalPayout + newClaim.amount };
    }

    updateUser({ 
      claims: [newClaim, ...(user.claims || [])],
      totalClaims: (user.totalClaims || 0) + 1,
      policyHistory: updatedHistory
    });
  };

  return (
    <UserContext.Provider value={{ user, usersList, updateUser, registerUser, loginUser, logoutUser, weatherData, simulateClaim }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
