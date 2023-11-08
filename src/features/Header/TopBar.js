import React from 'react';
import { Typography, Button } from '@mui/material';

const TopBar = () => {
  return (
    <div id="top-bar">
      <div className="brand-container">

        <div className="logo-container">
          <div className="bar bar-1" />
          <div className="bar bar-2" />
          <div className="bar bar-3" />
        </div>
        <h1 className='brand-name'>
          <span>oi</span>
          <span className="accent-stop">ko.</span>
        </h1>
        <h3 className="brand-slogan">Make your money go futher</h3>
      </div>
      <div>
        <div className="auth-container">
          <button type="submit" className='btn-outline'>
            Log in
          </button>
          <button type="submit" className='btn-fill'>Sign up</button>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
