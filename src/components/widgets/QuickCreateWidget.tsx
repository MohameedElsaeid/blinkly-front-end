import React from 'react';
import CreateLinkForm from '../dashboard/CreateLinkForm';
import CreateDynamicLinkForm from '../dashboard/CreateDynamicLinkForm';
import {Widget} from '@/types/dashboard';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';

interface QuickCreateWidgetProps {
    widget: Widget;
}

const QuickCreateWidget: React.FC<QuickCreateWidgetProps> = ({widget}) => {
    return (
        <Tabs defaultValue="standard" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="standard">Standard Link</TabsTrigger>
                <TabsTrigger value="dynamic">Dynamic Link</TabsTrigger>
            </TabsList>
            <TabsContent value="standard">
                <CreateLinkForm/>
            </TabsContent>
            <TabsContent value="dynamic">
                <CreateDynamicLinkForm/>
            </TabsContent>
        </Tabs>
    );
};

export default QuickCreateWidget;
