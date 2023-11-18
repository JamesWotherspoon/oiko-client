import { createAsyncThunk } from '@reduxjs/toolkit';
import apiService from './apiService';

const createAsyncThunks = (name, endpoint) => {

  const fetchResources = createAsyncThunk(
    `${name}/fetchResources`, 
    async (params, { rejectWithValue }) => {
      try {
        const response = await apiService.fetch(endpoint, params);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

  const fetchResourceById = createAsyncThunk(
    `${name}/fetchResourceById`, 
    async (id, { rejectWithValue }) => {
      try {
        const response = await apiService.fetch(`${endpoint}/${id}`);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

  const addResources = createAsyncThunk(
    `${name}/addResources`, 
    async (data, { rejectWithValue }) => {
      try {
        const response = await apiService.add(endpoint, data);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

  const deleteResource = createAsyncThunk(
    `${name}/deleteResource`, 
    async (id = '', { rejectWithValue }) => {
      try {
        const response = await apiService.delete(`${endpoint}/${id}`);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

  const updateResource = createAsyncThunk(
    `${name}/updateResource`, 
    async ({ id, data }, { rejectWithValue }) => {
      try {
        const response = await apiService.update(`${endpoint}/${id}`, data);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

  return { fetchResourceById, fetchResources, addResources, updateResource, deleteResource };
};

export default createAsyncThunks;
