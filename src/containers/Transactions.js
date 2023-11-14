import React, { useState, useEffect } from 'react';
import CustomModal from '../sharedComponents/CustomModal';
import ItemCard from '../sharedComponents/ItemCard';
import { useSelector, useDispatch } from 'react-redux';
import { transactionSlice, moneyPotSlice } from '../utils/slices';
import TransactionForm from '../components/forms/TransactionForm';
import TransactionsListing from '../components/TransactionListing';
import { selectTransaction } from '../utils/slices';
import EditTransaction from '../components/EditTransaction';

export default function Transactions() {
  const dispatch = useDispatch();
  const moneyPotStatus = useSelector((state) => state.moneyPot.status);
  const status = useSelector((state) => state.transaction.status);
  const error = useSelector((state) => state.transaction.error);
  const [displayUnit, setDisplayUnit] = useState('graphs');
  const selectedTransaction = useSelector((state) => state.selectItem.selectedTransaction);
  const [queryParams, setQueryParams] = useState({});

  useEffect(() => {
    if (selectedTransaction.id) {
      setDisplayUnit('editItem');
    }
  }, [selectedTransaction]);

  const handleAddItem = async (itemData) => {
    await dispatch(transactionSlice.addItems(itemData)).then(() => {
      if (moneyPotStatus !== 'loading'){
        dispatch(moneyPotSlice.fetchItems());
      }
    })
    setDisplayUnit('graphs');
  };

  const handleUpdate = (data) => {
    dispatch(transactionSlice.updateItem({ id: selectedTransaction.id, data })).then(() => {
      if (moneyPotStatus !== 'loading'){
        dispatch(moneyPotSlice.fetchItems());
      }
    })
    setDisplayUnit('graphs');
  };

  const handleDelete = (id) => {
    dispatch(transactionSlice.deleteItem(id)).then(() => {
      if (moneyPotStatus !== 'loading'){
        dispatch(moneyPotSlice.fetchItems());
      }
    })
    setDisplayUnit('graphs');
  };

  return (
    <div className="page-content-cont">
      <ItemCard className="transaction-listing" title="Transactions" addItem={() => setDisplayUnit('addItem')}>
        <TransactionsListing handleParamsChange={(params) => setQueryParams(params)} />
      </ItemCard>
      <div className="side-cont">
        {displayUnit === 'graphs' && (
          <div>
            <h5>Graphs</h5>
          </div>
        )}
        {displayUnit === 'addItem' && (
          <div className="form-cont">
            <h5 className="modal-title">Add Transaction</h5>
            <TransactionForm onSubmit={handleAddItem}>
              <button type="submit">Create</button>
            </TransactionForm>
          </div>
        )}
        {displayUnit === 'editItem' && (
          <EditTransaction
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
            selectedTransaction={selectedTransaction}
          />
        )}
      </div>
    </div>
  );
}
