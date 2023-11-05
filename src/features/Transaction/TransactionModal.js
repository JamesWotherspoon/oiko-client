import React, { useState } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CustomModal from '../../sharedComponents/CustomModal';
import { HorizontalFlexBox } from '../../styles/SharedStyles';
import CurrencyTextField from '../../sharedComponents/CurrencyTextField';

const TransactionModal = ({ open, handleClose }) => {
  const currentDate = new Date().toISOString().slice(0, 10);
  const [categoryId, setCategoryId] = useState('');
  const [amount, setAmount] = useState('0.00');
  const [transactionType, setTransactionType] = useState('expense');
  const [moneyPot, setMoneyPot] = useState('');
  const [date, setDate] = useState(currentDate);

  const handleSubmit = (e) => {
    e.preDefault();
    // handle form submission here
  };

  return (
    <CustomModal isOpen={open} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <HorizontalFlexBox>
          <TextField label="Money Pot" value={moneyPot} onChange={(e) => setMoneyPot(e.target.value)} />
          <TextField label="Category ID" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} />
        </HorizontalFlexBox>
        <HorizontalFlexBox>
          <FormControl>
            <InputLabel>Transaction Type</InputLabel>
            <Select value={transactionType} onChange={(e) => setTransactionType(e.target.value)}>
              <MenuItem value="income">Income</MenuItem>
              <MenuItem value="expense">Expense</MenuItem>
            </Select>
          </FormControl>
          <CurrencyTextField label="Amount" />

          <DatePicker label="Date" value={date} onChange={(e) => setDate(e.target.value)} />
        </HorizontalFlexBox>
        <Button type="submit" variant="contained" color="primary">
          Create
        </Button>
      </form>
    </CustomModal>
  );
};

export default TransactionModal;
