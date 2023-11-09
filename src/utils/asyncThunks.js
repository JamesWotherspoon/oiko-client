import { createAsyncThunk } from '@reduxjs/toolkit';
import apiService from './apiService';

const createAsyncThunks = (name, endpointResource) => {

  const fetchItems = createAsyncThunk(
    `${name}/fetchItems`, 
    async (_, { rejectWithValue }) => {
      try {
        const response = await apiService.fetch(endpointResource);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
      }
    }
  );

  const addItems = createAsyncThunk(
    `${name}/addItems`, 
    async (data, { rejectWithValue }) => {
      try {
        const response = await apiService.add(endpointResource, data);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
      }
    }
  );

  const deleteItem = createAsyncThunk(
    `${name}/deleteItem`, 
    async (id, { rejectWithValue }) => {
      try {
        await apiService.delete(`${endpointResource}/${id}`);
        return id;
      } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
      }
    }
  );

  const updateItem = createAsyncThunk(
    `${name}/updateItem`, 
    async ({ id, data }, { rejectWithValue }) => {
      try {
        const response = await apiService.update(`${endpointResource}/${id}`, data);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
      }
    }
  );

  return { fetchItems, addItems, updateItem, deleteItem };
};

export default createAsyncThunks;
