import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  InputLabel,
  MenuItem,

} from '@mui/material';
import { StyledFormControl, StyledSelect, InputContainerBox } from './TransactionStyles';
import { transactionSlice } from '../../utils/slices';
import { useSelector, useDispatch } from 'react-redux';
import CustomModal from '../../sharedComponents/CustomModal';
import EditTransaction from './EditTransaction';

const TransactionsCard = () => {
  const [moneyPotFilter, setMoneyPotFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [transactionTypeFilter, setTransactionTypeFilter] = useState('Both');
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transaction.items);
  const status = useSelector((state) => state.transaction.status);
  const error = useSelector((state) => state.transaction.error);

  const [openModal, setOpenModal] = useState({
    isOpen: false,
    transaction: undefined,
  });
  const handleOpenModal = (transaction) => {
    setOpenModal({ isOpen: true, transaction });
  };
  const handleCloseModal = () => {
    setOpenModal({ isOpen: false, transaction: null });
  };

  useEffect(() => {
    if (status === 'idle') {
      dispatch(transactionSlice.fetchItems());
    }
  }, [status, dispatch]);

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
      {false ? (
        'loading...'
      ) : (
        <>
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
<>
                  <TableRow key={transaction.id} onClick={() => handleOpenModal(transaction)}>
                    <TableCell>{transaction.moneyPotId}</TableCell>
                    <TableCell>{transaction.transactionType}</TableCell>
                    <TableCell>{transaction.amount}</TableCell>
                    <TableCell>{transaction.categoryId}</TableCell>
                    <TableCell>{transaction.scheduledTransactionId ? 'Yes' : 'No'}</TableCell>
                  </TableRow>
                  </>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {openModal.isOpen &&
          <CustomModal title={`Edit Transaction`} onClose={handleCloseModal}>
            <EditTransaction transaction={openModal.transaction} actionComplete={handleCloseModal} />
          </CustomModal>
          }
        </>
      )}
    </>
  );
};

export default TransactionsCard;
