import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { transactionSlice, scheduledActionSlice, categorySlice, moneyPotSlice, sessionSlice, chartDataSlice } from './slices';
import { setNotification } from './slices';
import GroceriesSvg from '@mui/icons-material/LocalGroceryStore';
import ClothesSvg from '@mui/icons-material/ShoppingBag';
import DiningSvg from '@mui/icons-material/Restaurant';
import DrinksSvg from '@mui/icons-material/LocalBar';
import PetsSvg from '@mui/icons-material/Pets';
import HolidaysSvg from '@mui/icons-material/Flight';
import CommuteSvg from '@mui/icons-material/DirectionsCar';
import DefaultSvg from '@mui/icons-material/Category';
import RentSvg from '@mui/icons-material/HouseSiding';
import BillsSvg from '@mui/icons-material/Water';

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
    if (transactionStatus === 'idle') dispatch(transactionSlice.fetchResources());
    if (scheduledActionStatus === 'idle') dispatch(scheduledActionSlice.fetchResources());
    if (categoryStatus === 'idle') dispatch(categorySlice.fetchResources());
    if (moneyPotStatus === 'idle') dispatch(moneyPotSlice.fetchResources());
  }, [categoryStatus, scheduledActionStatus, transactionStatus, moneyPotStatus, dispatch]);
};

export const useMoneyPotsTotal = () => {
  const moneyPots = useSelector((state) => state.moneyPot.items);
  const [totalBalance, setTotalBalance] = useState(0);
  const [totalBalanceType, setTotalBalanceType] = useState('positive');

  useEffect(() => {
    if (moneyPots.length) {
      let balance = 0;
      moneyPots.forEach((moneyPot) => {
        let balanceNumber = parseFloat(moneyPot.balance);
        if (moneyPot.balanceType === 'negative') {
          balance -= balanceNumber;
        } else if (moneyPot.balanceType === 'positive') {
          balance += balanceNumber;
        }
      });
      if (balance < 0) {
        setTotalBalanceType('negative');
      }
      balance = Math.abs(balance);
      balance = balance.toFixed(2);
      setTotalBalance(balance);
    }
  }, [moneyPots, totalBalance]);

  return { totalBalanceType, totalBalance };
};

export const useReduxResetStates = () => {
  const dispatch = useDispatch();

  const reduxResetStates = () => {
    dispatch(transactionSlice.actions.reset());
    dispatch(moneyPotSlice.actions.reset());
    dispatch(categorySlice.actions.reset());
    dispatch(scheduledActionSlice.actions.reset());
  };

  return reduxResetStates;
};

export const useDispatchToastNotification = () => {
  const dispatch = useDispatch();

  const dispatchToastNotification = (action) => {
    if (action.type.endsWith('/fulfilled')) {
      dispatch(setNotification({ message: action.payload.message, type: 'success' }));
    } else if (action.type.endsWith('/rejected')) {
      console.log(action);
      dispatch(setNotification({ message: 'Unsuccesful', type: 'error' }));
    }
  };
  return dispatchToastNotification;
};