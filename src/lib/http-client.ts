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
    // Add auth token if available
    const token = localStorage.getItem('blinkly_token');
    if (token) {
      config.headers = {
        ...config.headers,
        'Authorization': `Bearer ${token}`
      };
    }
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
    // Handle unauthorized errors (401)
    if (error.response && error.response.status === 401) {
      // Clear auth tokens
      localStorage.removeItem('blinkly_token');
      localStorage.removeItem('blinkly_user');
      
      // Redirect to login page
      window.location.href = '/login';
    }
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

// New interface definitions for dashboard APIs
export interface TotalClicksResponse {
  totalClicks: number;
  trend: number;
  periodStart: string;
  periodEnd: string;
}

export interface TopLink {
  id: string;
  alias: string;
  originalUrl: string;
  clickCount: number;
}

export interface TopLinksResponse {
  links: TopLink[];
}

export interface Tip {
  title: string;
  description: string;
}

export interface TipsResponse {
  tips: Tip[];
}

export interface TricksResponse {
  tricks: string[];
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

  // Generic PUT method with type safety
  put: <T, D = any>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T> => {
    return axiosInstance.put<T, AxiosResponse<T>, D>(url, data, config)
      .then(response => response.data);
  },

  // Generic DELETE method with type safety
  delete: <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    return axiosInstance.delete<T, AxiosResponse<T>>(url, config)
      .then(response => response.data);
  },

  // Specific API methods
  getPackages: (): Promise<PackagesResponse> => {
    return httpClient.get<PackagesResponse>('/packages');
  },

  // Dashboard specific API methods
  getDashboardTotalClicks: (): Promise<TotalClicksResponse> => {
    return httpClient.get<TotalClicksResponse>('/dashboard/total-clicks');
  },

  getDashboardTopLinks: (): Promise<TopLinksResponse> => {
    return httpClient.get<TopLinksResponse>('/dashboard/top-links');
  },

  getDashboardTips: (): Promise<TipsResponse> => {
    return httpClient.get<TipsResponse>('/dashboard/tips');
  },

  getDashboardTricks: (): Promise<TricksResponse> => {
    return httpClient.get<TricksResponse>('/dashboard/tricks');
  },
};

export default httpClient;
