import React from 'react';
import { NavLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import SettingsIcon from '@mui/icons-material/Settings';

export default function Nav() {
  return (
    <nav>
      <NavLink exact="true" to="/dashboard" activeclassname="selected" className="nav-item">
        <HomeIcon />
        <span className="nav-label">Home</span>
        <div className='nav-underline'></div>
      </NavLink>
      <NavLink exact="true" to="/accounts" activeclassname="selected" className="nav-item">
        <AccountBalanceIcon />
        <span className="nav-label">Accounts</span>
        <div className='nav-underline'></div>
      </NavLink>
      <NavLink exact="true" to="/transactions" activeclassname="selected" className="nav-item">
        <CreditCardIcon />
        <span className="nav-label">Transactions</span>
        <div className='nav-underline'></div>
      </NavLink>
      <NavLink exact="true" to="/scheduled-actions" activeclassname="selected" className="nav-item">
        <SettingsIcon />
        <span className="nav-label">Scheduled Action</span>
        <div className='nav-underline'></div>
      </NavLink>
      <NavLink exact="true" to="/categories" activeclassname="selected" className="nav-item">
        <SettingsIcon />
        <span className="nav-label">Categories</span>
        <div className='nav-underline'></div>
      </NavLink>
    </nav>
  );
}
