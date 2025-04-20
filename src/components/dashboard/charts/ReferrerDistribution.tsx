
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, LabelList } from 'recharts';
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";

// Define referrer data type
interface ReferrerData {
  name: string;
  value: number;
}

// Sample referrer data - would be replaced with API data
const referrerData: ReferrerData[] = [
  { name: 'google.com', value: 42 },
  { name: 'facebook.com', value: 27 },
  { name: 'twitter.com', value: 15 },
  { name: 'instagram.com', value: 8 },
  { name: 'linkedin.com', value: 6 },
];

const ReferrerDistribution = () => {
  // Simulate data loading with react-query
  const { data, isLoading } = useQuery<ReferrerData[]>({
    queryKey: ['referrerData'],
    queryFn: () => {
      // This would be an actual API call in production
      return new Promise<ReferrerData[]>(resolve => {
        setTimeout(() => {
          resolve(referrerData);
        }, 700);
      });
    },
  });

  // We need to sort the data for better visualization
  const sortedData = React.useMemo(() => {
    if (!data) return [];
    return [...data].sort((a, b) => b.value - a.value);
  }, [data]);

  return (
    <Card className="shadow-sm hover:shadow-md transition-all">
      <CardHeader className="px-6 py-4">
        <CardTitle className="text-lg">Top Referrers</CardTitle>
      </CardHeader>
      
      <CardContent className="px-0 pb-4 pt-0 h-[240px]">
        {isLoading ? (
          <div className="px-6 h-full flex items-center justify-center">
            <div className="w-full space-y-3">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-[85%]" />
              <Skeleton className="h-8 w-[70%]" />
              <Skeleton className="h-8 w-[55%]" />
              <Skeleton className="h-8 w-[40%]" />
            </div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={sortedData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis type="number" hide />
              <YAxis 
                type="category" 
                dataKey="name" 
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                width={90}
              />
              <Tooltip
                formatter={(value) => [`${value}%`, 'Traffic Share']}
                contentStyle={{ borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              />
              <Bar 
                dataKey="value" 
                fill="#0fa0ce" 
                radius={[0, 4, 4, 0]}
                animationDuration={1200}
              >
                <LabelList 
                  dataKey="value" 
                  position="right" 
                  fill="#666"
                  formatter={(value) => `${value}%`}
                  style={{ fontSize: '12px' }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default ReferrerDistribution;
