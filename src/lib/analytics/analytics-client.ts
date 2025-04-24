
import { AxiosRequestConfig } from 'axios';
import BaseHttpClient from '../base-http-client';
import {
    DeviceDistributionResponse,
    GeoDistributionResponse
} from '@/types/analytics/distribution';
import {
    ReferrerResponse
} from '@/types/analytics/referrers';
import {
    ClickPerformanceResponse,
    BasicAnalyticsData
} from '@/types/analytics/performance';
import {
    DashboardAnalyticsResponse,
    AnalyticsResponse
} from '@/types/analytics/dashboard';

const baseClient = BaseHttpClient.getInstance();
const axiosInstance = baseClient.getAxiosInstance();

const analyticsClient = {
    getDashboardAnalytics: (days?: number): Promise<AnalyticsResponse> => {
        return axiosInstance.get<AnalyticsResponse>('/dashboard/analytics', {
            params: { days }
        }).then(response => response.data);
    },

    getDeviceDistribution: (): Promise<DeviceDistributionResponse> => {
        return axiosInstance.get<DeviceDistributionResponse>('/dashboard/device-distribution')
            .then(response => response.data);
    },

    getGeoDistribution: (): Promise<GeoDistributionResponse> => {
        return axiosInstance.get<GeoDistributionResponse>('/dashboard/geographic-distribution')
            .then(response => response.data);
    },

    getTopReferrers: (params?: {
        start_date?: string;
        end_date?: string;
        limit?: number;
        page?: number;
        sort_by?: 'revenue' | 'visits' | 'conversion_rate';
    }): Promise<ReferrerResponse> => {
        return axiosInstance.get<ReferrerResponse>('/dashboard/top-referrers', { params })
            .then(response => response.data);
    },

    getClickPerformance: (params?: {
        start_date?: string;
        end_date?: string;
        metric?: 'clicks' | 'visitors';
    }): Promise<ClickPerformanceResponse> => {
        return axiosInstance.get<ClickPerformanceResponse>('/dashboard/click-performance', { params })
            .then(response => response.data);
    }
};

export default analyticsClient;
