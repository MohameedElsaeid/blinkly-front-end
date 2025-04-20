
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp, ExternalLink, Link as LinkIcon } from "lucide-react";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { useIsMobile } from "@/hooks/use-mobile";

// Define link item type
interface LinkItem {
  id: string;
  alias: string;
  clicks: number;
  ctr: number;
  topCountry: string;
  status: 'active' | 'paused';
}

// Sample links data - would be replaced with API data
const generateLinksData = (): LinkItem[] => {
  const links: LinkItem[] = [
    { id: '1', alias: 'product-launch-2024', clicks: 10549, ctr: 12.3, topCountry: 'US', status: 'active' },
    { id: '2', alias: 'black-friday-special', clicks: 7832, ctr: 8.7, topCountry: 'UK', status: 'active' },
    { id: '3', alias: 'holiday-promo', clicks: 5421, ctr: 7.9, topCountry: 'DE', status: 'active' },
    { id: '4', alias: 'summer-sale-2024', clicks: 4765, ctr: 6.2, topCountry: 'FR', status: 'active' },
    { id: '5', alias: 'newsletter-signup', clicks: 3218, ctr: 9.5, topCountry: 'CA', status: 'active' },
    { id: '6', alias: 'ebook-download', clicks: 2876, ctr: 14.7, topCountry: 'US', status: 'active' },
    { id: '7', alias: 'webinar-registration', clicks: 2543, ctr: 11.3, topCountry: 'IN', status: 'active' },
    { id: '8', alias: 'case-study-tech', clicks: 1987, ctr: 8.9, topCountry: 'DE', status: 'paused' },
    { id: '9', alias: 'partner-referral', clicks: 1754, ctr: 10.5, topCountry: 'US', status: 'active' },
    { id: '10', alias: 'blog-feature', clicks: 1632, ctr: 7.8, topCountry: 'CA', status: 'paused' },
  ];
  
  return links;
};

const TopLinksTable = () => {
  const isMobile = useIsMobile();
  const [sortColumn, setSortColumn] = useState('clicks');
  const [sortDirection, setSortDirection] = useState('desc');
  
  // Simulate data loading with react-query
  const { data, isLoading } = useQuery<LinkItem[]>({
    queryKey: ['topLinksData'],
    queryFn: () => {
      // This would be an actual API call in production
      return new Promise<LinkItem[]>(resolve => {
        setTimeout(() => {
          resolve(generateLinksData());
        }, 750);
      });
    },
  });

  // Sort the data based on current sort column and direction
  const sortedData = React.useMemo(() => {
    if (!data) return [];
    
    return [...data].sort((a, b) => {
      const valueA = a[sortColumn as keyof LinkItem];
      const valueB = b[sortColumn as keyof LinkItem];
      
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return sortDirection === 'asc' 
          ? valueA.localeCompare(valueB) 
          : valueB.localeCompare(valueA);
      }
      
      return sortDirection === 'asc' 
        ? (valueA as number) - (valueB as number) 
        : (valueB as number) - (valueA as number);
    });
  }, [data, sortColumn, sortDirection]);

  // Handle sort change
  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('desc');
    }
  };

  // Show fewer rows on mobile
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
                    <TableHead className="w-[240px]">
                      <SortableHeader 
                        column="alias" 
                        label="Link" 
                        currentSort={sortColumn} 
                        direction={sortDirection} 
                        onSort={handleSort} 
                      />
                    </TableHead>
                    <TableHead className="text-right">
                      <SortableHeader 
                        column="clicks" 
                        label="Clicks" 
                        currentSort={sortColumn} 
                        direction={sortDirection} 
                        onSort={handleSort} 
                      />
                    </TableHead>
                    <TableHead className="text-right">
                      <SortableHeader 
                        column="ctr" 
                        label="CTR" 
                        currentSort={sortColumn} 
                        direction={sortDirection} 
                        onSort={handleSort} 
                      />
                    </TableHead>
                    {!isMobile && (
                      <TableHead>
                        <SortableHeader 
                          column="topCountry" 
                          label="Top Country" 
                          currentSort={sortColumn} 
                          direction={sortDirection} 
                          onSort={handleSort} 
                        />
                      </TableHead>
                    )}
                    <TableHead>
                      <SortableHeader 
                        column="status" 
                        label="Status" 
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
                        <div className="flex items-center">
                          <div className="w-7 h-7 rounded-full bg-primary-foreground flex items-center justify-center mr-2">
                            <LinkIcon className="h-3.5 w-3.5 text-primary" />
                          </div>
                          {link.alias}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">{link.clicks.toLocaleString()}</TableCell>
                      <TableCell className="text-right">{link.ctr}%</TableCell>
                      {!isMobile && (
                        <TableCell>{link.topCountry}</TableCell>
                      )}
                      <TableCell>
                        <div className={`px-2 py-1 rounded-full text-xs inline-flex items-center ${
                          link.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {link.status}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            {/* Mobile-only view all button */}
            {isMobile && data && data.length > 5 && (
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

// Sortable header component
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
