
import React, { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from 'lucide-react';

interface GlobalFiltersProps {
  onTimeframeChange?: (days: number) => void;
}

const GlobalFilters: React.FC<GlobalFiltersProps> = ({ onTimeframeChange }) => {
  const [timeframe, setTimeframe] = useState('30');
  
  const handleTimeframeChange = (value: string) => {
    setTimeframe(value);
    if (onTimeframeChange) {
      onTimeframeChange(parseInt(value));
    }
  };

  return (
    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
      <div className="flex items-center space-x-2">
        <Calendar className="h-4 w-4 text-gray-500" />
        <Select value={timeframe} onValueChange={handleTimeframeChange}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Select timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">Last 7 days</SelectItem>
            <SelectItem value="14">Last 14 days</SelectItem>
            <SelectItem value="30">Last 30 days</SelectItem>
            <SelectItem value="90">Last 90 days</SelectItem>
            <SelectItem value="180">Last 180 days</SelectItem>
            <SelectItem value="365">Last 365 days</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex space-x-2">
        <Button variant="outline" size="sm">Compare</Button>
        <Button variant="outline" size="sm">
          <Calendar className="h-4 w-4 mr-2" />
          Custom Range
        </Button>
      </div>
      <div className="flex-grow"></div>
      <Button size="sm" variant="default">Apply Filters</Button>
    </div>
  );
};

export default GlobalFilters;
