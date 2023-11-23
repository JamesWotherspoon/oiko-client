import React, { useState, useEffect } from 'react';
import ItemCard from '../sharedComponents/ItemCard';
import { useSelector, useDispatch } from 'react-redux';
import { moneyPotSlice } from '../utils/slices';
import MoneyPotForm from '../components/forms/MoneyPotForm';
import MoneyPotsListing from '../components/MoneyPotsListing';
import { useDispatchToastNotification } from '../utils/hooks';
import MonthlyChart from '../components/MonthlyChart';
import MoneyPot from '../sharedComponents/Moneypot';
import Modal from '../sharedComponents/Modal';
import { selectMoneyPot } from '../utils/slices';

export default function MoneyPots() {
  const dispatch = useDispatch();
  const dispatchToastNotification = useDispatchToastNotification();
  // Handle retrieving money pot data
  const moneyPots = useSelector((state) => state.moneyPot.items);
  const status = useSelector((state) => state.moneyPot.status);
  const error = useSelector((state) => state.moneyPot.error);
  const selectedMoneyPot = useSelector((state) => state.selectItem.selectedMoneyPot);
  const [addItem, setAddItem] = useState(false);

  const handleAdd = (ItemData) => {
    dispatch(moneyPotSlice.addResources(ItemData)).then(dispatchToastNotification);
    setAddItem(false);
  };

  const handleUpdate = (data) => {
    dispatch(moneyPotSlice.updateResource({ id: selectedMoneyPot.id, data })).then(dispatchToastNotification);
    dispatch(selectMoneyPot({ id: null }));
  };

  const handleDelete = (id) => {
    dispatch(moneyPotSlice.deleteResource(id)).then(dispatchToastNotification);
    dispatch(selectMoneyPot({ id: null }));
  };

  return (
    <main id="money-pots">
      <div className="content-header">
        <h1>Accounts</h1>
        <p>
          Explore your accounts by month and category
          <br /> or create a new custom account.
        </p>
        <button className="btn" onClick={() => setAddItem(true)}>
          Create
        </button>
      </div>
      <div className="content">
        {moneyPots.map((moneyPot) => {
          return (
            <section key={moneyPot.id} className="money-pot-section">
              <div className="money-pot-info">
                <h3 className="pot-name">{moneyPot.name}</h3>
                <h4 className="pot-balance">
                  {moneyPot.balanceType === 'negative' && '-'} £{moneyPot.balance}
                </h4>
                <p className="pot-description">{moneyPot.description}</p>
                <button
                  className="btn"
                  onClick={() => {
                    dispatch(selectMoneyPot(moneyPot));
                  }}
                >
                  Edit {moneyPot.name}
                </button>
              </div>
              <MonthlyChart moneyPotId={moneyPot.id} />
            </section>
          );
        })}
      </div>
      {addItem && (
        <Modal onClose={() => setAddItem(false)}>
          <MoneyPotForm onSubmit={handleAdd}>
            <button className="btn btn-large" type="submit">
              Add account
            </button>
          </MoneyPotForm>
        </Modal>
      )}
      {selectedMoneyPot?.id && (
        <Modal onClose={() => dispatch(selectMoneyPot({ id: null }))}>
          <MoneyPotForm onSubmit={handleUpdate} moneyPot={selectedMoneyPot}>
            <button onClick={() => handleDelete(selectedMoneyPot.id)} className="delete btn">
              Delete
            </button>
            <button type="submit" className="update btn">Update</button>
          </MoneyPotForm>
        </Modal>
      )}
    </main>
  );
}
