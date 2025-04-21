
import React from 'react';
import { Button } from "@/components/ui/button";
import { ChevronDown } from 'lucide-react';
import { Widget } from '@/types/dashboard';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';
import { Link } from 'react-router-dom';
import httpClient from '@/lib/http-client';

interface TopLinksWidgetProps {
  widget: Widget;
}

const TopLinksWidget: React.FC<TopLinksWidgetProps> = ({ widget }) => {
  const { data, isLoading } = useQuery({
    queryKey: ['topLinks'],
    queryFn: httpClient.getTopLinks,
  });

  if (isLoading) {
    return (
      <div className="h-full flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-medium">Top Performing Links</h3>
          <Button variant="ghost" size="sm">
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex-1 flex flex-col space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center">
                <Skeleton className="w-8 h-8 rounded-full" />
                <Skeleton className="h-4 w-32 ml-3" />
              </div>
              <Skeleton className="h-4 w-16" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium">Top Performing Links</h3>
        <Button variant="ghost" size="sm">
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex-1 flex flex-col space-y-3">
        {data?.links.map((link, index) => (
          <Link 
            key={link.id} 
            to={`/dashboard/links/${link.id}`}
            className="flex items-center justify-between hover:bg-muted/50 p-2 rounded-lg transition-colors"
          >
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                <span className="text-xs font-medium">{index + 1}</span>
              </div>
              <span className="text-sm truncate max-w-[150px]" title={link.alias}>
                {link.alias}
              </span>
            </div>
            <span className="text-sm font-medium">{link.clickCount.toLocaleString()}</span>
          </Link>
        ))}

        {data?.links.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
            <p className="text-sm">No links found</p>
            <p className="text-xs">Create your first link to see analytics</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopLinksWidget;
