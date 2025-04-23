
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format, parseISO } from 'date-fns';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

interface RetentionChartProps {
  data: Array<{
    week: string;
    retentionRate: number;
  }>;
}

const RetentionChart: React.FC<RetentionChartProps> = ({ data }) => {
  const formattedData = data.map(item => ({
    week: item.week,
    retentionRate: item.retentionRate,
    formattedWeek: format(parseISO(item.week), 'MMM dd')
  }));

  return (
    <div className="h-[300px] w-full">
      <ChartContainer 
        config={{
          retentionRate: {
            theme: {
              light: '#0EA5E9',
              dark: '#7DD3FC',
            },
          },
        }}
      >
        <BarChart data={formattedData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis 
            dataKey="formattedWeek" 
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12 }}
            interval="preserveStartEnd" 
          />
          <YAxis 
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => `${value}%`}
            domain={[0, 100]}
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
          <Bar dataKey="retentionRate" fill="#0EA5E9" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default RetentionChart;
