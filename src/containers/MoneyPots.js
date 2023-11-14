import React, { useState, useEffect } from 'react';
import CustomModal from '../sharedComponents/CustomModal';
import ItemCard from '../sharedComponents/ItemCard';
import { useSelector, useDispatch } from 'react-redux';
import { moneyPotSlice } from '../utils/slices';
import MoneyPotForm from '../components/forms/MoneyPotForm';
import MoneyPotsListing from '../components/MoneyPotsListing';
import EditMoneyPot from '../components/EditMoneyPot';

export default function MoneyPots() {
  const dispatch = useDispatch();
  // Handle retrieving money pot data
  const moneyPots = useSelector((state) => state.moneyPot.items);
  const status = useSelector((state) => state.moneyPot.status);
  const error = useSelector((state) => state.moneyPot.error);
  const [displayUnit, setDisplayUnit] = useState('graphs');
  const selectedMoneyPot = useSelector((state) => state.selectItem.selectedMoneyPot);

  useEffect(() => {

    if (selectedMoneyPot.id) {
      setDisplayUnit('editItem');
    }
  }, [selectedMoneyPot]);

  const handleAdd = (ItemData) => {
    dispatch(moneyPotSlice.addItems(ItemData));
    setDisplayUnit('graphs');
  };

  const handleUpdate = (data) => {
    dispatch(moneyPotSlice.updateItem({ id: selectedMoneyPot.id, data }));
    setDisplayUnit('graphs');
  };

  const handleDelete = (id) => {
    dispatch(moneyPotSlice.deleteItem(id));
    setDisplayUnit('graphs');
  };

  return (
    <div>
      <ItemCard className="money-pot-panel" title="Money Pots" addItem={() => setDisplayUnit('addItem')}>
        <MoneyPotsListing />
      </ItemCard>
      <div className="side-cont">
        {displayUnit === 'graphs' && (
          <div>
            <h5>Graphs</h5>
          </div>
        )}
        {displayUnit === 'addItem' && (
          <div className="form-cont">
          <h5 className="modal-title">Add Account</h5>
          <MoneyPotForm onSubmit={handleAdd}>
              <button type="submit">Create</button>
            </MoneyPotForm>
          </div>
        )}
        {displayUnit === 'editItem' && <EditMoneyPot handleUpdate={handleUpdate} handleDelete={handleDelete} selectedMoneyPot={selectedMoneyPot} />}
      </div>
    </div>
  );
}
