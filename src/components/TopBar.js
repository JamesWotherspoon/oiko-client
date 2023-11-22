import React, { useState } from 'react';
import AccountMenu from './AccountMenu';
import BrandContainer from '../sharedComponents/BrandContainer';

const TopBar = () => {
  return (
    <div id="top-bar">
      <BrandContainer />
      <AccountMenu />
    </div>
  );
};

export default TopBar;
