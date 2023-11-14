import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sessionSlice } from './slices';
import { login } from './actionsReducers';
import { transactionSlice, scheduledActionSlice, categorySlice, moneyPotSlice } from './slices';

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

export const useAuthStatus = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.session.isAuthenticated);
  const item = useSelector((state) => state.session.items);
  const status = useSelector((state) => state.session.status);
  const error = useSelector((state) => state.session.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(sessionSlice.fetchItems()).then((response) => {
        if (response.payload.isAuthenticated) {
          dispatch(login());
          navigate('/dashboard');
        }
      });
    }
  }, [status, dispatch, navigate]);

  return { isAuthenticated, status, error };
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
  const sessionStatus = useSelector((state) => state.session.status);
  const transactionStatus = useSelector((state) => state.transaction.status);
  const scheduledActionStatus = useSelector((state) => state.scheduledAction.status);
  const categoryStatus = useSelector((state) => state.transaction.status);
  const moneyPotStatus = useSelector((state) => state.moneyPot.status);

  useEffect(() => {
    if (sessionStatus === 'idle') dispatch(sessionSlice.fetchItems());
    if (transactionStatus === 'idle') dispatch(transactionSlice.fetchItems());
    if (scheduledActionStatus === 'idle') dispatch(scheduledActionSlice.fetchItems());
    if (categoryStatus === 'idle') dispatch(categorySlice.fetchItems());
    if (moneyPotStatus === 'idle') dispatch(moneyPotSlice.fetchItems());
  }, [categoryStatus, scheduledActionStatus, sessionStatus, transactionStatus, moneyPotStatus, dispatch]);
};

