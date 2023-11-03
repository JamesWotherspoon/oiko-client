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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  IconButton,
} from '@mui/material';
import { useTransactionApi } from '../../utils/apiHooks';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import TransactionModal from '../Transaction/TransactionModal';

const TransactionsCard = () => {
  const [moneyPotFilter, setMoneyPotFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [transactionTypeFilter, setTransactionTypeFilter] = useState('');
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
        { openModal ? <TransactionModal open={openModal} handleClose={() => setOpenModal(false)}/> : null }
          <Card>
            <CardHeader title="Transactions" />
            <CardContent>
              <div>
                <FormControl>
                  <InputLabel id="money-pot-filter-label">Money Pot</InputLabel>
                  <Select
                    labelId="money-pot-filter-label"
                    id="money-pot-filter"
                    value={moneyPotFilter}
                    onChange={handleMoneyPotFilterChange}
                  >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="savings">Savings</MenuItem>
                    <MenuItem value="checking">Checking</MenuItem>
                    <MenuItem value="credit-card">Credit Card</MenuItem>
                  </Select>
                </FormControl>
                <FormControl>
                  <InputLabel id="category-filter-label">Category</InputLabel>
                  <Select
                    labelId="category-filter-label"
                    id="category-filter"
                    value={categoryFilter}
                    onChange={handleCategoryFilterChange}
                  >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="groceries">Groceries</MenuItem>
                    <MenuItem value="rent">Rent</MenuItem>
                    <MenuItem value="utilities">Utilities</MenuItem>
                    <MenuItem value="entertainment">Entertainment</MenuItem>
                  </Select>
                </FormControl>
                <FormControl>
                  <InputLabel id="income-expense-filter-label">Income/Expense</InputLabel>
                  <Select
                    labelId="income-expense-filter-label"
                    id="income-expense-filter"
                    value={transactionTypeFilter}
                    onChange={handletransactionTypeFilterChange}
                  >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="income">Income</MenuItem>
                    <MenuItem value="expense">Expense</MenuItem>
                  </Select>
                </FormControl>
                <TextField id="search" label="Search" type="search" variant="outlined" size="small" />
                <IconButton onClick={() => setOpenModal(true)}>
                  <AddCircleOutlineIcon />
                </IconButton>
              </div>
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
            </CardContent>
          </Card>
        </>
      )}
    </>
  );
};

export default TransactionsCard;
