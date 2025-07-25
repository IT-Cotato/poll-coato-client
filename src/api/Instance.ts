import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const userId = localStorage.getItem('userId');

  if (userId) {
    config.headers = config.headers || {};
    config.headers['Authorization'] = `Bearer ${userId}`;
  }
  return config;
});

export default api;
