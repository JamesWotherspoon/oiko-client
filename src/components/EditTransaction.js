import React, { useState, useEffect } from 'react';
import CustomModal from '../sharedComponents/Modal';
import ItemCard from '../sharedComponents/ItemCard';
import { useSelector, useDispatch } from 'react-redux';
import { transactionSlice } from '../utils/slices';
import TransactionForm from '../components/forms/TransactionForm';
import TransactionsListing from './TransactionsListing';
import { selectTransaction } from '../utils/slices';

export default function EditTransaction({ handleDelete, handleUpdate, selectedTransaction }) {
  const dispatch = useDispatch();
  
  useEffect(() => {
    return () => {
      dispatch(selectTransaction({ id: null }));
    };
  }, [dispatch]);

  return (
    <div className="form-cont">
      <h5 className="modal-title">Edit Transaction</h5>
      <TransactionForm onSubmit={handleUpdate} transaction={selectedTransaction}>
        <button onClick={() => handleDelete(selectedTransaction.id)} className="delete">
          Delete
        </button>
        <button type="submit">Update</button>
      </TransactionForm>
    </div>
  );
}
