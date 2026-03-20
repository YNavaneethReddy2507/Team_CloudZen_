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

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('delivery_shield_user');
    const userData = saved ? JSON.parse(saved) : { ...APP_USER };
    
    // Ensure all users have a data structure and isolation
    if (!userData.earningsData) userData.earningsData = [];
    if (!userData.claimsData) userData.claimsData = []; // This will now store the actual claim objects
    if (!userData.recentClaims) userData.recentClaims = [];
    if (!userData.transactions) userData.transactions = [];
    
    if (!userData.paymentMethods) {
      userData.paymentMethods = [];
    }
    
    return userData;
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
        
        // Step 1: Geocoding
        const geoResponse = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(area + ' ' + city)}&count=1&language=en&format=json`
        );
        const geoData = await geoResponse.json();
        
        let lat = 19.1176;
        let lon = 72.8633;

        if (geoData.results && geoData.results.length > 0) {
          lat = geoData.results[0].latitude;
          lon = geoData.results[0].longitude;
        }

        // Step 2: Atmospheric Fetch
        const weatherResponse = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,rain,weather_code,relative_humidity_2m,wind_speed_10m&timezone=GMT`
        );
        const wData = await weatherResponse.json();

        // Step 3: Air Quality Fetch
        const airResponse = await fetch(
          `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=us_aqi,pm2_5,pm10`
        );
        const aData = await airResponse.json();

        // Step 4: Nearby Zones Fetch (City-wide search)
        const nearbyResponse = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=12&language=en&format=json`
        );
        const nearbyData = await nearbyResponse.json();
        
        let zones = [];
        const primaryZones = user.primaryZones || [];
        const otherZones = primaryZones.filter(z => z.toLowerCase() !== area.toLowerCase());

        if (otherZones.length > 0) {
          // Use primary zones for relevance
          zones = otherZones.slice(0, 3).map(zoneName => ({
            name: zoneName,
            riskScore: Math.round(30 + Math.random() * 50),
            activeAlerts: Math.floor(Math.random() * 2)
          }));
        } else if (nearbyData.results) {
          // Fallback to geocoding search if no primary zones
          const seenNames = new Set();
          seenNames.add(area.toLowerCase());
          seenNames.add(city.toLowerCase()); // Avoid showing city as a zone if we're in an area
          
          zones = nearbyData.results
            .map(r => {
              const normalized = r.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
              return { ...r, normalizedName: normalized };
            })
            .filter(r => {
              const nameLower = r.normalizedName.toLowerCase();
              if (seenNames.has(nameLower)) return false;
              if (nameLower.includes('hydarab') || nameLower.includes('haidarab')) { // Specific fix for Hyderabad redundancy
                 if (city.toLowerCase() === 'hyderabad') return false;
              }
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

          // Step 4: Dynamic Risk Adjustment (Only if not manually set)
          if (!riskMapping[area] && !user.isManualPlan) {
            const dynamicRiskScore = Math.min(95, 40 + (wData.current.rain * 5) + (aData.current.us_aqi / 10));
            updateUser({
              riskProfile: {
                level: dynamicRiskScore > 75 ? 'High Risk' : dynamicRiskScore > 45 ? 'Medium' : 'Low Risk',
                score: Math.round(dynamicRiskScore),
                premium: dynamicRiskScore > 75 ? 110 : dynamicRiskScore > 45 ? 75 : 55,
                riskFactors: { weather: Math.round(dynamicRiskScore), safety: 70, pollution: Math.min(100, aData.current.us_aqi / 2.5), traffic: 60 }
              },
              currentPremium: dynamicRiskScore > 75 ? 110 : dynamicRiskScore > 45 ? 75 : 55,
            });
          }
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

      // Sync platform and role: e.g. "Zomato" platform -> "Zomato Partner" role
      if (newData.platform) {
        updated.role = `${newData.platform} Partner`;
      } else if (newData.role) {
        // If role changed but platform didn't, infer platform from role
        updated.platform = newData.role.split(' ')[0];
      }

      // Ensure paymentMethods exist
      if (!updated.paymentMethods) {
        updated.paymentMethods = [];
      }

      // Auto-derive firstName if fullName changed
      if (newData.fullName) {
        updated.firstName = newData.fullName.split(' ')[0];
        updated.avatarInitials = newData.fullName.split(' ').map(n => n[0]).join('').toUpperCase();
      }

      // Auto-derive riskProfile if area changed
      if (newData.area) {
        const risk = riskMapping[newData.area] || { level: 'Medium', score: 60, premium: 75, riskFactors: { weather: 65, safety: 75, pollution: 45, traffic: 55 } };
        updated.riskProfile = risk;
        updated.currentPremium = risk.premium;
      }

      localStorage.setItem('delivery_shield_user', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <UserContext.Provider value={{ user, updateUser, weatherData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
