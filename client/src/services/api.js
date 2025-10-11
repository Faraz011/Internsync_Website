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
    // Skip token check for auth endpoints
    if (config.url.includes('/auth/')) {
      return config;
    }

    // Get current auth token
    let token = authService.authToken;
    
    // If no token, try to get a fresh one
    if (!token) {
      token = await authService.getIdToken();
    }
    
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
    const originalRequest = error.config;
    
    // If error is 401 and we haven't tried to refresh the token yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Try to refresh the token
        const newToken = await authService.refreshToken();
        
        if (newToken) {
          // Update the Authorization header
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          // Retry the original request with the new token
          return api(originalRequest);
        }
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        // If refresh fails, clear auth state and redirect to login
        await authService.signOut();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;
