import { handleItemsAsyncThunk, handleSessionAsyncThunk, handleChartDataAsyncThunk } from './handleThunks';
import { createSlice } from '@reduxjs/toolkit';
import createAsyncThunks from './asyncThunks';

const createEntitySliceWithThunks = (options, endpointResource, handleItemsAsyncThunk, customReducers = {}) => {
  const { name, initialState } = options;
  const thunks = createAsyncThunks(name, endpointResource);

  const resetReducer = (state) => {
    Object.assign(state, initialState);
  };

  const slice = createSlice({
    name,
    initialState,
    reducers: {
      reset: resetReducer,
      ...customReducers,
    },
    extraReducers: (builder) => handleItemsAsyncThunk(builder, thunks),
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
  handleItemsAsyncThunk,
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
  handleItemsAsyncThunk,
);

export const transactionSlice = createEntitySliceWithThunks(
  {
    name: 'transaction',
    initialState: {
      items: [],
      selectedMonthItems: [],
      status: 'idle',
      error: null,
    },
  },
  '/transactions',
  handleItemsAsyncThunk,
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
  handleItemsAsyncThunk,
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
  handleItemsAsyncThunk,
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
  handleSessionAsyncThunk,
  {
    login: (state) => {
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
    },
  },
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
      state.selectedCategory = action.payload;
    },
    selectMoneyPot: (state, action) => {
      state.selectedMoneyPot = action.payload;
    },
    selectScheduledAction: (state, action) => {
      state.selectedScheduledAction = action.payload;
    },
  },
});

export const { reducer: selectItemReducer, actions: selectItemActions } = selectItemSlice;
export const { selectTransaction, selectCategory, selectMoneyPot, selectScheduledAction } = selectItemActions;

export const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    message: '',
    type: '',
  },
  reducers: {
    setNotification: (state, action) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    clearNotification: (state) => {
      state.message = '';
      state.type = '';
    },
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;

export const chartDataSlice = createEntitySliceWithThunks(
  {
    name: 'chartData',
    initialState: {
      data: {
        allMoneyPots: {},
        pastThirtyDays: '',
      },
      status: 'idle',
      error: null,
    },
  },
  '/chart-data',
  handleChartDataAsyncThunk,
);

export const pastThirtyDaysSlice = createEntitySliceWithThunks(
  {
    name: 'pastThirtyDays',
    initialState: {
      data: {
        pastThirtyDays: '',
      },
      status: 'idle',
      error: null,
    },
  },
  '/chart-data/past-thirty-days',
  handleChartDataAsyncThunk,
);