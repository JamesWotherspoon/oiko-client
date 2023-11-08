import createEntitySlice from './sliceConstructor';

export const categorySlice = createEntitySlice({
  name: 'category',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
}, '/categories');

export const moneyPotSlice = createEntitySlice({
  name: 'moneyPot',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
}, '/money-pots');

export const transactionSlice = createEntitySlice({
  name: 'transaction',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
}, '/transactions');

export const scheduledActionSlice = createEntitySlice({
  name: 'scheduledAction',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
}, '/scheduled-transactions');