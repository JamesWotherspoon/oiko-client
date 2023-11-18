const handlePendingRejected = (builder, thunks) => {
  builder
    .addCase(thunks.fetchResources.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(thunks.fetchResources.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    })
    .addCase(thunks.fetchResourceById.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(thunks.fetchResourceById.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    })
    .addCase(thunks.addResources.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(thunks.addResources.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    })
    .addCase(thunks.updateResource.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(thunks.updateResource.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    })
    .addCase(thunks.deleteResource.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(thunks.deleteResource.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    })
};
const handleItemsFulfilledAsyncThunk = (builder, thunks) => {
  builder
  .addCase(thunks.fetchResources.fulfilled, (state, action) => {
    state.status = 'succeeded';
    state.items = action.payload.data;
  })
  .addCase(thunks.fetchResourceById.fulfilled, (state, action) => {
    state.status = 'succeeded';
    const index = state.items.findIndex((item) => item.id === action.payload.data.id);
    if (index !== -1) {
      state.items[index] = action.payload.data;
    }
  })
  .addCase(thunks.addResources.fulfilled, (state, action) => {
    state.status = 'succeeded';
    state.items.push(action.payload.data);
  })
  .addCase(thunks.updateResource.fulfilled, (state, action) => {
    state.status = 'succeeded';
    const index = state.items.findIndex((item) => item.id === action.payload.data.id);
    if (index !== -1) {
      state.items[index] = action.payload.data;
    }
  })
  .addCase(thunks.deleteResource.fulfilled, (state, action) => {
    state.status = 'succeeded';
    state.items = state.items.filter((item) => String(item.id) !== action.payload.id);
  })
};

export const handleItemsAsyncThunk = (builder, thunks) => {
  handleItemsFulfilledAsyncThunk(builder, thunks);
  handlePendingRejected(builder, thunks);
};

const handleSessionFulfilledAsyncThunk = (builder, thunks) => {
  builder
    .addCase(thunks.fetchResources.fulfilled, (state, action) => {
      state.status = 'succeeded';
      console.log('success: action.payload: ', action.payload);
      state.isAuthenticated = action.payload.isAuthenticated;
    })
    .addCase(thunks.addResources.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.isAuthenticated = action.payload.isAuthenticated;
    })
    .addCase(thunks.deleteResource.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.isAuthenticated = false;
    })
};

export const handleSessionAsyncThunk = (builder, thunks) => {
  handleSessionFulfilledAsyncThunk(builder, thunks);
  handlePendingRejected(builder, thunks)
};


const handleChartDataFulfilledAsyncThunk = (builder, thunks) => {
  builder
    .addCase(thunks.fetchResources.fulfilled, (state, action) => {
      state.status = 'succeeded';
      const chartName = action.payload.chartName
      state.data[chartName] = action.payload.data;
    })
};

export const handleChartDataAsyncThunk = (builder, thunks) => {
  handleChartDataFulfilledAsyncThunk(builder, thunks);
  handlePendingRejected(builder, thunks)
};
