import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from '../constants/Config';

const api = axios.create({
  baseURL: Config.API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    
    if (error.response?.status === 401) {
      // Handle unauthorized - redirect to login
      AsyncStorage.removeItem('authToken');
      // You might want to use a navigation ref here
    }
    
    return Promise.reject(error.response?.data || error.message);
  }
);

// API endpoints
export const authAPI = {
  login: (data) => api.post('/api/auth/login', data),
  register: (data) => api.post('/api/auth/register', data),
  logout: () => api.post('/api/auth/logout'),
  verifyToken: () => api.get('/api/auth/verify'),
};

export const jobAPI = {
  getJobs: (params) => api.get('/api/jobs', { params }),
  getJob: (id) => api.get(`/api/jobs/${id}`),
  createJob: (data) => api.post('/api/jobs', data),
  updateJob: (id, data) => api.put(`/api/jobs/${id}`, data),
  deleteJob: (id) => api.delete(`/api/jobs/${id}`),
  applyForJob: (jobId) => api.post(`/api/jobs/${jobId}/apply`),
  acceptWorker: (jobId, workerId) => api.post(`/api/jobs/${jobId}/accept/${workerId}`),
  completeJob: (jobId) => api.post(`/api/jobs/${jobId}/complete`),
};

export const userAPI = {
  getProfile: () => api.get('/api/user/profile'),
  updateProfile: (data) => api.put('/api/user/profile', data),
  getWorkers: (params) => api.get('/api/user/workers', { params }),
  getWorker: (id) => api.get(`/api/user/workers/${id}`),
};

export const paymentAPI = {
  createPayment: (data) => api.post('/api/payments/create', data),
  confirmPayment: (paymentId) => api.post(`/api/payments/${paymentId}/confirm`),
  getTransactions: () => api.get('/api/payments/transactions'),
};

export const notificationAPI = {
  getNotifications: () => api.get('/api/notifications'),
  markAsRead: (id) => api.put(`/api/notifications/${id}/read`),
  deleteNotification: (id) => api.delete(`/api/notifications/${id}`),
};

export default api;