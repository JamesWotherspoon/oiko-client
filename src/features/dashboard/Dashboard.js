import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import TransactionsCard from './TransactionsCard';

export default function Dashboard() {
  const moneyPots = [];
  const transactions = [];
  const categories = [];

  return (
    <Box>
      <Box>
        <h1>MoneyPot</h1>
        <h1>categories</h1>
      </Box>
      <Box>
        <TransactionsCard />
      </Box>
    </Box>
  );
}
