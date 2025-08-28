// src/services/api.js
import axios from 'axios';
import authService from './authService';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  async (config) => {
    // Get current auth token from service
    const token = authService.authToken || await authService.getIdToken();
    
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
  (response) => response,
  async (error) => {
    // Handle 401 - token expired
    if (error.response?.status === 401 && authService.isAuthenticated()) {
      try {
        // Try to refresh the token
        const newToken = await authService.getIdToken(true);
        
        if (newToken) {
          // Retry the original request with new token
          error.config.headers.Authorization = `Bearer ${newToken}`;
          return api.request(error.config);
        }
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        await authService.signOut();
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;
