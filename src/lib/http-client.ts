
import {AxiosRequestConfig, AxiosResponse} from 'axios';
import BaseHttpClient from './base-http-client';
import {LinkDetails, LinksResponse, TopLinksResponse} from '@/types/link';
import {UserProfile, UpdateUserProfileRequest} from '@/types/user';

// Get the singleton instance of BaseHttpClient
const baseClient = BaseHttpClient.getInstance();
const axiosInstance = baseClient.getAxiosInstance();

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

const httpClient = {
    // Generic methods
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

    // Links specific API methods
    getLinks: (page: number = 1, limit: number = 10): Promise<LinksResponse> => {
        return httpClient.get<LinksResponse>(`/api/links?page=${page}&limit=${limit}`);
    },

    getLinkById: (id: string): Promise<LinkDetails> => {
        return httpClient.get<LinkDetails>(`/api/links/${id}`);
    },

    getTopLinks: (): Promise<TopLinksResponse> => {
        return httpClient.get<TopLinksResponse>('/dashboard/top-links');
    },

    // Dynamic links API endpoints
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

    // Token management
    updateToken: (token: string): void => {
        baseClient.updateToken(token);
    },
};

export default httpClient;
