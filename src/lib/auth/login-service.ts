
import BaseHttpClient from '../base-http-client';
import { LoginRequestData, AuthResponse } from './types';
import { updateAuthToken, createMockAuthResponse } from './utils';

const baseClient = BaseHttpClient.getInstance();
const authClient = baseClient.getAxiosInstance();

export const loginUser = async (data: LoginRequestData): Promise<AuthResponse> => {
  try {
    // Make the API call
    const response = await authClient.post('/auth/login', data);
    
    // Store token and update clients
    if (response.data.token) {
      updateAuthToken(response.data.token);
      localStorage.setItem('blinkly_user', JSON.stringify(response.data.user));
    }
    
    return response.data;
  } catch (error: any) {
    console.error('Error during login:', error);
    
    // For development environment only
    if (process.env.NODE_ENV === 'development' && !error.response) {
      console.log('Using mock login response for development');
      
      // Simulate API validation
      if (!data.email.includes('@')) {
        throw new Error('Invalid email format');
      }
      
      // Create mock response
      const mockResponse = createMockAuthResponse(data.email);
      
      // Update token in all clients
      updateAuthToken(mockResponse.token);
      localStorage.setItem('blinkly_user', JSON.stringify(mockResponse.user));
      
      return mockResponse;
    }
    
    // Handle API error responses
    if (error.response) {
      throw new Error(error.response.data.message || 'Login failed. Please try again.');
    }
    
    throw error;
  }
};
