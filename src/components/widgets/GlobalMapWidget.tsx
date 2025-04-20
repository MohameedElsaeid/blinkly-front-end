
import React from 'react';
import { Button } from "@/components/ui/button";
import { ChevronDown, Globe } from 'lucide-react';
import { Widget } from '@/types/dashboard';

interface GlobalMapWidgetProps {
  widget: Widget;
}

const GlobalMapWidget: React.FC<GlobalMapWidgetProps> = ({ widget }) => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium">Global Traffic</h3>
        <Button variant="ghost" size="sm">
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="relative w-full h-[180px] p-4 flex items-center justify-center bg-gray-50 rounded-md">
          <Globe className="h-24 w-24 text-gray-200" />
          <div className="absolute text-xs text-center">
            <p className="font-medium">World Map Visualization</p>
            <p className="text-muted-foreground">Click data across 45 countries</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalMapWidget;
