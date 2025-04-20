
import React from 'react';
import { Button } from "@/components/ui/button";
import { BarChart } from 'lucide-react';
import { Widget } from '@/types/dashboard';

interface ClickTrendsWidgetProps {
  widget: Widget;
}

const ClickTrendsWidget: React.FC<ClickTrendsWidgetProps> = ({ widget }) => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium">Click Trends</h3>
        <div className="flex gap-1">
          <Button variant="outline" size="sm" className="h-7 px-2 text-xs">Day</Button>
          <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">Week</Button>
          <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">Month</Button>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="relative w-full h-[180px] flex items-center justify-center bg-gray-50 rounded-md">
          <BarChart className="h-24 w-24 text-gray-200" />
          <div className="absolute text-xs text-center">
            <p className="font-medium">Click Trends Visualization</p>
            <p className="text-muted-foreground">Daily trends for the last 30 days</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClickTrendsWidget;
