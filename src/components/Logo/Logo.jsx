import React from 'react';
import logo from '../../assets/logo.jpg';

const Logo = ({ size = 32, className = "" }) => {
  return (
    <img 
      src={logo} 
      alt="ShieldPath Logo" 
      style={{ width: size, height: 'auto', display: 'block' }}
      className={`app-logo ${className}`}
    />
  );
};

export default Logo;
