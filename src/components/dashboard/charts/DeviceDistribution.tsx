
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";

// Define device data type
interface DeviceData {
  name: string;
  value: number;
  color: string;
}

// Sample device data - would be replaced with API data
const deviceData: DeviceData[] = [
  { name: 'Mobile', value: 63, color: '#0fa0ce' },
  { name: 'Desktop', value: 31, color: '#9b87f5' },
  { name: 'Tablet', value: 6, color: '#f1c40f' },
];

const DeviceDistribution = () => {
  // Simulate data loading with react-query
  const { data, isLoading } = useQuery<DeviceData[]>({
    queryKey: ['deviceData'],
    queryFn: () => {
      // This would be an actual API call in production
      return new Promise<DeviceData[]>(resolve => {
        setTimeout(() => {
          resolve(deviceData);
        }, 500);
      });
    },
  });

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
        ) : (
          <div className="h-full flex flex-col items-center justify-center">
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={70}
                  paddingAngle={2}
                  dataKey="value"
                  animationDuration={1000}
                  animationBegin={200}
                >
                  {data?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Traffic Share']}
                  contentStyle={{ borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
              </PieChart>
            </ResponsiveContainer>
            
            <div className="flex gap-6 mt-2">
              {data?.map((entry) => (
                <div key={entry.name} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="text-sm">{entry.name} {entry.value}%</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DeviceDistribution;
