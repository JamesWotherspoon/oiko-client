import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { transactionSlice, scheduledActionSlice, categorySlice, moneyPotSlice, sessionSlice } from './slices';

export const useNavigateBack = () => {
  const navigate = useNavigate();
  const navigateBack = () => {
    const { referrer } = document;
    const isSameDomain = referrer && referrer.includes(window.location.origin);

    if (isSameDomain) {
      navigate(-1);
    } else {
      navigate('/dashboard');
    }
  };
  return navigateBack;
};

export function sanitizePayload(payload, keysToRemove, { removeEmptyString = true, removeNull = true } = {}) {
  return Object.entries(payload).reduce((acc, [key, value]) => {
    if (keysToRemove.includes(key) && ((removeEmptyString && value === '') || (removeNull && value === null))) {
      return acc;
    }
    acc[key] = value;
    return acc;
  }, {});
}

export const validateHelper = (schemaValidate, data) => {
  const valid = schemaValidate(data);
  let errors = {};

  if (!valid) {
    console.log(schemaValidate.errors);
    errors = schemaValidate.errors.reduce((accumulator, error) => {
      console.log(error);
      let key = error.instancePath.slice(1);
      if (!key) {
        key = error.params.missingProperty || 'unknown';
      }
      accumulator[key] = error.message;
      return accumulator;
    }, {});
  }
  return { valid, errors };
};

export const generateUniqueKey = () => {
  return Math.random().toString(36).substring(1, 9);
};

export const useClickOutside = (ref, callback) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [ref, callback]);
};

export const useFetchData = () => {
  const dispatch = useDispatch();
  const transactionStatus = useSelector((state) => state.transaction.status);
  const scheduledActionStatus = useSelector((state) => state.scheduledAction.status);
  const categoryStatus = useSelector((state) => state.transaction.status);
  const moneyPotStatus = useSelector((state) => state.moneyPot.status);

  useEffect(() => {
    if (transactionStatus === 'idle') dispatch(transactionSlice.fetchItems());
    if (scheduledActionStatus === 'idle') dispatch(scheduledActionSlice.fetchItems());
    if (categoryStatus === 'idle') dispatch(categorySlice.fetchItems());
    if (moneyPotStatus === 'idle') dispatch(moneyPotSlice.fetchItems());
  }, [categoryStatus, scheduledActionStatus, transactionStatus, moneyPotStatus, dispatch]);
};

export const useMoneyPotsTotal = () => {
  const moneyPots = useSelector(state => state.moneyPot.items);
  const [total, setTotal] = useState(0)

  useEffect(() => {
    if(moneyPots.length){
      let totalBalance = 0;
      moneyPots.forEach(moneyPot => {
        let balanceNumber = parseFloat(moneyPot.balance)
        totalBalance += balanceNumber
      })
      setTotal(totalBalance.toFixed(2))
    }
  }, [moneyPots])

  return total;
}

export const useReduxResetStates = () => {
    const dispatch = useDispatch();
  
    const reduxResetStates = () => {
      dispatch(transactionSlice.actions.reset());
      dispatch(moneyPotSlice.actions.reset());
      dispatch(categorySlice.actions.reset());
      dispatch(scheduledActionSlice.actions.reset());
    };
  
    return reduxResetStates;
}