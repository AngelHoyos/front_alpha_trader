import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://alphatraderback-esenfrgzcnbfbufw.brazilsouth-01.azurewebsites.net',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;