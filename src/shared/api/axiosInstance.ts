import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://ecoapp.cloud.technokratos.com/eco-rus/api/v1/',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken'); // или sessionStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401 && error.response.status === 500) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/';
      console.error('Сессия истекла. Пожалуйста, войдите снова.');
    }
    return Promise.reject(error);
  },
);
