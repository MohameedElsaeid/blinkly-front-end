import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// Base configuration for API requests
const baseConfig: AxiosRequestConfig = {
  baseURL: 'https://api.blinkly.app',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};

// Create a single instance of axios to be used throughout the app
const axiosInstance: AxiosInstance = axios.create(baseConfig);

// Request interceptor for adding auth tokens, etc.
axiosInstance.interceptors.request.use(
  (config) => {
    // You can add auth tokens here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling common responses
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors (401, 403, 500, etc.)
    return Promise.reject(error);
  }
);

// Type definitions for our API responses
export interface Package {
  id: string;
  name: string;
  features: string[];
  price: string | null;
  billingFrequency: 'monthly' | 'yearly';
  isMostPopular: boolean;
}

export interface PackagesResponse {
  monthly: Package[];
  yearly: Package[];
}

// API client with typed methods
const httpClient = {
  // Generic GET method with type safety
  get: <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    return axiosInstance.get<T, AxiosResponse<T>>(url, config)
      .then(response => response.data);
  },

  // Generic POST method with type safety
  post: <T, D = any>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T> => {
    return axiosInstance.post<T, AxiosResponse<T>, D>(url, data, config)
      .then(response => response.data);
  },

  // Other methods (PUT, DELETE, etc.) can be added as needed

  // Specific API methods
  getPackages: (): Promise<PackagesResponse> => {
    return httpClient.get<PackagesResponse>('/packages');
  }
};

export default httpClient;
