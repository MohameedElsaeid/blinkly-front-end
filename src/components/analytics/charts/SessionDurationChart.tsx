
import React from 'react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

const data = [
  { duration: '0-10s', count: 354 },
  { duration: '10-30s', count: 627 },
  { duration: '30-60s', count: 498 },
  { duration: '1-2m', count: 389 },
  { duration: '2-5m', count: 246 },
  { duration: '5-10m', count: 124 },
  { duration: '10m+', count: 52 }
];

const SessionDurationChart: React.FC = () => {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 20, left: 20, bottom: 30 }}
        >
          <XAxis dataKey="duration" />
          <YAxis />
          <Tooltip 
            formatter={(value) => [`${value} sessions`, 'Count']} 
            labelFormatter={(label) => `Duration: ${label}`}
          />
          <Bar dataKey="count" fill="#8884d8" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SessionDurationChart;
