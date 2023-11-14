import React, { useState, useEffect } from 'react';
import CustomModal from '../sharedComponents/CustomModal';
import ItemCard from '../sharedComponents/ItemCard';
import { useSelector, useDispatch } from 'react-redux';
import { transactionSlice } from '../utils/slices';
import TransactionForm from '../components/forms/TransactionForm';
import TransactionsListing from '../components/TransactionListing';
import { selectMoneyPot } from '../utils/slices';
import MoneyPotForm from './forms/MoneyPotForm';

export default function EditMoneyPot({ handleDelete, handleUpdate, selectedMoneyPot }) {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      console.log('edit money pit')
      dispatch(selectMoneyPot({ id: null }));
    };
  }, [dispatch]);

  return (
    <div className="form-cont">
      <h5 className="modal-title">Edit Transaction</h5>
      <MoneyPotForm onSubmit={handleUpdate} moneyPot={selectedMoneyPot}>
        <button onClick={() => handleDelete(selectedMoneyPot.id)} className="delete">
          Delete
        </button>
        <button type="submit">Update</button>
      </MoneyPotForm>
    </div>
  );
}
