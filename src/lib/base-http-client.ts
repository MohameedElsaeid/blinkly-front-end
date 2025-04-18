import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosHeaders } from 'axios';
import { v4 as uuidv4 } from 'uuid';

export const API_BASE_URL = 'https://api.blinkly.app';

interface CsrfResponse {
  token: string;
  expiresAt: string;
}

class BaseHttpClient {
  private axiosInstance: AxiosInstance;
  private csrfToken: string | null = null;
  private csrfTokenExpiresAt: Date | null = null;
  private deviceId: string;

  constructor() {
    this.deviceId = this.generateDeviceId();
    
    this.axiosInstance = axios.create({
      baseURL: API_BASE_URL,
      timeout: 30000,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.axiosInstance.interceptors.request.use(
      async (config) => {
        // Check if CSRF token is missing or expired
        if (!this.csrfToken || this.isCsrfTokenExpired()) {
          await this.refreshCsrfToken();
        }

        // Create new headers instance
        const headers = new AxiosHeaders({
          ...this.getCommonHeaders(),
          ...this.getFacebookHeaders()
        });

        // Add auth token if available
        const token = localStorage.getItem('blinkly_token');
        if (token) {
          headers.set('Authorization', `Bearer ${token}`);
        }

        config.headers = headers;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

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

  private generateDeviceId(): string {
    const navigatorInfo = window.navigator;
    const screenInfo = window.screen;

    const rawId = [
      navigatorInfo.userAgent,
      navigatorInfo.language,
      navigatorInfo.platform,
      screenInfo.width,
      screenInfo.height,
      screenInfo.colorDepth,
      Intl.DateTimeFormat().resolvedOptions().timeZone,
      navigator.hardwareConcurrency,
      (navigator as any).deviceMemory || 'unknown',
    ].join('|');

    return uuidv4() + '-' + btoa(rawId).slice(0, 20);
  }

  private getCookie(name: string): string {
    const cookies = document.cookie.split(';');
    const cookie = cookies.find(c => c.trim().startsWith(`${name}=`));
    return cookie ? cookie.split('=')[1] : '';
  }

  private getFacebookHeaders(): Record<string, string> {
    return {
      'X-FB-Browser-ID': this.getCookie('_fbp') || '',
      'X-FB-Click-ID': this.getCookie('_fbc') || ''
    };
  }

  private getCommonHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'x-csrf-token': this.csrfToken || '',
      'X-XSRF-TOKEN': this.csrfToken || '',
      'X-Request-ID': uuidv4(),
      'X-Request-Time': new Date().toISOString(),
      'DNT': navigator.doNotTrack === '1' ? '1' : '0',
      'x-requested-with': 'XMLHttpRequest',
      'Device-ID': this.deviceId,
      'Priority': 'u=1, i',
      'X-User-Agent': navigator.userAgent,
      'X-Language': navigator.language || 'en-US',
      'X-Platform': navigator.platform,
      'X-Screen-Width': screen.width.toString(),
      'X-Screen-Height': screen.height.toString(),
      'X-Time-Zone': Intl.DateTimeFormat().resolvedOptions().timeZone,
      'X-Color-Depth': screen.colorDepth.toString(),
      'X-Hardware-Concurrency': (navigator.hardwareConcurrency || 'unknown').toString(),
      'X-Device-Memory': ((navigator as any).deviceMemory || 'unknown').toString(),
      'X-Custom-Header': localStorage.getItem('custom_header') || 'not-set',
    };

    return headers;
  }

  private isCsrfTokenExpired(): boolean {
    if (!this.csrfTokenExpiresAt) return true;
    // Add a 5-minute buffer before actual expiration
    const bufferTime = 5 * 60 * 1000; // 5 minutes in milliseconds
    return new Date().getTime() + bufferTime >= this.csrfTokenExpiresAt.getTime();
  }

  public async refreshCsrfToken(): Promise<string> {
    try {
      const response = await axios.get<CsrfResponse>(`${API_BASE_URL}/auth/csrf-token`);
      this.csrfToken = response.data.token;
      this.csrfTokenExpiresAt = new Date(response.data.expiresAt);
      return this.csrfToken;
    } catch (error) {
      console.error('Failed to fetch CSRF token:', error);
      throw error;
    }
  }

  public getCsrfToken(): string | null {
    return this.csrfToken;
  }

  public getAxiosInstance(): AxiosInstance {
    return this.axiosInstance;
  }
}

export default BaseHttpClient;
