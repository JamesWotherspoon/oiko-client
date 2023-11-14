import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, InputLabel, MenuItem } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import EmptyDataInfo from '../sharedComponents/EmptyDataInfo';
import { useNavigate, useLocation } from 'react-router-dom';
import { selectScheduledAction } from '../utils/slices';

const ScheduledActionsListing = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const scheduledActions = useSelector((state) => state.scheduledAction.items);

  const handleItemSelect = (itemData) => {
    dispatch(selectScheduledAction(itemData));
    if (location.pathname !== '/scheduled-actions') {
      navigate('/scheduled-actions');
    }
  };

  return (
    <>
      {scheduledActions.length === 0 ? (
        <EmptyDataInfo label="scheduled actions" />
      ) : (
        <TableContainer>
          <Table>
            <TableBody>
              {scheduledActions.map((scheduledAction) => (
                <TableRow key={scheduledAction.id} onClick={() => handleItemSelect(scheduledAction)}>
                  <TableCell>{scheduledAction.moneyPotId}</TableCell>
                  <TableCell>{scheduledAction.transactionType}</TableCell>
                  <TableCell>{scheduledAction.amount}</TableCell>
                  <TableCell>{scheduledAction.categoryId}</TableCell>
                  <TableCell>{scheduledAction.name}</TableCell>
                  <TableCell>{scheduledAction.recurrenceType}</TableCell>
                  <TableCell>{scheduledAction.nextTransactionDate}</TableCell>
                  <TableCell>{scheduledAction.active ? 'active' : 'Not active'}</TableCell>
                  <TableCell>{scheduledAction.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default ScheduledActionsListing;
