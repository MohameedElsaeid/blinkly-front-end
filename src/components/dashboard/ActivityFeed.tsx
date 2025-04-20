
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Link, ArrowUp, ChevronDown, ChevronUp } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useIsMobile } from "@/hooks/use-mobile";

// Sample activity data - would be replaced with API data
const generateActivityData = () => {
  const activities = [
    {
      id: '1',
      type: 'click_milestone',
      title: 'product-launch-2024 hit 10K clicks',
      timestamp: new Date(Date.now() - 25 * 60 * 1000),
      icon: <ArrowUp className="h-4 w-4 text-green-500" />,
    },
    {
      id: '2',
      type: 'link_created',
      title: 'New link created: summer-promo',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      icon: <Link className="h-4 w-4 text-blinkly-blue" />,
    },
    {
      id: '3',
      type: 'click_milestone',
      title: 'black-friday-special hit 5K clicks',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      icon: <ArrowUp className="h-4 w-4 text-green-500" />,
    },
    {
      id: '4',
      type: 'link_created',
      title: 'New link created: partner-referral',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      icon: <Link className="h-4 w-4 text-blinkly-blue" />,
    },
    {
      id: '5',
      type: 'link_created',
      title: 'New link created: blog-feature',
      timestamp: new Date(Date.now() - 9 * 60 * 60 * 1000),
      icon: <Link className="h-4 w-4 text-blinkly-blue" />,
    },
    {
      id: '6',
      type: 'click_milestone',
      title: 'newsletter-signup hit 1K clicks',
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
      icon: <ArrowUp className="h-4 w-4 text-green-500" />,
    },
    {
      id: '7',
      type: 'link_created',
      title: 'New link created: webinar-registration',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      icon: <Link className="h-4 w-4 text-blinkly-blue" />,
    },
  ];
  
  return activities;
};

const ActivityFeed = () => {
  const isMobile = useIsMobile();
  const [expanded, setExpanded] = useState(false);
  
  // Simulate data loading with react-query
  const { data, isLoading } = useQuery({
    queryKey: ['activityData'],
    queryFn: () => {
      // This would be an actual API call in production
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(generateActivityData());
        }, 600);
      });
    },
  });

  // Format the timestamp relative to now
  const formatRelativeTime = (timestamp) => {
    const now = new Date();
    const diffMs = now.getTime() - timestamp.getTime();
    const diffMins = Math.round(diffMs / (1000 * 60));
    const diffHours = Math.round(diffMs / (1000 * 60 * 60));
    
    if (diffMins < 60) {
      return `${diffMins} minute${diffMins === 1 ? '' : 's'} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
    } else {
      const days = Math.round(diffHours / 24);
      return `${days} day${days === 1 ? '' : 's'} ago`;
    }
  };

  // Determine how many items to show initially
  const initialItems = isMobile ? 3 : 5;

  return (
    <Card className="shadow-sm hover:shadow-md transition-all">
      <CardHeader className="px-6 py-4">
        <CardTitle className="text-lg">Recent Activity</CardTitle>
      </CardHeader>
      
      <CardContent className="px-6 pb-4 pt-0">
        {isLoading ? (
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex gap-3">
                <Skeleton className="h-8 w-8 rounded-full" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-3 w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : isMobile ? (
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="activities" border={false}>
              <AccordionTrigger className="py-2 hover:no-underline">
                <span className="text-sm font-medium">View Activities</span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 pt-2">
                  {data?.slice(0, initialItems).map((activity) => (
                    <ActivityItem 
                      key={activity.id} 
                      activity={activity} 
                      formatTime={formatRelativeTime} 
                    />
                  ))}
                  {data?.length > initialItems && (
                    <Button 
                      variant="ghost" 
                      className="w-full text-sm h-8 mt-1"
                      onClick={() => {}}
                    >
                      View all activities
                    </Button>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ) : (
          <div className="space-y-4 max-h-[280px] overflow-y-auto pr-2">
            {data?.slice(0, expanded ? undefined : initialItems).map((activity) => (
              <ActivityItem 
                key={activity.id} 
                activity={activity} 
                formatTime={formatRelativeTime} 
              />
            ))}
            {data?.length > initialItems && (
              <Button 
                variant="ghost" 
                className="w-full text-sm h-8"
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? (
                  <><ChevronUp className="mr-1 h-4 w-4" /> Show less</>
                ) : (
                  <><ChevronDown className="mr-1 h-4 w-4" /> Show more</>
                )}
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const ActivityItem = ({ activity, formatTime }) => (
  <div className="flex items-start gap-3">
    <div className="w-8 h-8 rounded-full bg-primary-foreground flex items-center justify-center mt-0.5">
      {activity.icon}
    </div>
    <div>
      <p className="text-sm font-medium">{activity.title}</p>
      <p className="text-xs text-muted-foreground">{formatTime(activity.timestamp)}</p>
    </div>
  </div>
);

export default ActivityFeed;
