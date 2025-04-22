import React, {useState} from 'react';
import {Card, CardHeader, CardTitle, CardContent} from "@/components/ui/card";
import {Link, ArrowUp, ChevronDown, ChevronUp} from "lucide-react";
import {Skeleton} from "@/components/ui/skeleton";
import {useQuery} from "@tanstack/react-query";
import {Button} from "@/components/ui/button";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {useIsMobile} from "@/hooks/use-mobile";

interface ActivityItem {
    id: string;
    type: 'click_milestone' | 'link_created';
    title: string;
    timestamp: Date;
    icon: React.ReactNode;
}

const generateActivityData = (): ActivityItem[] => {
    return [];  // Return an empty array
};

const ActivityFeed = () => {
    const isMobile = useIsMobile();
    const [expanded, setExpanded] = useState(false);

    const {data, isLoading} = useQuery<ActivityItem[]>({
        queryKey: ['activityData'],
        queryFn: () => Promise.resolve([]),
    });

    const formatRelativeTime = (timestamp: Date): string => {
        return '';
    };

    return null;  // Render nothing
};

export default ActivityFeed;
