import React, { useEffect, useState } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { HorizontalFlexBox } from '../../styles/SharedStyles';
import MoneyInput from '../../sharedComponents/MoneyInput';
import { CircularProgress } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { transactionSlice } from '../../utils/slices';
import CategoryUnit from '../../sharedComponents/CategoryUnit';
import { IconButton } from '@mui/material';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';

const AddTransaction = ({ actionComplete }) => {
  const currentDate = new Date();
  const dispatch = useDispatch();
  const moneyPots = useSelector((state) => state.moneyPot.items);
  const categories = useSelector((state) => state.category.items);
  const [categoryId, setCategoryId] = useState(null);
  const [amount, setAmount] = useState();
  const [transactionType, setTransactionType] = useState('expense');
  const [moneyPotId, setMoneyPotId] = useState(moneyPots[0]?.id);
  const [date, setDate] = useState(currentDate);

  const handleSubmit = (e) => {
    e.preventDefault();
    const transactionData = {
      name: '',
      categoryId,
      amount,
      transactionType,
      moneyPotId,
      transactionDate: '2022-08-10',
    };
    dispatch(transactionSlice.addItems(transactionData));
    if (actionComplete) actionComplete();
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <label className="form-sub-heading">Account</label>
        <Select name="moneyPot" variant="standard" value={moneyPotId} onChange={(e) => setMoneyPotId(e.target.value)}>
          {moneyPots.map((moneyPot) => (
            <MenuItem key={moneyPot.id} value={moneyPot.id}>
              {moneyPot.name}
            </MenuItem>
          ))}
        </Select>
      </fieldset>
      <fieldset>
        <div className='horizontal-flex'>
        <div className="transaction-type-amount-cont">
          <IconButton
            onClick={() => setTransactionType(transactionType === 'income' ? 'expense' : 'income')}
            className="expense-income-btn"
          >
            {transactionType === 'income' ? <span className="plus">+</span> : <span className="minus">-</span>}
          </IconButton>
          <MoneyInput onChange={(value) => setAmount(value)} amount={amount}/>
        </div>
        <DatePicker
            label=""
            value={date}
            onChange={(selectedDate) => setDate(selectedDate)}
            className="transaction-date-picker"
          />
          </div>
      </fieldset>
      <fieldset>
        <h5 className="form-sub-heading">
          Category <span className="info-text">(optional)</span>{' '}
        </h5>
        <div className="category-btn-cont">
          <CategoryUnit
            category={{ id: null, name: 'None', type: '' }}
            handleClick={() => setCategoryId(null)}
            selectedItem={categoryId}
          />
          {categories.map((category) => (
            <CategoryUnit
              key={category.id}
              category={category}
              handleClick={(id) => setCategoryId(id)}
              selectedItem={categoryId}
            />
          ))}
        </div>
      </fieldset>
      <div className="submit-btn-cont">
        <Button type="submit" className="btn-fill">
          {false ? <CircularProgress size={24} /> : 'Create'}
        </Button>
      </div>
    </form>
  );
};

export default AddTransaction;
