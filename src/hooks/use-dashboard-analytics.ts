
import { useQuery } from '@tanstack/react-query';
import httpClient from '@/lib/http-client';
import { DashboardAnalyticsResponse } from '@/types/analytics';

export function useDashboardAnalytics(days: number = 30) {
  return useQuery({
    queryKey: ['dashboardAnalytics', days],
    queryFn: async () => {
      return httpClient.getDashboardAnalytics(days);
    },
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
