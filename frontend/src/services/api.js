import axios from 'axios';
import auth from './auth';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

api.interceptors.request.use(config => {
  const token = auth.getToken();
  if (token && auth.checkToken()) { // Verifica se o token está válido antes de adicioná-lo aos headers
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default api;