import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import createAsyncThunks from './asyncThunks';

const createEntitySlice = (options, endpointResource) => {
  const { name, initialState } = options;
  const thunks = createAsyncThunks(name, endpointResource);

  const slice = createSlice({
    name,
    initialState,
    reducers: {
      // common sync reducers if needed
    },
    extraReducers: (builder) => {
      builder
        // Handling thunks.fetchItems
        .addCase(thunks.fetchItems.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(thunks.fetchItems.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.items = action.payload;
        })
        .addCase(thunks.fetchItems.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        })
        // Handling thunks.addItems
        .addCase(thunks.addItems.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(thunks.addItems.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.items.push(action.payload);
        })
        .addCase(thunks.addItems.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        })
        // Handling thunks.deleteItem
        .addCase(thunks.deleteItem.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(thunks.deleteItem.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.items = state.items.filter((category) => category.id !== action.payload);
        })
        .addCase(thunks.deleteItem.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        })

        // Handling thunks.updateItem
        .addCase(thunks.updateItem.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(thunks.updateItem.fulfilled, (state, action) => {
          state.status = 'succeeded';
          const index = state.items.findIndex((category) => category.id === action.payload.id);
          if (index !== -1) {
            state.items[index] = action.payload;
          }
        })
        .addCase(thunks.updateItem.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        });
    },
  });

  return {
    ...slice,
    ...thunks,
  };
};

export default createEntitySlice;
