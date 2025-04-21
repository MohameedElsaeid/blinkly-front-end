
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface PieChartDisplayProps {
  data: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  title: string;
}

const PieChartDisplay = ({ data, title }: PieChartDisplayProps) => {
  if (data.length === 0) {
    return (
      <div className="h-[160px] flex items-center justify-center text-muted-foreground">
        No {title.toLowerCase()} data available
      </div>
    );
  }

  return (
    <div className="h-[160px]">
      <ResponsiveContainer width="100%" height="100%">
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
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value, name) => [`${value} clicks`, name]}
            contentStyle={{ borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartDisplay;
