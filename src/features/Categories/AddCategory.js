import React, { useState } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { CircularProgress } from '@mui/material';
import { useDispatch } from 'react-redux';
import { categorySlice } from '../../utils/slices';

const AddCategory = ({ actionComplete }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('expense');
  const [categoryImage, setCategoryImage] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const categoryData = { name, type };
    dispatch(categorySlice.addItems(categoryData));
    if (actionComplete) actionComplete();
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl>
        <InputLabel>Category Name</InputLabel>
        <Select value={name} onChange={(e) => setName(e.target.value)}>
          <MenuItem value="groceries">Groceries</MenuItem>
          <MenuItem value="housing">Housing</MenuItem>
          <MenuItem value="transportation">Transportation</MenuItem>
          <MenuItem value="utilities">Utilities</MenuItem>
          <MenuItem value="entertainment">Entertainment</MenuItem>
          <MenuItem value="healthcare">Healthcare</MenuItem>
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel>Transaction Type</InputLabel>
        <Select value={type} onChange={(e) => setType(e.target.value)}>
          <MenuItem value="income">Income</MenuItem>
          <MenuItem value="expense">Expense</MenuItem>
        </Select>
      </FormControl>
      <button type="submit" className="btn-fill">
        {false ? <CircularProgress size={24} /> : 'Create'}
      </button>
    </form>
  );
};

export default AddCategory;
