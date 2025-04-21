import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp, ExternalLink } from "lucide-react";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import httpClient from '@/lib/http-client';
import { TopLink } from '@/types/link';

const TopLinksTable = () => {
  const isMobile = useIsMobile();
  const [sortColumn, setSortColumn] = useState('clickCount');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  
  const { data, isLoading } = useQuery({
    queryKey: ['topLinks'],
    queryFn: httpClient.getTopLinks,
  });

  const sortedData = React.useMemo(() => {
    if (!data?.links) return [];
    
    return [...data.links].sort((a, b) => {
      const valueA = a[sortColumn as keyof TopLink];
      const valueB = b[sortColumn as keyof TopLink];
      
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return sortDirection === 'asc' 
          ? valueA.localeCompare(valueB) 
          : valueB.localeCompare(valueA);
      }
      
      return sortDirection === 'asc' 
        ? Number(valueA) - Number(valueB) 
        : Number(valueB) - Number(valueA);
    });
  }, [data?.links, sortColumn, sortDirection]);

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('desc');
    }
  };

  const truncateUrl = (url: string) => {
    return url.length > 40 ? url.substring(0, 40) + '...' : url;
  };

  const displayData = isMobile ? sortedData?.slice(0, 5) : sortedData;

  return (
    <Card className="shadow-sm hover:shadow-md transition-all">
      <CardHeader className="px-6 py-4 flex flex-col sm:flex-row justify-between sm:items-center">
        <CardTitle className="text-lg sm:text-xl mb-3 sm:mb-0">Top Performing Links</CardTitle>
        {!isMobile && (
          <Button variant="outline" size="sm" className="w-full sm:w-auto">
            <ExternalLink className="mr-2 h-4 w-4" />
            View All Links
          </Button>
        )}
      </CardHeader>
      
      <CardContent className="px-0 pb-4 pt-0">
        {isLoading ? (
          <div className="px-6 space-y-4">
            <Skeleton className="h-8 w-full" />
            {[...Array(isMobile ? 5 : 8)].map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">
                      <SortableHeader 
                        column="alias" 
                        label="Alias" 
                        currentSort={sortColumn} 
                        direction={sortDirection} 
                        onSort={handleSort} 
                      />
                    </TableHead>
                    <TableHead>
                      <SortableHeader 
                        column="originalUrl" 
                        label="Original URL" 
                        currentSort={sortColumn} 
                        direction={sortDirection} 
                        onSort={handleSort} 
                      />
                    </TableHead>
                    <TableHead className="text-right">
                      <SortableHeader 
                        column="clickCount" 
                        label="Clicks" 
                        currentSort={sortColumn} 
                        direction={sortDirection} 
                        onSort={handleSort} 
                      />
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {displayData?.map((link) => (
                    <TableRow key={link.id} className="hover:bg-muted/30">
                      <TableCell className="font-medium">
                        {link.alias}
                      </TableCell>
                      <TableCell>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger className="text-left">
                              {truncateUrl(link.originalUrl)}
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-[300px] break-all">{link.originalUrl}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableCell>
                      <TableCell className="text-right">
                        {link.clickCount.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            {displayData.length === 0 && (
              <div className="px-6 py-8 text-center text-muted-foreground">
                <p>No top links data available</p>
              </div>
            )}
            
            {isMobile && displayData.length > 5 && (
              <div className="px-6 mt-4">
                <Button variant="outline" size="sm" className="w-full">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View All Links
                </Button>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

interface SortableHeaderProps {
  column: string;
  label: string;
  currentSort: string;
  direction: string;
  onSort: (column: string) => void;
}

const SortableHeader: React.FC<SortableHeaderProps> = ({ column, label, currentSort, direction, onSort }) => (
  <button
    className="flex items-center gap-1 hover:text-foreground font-medium"
    onClick={() => onSort(column)}
  >
    {label}
    {currentSort === column && (
      direction === 'asc' ? 
        <ArrowUp className="h-3.5 w-3.5" /> : 
        <ArrowDown className="h-3.5 w-3.5" />
    )}
  </button>
);

export default TopLinksTable;
