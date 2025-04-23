
import React from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const data = [
  {
    name: 'Summer Sale',
    clicks: 4000,
    conversions: 240,
    conversionRate: 6,
  },
  {
    name: 'Product Launch',
    clicks: 3000,
    conversions: 198,
    conversionRate: 6.6,
  },
  {
    name: 'Email Newsletter',
    clicks: 2000,
    conversions: 120,
    conversionRate: 6,
  },
  {
    name: 'Social Media',
    clicks: 2780,
    conversions: 108,
    conversionRate: 3.9,
  },
  {
    name: 'Partner Promo',
    clicks: 1890,
    conversions: 79,
    conversionRate: 4.2,
  },
];

const CampaignPerformanceChart: React.FC = () => {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
          <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
          <Tooltip />
          <Legend />
          <Bar yAxisId="left" dataKey="clicks" fill="#8884d8" name="Clicks" />
          <Bar yAxisId="right" dataKey="conversions" fill="#82ca9d" name="Conversions" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CampaignPerformanceChart;
