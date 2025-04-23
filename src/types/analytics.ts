export interface DistributionData {
    distribution: Record<string, number>;
    percentages: Record<string, number>;
}

export interface DeviceDistributionResponse {
    total_clicks: number;
    period_start: string;
    period_end: string;
    devices: DistributionData;
    browsers: DistributionData;
    operating_systems: DistributionData;
    browser_versions: DistributionData;
    os_versions: DistributionData;
    unique_devices: number;
    unique_browsers: number;
    unique_operating_systems: number;
}

export interface GeoDistributionResponse {
    total_clicks: number;
    period_start: string;
    period_end: string;
    countries: {
        distribution: Record<string, number>;
        percentages: Record<string, number>;
    };
    cities: {
        distribution: Record<string, number>;
        percentages: Record<string, number>;
    };
    locations: Array<{
        latitude: number;
        longitude: number;
        count: number;
    }>;
    unique_countries: number;
    unique_cities: number;
}

export interface ReferrerData {
    source: string;
    total_visits: number;
    bounce_rate: number;
    avg_session_duration: number;
    conversion_rate: number;
    total_revenue: number;
    change_percentage: number;
}

export interface ReferrerResponse {
    data: ReferrerData[];
    meta: {
        total: number;
        page: number;
        limit: number;
        total_pages: number;
    };
    period: {
        start: string;
        end: string;
    };
}

export interface DailyMetric {
    date: string;
    clicks: number;
    unique_visitors: number;
}

export interface ClickPerformanceResponse {
    total_clicks: number;
    unique_visitors: number;
    daily_metrics: DailyMetric[];
    period: {
        start: string;
        end: string;
    };
}

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
