import { createAsyncThunk } from '@reduxjs/toolkit';
import apiService from './apiService';

const createAsyncThunks = (name, endpointResource) => {

  const fetchItems = createAsyncThunk(`${name}/fetchItems`, async () => {
    const response = await apiService.fetch(endpointResource);
    return response.data;
  });

  const addItems = createAsyncThunk(`${name}/addItems`, async (data) => {
    console.log('data', data);
    const response = await apiService.add(endpointResource, data);
    return response.data;
  });

  const deleteItem = createAsyncThunk(`${name}/deleteItem`, async (id) => {
    await apiService.delete(`${endpointResource}/${id}`);
    return id;
  });

  const updateItem = createAsyncThunk(`${name}/updateItem`, async ({id, data}) => {
    const response = await apiService.update(`${endpointResource}/${id}`, data);
    return response.data;
  });

  return { fetchItems, addItems, updateItem, deleteItem };
};

export default createAsyncThunks;
