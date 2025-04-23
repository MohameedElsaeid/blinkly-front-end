
import React from 'react';
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const data = [
  { date: 'Jan', qrScans: 400, linkClicks: 1400 },
  { date: 'Feb', qrScans: 520, linkClicks: 1200 },
  { date: 'Mar', qrScans: 640, linkClicks: 1450 },
  { date: 'Apr', qrScans: 730, linkClicks: 1300 },
  { date: 'May', qrScans: 890, linkClicks: 1220 },
  { date: 'Jun', qrScans: 1050, linkClicks: 1470 },
  { date: 'Jul', qrScans: 1250, linkClicks: 1590 },
];

const QrVsLinkClicksChart: React.FC = () => {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="qrScans" stackId="1" stroke="#8884d8" fill="#8884d8" name="QR Code Scans" />
          <Area type="monotone" dataKey="linkClicks" stackId="1" stroke="#82ca9d" fill="#82ca9d" name="Direct Link Clicks" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default QrVsLinkClicksChart;
