
import axios from 'axios';

const API_BASE_URL = 'https://api.blinkly.app';

// Setup axios instance with default configuration
const authClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

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
  csrfToken: string;
}

export interface LoginRequestData {
  email: string;
  password: string;
  csrfToken: string;
}

// Function to fetch CSRF token from the API
export const fetchCSRFToken = async (): Promise<string> => {
  try {
    // For demonstration purposes, we're simulating a successful response
    // In a real application, uncomment the API call below
    /*
    const response = await authClient.get('/auth/csrf-token');
    return response.data.token;
    */
    
    // Mock response for development
    return 'mock-csrf-token-' + Math.random().toString(36).substring(2, 15);
  } catch (error) {
    console.error('Error fetching CSRF token:', error);
    throw new Error('Failed to fetch security token');
  }
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
export const signupUser = async (data: SignupRequestData): Promise<void> => {
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
    await authClient.post('/auth/signup', requestData, {
      headers: {
        'x-csrf-token': data.csrfToken
      }
    });
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
    
    // If we get here, the signup was successful
    console.log('Signup successful with data:', requestData);
    return;
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
export const loginUser = async (data: LoginRequestData): Promise<void> => {
  try {
    // Prepare request data
    const requestData = {
      email: data.email,
      password: data.password,
    };

    // For demonstration purposes, we're simulating a successful response
    // In a real application, uncomment the API call below
    /*
    await authClient.post('/auth/login', requestData, {
      headers: {
        'x-csrf-token': data.csrfToken
      }
    });
    */
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate API validation
    if (!data.email.includes('@')) {
      throw new Error('Invalid email format');
    }
    
    // If we get here, the login was successful
    console.log('Login successful with data:', requestData);
    return;
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
