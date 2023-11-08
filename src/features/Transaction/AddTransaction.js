import React, { useEffect, useState } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { HorizontalFlexBox } from '../../styles/SharedStyles';
import CurrencyTextField from '../../sharedComponents/CurrencyTextField';
import { CircularProgress } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { transactionSlice } from '../../utils/slices';

const AddTransaction = ({ actionComplete }) => {
  const currentDate = new Date();
  const [categoryId, setCategoryId] = useState('');
  const [amount, setAmount] = useState(0.0);
  const [transactionType, setTransactionType] = useState('expense');
  const [moneyPotId, setMoneyPotId] = useState('');
  const [date, setDate] = useState(currentDate);
  const dispatch = useDispatch();
  const moneyPots = useSelector((state) => state.moneyPot.items);
  const categories = useSelector((state) => state.category.items);

  const handleSubmit = (e) => {
    e.preventDefault();
    const transactionData = { name: '', categoryId, amount, transactionType, moneyPotId, transactionDate: '2022-08-10' };
    dispatch(transactionSlice.addItems(transactionData));
    if (actionComplete) actionComplete();
  };

  return (
    <form onSubmit={handleSubmit}>
      <HorizontalFlexBox>
        <FormControl>
          <InputLabel>Account</InputLabel>
          <Select name="moneyPot" value={moneyPotId} onChange={(e) => setMoneyPotId(e.target.value)}>
            {moneyPots.map((moneyPot) => (
              <MenuItem key={moneyPot.id} value={moneyPot.id}>
                {moneyPot.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel>Category Id</InputLabel>
          <Select name="categoryId" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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

        <DatePicker label="Date" value={date} onChange={(selectedDate) => setDate(selectedDate)} />
      </HorizontalFlexBox>
      <Button type="submit" className="btn-fill">
        {false ? <CircularProgress size={24} /> : 'Create'}
      </Button>
    </form>
  );
};

export default AddTransaction;
