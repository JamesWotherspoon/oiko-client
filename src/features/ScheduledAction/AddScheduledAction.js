import React, { useState } from 'react';
import { CircularProgress, TextField, Select, MenuItem, FormControl, InputLabel, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { scheduledActionSlice } from '../../utils/slices';

const AddScheduledAction = ({ actionComplete }) => {
  const [formData, setFormData] = useState({
    categoryId: '',
    transactionType: '',
    name: '',
    amount: '',
    recurrenceType: '',
    dayOfWeek: '',
    dateOfMonth: '',
    monthOfYear: '',
    selectedTransactionDate: '',
    active: '',
    description: '',
  });
  const dispatch = useDispatch();
  const moneyPots = useSelector((state) => state.moneyPot.items);
  const categories = useSelector((state) => state.category.items);

  const handleSubmit = (event) => {
    event.preventDefault();
    const scheduledActionData = formData;
    dispatch(scheduledActionSlice.addItems(scheduledActionData));
    if (actionComplete) actionComplete();
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="schedule-action-form">
      <TextField name="name" label="Name" value={formData.name} onChange={handleChange} />
      <div>
        <FormControl>
          <InputLabel>Account</InputLabel>
          <Select name="moneyPotId" value={formData.moneyPotId} onChange={handleChange}>
            {moneyPots.map((moneyPot) => (
              <MenuItem value={moneyPot.id}>{moneyPot.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel>Category Id</InputLabel>
          <Select name="categoryId" value={formData.categoryId} onChange={handleChange}>
            {categories.map((category) => (
              <MenuItem value={category.id}>{category.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div>
        <TextField
          name="transactionType"
          label="Transaction Type"
          value={formData.transactionType}
          onChange={handleChange}
        />
        <TextField name="amount" label="Amount" value={formData.amount} onChange={handleChange} />
      </div>
      <FormControl>
        <InputLabel>Recurrence Type</InputLabel>
        <Select name="recurrenceType" value={formData.recurrenceType} onChange={handleChange}>
          <MenuItem value="daily">Daily</MenuItem>
          <MenuItem value="weekly">Weekly</MenuItem>
          <MenuItem value="monthly">Monthly</MenuItem>
          <MenuItem value="quarterly">Quarterly</MenuItem>
          <MenuItem value="biannually">Biannually</MenuItem>
          <MenuItem value="annually">Annually</MenuItem>
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel>Day of Week</InputLabel>
        <Select name="dayOfWeek" value={formData.dayOfWeek} onChange={handleChange}>
          <MenuItem value="Sunday">Sunday</MenuItem>
          <MenuItem value="Monday">Monday</MenuItem>
          <MenuItem value="Tuesday">Tuesday</MenuItem>
          <MenuItem value="Wednesday">Wednesday</MenuItem>
          <MenuItem value="Thursday">Thursday</MenuItem>
          <MenuItem value="Friday">Friday</MenuItem>
          <MenuItem value="Saturday">Saturday</MenuItem>
        </Select>
      </FormControl>
      <TextField name="dateOfMonth" label="Date of Month" value={formData.dateOfMonth} onChange={handleChange} />
      <FormControl>
        <InputLabel>Month of Year</InputLabel>
        <Select name="monthOfYear" value={formData.monthOfYear} onChange={handleChange}>
          <MenuItem value="January">January</MenuItem>
          <MenuItem value="February">February</MenuItem>
          <MenuItem value="March">March</MenuItem>
          <MenuItem value="April">April</MenuItem>
          <MenuItem value="May">May</MenuItem>
          <MenuItem value="June">June</MenuItem>
          <MenuItem value="July">July</MenuItem>
          <MenuItem value="August">August</MenuItem>
          <MenuItem value="September">September</MenuItem>
          <MenuItem value="October">October</MenuItem>
          <MenuItem value="November">November</MenuItem>
          <MenuItem value="December">December</MenuItem>
        </Select>
      </FormControl>
      <TextField
        name="selectedTransactionDate"
        label="Selected Transaction Date"
        value={formData.selectedTransactionDate}
        onChange={handleChange}
      />
      <FormControl>
        <InputLabel>Active</InputLabel>
        <Select name="active" value={formData.active} onChange={handleChange}>
          <MenuItem value={true}>Yes</MenuItem>
          <MenuItem value={false}>No</MenuItem>
        </Select>
      </FormControl>
      <TextField name="description" label="Description" value={formData.description} onChange={handleChange} />
      <button type="submit" className="btn-fill">
        {false ? <CircularProgress size={24} /> : 'Submit'}
      </button>
    </form>
  );
};

export default AddScheduledAction;
