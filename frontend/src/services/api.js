import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Adicione um interceptor para incluir o token JWT em cada requisição
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token'); // Recupera o token do localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default api;
