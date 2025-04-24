
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
