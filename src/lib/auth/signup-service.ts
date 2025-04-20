
import BaseHttpClient from '../base-http-client';
import { SignupRequestData, AuthResponse } from './types';
import { updateAuthToken, fetchIpAddress, createMockAuthResponse } from './utils';

const baseClient = BaseHttpClient.getInstance();
const authClient = baseClient.getAxiosInstance();

export const signupUser = async (data: SignupRequestData): Promise<AuthResponse> => {
  try {
    // Get IP address
    const ipAddress = await fetchIpAddress();
    
    // Prepare request data
    const requestData = {
      ...data,
      ipAddress
    };

    // Make the API call to signup
    const response = await authClient.post('/auth/signup', requestData);
    
    // Store token and update clients
    if (response.data.user.token) {
      updateAuthToken(response.data.user.token);
      localStorage.setItem('blinkly_user', JSON.stringify(response.data.user));
    }
    
    return response.data;
  } catch (error: any) {
    console.error('Error during signup:', error);
    
    // For development environment only
    if (process.env.NODE_ENV === 'development' && !error.response) {

      // Simulate API validation
      if (!data.email.includes('@')) {
        throw new Error('Invalid email format');
      }
      
      if (data.password !== data.passwordConfirmation) {
        throw new Error('Passwords do not match');
      }
      
      // Create mock response
      const mockResponse = createMockAuthResponse(data.email, data.firstName, data.lastName);
      
      // Update token in all clients
      updateAuthToken(mockResponse.user.token);
      localStorage.setItem('blinkly_user', JSON.stringify(mockResponse.user));
      
      return mockResponse;
    }
    
    // Handle API error responses
    if (error.response) {
      throw new Error(error.response.data.message || 'Signup failed. Please try again.');
    }
    
    throw error;
  }
};

