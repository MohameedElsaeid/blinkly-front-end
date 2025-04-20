
import React from 'react';
import { X, Filter, Save, ChevronDown, Calendar } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface FilterPanelProps {
  onClose: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ onClose }) => {
  const { toast } = useToast();
  
  const handleSaveSegment = () => {
    toast({
      title: "Segment Saved",
      description: "Your filter segment has been saved successfully",
    });
  };

  return (
    <div className="w-72 border-r bg-card flex flex-col overflow-hidden">
      <div className="p-4 border-b flex justify-between items-center">
        <div className="flex items-center">
          <Filter className="h-5 w-5 mr-2" />
          <h2 className="font-medium">Filters & Segments</h2>
        </div>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="p-4 flex-1 overflow-y-auto">
        <div className="mb-6">
          <h3 className="text-sm font-medium mb-2">Time Range</h3>
          <div className="grid grid-cols-3 gap-2">
            <Button variant="outline" size="sm" className="h-8 text-xs">Today</Button>
            <Button variant="outline" size="sm" className="h-8 text-xs bg-primary/5">7 Days</Button>
            <Button variant="outline" size="sm" className="h-8 text-xs">30 Days</Button>
          </div>
          
          <Button variant="outline" size="sm" className="w-full mt-2 text-xs justify-between">
            <div className="flex items-center">
              <Calendar className="h-3.5 w-3.5 mr-2" />
              Custom Range
            </div>
            <ChevronDown className="h-3.5 w-3.5" />
          </Button>
        </div>
        
        <div className="mb-6">
          <h3 className="text-sm font-medium mb-2">Status</h3>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded border-gray-300" defaultChecked />
              <span className="text-sm">Active</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded border-gray-300" />
              <span className="text-sm">Paused</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded border-gray-300" />
              <span className="text-sm">Archived</span>
            </label>
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="text-sm font-medium mb-2">Link Type</h3>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded border-gray-300" defaultChecked />
              <span className="text-sm">Standard</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded border-gray-300" defaultChecked />
              <span className="text-sm">Dynamic</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded border-gray-300" defaultChecked />
              <span className="text-sm">QR</span>
            </label>
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="text-sm font-medium mb-2">Saved Segments</h3>
          <div className="space-y-2">
            <Card className="p-2 cursor-pointer hover:bg-muted/50">
              <CardContent className="p-0">
                <p className="text-sm font-medium">High-Value Campaign</p>
                <p className="text-xs text-muted-foreground">UTM Source: Newsletter</p>
              </CardContent>
            </Card>
            <Card className="p-2 cursor-pointer hover:bg-muted/50">
              <CardContent className="p-0">
                <p className="text-sm font-medium">EU Traffic</p>
                <p className="text-xs text-muted-foreground">Region: Europe</p>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="mb-4">
          <h3 className="text-sm font-medium mb-2">Active Filters</h3>
          <div className="flex flex-wrap gap-2">
            <div className="bg-primary/10 text-xs px-2 py-1 rounded-full flex items-center">
              Last 7 Days
              <X className="h-3 w-3 ml-1 cursor-pointer" />
            </div>
            <div className="bg-primary/10 text-xs px-2 py-1 rounded-full flex items-center">
              Status: Active
              <X className="h-3 w-3 ml-1 cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4 border-t">
        <Button className="w-full mb-2" onClick={handleSaveSegment}>
          <Save className="h-4 w-4 mr-2" />
          Save Segment
        </Button>
        <Button variant="outline" className="w-full" onClick={onClose}>
          Apply Filters
        </Button>
      </div>
    </div>
  );
};

export default FilterPanel;
