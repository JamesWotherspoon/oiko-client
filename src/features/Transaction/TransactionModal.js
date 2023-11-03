import React, { useState } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import CustomModal from '../../sharedComponents/CustomModal';

const TransactionModal = ({ open, handleClose }) => {
  const [categoryId, setCategoryId] = useState('');
  const [amount, setAmount] = useState('');
  const [transactionType, setTransactionType] = useState('');
  const [moneyPot, setMoneyPot] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // handle form submission here
  };

  return (
    <CustomModal isOpen={open} onClose={handleClose} >
      <form onSubmit={handleSubmit}>
        <TextField label="Category ID" value={categoryId} onChange={(event) => setCategoryId(event.target.value)} />
        <TextField label="Amount" value={amount} onChange={(event) => setAmount(event.target.value)} />
        <FormControl>
          <InputLabel>Transaction Type</InputLabel>
          <Select value={transactionType} onChange={(event) => setTransactionType(event.target.value)}>
            <MenuItem value="income">Income</MenuItem>
            <MenuItem value="expense">Expense</MenuItem>
          </Select>
        </FormControl>
        <TextField label="Money Pot" value={moneyPot} onChange={(event) => setMoneyPot(event.target.value)} />
        <TextField
          label="Date"
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </CustomModal>
  );
};

export default TransactionModal;
