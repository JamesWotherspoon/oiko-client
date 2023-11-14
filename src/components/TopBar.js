import React, { useState } from 'react';
import AccountMenu from './AccountMenu';

const TopBar = () => {
  return (
    <div id="top-bar">
      <div className="brand-container">
        <div className="logo-container">
          <div className="bar bar-1" />
          <div className="bar bar-2" />
          <div className="bar bar-3" />
        </div>
        <h1 className="brand-name">
          <span>oi</span>
          <span className="accent-stop">ko.</span>
        </h1>
        <h3 className="brand-slogan">Make your money go futher</h3>
      </div>
      <AccountMenu />
    </div>
  );
};

export default TopBar;
