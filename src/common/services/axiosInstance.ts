import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3333',
});

export default axiosInstance;