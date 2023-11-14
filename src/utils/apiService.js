import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 2000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

const sendRequest = async (method, url, data = null, params) => {
  const axiosRequest = {
    method,
    url,
  };
  if(data) axiosRequest.data = data;

  try {
    const response = await api(axiosRequest);
    return response;
  } catch (error) {
    if (error.code === 'ECONNABORTED') {
      // Timeout error occurred
      console.error('Request timed out');
    } else if (error.response) {
      // Request was sent and the server responded
      console.error(`Server responded with status ${error.response.status}`);
      console.error(error.response);
    } else if (error.request) {
      // Request was sent but no response was received
      console.error('No response received from the server');
    } else {
      // Request was not sent
      console.error('Error occurred while making the request:', error.message);
    }
    throw error.message;
  }
}

const apiService = {
  fetch: (endpoint, params) => sendRequest('get', endpoint, null, params),
  add: (endpoint, data) => sendRequest('post', endpoint, data),
  update: (endpoint, data) => sendRequest('put', endpoint, data),
  delete: (endpoint) => sendRequest('delete', endpoint),
};

export default apiService;
