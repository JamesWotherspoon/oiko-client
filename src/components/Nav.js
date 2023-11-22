import React from 'react';
import { NavLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import SettingsIcon from '@mui/icons-material/Settings';
import LoopIcon from '@mui/icons-material/Loop';
import AppsIcon from '@mui/icons-material/Apps';

export default function Nav() {
  return (
    <nav>
      <NavLink exact="true" to="/dashboard" activeclassname="selected" className="nav-item">
        <HomeIcon />
        <span className="nav-label">
          Home
          <div className="nav-underline"></div>
        </span>
      </NavLink>
      <NavLink exact="true" to="/accounts" activeclassname="selected" className="nav-item">
        <AccountBalanceIcon />
        <span className="nav-label">
          Accounts
          <div className="nav-underline"></div>
        </span>
      </NavLink>
      <NavLink exact="true" to="/transactions" activeclassname="selected" className="nav-item">
        <CreditCardIcon />
        <span className="nav-label">
          Transactions
          <div className="nav-underline"></div>
        </span>
      </NavLink>
      <NavLink exact="true" to="/scheduled-actions" activeclassname="selected" className="nav-item">
        <LoopIcon />
        <span className="nav-label">
          Scheduled
          <div className="nav-underline"></div>
        </span>
      </NavLink>
      <NavLink exact="true" to="/categories" activeclassname="selected" className="nav-item">
        <AppsIcon />
        <span className="nav-label">
          Categories
          <div className="nav-underline"></div>
        </span>
      </NavLink>
    </nav>
  );
}
