
import React from 'react';
import { TrendingUp, TrendingDown, Link as LinkIcon, Globe, Clock } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from '@tanstack/react-query';
import httpClient from '@/lib/http-client';

const KpiStrip = () => {
  // Fetch data using React Query (simplified for demo)
  const { data: totalClicksData } = useQuery({
    queryKey: ['dashboardTotalClicks'],
    queryFn: httpClient.getDashboardTotalClicks,
  });

  // Demo KPI data
  const kpis = [
    {
      id: 'clicks-today',
      icon: <TrendingUp className="h-5 w-5 text-blinkly-blue" />,
      label: 'Clicks Today',
      value: totalClicksData?.totalClicks || 3482,
      change: '+5%',
      isPositive: true
    },
    {
      id: 'links-created',
      icon: <LinkIcon className="h-5 w-5 text-blinkly-blue" />,
      label: 'Links Created (24h)',
      value: 218,
      change: '+12%',
      isPositive: true
    },
    {
      id: 'unique-countries',
      icon: <Globe className="h-5 w-5 text-blinkly-blue" />,
      label: 'Unique Countries',
      value: 45,
      change: '0%',
      isPositive: true
    },
    {
      id: 'avg-load-time',
      icon: <Clock className="h-5 w-5 text-blinkly-blue" />,
      label: 'Avg. Load Time',
      value: '0.45s',
      change: '-8%',
      isPositive: true
    },
  ];

  return (
    <div className="bg-card/50 border-y px-6 py-3">
      <div className="mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <Card key={kpi.id} className="border-0 shadow-none bg-transparent">
            <CardContent className="p-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {kpi.icon}
                  <div>
                    <p className="text-xs text-muted-foreground">{kpi.label}</p>
                    <p className="text-xl font-bold">
                      {typeof kpi.value === 'number' ? kpi.value.toLocaleString() : kpi.value}
                    </p>
                  </div>
                </div>
                <div className={`text-xs flex items-center ${kpi.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {kpi.change}
                  {kpi.change.startsWith('+') ? (
                    <TrendingUp className="h-3 w-3 ml-1" />
                  ) : kpi.change.startsWith('-') ? (
                    <TrendingDown className="h-3 w-3 ml-1" />
                  ) : null}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default KpiStrip;
