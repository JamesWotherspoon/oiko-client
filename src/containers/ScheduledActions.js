import React, { useState, useEffect } from 'react';
import ItemCard from '../sharedComponents/ItemCard';
import { useSelector, useDispatch } from 'react-redux';
import { scheduledActionSlice } from '../utils/slices';
import ScheduledActionForm from '../components/forms/ScheduledActionForm';
import ScheduledActionsListing from '../components/ScheduledActionsListing';
import EditScheduledAction from '../components/EditScheduledAction';
import { useDispatchToastNotification } from '../utils/hooks';

const ScheduledActions = () => {
  const dispatch = useDispatch();
  const dispatchToastNotification = useDispatchToastNotification()
  // Handle retrieving scheduled action data
  const scheduledActions = useSelector((state) => state.scheduledAction.items);
  const status = useSelector((state) => state.scheduledAction.status);
  const error = useSelector((state) => state.scheduledAction.error);
  const selectedScheduledAction = useSelector((state) => state.selectItem.selectedScheduledAction);
  const [displayUnit, setDisplayUnit] = useState('graphs');
  console.log(displayUnit)
  useEffect(() => {
    if (selectedScheduledAction.id) {
      setDisplayUnit('editItem');
    }
  }, [selectedScheduledAction]);

  const handleAdd = (scheduledActionData) => {
    console.log(scheduledActionData)
    dispatch(scheduledActionSlice.addResources(scheduledActionData)).then((action) => {
      const { id } = action.payload.data;
      dispatch(scheduledActionSlice.fetchResourceById(id))
      return action;
    }).then(dispatchToastNotification);
    setDisplayUnit('graphs')
  };

  const handleUpdate = (scheduledActionData) => {
    dispatch(scheduledActionSlice.updateResource({ id: selectedScheduledAction.id, data: scheduledActionData })).then((action) => {
      const { id } = action.payload.data;
      dispatch(scheduledActionSlice.fetchResourceById(id))
      return action;
    }).then(dispatchToastNotification);
    setDisplayUnit('graphs')
  };

  const handleDelete = (id) => {
    dispatch(scheduledActionSlice.deleteResource(id)).then(dispatchToastNotification);
    setDisplayUnit('graphs')
  };

  return (
    <div>
      <ItemCard className="scheduled-action-panel" title="Scheduled Actions" addItem={() => setDisplayUnit('addItem')}>
        <ScheduledActionsListing />
      </ItemCard>
      <div className="side-cont">
        {displayUnit === 'graphs' && (
          <div>
            <h5>Graphs</h5>
          </div>
        )}
        {displayUnit === 'addItem' && (
          <div className="form-cont">
            <h5 className="modal-title">Add Scheduled Action</h5>
            <ScheduledActionForm onSubmit={handleAdd}>
              <button type="submit">Create</button>
            </ScheduledActionForm>
          </div>
        )}
        {displayUnit === 'editItem' && (
          <EditScheduledAction
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
            selectedScheduledAction={selectedScheduledAction}
          />
        )}
      </div>
    </div>
  );
};

export default ScheduledActions;
