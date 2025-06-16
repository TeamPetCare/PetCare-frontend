// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://api.pet-care.software/api',
});

// Intercepta requisições para adicionar o token de autorização
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('userToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
