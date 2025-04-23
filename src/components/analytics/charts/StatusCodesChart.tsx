
import React from 'react';
import { Line, LineChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const data = [
  { date: '2023-01', code200: 4540, code301: 245, code404: 23, responseTime: 120 },
  { date: '2023-02', code200: 4845, code301: 287, code404: 19, responseTime: 118 },
  { date: '2023-03', code200: 5142, code301: 312, code404: 26, responseTime: 125 },
  { date: '2023-04', code200: 4993, code301: 298, code404: 31, responseTime: 130 },
  { date: '2023-05', code200: 5463, code301: 325, code404: 22, responseTime: 122 },
  { date: '2023-06', code200: 5927, code301: 356, code404: 18, responseTime: 116 },
  { date: '2023-07', code200: 6352, code301: 378, code404: 24, responseTime: 119 },
];

const StatusCodesChart: React.FC = () => {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Legend />
          <Line yAxisId="left" type="monotone" dataKey="code200" stroke="#82ca9d" name="200 OK" dot={false} />
          <Line yAxisId="left" type="monotone" dataKey="code301" stroke="#8884d8" name="301 Redirect" dot={false} />
          <Line yAxisId="left" type="monotone" dataKey="code404" stroke="#ff8042" name="404 Not Found" dot={false} />
          <Line yAxisId="right" type="monotone" dataKey="responseTime" stroke="#ff4757" name="Avg Response Time (ms)" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatusCodesChart;
