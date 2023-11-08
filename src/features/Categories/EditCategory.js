import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, CircularProgress } from '@mui/material';
import { categorySlice } from '../../utils/slices';

const EditCategory = ({ category, actionComplete }) => {
  const dispatch = useDispatch();
  // Initialize form with category data
  const [name, setName] = useState(category?.name || '');
  const [type, setType] = useState(category?.type || '');
  const [categoryImage, setCategoryImage] = useState(category?.categoryImage || '');

  useEffect(() => {
    if (category) {
      setName(category.name);
      setType(category.type);
      setCategoryImage(category.categoryImage);
    }
  }, [category]);

  const handleUpdate = (event) => {
    event.preventDefault();
    const data = { name, type };
    console.log(category)
    dispatch(categorySlice.updateItem({ id: category.id, data }));
    actionComplete(); // Close the modal after dispatch
  };

  const handleDelete = () => {
    dispatch(categorySlice.deleteItem(category.id));
    actionComplete(); // Close the modal after dispatch
  };

  return (
    
      <form onSubmit={handleUpdate}>
      <div>
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
        </div>
        <Button type="submit" variant="contained" color="primary">
          {false ? <CircularProgress size={24} /> : 'Update'}
        </Button>
        <Button onClick={handleDelete} variant="contained" color="secondary">
          {false ? <CircularProgress size={24} /> : 'Delete'}
        </Button>
      </form>
  );
};

export default EditCategory;