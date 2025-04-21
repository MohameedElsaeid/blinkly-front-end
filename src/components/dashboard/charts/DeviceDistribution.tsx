
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import httpClient from '@/lib/http-client';
import { DeviceDistributionResponse } from '@/types/analytics';

const COLORS = ['#0fa0ce', '#9b87f5', '#f1c40f', '#e74c3c', '#2ecc71'];

const DeviceDistribution = () => {
  const { data, isLoading } = useQuery<DeviceDistributionResponse>({
    queryKey: ['deviceDistribution'],
    queryFn: httpClient.getDeviceDistribution,
  });

  const getPieChartData = (distribution: Record<string, number> = {}) => {
    return Object.entries(distribution).map(([name, value], index) => ({
      name,
      value,
      color: COLORS[index % COLORS.length]
    }));
  };

  const deviceData = data?.devices.distribution 
    ? getPieChartData(data.devices.distribution)
    : [];

  return (
    <Card className="shadow-sm hover:shadow-md transition-all">
      <CardHeader className="px-6 py-4">
        <CardTitle className="text-lg">Device Distribution</CardTitle>
      </CardHeader>
      
      <CardContent className="px-6 pb-4 pt-0 h-[240px]">
        {isLoading ? (
          <div className="h-full flex items-center justify-center">
            <div className="w-full space-y-4">
              <Skeleton className="h-[160px] w-[160px] rounded-full mx-auto" />
              <div className="flex justify-center gap-4">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
          </div>
        ) : deviceData.length > 0 ? (
          <div className="h-full flex flex-col items-center justify-center">
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie
                  data={deviceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={70}
                  paddingAngle={2}
                  dataKey="value"
                  animationDuration={1000}
                  animationBegin={200}
                >
                  {deviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name) => [`${value} clicks`, name]}
                  contentStyle={{ borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
              </PieChart>
            </ResponsiveContainer>
            
            <div className="flex flex-wrap gap-4 mt-2 justify-center">
              {deviceData.map((entry) => (
                <div key={entry.name} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="text-sm">{entry.name}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-muted-foreground">
            No device data available
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DeviceDistribution;
