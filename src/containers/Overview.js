import React from 'react';
import { NavLink } from 'react-router-dom';
import { Typography } from '@mui/material';
import { useMoneyPotsTotal } from '../utils/hooks';
import { useSelector } from 'react-redux';

export default function Overview() {
  const { totalBalanceType, totalBalance } = useMoneyPotsTotal();
  const pastThirtyDays = useSelector((state) => state.pastThirtyDays.data.pastThirtyDays);

  return (
    <div className="overview-panel">
      <div className="hero-content">
        <h1>Empowering Your Finances with oiko</h1>
         <p>Seamlessly manage scheduled transactions, from regular income like salaries to planned outgoings. With Oiko, take control of your financial future.</p>
      </div>
      <div className="overview-circle-cont">
        <div className="primary-circle">
          <h3 className='total-label'>Total</h3>
          <h2 className="total-balance">
            {totalBalanceType === 'negative' && '-'} £{totalBalance}
          </h2>
          <p className="change-label">Change last 30 days</p>
          <h3 className={`balance-change ${pastThirtyDays.isNegative ? 'error-color' : 'positive-color'}`}>
            {pastThirtyDays.isNegative && '-'}£ {pastThirtyDays.total}
          </h3>
        </div>
      </div>
    </div>
  );
}
