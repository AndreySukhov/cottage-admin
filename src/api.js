import axios from 'axios';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'X-Requested-With': 'XMLHttpRequest'
};

export const baseURL = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL,
  withCredentials: true,
  responseType: 'json',
  headers
});

export default api;
