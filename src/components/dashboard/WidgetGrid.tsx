
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Widget } from '@/types/dashboard';
import QuickCreateWidget from '../widgets/QuickCreateWidget';
import TopLinksWidget from '../widgets/TopLinksWidget';

interface WidgetGridProps {
  widgets: Widget[];
}

const WidgetGrid: React.FC<WidgetGridProps> = ({ widgets }) => {
  // Removed useToast and handleAddWidget since "Add Widget" card is removed

  const renderWidgetContent = (widget: Widget) => {
    switch (widget.type) {
      case 'create':
        return <QuickCreateWidget widget={widget} />;
      case 'chart':
        return <TopLinksWidget widget={widget} />;
      default:
        return <div>Widget content</div>;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {widgets.map((widget) => (
        <Card 
          key={widget.id}
          className={`shadow-sm transition-all hover:shadow-md 
          ${widget.size === 'large' ? 'lg:col-span-2' : ''} 
          ${widget.size === 'small' ? 'h-[200px]' : 'h-[350px]'}`}
        >
          <CardHeader className="p-4 pb-0">
            <CardTitle className="text-lg flex justify-between items-center">
              {widget.title}
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <ChevronDown className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 h-[calc(100%-60px)]">
            {renderWidgetContent(widget)}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default WidgetGrid;
