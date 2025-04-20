
import React from 'react';
import { X } from 'lucide-react';

const ActiveFilters = () => {
  return (
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
  );
};

export default ActiveFilters;
