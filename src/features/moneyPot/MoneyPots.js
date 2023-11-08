import { StyledCard, StyledCardHeader, HorizontalFlexBox } from '../../styles/SharedStyles';
import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { moneyPotSlice } from '../../utils/slices';

const MoneyPots = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const moneyPots = useSelector((state) => state.moneyPot.items);
  const status = useSelector((state) => state.moneyPot.status);
  const error = useSelector((state) => state.moneyPot.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(moneyPotSlice.fetchItems());
    }
  }, [status, dispatch]);

  return (
    <>
      {status === 'pending' ? (
        'Loading...'
      ) : (
        <div className="moneyPot-unit-cont">
          {moneyPots.map((moneyPot) => (
            moneyPot.name
          ))}
        </div>
      )}
    </>
  );
};

export default MoneyPots;
