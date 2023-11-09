import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, CircularProgress } from '@mui/material';
import { transactionSlice } from '../../utils/slices';
import FormTransaction from './FormTransaction';

const EditTransaction = ({ transaction, actionComplete }) => {
  const dispatch = useDispatch();

  const handleUpdate = (formData) => {
    dispatch(transactionSlice.updateItem({ id: transaction.id, formData }));
    actionComplete(); // Close the modal after dispatch
  };

  const handleDelete = () => {
    dispatch(transactionSlice.deleteItem(transaction.id));
    actionComplete(); // Close the modal after dispatch
  };

  return (
    <FormTransaction onSubmit={handleUpdate} transaction={transaction}>
      <Button type="submit" variant="contained" color="primary">
        {false ? <CircularProgress size={24} /> : 'Update'}
      </Button>
      <Button type="button" onClick={handleDelete} variant="contained">
        {false ? <CircularProgress size={24} /> : 'Delete'}
      </Button>
    </FormTransaction>
  );
};

export default EditTransaction;
