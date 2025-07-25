import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  const email = localStorage.getItem('email');

  if (token) {
    config.headers = config.headers || {};
    config.headers['Authorization'] = `Bearer ${token}`;
  } else if (email) {
    config.headers = config.headers || {};
    config.headers['X-User-Email'] = email;
  }
  return config;
});

export default api;
