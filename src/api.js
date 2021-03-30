import axios from 'axios';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

if (localStorage.getItem('accessToken')) {
  headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
}


export const baseURL = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL,
  responseType: 'json',
  headers
});

export default api;
