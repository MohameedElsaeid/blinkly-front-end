
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format, parseISO } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

interface LinkCreationChartProps {
  data: Array<{
    date: string;
    count: number;
  }>;
}

const LinkCreationChart: React.FC<LinkCreationChartProps> = ({ data }) => {
  const formattedData = data.map(item => ({
    date: item.date,
    count: item.count,
    formattedDate: format(parseISO(item.date), 'MMM dd')
  }));

  return (
    <div className="h-[300px] w-full">
      <ChartContainer 
        config={{
          count: {
            theme: {
              light: '#8B5CF6',
              dark: '#C4B5FD',
            },
          },
        }}
      >
        <AreaChart data={formattedData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis 
            dataKey="formattedDate" 
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12 }}
            interval="preserveStartEnd"
          />
          <YAxis 
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => value.toLocaleString()}
            width={40}
          />
          <ChartTooltip 
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <ChartTooltipContent 
                    className="bg-white p-2 border shadow-md rounded-md text-xs"
                  />
                );
              }
              return null;
            }}
          />
          <Area 
            type="monotone" 
            dataKey="count" 
            stroke="#8B5CF6" 
            fillOpacity={1} 
            fill="url(#colorCount)" 
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
};

export default LinkCreationChart;
