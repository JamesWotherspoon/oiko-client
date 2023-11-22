import React, { useState, useEffect } from 'react';
import CustomModal from '../sharedComponents/Modal';
import ItemCard from '../sharedComponents/ItemCard';
import { useSelector, useDispatch } from 'react-redux';
import { selectScheduledAction } from '../utils/slices';
import ScheduledActionForm from './forms/ScheduledActionForm';

export default function EditScheduledAction({ handleDelete, handleUpdate, selectedScheduledAction }) {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      console.log('clean up scheduuked')
      dispatch(selectScheduledAction({ id: null }));
    };
  }, [dispatch]);

  return (
    <div className="form-cont">
      <h5 className="modal-title">Edit Scheduled Action</h5>
      <ScheduledActionForm onSubmit={handleUpdate} scheduledAction={selectedScheduledAction}>
        <button onClick={() => handleDelete(selectedScheduledAction.id)} className="delete">
          Delete
        </button>
        <button type="submit">Update</button>
      </ScheduledActionForm>
    </div>
  );
}
