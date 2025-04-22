import React from 'react';
import {Button} from "@/components/ui/button";
import {Calendar, ChevronDown} from 'lucide-react';

const TimeRangeFilter = () => {
    return (
        <div className="mb-6">
            <h3 className="text-sm font-medium mb-2">Time Range</h3>
            <div className="grid grid-cols-3 gap-2">
                <Button variant="outline" size="sm" className="h-8 text-xs">Today</Button>
                <Button variant="outline" size="sm" className="h-8 text-xs bg-primary/5">7 Days</Button>
                <Button variant="outline" size="sm" className="h-8 text-xs">30 Days</Button>
            </div>

            <Button variant="outline" size="sm" className="w-full mt-2 text-xs justify-between">
                <div className="flex items-center">
                    <Calendar className="h-3.5 w-3.5 mr-2"/>
                    Custom Range
                </div>
                <ChevronDown className="h-3.5 w-3.5"/>
            </Button>
        </div>
    );
};

export default TimeRangeFilter;
