import axios from 'axios';

let API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Ensure API_URL starts with http/https
if (API_URL && !API_URL.startsWith('http')) {
  API_URL = `https://${API_URL}`;
}

// Remove trailing slash if present to avoid double slashes
if (API_URL.endsWith('/')) {
  API_URL = API_URL.slice(0, -1);
}

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
