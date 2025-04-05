import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.ejemplo.com/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
