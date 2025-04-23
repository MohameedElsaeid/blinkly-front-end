import {AxiosRequestConfig, AxiosResponse} from 'axios';
import BaseHttpClient from './base-http-client';
import {LinkDetails, LinksResponse, TopLinksResponse as LinkTopLinksResponse} from '@/types/link';
import {
    ClickPerformanceResponse,
    DashboardAnalyticsResponse,
    DeviceDistributionResponse,
    GeoDistributionResponse,
    ReferrerResponse
} from '@/types/analytics';
import {UserProfile, UpdateUserProfileRequest} from '@/types/user';

// Get the singleton instance of BaseHttpClient
const baseClient = BaseHttpClient.getInstance();

// Use the axios instance from BaseHttpClient
const axiosInstance = baseClient.getAxiosInstance();

// Type definitions for our API responses
export interface AnalyticsResponse {
    clicks_today: {
        count: number;
        change_percentage: number;
    };
    links_24h: {
        count: number;
        change_percentage: number;
    };
    unique_countries_24h: {
        count: number;
        change_percentage: number;
    };
    avg_ctr_7d: {
        percentage: number;
    };
}

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

interface GetClickPerformanceParams {
    start_date?: string;
    end_date?: string;
    metric?: 'clicks' | 'visitors';
}

// API client with typed methods
const httpClient = {
    // Generic GET method with type safety
    get: <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
        return axiosInstance.get<T, AxiosResponse<T>>(url, config)
            .then(response => response.data);
    },

    post: <T, D = any>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T> => {
        return axiosInstance.post<T, AxiosResponse<T>, D>(url, data, config)
            .then(response => response.data);
    },

    put: <T, D = any>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T> => {
        return axiosInstance.put<T, AxiosResponse<T>, D>(url, data, config)
            .then(response => response.data);
    },

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

    getDashboardAnalytics: (days?: number): Promise<DashboardAnalyticsResponse> => {
        return httpClient.get<DashboardAnalyticsResponse>('/analytics/dashboard', {
            params: { days }
        });
    },

    // Method to update the auth token across all HTTP clients
    updateToken: (token: string): void => {
        baseClient.updateToken(token);
    },

    // Links specific API methods
    getLinks: (page: number = 1, limit: number = 10): Promise<LinksResponse> => {
        return httpClient.get<LinksResponse>(`/api/links?page=${page}&limit=${limit}`);
    },

    getLinkById: (id: string): Promise<LinkDetails> => {
        return httpClient.get<LinkDetails>(`/api/links/${id}`);
    },

    // Add the getTopLinks method
    getTopLinks: (): Promise<LinkTopLinksResponse> => {
        return httpClient.get<LinkTopLinksResponse>('/dashboard/top-links');
    },

    getDeviceDistribution: (): Promise<DeviceDistributionResponse> => {
        return httpClient.get<DeviceDistributionResponse>('/dashboard/device-distribution');
    },

    getGeoDistribution: (): Promise<GeoDistributionResponse> => {
        return httpClient.get<GeoDistributionResponse>('/dashboard/geographic-distribution');
    },

    // Add the getDeviceDistribution method
    // getDeviceDistribution: (): Promise<DeviceDistributionResponse> => {
    //     return httpClient.get<DeviceDistributionResponse>('/dashboard/device-distribution');
    // },

    getTopReferrers: (params?: {
        start_date?: string;
        end_date?: string;
        limit?: number;
        page?: number;
        sort_by?: 'revenue' | 'visits' | 'conversion_rate';
    }): Promise<ReferrerResponse> => {
        return httpClient.get<ReferrerResponse>('/dashboard/top-referrers', {params});
    },

    getClickPerformance: (params?: GetClickPerformanceParams): Promise<ClickPerformanceResponse> => {
        return httpClient.get<ClickPerformanceResponse>('/dashboard/click-performance', {params});
    },

    // Add dynamic links API endpoints
    createDynamicLink: (data: any) => {
        return httpClient.post('/api/dynamic-links', data);
    },

    getDynamicLinks: (page: number = 1, limit: number = 10) => {
        return httpClient.get(`/api/dynamic-links?page=${page}&limit=${limit}`);
    },

    getDynamicLinkById: (id: string) => {
        return httpClient.get(`/api/dynamic-links/${id}`);
    },

    updateDynamicLink: (id: string, data: any) => {
        return httpClient.put(`/api/dynamic-links/${id}`, data);
    },

    deleteDynamicLink: (id: string) => {
        return httpClient.delete(`/api/dynamic-links/${id}`);
    },

    // User Profile API methods
    getUserProfile: (): Promise<UserProfile> => {
        return httpClient.get<UserProfile>('/users/profile');
    },

    updateUserProfile: (data: UpdateUserProfileRequest): Promise<UserProfile> => {
        return httpClient.put<UserProfile>('/users/profile', data);
    },
};

export default httpClient;
