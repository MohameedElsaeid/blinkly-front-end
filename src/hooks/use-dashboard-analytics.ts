
import { useQuery } from '@tanstack/react-query';
import analyticsClient from '@/lib/analytics/analytics-client';
import { AnalyticsResponse } from '@/types/analytics/dashboard';

export function useDashboardAnalytics(days: number = 30) {
  return useQuery({
    queryKey: ['dashboardAnalytics', days],
    queryFn: () => analyticsClient.getDashboardAnalytics(days),
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
