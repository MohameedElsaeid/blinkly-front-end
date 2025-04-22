import React from 'react';

const StatusFilter = () => {
    return (
        <div className="mb-6">
            <h3 className="text-sm font-medium mb-2">Status</h3>
            <div className="space-y-2">
                <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded border-gray-300" defaultChecked/>
                    <span className="text-sm">Active</span>
                </label>
                <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded border-gray-300"/>
                    <span className="text-sm">Paused</span>
                </label>
                <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded border-gray-300"/>
                    <span className="text-sm">Archived</span>
                </label>
            </div>
        </div>
    );
};

export default StatusFilter;
