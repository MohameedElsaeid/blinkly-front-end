
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, ChevronDown } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Widget } from '@/types/dashboard';
import QuickCreateWidget from '../widgets/QuickCreateWidget';
import TopLinksWidget from '../widgets/TopLinksWidget';
import GlobalMapWidget from '../widgets/GlobalMapWidget';
import ClickTrendsWidget from '../widgets/ClickTrendsWidget';
import RecentActivityWidget from '../widgets/RecentActivityWidget';

interface WidgetGridProps {
  widgets: Widget[];
}

const WidgetGrid: React.FC<WidgetGridProps> = ({ widgets }) => {
  const { toast } = useToast();

  const handleAddWidget = () => {
    toast({
      title: "Add Widget",
      description: "This would open a widget selection modal",
    });
  };

  const renderWidgetContent = (widget: Widget) => {
    switch (widget.type) {
      case 'create':
        return <QuickCreateWidget widget={widget} />;
      case 'chart':
        return <TopLinksWidget widget={widget} />;
      case 'map':
        return <GlobalMapWidget widget={widget} />;
      case 'trend':
        return <ClickTrendsWidget widget={widget} />;
      case 'feed':
        return <RecentActivityWidget widget={widget} />;
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
      
      <Card className="border-dashed bg-muted/50 flex flex-col items-center justify-center h-[350px]" onClick={handleAddWidget}>
        <CardContent className="flex flex-col items-center justify-center h-full cursor-pointer">
          <div className="w-12 h-12 rounded-full border-2 border-dashed border-muted-foreground flex items-center justify-center mb-4">
            <Plus className="h-6 w-6 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground font-medium">Add Widget</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default WidgetGrid;
