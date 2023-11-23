import React, { useState, useEffect } from 'react';
import ItemCard from '../sharedComponents/ItemCard';
import { useSelector, useDispatch } from 'react-redux';
import { scheduledActionSlice } from '../utils/slices';
import ScheduledActionForm from '../components/forms/ScheduledActionForm';
import ScheduledActionsListing from '../components/ScheduledActionsListing';
import { useDispatchToastNotification } from '../utils/hooks';
import Modal from '../sharedComponents/Modal';
import { selectScheduledAction } from '../utils/slices';

const ScheduledActions = () => {
  const dispatch = useDispatch();
  const dispatchToastNotification = useDispatchToastNotification();
  // Handle retrieving scheduled action data
  const scheduledActions = useSelector((state) => state.scheduledAction.items);
  const status = useSelector((state) => state.scheduledAction.status);
  const error = useSelector((state) => state.scheduledAction.error);
  const selectedScheduledAction = useSelector((state) => state.selectItem.selectedScheduledAction);
  const [addItem, setAddItem] = useState(false);

  const handleAdd = (scheduledActionData) => {
    dispatch(scheduledActionSlice.addResources(scheduledActionData))
      .then((action) => {
        const { id } = action.payload.data;
        dispatch(scheduledActionSlice.fetchResourceById(id));
        return action;
      })
      .then(dispatchToastNotification);
    setAddItem(false);
  };

  const handleUpdate = (scheduledActionData) => {
    dispatch(scheduledActionSlice.updateResource({ id: selectedScheduledAction.id, data: scheduledActionData }))
      .then((action) => {
        const { id } = action.payload.data;
        dispatch(scheduledActionSlice.fetchResourceById(id));
        return action;
      })
      .then(dispatchToastNotification);
      dispatch(selectScheduledAction({ id: null }))
  };

  const handleDelete = (id) => {
    dispatch(scheduledActionSlice.deleteResource(id)).then(dispatchToastNotification);
    dispatch(selectScheduledAction({ id: null }))
  };

  return (
    <main id="scheduled-actions">
      <div className="content-header">
        <h1>Schedule Transactions</h1>
        <p>
          Schedule money coming in and the bills you need to pay
          <br />
          Create a new scheduled transaction.
        </p>
        <button className="btn" onClick={() => setAddItem(true)}>
          Create
        </button>
      </div>
      <div className="content">
        <ScheduledActionsListing />
        {addItem && (
          <Modal onClose={() => setAddItem(false)}>
            <ScheduledActionForm onSubmit={handleAdd}>
              <button className="btn btn-large" type="submit">
                Create
              </button>
            </ScheduledActionForm>
          </Modal>
        )}
        {selectedScheduledAction?.id && (
          <Modal onClose={() => dispatch(selectScheduledAction({ id: null }))}>
            <ScheduledActionForm onSubmit={handleUpdate} scheduledAction={selectedScheduledAction}>
              <button onClick={() => handleDelete(selectedScheduledAction.id)} className="delete">
                Delete
              </button>
              <button type="submit">Update</button>
            </ScheduledActionForm>
          </Modal>
        )}
      </div>
    </main>
  );
};

export default ScheduledActions;
