
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

export interface BasicAnalyticsData {
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
