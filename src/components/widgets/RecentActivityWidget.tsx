import React from 'react';
import {Button} from "@/components/ui/button";
import {ChevronDown, Activity} from 'lucide-react';
import {Widget} from '@/types/dashboard';

interface RecentActivityWidgetProps {
    widget: Widget;
}

const RecentActivityWidget: React.FC<RecentActivityWidgetProps> = ({widget}) => {
    return (
        <div className="h-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-medium">Recent Activity</h3>
                <Button variant="ghost" size="sm">
                    <ChevronDown className="h-4 w-4"/>
                </Button>
            </div>
            <div className="flex-1 space-y-3">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex items-start">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3 mt-0.5">
                            <Activity className="h-4 w-4 text-gray-500"/>
                        </div>
                        <div>
                            <p className="text-sm font-medium">Product link {i + 1} created</p>
                            <p className="text-xs text-muted-foreground">{i + 1} hour{i !== 0 ? 's' : ''} ago</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentActivityWidget;
