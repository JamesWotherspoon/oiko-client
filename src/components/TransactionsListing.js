import React, { useEffect, useState, useMemo } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, InputLabel, MenuItem } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import OptionsSelect from '../sharedComponents/OptionsSelect';
import EmptyDataInfo from '../sharedComponents/EmptyDataInfo';
import { selectTransaction } from '../utils/slices';
import { useNavigate, useLocation } from 'react-router-dom';
import LoopIcon from '@mui/icons-material/Loop';
import { categoryIconColorMapping } from '../utils/helpers';
import { format } from 'date-fns';
import { enGB } from 'date-fns/locale';
import { transactionSlice } from '../utils/slices';

export default function TransactionsListing() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transaction.items);
  const moneyPots = useSelector((state) => state.moneyPot.items);
  const categories = useSelector((state) => state.category.items);
  const [transactionQuery, setTransactionQuery] = useState({
    moneyPotId: 'All',
    categoryId: 'All',
    transactionType: 'Both',
  });

  useEffect(() => {
    // Remove query attr if none selected 
    const query = {...transactionQuery}
    query.moneyPotId === 'All' && delete query.moneyPotId;
    query.categoryId === 'All' && delete query.categoryId;
    query.transactionType === 'Both' && delete query.transactionType;

    dispatch(transactionSlice.fetchResources(query));
  }, [dispatch, transactionQuery]);

  const handleItemSelect = (itemData) => {
    dispatch(selectTransaction(itemData));
    if (location.pathname !== '/transactions') {
      navigate('/transactions');
    }
  };

  const handleChange = (name, value) => {
    setTransactionQuery((prevQuery) => ({
      ...prevQuery,
      [name]: value,
    }));
  };

  return (
    <div id="transaction-listing">
      <div className="query-selectors-cont">
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
            { id: 'negative', name: 'expense' },
            { id: 'positive', name: 'income' },
          ]}
        />
      </div>
      {transactions.length === 0 ? (
        <EmptyDataInfo label="transactions" />
      ) : (
        <div className="data-listing-cont">
          <TableContainer>
            <Table aria-label="transactions table">
              <TableBody className="data-listing">
                {transactions.map((transactionItem) => (
                  <TableRow key={transactionItem.id} onClick={() => handleItemSelect(transactionItem)}>
                    <TableCell className='date'>
                      {format(new Date(transactionItem.transactionDate), 'dd/MM', { locale: enGB })}
                    </TableCell>
                    <TableCell className='pot-name'>{transactionItem.MoneyPot?.name}</TableCell>
                    <TableCell className="amount">
                      {transactionItem.transactionType === 'positive' ? '+' : '-'}£ {transactionItem.amount}
                    </TableCell>
                    <TableCell>
                      {transactionItem.Category && (
                        <div className={`category-icon-btn ${transactionItem.Category.iconIdentifier}`}>
                          {categoryIconColorMapping(transactionItem.Category.iconIdentifier, transactionItem.Category.color)}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>{transactionItem.scheduledTransactionId ? <LoopIcon /> : ''}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </div>
  );
}
