/* eslint-disable */
import router from '@/presentation/router';
import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      // router.push({ name: 'AthenticationSignin' });
    }

    return Promise.reject(error);
  },
);

export default apiClient;
