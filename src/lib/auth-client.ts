
import BaseHttpClient, { API_BASE_URL } from './base-http-client';
import axios from 'axios';

// Setup HTTP client
const baseClient = new BaseHttpClient();
const authClient = baseClient.getAxiosInstance();

// Types for the API requests and responses
export interface SignupRequestData {
  email: string;
  password: string;
  passwordConfirmation: string;
  firstName: string;
  lastName: string;
  countryCode: string;
  phoneNumber: string;
  country: string;
}

export interface LoginRequestData {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
  token: string;
  refreshToken: string;
}

// Function to fetch CSRF token from the API
export const fetchCSRFToken = async (): Promise<string> => {
  return baseClient.refreshCsrfToken();
};

// Function to fetch client IP address
export const fetchIpAddress = async (): Promise<string> => {
  try {
    const response = await axios.get('https://api.ipify.org?format=json');
    return response.data.ip;
  } catch (error) {
    console.error('Error fetching IP address:', error);
    return ''; // Return empty string if fetch fails
  }
};

// Function to signup a user
export const signupUser = async (data: SignupRequestData): Promise<AuthResponse> => {
  try {
    // Get IP address
    const ipAddress = await fetchIpAddress();
    
    // Prepare request data
    const requestData = {
      email: data.email,
      password: data.password,
      passwordConfirmation: data.passwordConfirmation,
      firstName: data.firstName,
      lastName: data.lastName,
      countryCode: data.countryCode,
      phoneNumber: data.phoneNumber,
      country: data.country,
      ipAddress
    };

    // For demonstration purposes, we're simulating a successful response
    // In a real application, uncomment the API call below
    /*
    const response = await authClient.post('/auth/signup', requestData);
    return response.data;
    */
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate API validation
    if (!data.email.includes('@')) {
      throw new Error('Invalid email format');
    }
    
    if (data.password !== data.passwordConfirmation) {
      throw new Error('Passwords do not match');
    }
    
    // Mock successful response
    const mockResponse: AuthResponse = {
      user: {
        id: 'user_' + Math.random().toString(36).substring(2, 10),
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName
      },
      token: 'mock_token_' + Math.random().toString(36).substring(2, 15),
      refreshToken: 'mock_refresh_' + Math.random().toString(36).substring(2, 15)
    };
    
    return mockResponse;
  } catch (error: any) {
    console.error('Error during signup:', error);
    
    // Handle API error responses
    if (error.response) {
      const message = error.response.data.message || 'Signup failed. Please try again.';
      throw new Error(message);
    }
    
    // Handle other errors
    throw error;
  }
};

// Function to login a user
export const loginUser = async (data: LoginRequestData): Promise<AuthResponse> => {
  try {
    // Prepare request data
    const requestData = {
      email: data.email,
      password: data.password,
    };

    // For demonstration purposes, we're simulating a successful response
    // In a real application, uncomment the API call below
    /*
    const response = await authClient.post('/auth/login', requestData);
    return response.data;
    */
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate API validation
    if (!data.email.includes('@')) {
      throw new Error('Invalid email format');
    }
    
    // Mock successful response
    const mockResponse: AuthResponse = {
      user: {
        id: 'user_' + Math.random().toString(36).substring(2, 10),
        email: data.email,
        firstName: 'John', // Mock data
        lastName: 'Doe'    // Mock data
      },
      token: 'mock_token_' + Math.random().toString(36).substring(2, 15),
      refreshToken: 'mock_refresh_' + Math.random().toString(36).substring(2, 15)
    };
    
    return mockResponse;
  } catch (error: any) {
    console.error('Error during login:', error);
    
    // Handle API error responses
    if (error.response) {
      const message = error.response.data.message || 'Login failed. Please try again.';
      throw new Error(message);
    }
    
    // Handle other errors
    throw error;
  }
};
