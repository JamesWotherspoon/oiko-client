import React, { useState, useEffect } from 'react';
import ItemCard from '../sharedComponents/ItemCard';
import { useSelector, useDispatch } from 'react-redux';
import { transactionSlice, moneyPotSlice } from '../utils/slices';
import TransactionForm from '../components/forms/TransactionForm';
import TransactionsListing from '../components/TransactionsListing';
import EditTransaction from '../components/EditTransaction';
import { useDispatchToastNotification } from '../utils/hooks';

export default function Transactions() {
  const dispatch = useDispatch();
  const dispatchToastNotification = useDispatchToastNotification();
  const moneyPotStatus = useSelector((state) => state.moneyPot.status);
  const status = useSelector((state) => state.transaction.status);
  const error = useSelector((state) => state.transaction.error);
  const [displayUnit, setDisplayUnit] = useState('graphs');
  const selectedTransaction = useSelector((state) => state.selectItem.selectedTransaction);

  useEffect(() => {
    if (selectedTransaction.id) {
      setDisplayUnit('editItem');
    }
  }, [selectedTransaction]);

  const handleAddItem = async (itemData) => {
    await dispatch(transactionSlice.addResources(itemData))
      .then((action) => {
        if (moneyPotStatus !== 'loading') {
          dispatch(moneyPotSlice.fetchResources());
        }
        const { id } = action.payload.data;
        dispatch(transactionSlice.fetchResourceById(id));
        return action;
      })
      .then(dispatchToastNotification);
    setDisplayUnit('graphs');
  };

  const handleUpdate = (data) => {
    dispatch(transactionSlice.updateResource({ id: selectedTransaction.id, data }))
      .then((action) => {
        if (moneyPotStatus !== 'loading') {
          dispatch(moneyPotSlice.fetchResources());
        }
        const { id } = action.payload.data;
        dispatch(transactionSlice.fetchResourceById(id));
        return action;
      })
      .then(dispatchToastNotification);
    setDisplayUnit('graphs');
  };

  const handleDelete = (id) => {
    dispatch(transactionSlice.deleteResource(id))
      .then((action) => {
        if (moneyPotStatus !== 'loading') {
          dispatch(moneyPotSlice.fetchResources());
        }
        return action;
      })
      .then(dispatchToastNotification);
    setDisplayUnit('graphs');
  };

  return (
    <div className="page-content-cont ">
      <ItemCard className="transaction-listing" title="Transactions" addItem={() => setDisplayUnit('addItem')}>
        <TransactionsListing />
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
