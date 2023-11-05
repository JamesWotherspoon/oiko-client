import React, { useEffect, useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  InputLabel,

  MenuItem,
  TextField,
  IconButton,
} from '@mui/material';
import { useTransactionApi } from '../../utils/apiHooks';
import TransactionModal from './TransactionModal';
import { HorizontalFlexBox, StyledCard, VerticalFlexBox } from '../../styles/SharedStyles';
import { StyledFormControl, StyledSelect, InputContainerBox } from './TransactionStyles';

const TransactionsCard = () => {
  const [moneyPotFilter, setMoneyPotFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [transactionTypeFilter, setTransactionTypeFilter] = useState('Both');
  const [openModal, setOpenModal] = useState(false);
  const { data: transactions, error, isRequestPending, sendRequest } = useTransactionApi(true);
  const query = {
    /*
        from,
        to,
        categoryId,
        scheduledTransactionId,
        transactionTypeFilter,
        name,
        minAmount,
        maxAmount,
        description,
        sortField,
        sortOrder,
        page,
*/
  };

  useEffect(() => {
    sendRequest('get', query);
  }, []);

  const handleMoneyPotFilterChange = (event) => {
    setMoneyPotFilter(event.target.value);
  };

  const handleCategoryFilterChange = (event) => {
    setCategoryFilter(event.target.value);
  };

  const handletransactionTypeFilterChange = (event) => {
    setTransactionTypeFilter(event.target.value);
  };

  /*const filteredTransactions = transactions.filter((transaction) => {
        if (moneyPotFilter && transaction.moneyPot !== moneyPotFilter) {
            return false;
        }
        if (categoryFilter && transaction.category !== categoryFilter) {
            return false;
        }
        if (
            transactionTypeFilter &&
            ((transactionTypeFilter === 'income' && transaction.amount < 0) ||
                (transactionTypeFilter === 'expense' && transaction.amount > 0))
        ) {
            return false;
        }
        return true;
    });*/

  return (
    <>
      {isRequestPending ? (
        'loading...'
      ) : (
        <>
          {openModal ? <TransactionModal open={openModal} handleClose={() => setOpenModal(false)} /> : null}

          <InputContainerBox>
            <StyledFormControl variant="standard">
              <InputLabel id="money-pot-filter-label">Money Pot</InputLabel>
              <StyledSelect
                autoWidth
                labelId="money-pot-filter-label"
                label="Money Pot"
                id="money-pot-filter"
                value={moneyPotFilter}
                onChange={handleMoneyPotFilterChange}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="savings">Savings</MenuItem>
                <MenuItem value="checking">Checking</MenuItem>
                <MenuItem value="credit-card">Credit Card</MenuItem>
              </StyledSelect>
            </StyledFormControl>
            <StyledFormControl variant="standard">
              <InputLabel id="category-filter-label">Category</InputLabel>
              <StyledSelect
                autoWidth
                labelId="category-filter-label"
                label="Categories"
                id="category-filter"
                value={categoryFilter}
                onChange={handleCategoryFilterChange}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="groceries">Groceries</MenuItem>
                <MenuItem value="rent">Rent</MenuItem>
                <MenuItem value="utilities">Utilities</MenuItem>
                <MenuItem value="entertainment">Entertainment</MenuItem>
              </StyledSelect>
            </StyledFormControl>
            <StyledFormControl variant="standard">
              <InputLabel id="income-expense-filter-label">Income/Expense</InputLabel>
              <StyledSelect
                autoWidth
                labelId="income-expense-filter-label"
                label="Income/Expense"
                id="income-expense-filter"
                value={transactionTypeFilter}
                onChange={handletransactionTypeFilterChange}
              >
                <MenuItem value="Both">Both</MenuItem>
                <MenuItem value="income">Income</MenuItem>
                <MenuItem value="expense">Expense</MenuItem>
              </StyledSelect>
            </StyledFormControl>
 
          </InputContainerBox>

          <TableContainer>
            <Table aria-label="transactions table">
              <TableHead>
                <TableRow>
                  <TableCell>Money Pot</TableCell>
                  <TableCell>Income/Expense</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Scheduled Transaction</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.moneyPotId}</TableCell>
                    <TableCell>{transaction.transactionType}</TableCell>
                    <TableCell>{transaction.amount}</TableCell>
                    <TableCell>{transaction.categoryId}</TableCell>
                    <TableCell>{transaction.scheduledTransactionId ? 'Yes' : 'No'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </>
  );
};

export default TransactionsCard;
