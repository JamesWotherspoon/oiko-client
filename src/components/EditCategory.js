import React, { useState, useEffect } from 'react';
import CustomModal from '../sharedComponents/CustomModal';
import ItemCard from '../sharedComponents/ItemCard';
import { useSelector, useDispatch } from 'react-redux';
import { transactionSlice } from '../utils/slices';
import TransactionForm from '../components/forms/TransactionForm';
import TransactionsListing from '../components/TransactionListing';
import { selectCategory } from '../utils/slices';
import MoneyPotForm from './forms/MoneyPotForm';
import CategoryForm from './forms/CategoryForm';

export default function EditCategory({ handleDelete, handleUpdate, selectedCategory }) {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(selectCategory({ id: null }));
    };
  }, [dispatch]);

  return (
    <div className="form-cont">
      <h5 className="modal-title">Edit Transaction</h5>
      <CategoryForm onSubmit={handleUpdate} category={selectedCategory}>
        <button onClick={() => handleDelete(selectedCategory.id)} className="delete">
          Delete
        </button>
        <button type="submit">Update</button>
      </CategoryForm>
    </div>
  );
}