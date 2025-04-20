import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, ChevronDown, BarChart, Globe, Activity, QrCode } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Widget, WidgetType, WidgetSize } from '@/types/dashboard';

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
        return (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="mb-6 w-16 h-16 flex items-center justify-center rounded-full bg-blinkly-blue/10">
              <Plus className="h-8 w-8 text-blinkly-blue" />
            </div>
            <h3 className="text-xl font-medium mb-4">Create a New Link</h3>
            <div className="flex gap-3">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Short Link
              </Button>
              <Button variant="outline">
                <QrCode className="h-4 w-4 mr-2" />
                QR Code
              </Button>
            </div>
          </div>
        );
      case 'chart':
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
      case 'map':
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
      case 'trend':
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
      case 'feed':
        return (
          <div className="h-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-medium">Recent Activity</h3>
              <Button variant="ghost" size="sm">
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex-1 space-y-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3 mt-0.5">
                    <Activity className="h-4 w-4 text-gray-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Product link {i+1} created</p>
                    <p className="text-xs text-muted-foreground">{i+1} hour{i !== 0 ? 's' : ''} ago</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
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
      
      {/* Add Widget Card */}
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
