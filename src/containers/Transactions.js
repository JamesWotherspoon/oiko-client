import React, { useState, useEffect } from 'react';
import ItemCard from '../sharedComponents/ItemCard';
import { useSelector, useDispatch } from 'react-redux';
import { transactionSlice, moneyPotSlice, pastThirtyDaysSlice } from '../utils/slices';
import TransactionForm from '../components/forms/TransactionForm';
import TransactionsListing from '../components/TransactionsListing';
import EditTransaction from '../components/EditTransaction';
import { useDispatchToastNotification } from '../utils/hooks';
import MonthlyChart from '../components/MonthlyChart';
import Modal from '../sharedComponents/Modal';

export default function Transactions() {
  const dispatch = useDispatch();
  const dispatchToastNotification = useDispatchToastNotification();
  const moneyPotStatus = useSelector((state) => state.moneyPot.status);
  const status = useSelector((state) => state.transaction.status);
  const error = useSelector((state) => state.transaction.error);
  const selectedTransaction = useSelector((state) => state.selectItem.selectedTransaction);
  const [addItem, setAddItem] = useState(false);

  useEffect(() => {
    if (selectedTransaction.id) {
    }
  }, [selectedTransaction]);

  const handleAddItem = async (itemData) => {
    await dispatch(transactionSlice.addResources(itemData))
      .then((action) => {
        if (moneyPotStatus !== 'loading') {
          dispatch(moneyPotSlice.fetchResources());
        }
        dispatch(pastThirtyDaysSlice.fetchResources());
        const { id } = action.payload.data;
        dispatch(transactionSlice.fetchResourceById(id));
        return action;
      })
      .then(dispatchToastNotification);
    setAddItem(false);
  };

  const handleUpdate = (data) => {
    dispatch(transactionSlice.updateResource({ id: selectedTransaction.id, data }))
      .then((action) => {
        if (moneyPotStatus !== 'loading') {
          dispatch(moneyPotSlice.fetchResources());
        }
        dispatch(pastThirtyDaysSlice.fetchResources());
        const { id } = action.payload.data;
        dispatch(transactionSlice.fetchResourceById(id));
        return action;
      })
      .then(dispatchToastNotification);
  };

  const handleDelete = (id) => {
    dispatch(transactionSlice.deleteResource(id))
      .then((action) => {
        if (moneyPotStatus !== 'loading') {
          dispatch(moneyPotSlice.fetchResources());
        }
        dispatch(pastThirtyDaysSlice.fetchResources());
        return action;
      })
      .then(dispatchToastNotification);
  };

  return (
    <main id="transactions">
      <div className="content-header">
        <h1>Transactions</h1>
        <p>
          Explore your transactions and break down your expenses
          <br /> or create a new transaction.
        </p>
        <button className='btn' onClick={() => setAddItem(true)}>Create</button>
      </div>
      <div className="content">
        <TransactionsListing />
        <MonthlyChart />
        {addItem && (
          <Modal onClose={() => setAddItem(false)}>
            <TransactionForm onSubmit={handleAddItem}>
              <button className='btn' type="submit">Add transaction</button>
            </TransactionForm>
          </Modal>
        )}
        {false && (
          <EditTransaction
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
            selectedTransaction={selectedTransaction}
          />
        )}
      </div>
    </main>
  );
}
