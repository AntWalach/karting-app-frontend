import axios from 'axios';

// const API_URL = 'http://localhost:3000/api';  // dostosuj do swojego backendu!
const API_URL = 'http://0.0.0.0:3001/api';  // dostosuj do swojego backendu!

const api = axios.create({
  baseURL: API_URL
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;