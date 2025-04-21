import {AxiosRequestConfig, AxiosResponse} from 'axios';
import BaseHttpClient from './base-http-client';

// Get the singleton instance of BaseHttpClient
const baseClient = BaseHttpClient.getInstance();

// Use the axios instance from BaseHttpClient
const axiosInstance = baseClient.getAxiosInstance();

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

    // Method to update the auth token across all HTTP clients
    updateToken: (token: string): void => {
        baseClient.updateToken(token);
    },

    // Links specific API methods
    getLinks: (page: number = 1, limit: number = 10): Promise<LinksResponse> => {
        return httpClient.get<LinksResponse>(`/api/links?page=${page}&limit=${limit}`);
    },

    getLinkById: (id: string): Promise<Link> => {
        return httpClient.get<Link>(`/api/links/${id}`);
    },
};

export default httpClient;
