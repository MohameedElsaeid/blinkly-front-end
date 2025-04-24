
import { BasicAnalyticsData } from './performance';

export interface DashboardAnalyticsResponse {
    timeRange: {
        startDate: string;
        endDate: string;
    };
    linkCreation: {
        totalLinks: number;
        newLinksPerDay: Array<{
            date: string;
            count: number;
        }>;
        deletedLinks: number;
        updatedLinks: number;
    };
    sessions: {
        totalSessions: number;
        averageSessionDuration: number;
        bounceRate: number;
        sessionsPerDay: any[];
    };
    conversions: {
        totalConversions: number;
        conversionRate: number;
        conversionsByType: Record<string, number>;
        conversionValue: number;
        conversionsPerDay: any[];
    };
    campaigns: {
        bySources: Array<{
            source: string;
            clicks: number;
            conversions: number;
            value: number;
        }>;
        byMediums: Array<{
            medium: string;
            clicks: number;
            conversions: number;
            value: number;
        }>;
        byCampaigns: Array<{
            campaign: string;
            clicks: number;
            conversions: number;
            value: number;
        }>;
    };
    qrCodes: {
        totalScans: number;
        scansByCode: any[];
        scansPerDay: any[];
    };
    tags: {
        byTag: any[];
    };
    retention: {
        dailyActiveUsers: number;
        monthlyActiveUsers: number;
        retentionByWeek: Array<{
            week: string;
            retentionRate: number;
        }>;
    };
    errors: {
        totalErrors: number;
        errorsByType: Record<string, number>;
        averageResponseTime: number;
    };
}

export interface AnalyticsResponse extends BasicAnalyticsData, DashboardAnalyticsResponse {}
