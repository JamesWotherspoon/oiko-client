
const handleFetchAsyncThunk = (builder, thunks) => {
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
    });
};
const handleAddAsyncThunk = (builder, thunks) => {
  builder
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
    });
};

const handleUpdateAsyncThunk = (builder, thunks) => {
  builder
    // Handling thunks.updateItem
    .addCase(thunks.updateItem.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(thunks.updateItem.fulfilled, (state, action) => {
      state.status = 'succeeded';
      const index = state.items.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    })
    .addCase(thunks.updateItem.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
};

const handleDeleteAsyncThunk = (builder, thunks) => {
  builder
    // Handling thunks.deleteItem
    .addCase(thunks.deleteItem.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(thunks.deleteItem.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.items = state.items.filter((item) => item.id !== action.payload);
    })
    .addCase(thunks.deleteItem.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
};

export const handleAsyncThunk = (builder, thunks) => {
  handleFetchAsyncThunk(builder, thunks);
  handleAddAsyncThunk(builder, thunks);
  handleUpdateAsyncThunk(builder, thunks);
  handleDeleteAsyncThunk(builder, thunks);
};


const handleFetchSessionAsyncThunk = (builder, thunks) => {
  builder
    // Handling thunks.addItems
    .addCase(thunks.fetchItems.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(thunks.fetchItems.fulfilled, (state, action) => {
      state.status = 'succeeded';
      console.log('success: action.payload: ', action.payload);
      state.isAuthenticated = action.payload.isAuthenticated;
    })
    .addCase(thunks.fetchItems.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
};

const handleAddSessionAsyncThunk = (builder, thunks) => {
  builder
    // Handling thunks.addItems
    .addCase(thunks.addItems.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(thunks.addItems.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.isAuthenticated = action.payload.isAuthenticated;
    })
    .addCase(thunks.addItems.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
};
const handleDeleteSessionAsyncThunk = (builder, thunks) => {
  builder
    .addCase(thunks.deleteItem.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(thunks.deleteItem.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.isAuthenticated = false;
    })
    .addCase(thunks.deleteItem.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
};

export const handleSessionThunk = (builder, thunks) => {
  handleFetchSessionAsyncThunk(builder, thunks);
  handleAddSessionAsyncThunk(builder, thunks);
  handleDeleteSessionAsyncThunk(builder, thunks);
};
