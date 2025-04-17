
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { v4 as uuidv4 } from 'uuid';

export const API_BASE_URL = 'https://api.blinkly.app';

// Generate and store a unique device ID
const getDeviceId = (): string => {
  let deviceId = localStorage.getItem('blinkly_device_id');
  if (!deviceId) {
    deviceId = uuidv4();
    localStorage.setItem('blinkly_device_id', deviceId);
  }
  return deviceId;
};

// Get Facebook browser ID from cookie if available
const getFbBrowserId = (): string => {
  const cookies = document.cookie.split(';');
  const fbpCookie = cookies.find(cookie => cookie.trim().startsWith('_fbp='));
  return fbpCookie ? fbpCookie.split('=')[1] : '';
};

// Get Facebook click ID from cookie if available
const getFbClickId = (): string => {
  const cookies = document.cookie.split(';');
  const fbcCookie = cookies.find(cookie => cookie.trim().startsWith('_fbc='));
  return fbcCookie ? fbcCookie.split('=')[1] : '';
};

// Create the base HTTP client
class BaseHttpClient {
  private axiosInstance: AxiosInstance;
  private csrfToken: string | null = null;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_BASE_URL,
      timeout: 30000,
      withCredentials: true, // Important for cookie handling
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor to add headers
    this.axiosInstance.interceptors.request.use(
      async (config) => {
        // If we don't have a CSRF token, get one
        if (!this.csrfToken) {
          try {
            // For testing/demo purposes, using a mock token
            // In production, uncomment the API call below
            /*
            const response = await axios.get(`${API_BASE_URL}/auth/csrf-token`);
            this.csrfToken = response.data.token;
            */
            
            // Mock token for development
            this.csrfToken = 'mock-csrf-token-' + Math.random().toString(36).substring(2, 15);
          } catch (error) {
            console.error('Failed to fetch CSRF token:', error);
          }
        }

        // Add auth token if available
        const token = localStorage.getItem('blinkly_token');
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }

        // Add all required headers
        config.headers['x-csrf-token'] = this.csrfToken;
        config.headers['X-XSRF-TOKEN'] = this.csrfToken;
        config.headers['X-Request-ID'] = uuidv4();
        config.headers['X-Request-Time'] = new Date().toISOString();
        config.headers['X-User-Agent'] = navigator.userAgent;
        config.headers['X-Language'] = navigator.language;
        config.headers['X-Platform'] = navigator.platform;
        config.headers['X-Screen-Width'] = window.screen.width;
        config.headers['X-Screen-Height'] = window.screen.height;
        config.headers['X-Time-Zone'] = Intl.DateTimeFormat().resolvedOptions().timeZone;
        config.headers['X-Color-Depth'] = window.screen.colorDepth;
        config.headers['X-Hardware-Concurrency'] = navigator.hardwareConcurrency || 'unknown';
        config.headers['X-Device-Memory'] = (navigator as any).deviceMemory || 'unknown';
        config.headers['Device-ID'] = getDeviceId();
        config.headers['X-Custom-Header'] = localStorage.getItem('custom_header') || 'not-set';
        config.headers['X-FB-Browser-ID'] = getFbBrowserId();
        config.headers['X-FB-Click-ID'] = getFbClickId();
        config.headers['X-Requested-With'] = 'XMLHttpRequest';
        config.headers['Priority'] = 'u=1, i';

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        // Handle 403 (CSRF token mismatch) or 401 (unauthorized)
        if (error.response && (error.response.status === 403 || error.response.status === 401)) {
          // Clear CSRF token to force a refresh on next request
          this.csrfToken = null;
          
          // If 401, clear auth tokens
          if (error.response.status === 401) {
            localStorage.removeItem('blinkly_token');
            localStorage.removeItem('blinkly_user');
            
            // Redirect to login page
            window.location.href = '/login';
          }
        }
        
        return Promise.reject(error);
      }
    );
  }

  // Public method to access the axios instance
  public getAxiosInstance(): AxiosInstance {
    return this.axiosInstance;
  }

  // Method to refresh CSRF token
  public refreshCsrfToken(): Promise<string> {
    return new Promise(async (resolve, reject) => {
      try {
        // For testing/demo purposes, using a mock token
        // In production, uncomment the API call below
        /*
        const response = await axios.get(`${API_BASE_URL}/auth/csrf-token`);
        this.csrfToken = response.data.token;
        */
        
        // Mock token for development
        this.csrfToken = 'mock-csrf-token-' + Math.random().toString(36).substring(2, 15);
        resolve(this.csrfToken);
      } catch (error) {
        reject(error);
      }
    });
  }

  // Method to get current CSRF token
  public getCsrfToken(): string | null {
    return this.csrfToken;
  }
}

export default BaseHttpClient;
