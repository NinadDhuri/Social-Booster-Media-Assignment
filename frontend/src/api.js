import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
});

export const getExpenses = (skip = 0, limit = 100) => api.get(`/expenses/?skip=${skip}&limit=${limit}`);
export const getExpense = (id) => api.get(`/expenses/${id}`);
export const createExpense = (data) => api.post('/expenses/', data);
export const updateExpense = (id, data) => api.put(`/expenses/${id}`, data);
export const deleteExpense = (id) => api.delete(`/expenses/${id}`);
export const getDashboardStats = () => api.get('/dashboard/');
export const getExchangeRates = () => api.get('/exchange-rates/');

export default api;
