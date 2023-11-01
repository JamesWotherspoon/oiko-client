import axios from 'axios';
import { useState, useCallback } from 'react';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 2000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

const createApiHook = (endpoint) => {
  return (intializeIsRequestPending = false) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isRequestPending, setIsRequestPending] = useState(intializeIsRequestPending);

    const sendRequest = useCallback(async (method, payload = null, endpointExtend = '') => {
      setIsRequestPending(true);
      setError(null);
      console.log('sendRequest');
      const url = `${endpoint}${endpointExtend}`;

      try {
        const response = await api({
          method,
          url,
          data: payload,
        });
        console.log('after Api call')
        setData(response.data);
        return response;
      } catch (error) {
        if (error.code === 'ECONNABORTED') {
          // Timeout error occurred
          console.error('Request timed out');
        } else if (error.response) {
          // Request was sent and the server responded
          console.error(`Server responded with status ${error.response.status}`);
        } else if (error.request) {
          // Request was sent but no response was received
          console.error('No response received from the server');
        } else {
          // Request was not sent
          console.error('Error occurred while making the request:', error.message);
        }
        setError(error);
      } finally {
        setIsRequestPending(false);
      }
    }, []);

    return { data, error, isRequestPending, sendRequest };
  };
};

export const useUserApi = createApiHook('/users');
export const useSessionApi = createApiHook('/sessions');
export const useTransactionApi = createApiHook('/transactions');
export const useCategoryApi = createApiHook('/categories');
export const useScheduledActionApi = createApiHook('/scheduled-transactions');
export const useMoneyPotApi = createApiHook('/money-pots');