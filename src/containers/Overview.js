import React from 'react';
import { Typography } from '@mui/material';
import { useMoneyPotsTotal } from '../utils/helpers';

export default function Overview() {
    const moneyPotsTotal = useMoneyPotsTotal()
  return (
    <>
      <h3>{moneyPotsTotal}</h3>
    </>
  );
}
