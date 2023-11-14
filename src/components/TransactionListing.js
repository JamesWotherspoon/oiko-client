import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, InputLabel, MenuItem } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import OptionsSelect from '../sharedComponents/OptionsSelect';
import EmptyDataInfo from '../sharedComponents/EmptyDataInfo';
import { selectTransaction } from '../utils/slices';
import { useNavigate, useLocation } from 'react-router-dom';

const TransactionsListing = ({ handleParamChange }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const transactions = useSelector((state) => state.transaction.items);
  const dispatch = useDispatch();
  const moneyPots = useSelector((state) => state.moneyPot.items);
  const categories = useSelector((state) => state.category.items);
  const [transactionQuery, setTransactionQuery] = useState({
    moneyPotId: 'All',
    categoryId: 'All',
    transactionType: 'Both',
  });

  const handleItemSelect = (itemData) => {
    dispatch(selectTransaction(itemData))
    if(location.pathname !== '/transactions'){
      navigate('/transactions')
    }
  }

  const handleChange = (name, value) => {
    setTransactionQuery((prevQuery) => ({
      ...prevQuery,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="horizontal-flex">
        <OptionsSelect
          label="Account"
          selectedId={transactionQuery.moneyPotId}
          handleSelectedIdChange={(value) => handleChange('moneyPotId', value)}
          options={[{ id: 'All', name: 'All' }, ...moneyPots]}
        />
        <OptionsSelect
          label="Category"
          selectedId={transactionQuery.categoryId}
          handleSelectedIdChange={(value) => handleChange('categoryId', value)}
          options={[{ id: 'All', name: 'All' }, ...categories]}
        />
        <OptionsSelect
          label="Type"
          selectedId={transactionQuery.transactionType}
          handleSelectedIdChange={(value) => handleChange('transactionType', value)}
          options={[
            { id: 'Both', name: 'Both' },
            { id: 'expense', name: 'expense' },
            { id: 'income', name: 'income' },
          ]}
        />
      </div>
      {transactions.length === 0 ? <EmptyDataInfo label="transactions" /> :
      <div className="data-listing-cont">
        <TableContainer>
          <Table aria-label="transactions table">
            <TableBody className="data-listing">
              {transactions.map((transactionItem) => (
                <TableRow key={transactionItem.id} onClick={() => handleItemSelect(transactionItem)}>
                  <TableCell>{transactionItem.moneyPotId}</TableCell>
                  <TableCell>{transactionItem.transactionType}</TableCell>
                  <TableCell>{transactionItem.amount}</TableCell>
                  <TableCell>{transactionItem.categoryId}</TableCell>
                  <TableCell>{transactionItem.scheduledTransactionId ? 'Yes' : 'No'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div> }
    </>
  );
};

export default TransactionsListing;
