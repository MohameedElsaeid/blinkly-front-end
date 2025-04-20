
import axios from 'axios';
import BaseHttpClient from '../base-http-client';
import httpClient from '../http-client';

// Unified method to handle authentication token updates
export const updateAuthToken = (token: string) => {
  // Update token in all HTTP clients
  BaseHttpClient.getInstance().updateToken(token);
  httpClient.updateToken(token);
  
  // Store in localStorage for persistence
  localStorage.setItem('blinkly_token', token);
  console.log('Auth token updated and propagated to all HTTP clients');
};

// Function to fetch client IP address
export const fetchIpAddress = async (): Promise<string> => {
  try {
    const response = await axios.get('https://api.ipify.org?format=json');
    return response.data.ip;
  } catch (error) {
    console.error('Error fetching IP address:', error);
    return '';
  }
};

// Function to create mock response (for development)
export const createMockAuthResponse = (email: string, firstName: string = 'John', lastName: string = 'Doe'): AuthResponse => {
  return {
    success: true,
    message: "Operation completed successfully",
    user: {
      id: 'user_' + Math.random().toString(36).substring(2, 10),
      email,
      firstName,
      lastName,
    },
    token: 'mock_token_' + Math.random().toString(36).substring(2, 15)
  };
};
