
import React from 'react';
import { Button } from "@/components/ui/button";
import { ChevronDown } from 'lucide-react';
import { Widget } from '@/types/dashboard';

interface TopLinksWidgetProps {
  widget: Widget;
}

const TopLinksWidget: React.FC<TopLinksWidgetProps> = ({ widget }) => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium">Top Performing Links</h3>
        <Button variant="ghost" size="sm">
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex-1 flex flex-col space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                <span className="text-xs font-medium">{i + 1}</span>
              </div>
              <span className="text-sm">product-launch-{i + 1}</span>
            </div>
            <span className="text-sm font-medium">{(3200 - i * 420).toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopLinksWidget;
