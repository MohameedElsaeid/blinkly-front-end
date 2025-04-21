
import React from 'react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Analytics } from '@/types/link';

interface LinkAnalyticsProps {
  analytics: Analytics;
}

const LinkAnalytics: React.FC<LinkAnalyticsProps> = ({ analytics }) => {
  const clicksByDateData = Object.entries(analytics.clicksByCountry).map(([date, count]) => ({
    date,
    clicks: count,
  }));

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-2 gap-4">
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Total Clicks</dt>
              <dd className="text-2xl font-bold">{analytics.totalClicks}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Unique Devices</dt>
              <dd className="text-2xl font-bold">{analytics.uniqueDevices}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Clicks by Country</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={clicksByDateData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="clicks" fill="#2563eb" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LinkAnalytics;
