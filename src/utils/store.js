// store.js
import { configureStore } from '@reduxjs/toolkit';
import { categorySlice, moneyPotSlice, scheduledActionSlice, transactionSlice }  from './slices'

export const store = configureStore({
  reducer: {
    category: categorySlice.reducer,
    moneyPot: moneyPotSlice.reducer,
    scheduledAction: scheduledActionSlice.reducer,
    transaction: transactionSlice.reducer,
  },
});
