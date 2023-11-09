import React, { useState, useEffect } from 'react';
import CustomModal from '../sharedComponents/CustomModal';
import TransactionsDisplay from '../features/Transaction/Transactions';
import ItemCard from '../sharedComponents/ItemCard';
import { useSelector, useDispatch } from 'react-redux';
import { transactionSlice } from '../utils/slices';
import TransactionForm from '../components/forms/TransactionForm';

export default function Transactions() {
  const dispatch = useDispatch();
  // Handle retrieving transaction data
  const transactions = useSelector((state) => state.transaction.items);
  const status = useSelector((state) => state.transaction.status);
  const error = useSelector((state) => state.transaction.error);

  const [queryParams, setQueryParams] = useState({});

  const [addItem, setAddItem] = useState(false);
  const [editItem, setEditItem] = useState();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(transactionSlice.fetchItems());
    }
  }, [status, dispatch, queryParams]);

  const handleAdd = (transactionData) => {
    dispatch(transactionSlice.addItems(transactionData));
    setAddItem(false);
  };

  const handleUpdate = (id, formData) => {
    dispatch(transactionSlice.updateItem({ id, formData }));
    setEditItem();
  };

  const handleDelete = (id) => {
    dispatch(transactionSlice.deleteItem(id));
    setEditItem();
  };

  return (
    <div>
      <ItemCard className="transaction-panel" title="Transactions" addItem={() => setAddItem(true)} modalContent={true}>
        {/* <TransactionsDisplay
          data={transactions}
          handleItemSelect={(itemData) => setEditItem(itemData)}
          handleParamsChange={(params) => setQueryParams(params)}
        /> */}
      </ItemCard>
      {addItem && (
        <CustomModal title="Add Transaction" onClose={() => setAddItem(false)}>
          <TransactionForm onSubmit={handleAdd}>
            <button type="submit">Add</button>
          </TransactionForm>
        </CustomModal>
      )}
      {editItem && (
        <CustomModal title="Edit Transaction" onClose={() => setEditItem()}>
          <TransactionForm onSubmit={handleUpdate} itemData={editItem}>
            <button type="submit">Update</button>
            <button onClick={() => handleDelete(editItem.id)}>Delete</button>
          </TransactionForm>
        </CustomModal>
      )}
    </div>
  );
};
