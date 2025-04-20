
import React from 'react';

const LinkTypeFilter = () => {
  return (
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
  );
};

export default LinkTypeFilter;
