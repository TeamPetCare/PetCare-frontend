// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://petcarebackend-fgfdcvh7frcyd7eu.centralus-01.azurewebsites.net/api',
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
