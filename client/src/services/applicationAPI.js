import api from './api';
import authService from './authService';

class ApplicationAPIService {
  // GET - Get all applications for the current user
  async getUserApplications() {
    try {
      // First, ensure we have a valid token
      const token = await authService.getIdToken();
      if (!token) {
        throw new Error('Not authenticated. Please log in again.');
      }

      console.log('Fetching applications with token:', token.substring(0, 10) + '...');
      
      const response = await api.get('/v1/application/user/applications', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('Get user applications failed:', error);
      
      // Handle specific error cases
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error status:', error.response.status);
        
        if (error.response.status === 401) {
          // Try to refresh token once
          try {
            const newToken = await authService.refreshToken();
            if (newToken) {
              // Retry the request with new token
              const retryResponse = await api.get('/v1/application/user/applications', {
                headers: {
                  'Authorization': `Bearer ${newToken}`,
                  'Content-Type': 'application/json'
                }
              });
              return retryResponse.data;
            }
          } catch (refreshError) {
            console.error('Token refresh failed:', refreshError);
            await authService.signOut();
            window.location.href = '/login';
            throw new Error('Your session has expired. Please log in again.');
          }
        } else if (error.response.status === 403) {
          // Check if the error is due to missing user profile
          if (error.response.data?.code === 'USER_PROFILE_REQUIRED') {
            // Redirect to complete profile
            window.location.href = '/dashboard/complete-profile';
            throw new Error('Please complete your profile first.');
          }
          throw new Error('You do not have permission to view these applications. Please contact support if you believe this is an error.');
        } else if (error.response.data?.message) {
          throw new Error(error.response.data.message);
        }
      } else if (error.request) {
        console.error('No response received:', error.request);
        throw new Error('Unable to connect to the server. Please check your internet connection.');
      }
      
      // Default error message
      throw new Error(error.message || 'Failed to fetch applications. Please try again later.');
    }
  }

  // GET - Get application by ID
  async getApplicationById(applicationId) {
    try {
      const response = await api.get(`/v1/application/${applicationId}`);
      return response.data;
    } catch (error) {
      console.error(`Get application ${applicationId} failed:`, error);
      throw error;
    }
  }

  

  // DELETE - Delete application
  async deleteApplication(applicationId) {
    try {
      const response = await api.delete(`/v1/application/${applicationId}`);
      return response.data;
    } catch (error) {
      console.error(`Delete application ${applicationId} failed:`, error);
      throw error;
    }
  }

  // GET - Get applications by status
  async getApplicationsByStatus(status, params = {}) {
    try {
      const response = await api.get('/v1/application/user/applications', {
        params: { status, ...params }
      });
      return response.data;
    } catch (error) {
      console.error(`Get applications with status ${status} failed:`, error);
      throw error;
    }
  }
}

export default new ApplicationAPIService();
