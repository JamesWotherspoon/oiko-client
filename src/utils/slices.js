import { sessionReducer } from './actionsReducers';
import { handleAsyncThunk, handleSessionThunk } from './handleThunks';
import { createSlice } from '@reduxjs/toolkit';
import createAsyncThunks from './asyncThunks';

const createEntitySlice = (options, customReducers = {}) => {
  const { name, initialState } = options;

  const slice = createSlice({
    name,
    initialState,
    reducers: {
      ...customReducers,
    },
  });

  return {
    ...slice,
  };
};

const createEntitySliceWithThunks = (options, endpointResource, handleAsyncThunk, customReducers = {}) => {
  const { name, initialState } = options;
  const thunks = createAsyncThunks(name, endpointResource);

  const slice = createSlice({
    name,
    initialState,
    reducers: {
      ...customReducers,
    },
    extraReducers: (builder) => handleAsyncThunk(builder, thunks),
  });

  return {
    ...slice,
    ...thunks,
  };
};

export const categorySlice = createEntitySliceWithThunks(
  {
    name: 'category',
    initialState: {
      items: [],
      status: 'idle',
      error: null,
    },
  },
  '/categories',
  handleAsyncThunk,
);

export const moneyPotSlice = createEntitySliceWithThunks(
  {
    name: 'moneyPot',
    initialState: {
      items: [],
      status: 'idle',
      error: null,
    },
  },
  '/money-pots',
  handleAsyncThunk,
);

export const transactionSlice = createEntitySliceWithThunks(
  {
    name: 'transaction',
    initialState: {
      items: [],
      status: 'idle',
      error: null,
    },
  },
  '/transactions',
  handleAsyncThunk,
);

export const scheduledActionSlice = createEntitySliceWithThunks(
  {
    name: 'scheduledAction',
    initialState: {
      items: [],
      status: 'idle',
      error: null,
    },
  },
  '/scheduled-transactions',
  handleAsyncThunk,
);

export const userSlice = createEntitySliceWithThunks(
  {
    name: 'user',
    initialState: {
      items: [],
      status: 'idle',
      error: null,
    },
  },
  '/users',
  handleAsyncThunk,
);

export const sessionSlice = createEntitySliceWithThunks(
  {
    name: 'session',
    initialState: {
      sessionItem: {},
      isAuthenticated: false,
      status: 'idle',
      error: null,
    },
  },
  '/sessions',
  handleSessionThunk,
  sessionReducer,
);

const selectItemSlice = createSlice({
  name: 'selectItem',
  initialState: {
    selectedTransaction: { id: null, data: null },
    selectedCategory: { id: null, data: null },
    selectedMoneyPot: { id: null, data: null },
    selectedScheduledAction: { id: null, data: null },
  },
  reducers: {
    selectTransaction: (state, action) => {
      state.selectedTransaction = action.payload;
    },
    selectCategory: (state, action) => {
      state.selectedCategory = action.payload
    },
    selectMoneyPot: (state, action) => {
      state.selectedMoneyPot = action.payload
    },
    selectScheduledAction: (state, action) => {
      state.selectedScheduledAction = action.payload
    },
  },
});

export const { reducer: selectItemReducer, actions: selectItemActions } = selectItemSlice;
export const { selectTransaction, selectCategory, selectMoneyPot, selectScheduledAction } = selectItemActions;