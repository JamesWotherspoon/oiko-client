import React from 'react';
import { NavLink } from 'react-router-dom';
import { Typography } from '@mui/material';
import { useMoneyPotsTotal } from '../utils/hooks';
import MonthlyChart from '../components/MonthlyChart';

export default function Overview() {
  const { totalBalanceType, totalBalance } = useMoneyPotsTotal()

  return (
    <>
      <h3>{totalBalanceType === 'negative' && '-'} £{totalBalance}</h3>
        <MonthlyChart month="11" year="2023" />
    </>
  );
}
