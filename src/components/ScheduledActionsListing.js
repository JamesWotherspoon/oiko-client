import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, InputLabel, MenuItem } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import EmptyDataInfo from '../sharedComponents/EmptyDataInfo';
import { useNavigate, useLocation } from 'react-router-dom';
import { selectScheduledAction } from '../utils/slices';
import LoopIcon from '@mui/icons-material/Loop';
import { categoryIconColorMapping } from '../utils/helpers';
import { format } from 'date-fns';
import { enGB } from 'date-fns/locale';

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
    <div id="scheduled-listing">
      {scheduledActions.length === 0 ? (
        <EmptyDataInfo label="scheduled actions" />
      ) : (
        <>
          {scheduledActions.map((scheduledAction) => (
            <div
              className="scheduled-listing-unit"
              key={scheduledAction.id}
              onClick={() => handleItemSelect(scheduledAction)}
            >
              <div className="category-action-name-cont">
                {scheduledAction.Category?.iconIdentifier && (
                  <div className={`category-icon-btn ${scheduledAction.Category.iconIdentifier}`}>
                    {categoryIconColorMapping(scheduledAction.Category.iconIdentifier, scheduledAction.Category.color)}
                  </div>
                )}
                {scheduledAction.name}
              </div>
              <div className="money-pot-name-amount-cont">
                <div className="amount-cont">
                  {scheduledAction.transactionType === 'positive' ? '+' : '-'}£ {scheduledAction.amount}
                </div>
              </div>
              <div className="low-level-info">
                <div className="recurrence-cont">
                  <div>{scheduledAction.MoneyPot?.name} - </div>
                  <LoopIcon />
                  {scheduledAction.recurrenceType}
                </div>
                {format(new Date(scheduledAction.nextTransactionDate), 'dd/MM/yyyy', { locale: enGB })}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default ScheduledActionsListing;
