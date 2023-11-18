import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, InputLabel, MenuItem } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import OptionsSelect from '../sharedComponents/OptionsSelect';
import EmptyDataInfo from '../sharedComponents/EmptyDataInfo';
import { useNavigate, useLocation } from 'react-router-dom';
import { selectMoneyPot } from '../utils/slices';
import MonthlyChart from './MonthlyChart';

const MoneyPotsListing = ({ data }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch();
  const moneyPots = useSelector((state) => state.moneyPot.items);


  const handleItemSelect = (itemData) => {
    dispatch(selectMoneyPot(itemData))
    if(location.pathname !== '/accounts'){
      navigate('/accounts')
    }
  }

  return (
    <>
      {moneyPots.length === 0 ? (
        <EmptyDataInfo label="accounts" />
      ) : (
        <div className="data-listing-cont">
          {moneyPots.map((moneyPotItem) => {
            return (
              <div key={moneyPotItem.id} onClick={() => handleItemSelect(moneyPotItem)}>
                <div>{moneyPotItem.name}</div>
                <div>{moneyPotItem.balance}</div>
                <MonthlyChart moneyPotId={moneyPotItem.id} />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default MoneyPotsListing;
