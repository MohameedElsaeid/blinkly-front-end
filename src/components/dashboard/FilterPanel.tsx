import React from 'react';
import {X, Filter, Save} from 'lucide-react';
import {Button} from "@/components/ui/button";
import {useToast} from "@/hooks/use-toast";
import TimeRangeFilter from './filters/TimeRangeFilter';
import StatusFilter from './filters/StatusFilter';
import LinkTypeFilter from './filters/LinkTypeFilter';
import SavedSegments from './filters/SavedSegments';
import ActiveFilters from './filters/ActiveFilters';

interface FilterPanelProps {
    onClose: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({onClose}) => {
    const {toast} = useToast();

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
                    <Filter className="h-5 w-5 mr-2"/>
                    <h2 className="font-medium">Filters & Segments</h2>
                </div>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={onClose}>
                    <X className="h-4 w-4"/>
                </Button>
            </div>

            <div className="p-4 flex-1 overflow-y-auto">
                <TimeRangeFilter/>
                <StatusFilter/>
                <LinkTypeFilter/>
                <SavedSegments/>
                <ActiveFilters/>
            </div>

            <div className="p-4 border-t">
                <Button className="w-full mb-2" onClick={handleSaveSegment}>
                    <Save className="h-4 w-4 mr-2"/>
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
