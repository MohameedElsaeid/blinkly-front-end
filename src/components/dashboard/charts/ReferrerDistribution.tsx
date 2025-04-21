
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { ArrowDown, ArrowUp } from "lucide-react";
import httpClient from "@/lib/http-client";
import type { ReferrerData } from "@/types/analytics";

const ReferrerDistribution = () => {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<'revenue' | 'visits' | 'conversion_rate'>('visits');
  const limit = 5;

  const { data, isLoading } = useQuery({
    queryKey: ['referrerData', page, sortBy],
    queryFn: () => httpClient.getTopReferrers({ page, limit, sort_by: sortBy }),
  });

  const formatValue = (value: number, type: 'percentage' | 'duration' | 'currency' | 'number') => {
    switch (type) {
      case 'percentage':
        return `${value.toFixed(1)}%`;
      case 'duration':
        return `${value.toFixed(1)}s`;
      case 'currency':
        return `$${value.toLocaleString()}`;
      default:
        return value.toLocaleString();
    }
  };

  return (
    <Card className="shadow-sm hover:shadow-md transition-all">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg">Top Referrers</CardTitle>
        <Select value={sortBy} onValueChange={(value: 'revenue' | 'visits' | 'conversion_rate') => setSortBy(value)}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Sort by..." />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="visits">Visits</SelectItem>
              <SelectItem value="revenue">Revenue</SelectItem>
              <SelectItem value="conversion_rate">Conversion</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </CardHeader>
      
      <CardContent className="px-0">
        {isLoading ? (
          <div className="space-y-3 p-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        ) : data?.data.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>No referrer data available</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Source</TableHead>
                    <TableHead className="text-right">Visits</TableHead>
                    <TableHead className="text-right">Conv. Rate</TableHead>
                    <TableHead className="text-right">Revenue</TableHead>
                    <TableHead className="text-right">Change</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.data.map((referrer: ReferrerData) => (
                    <TableRow key={referrer.source}>
                      <TableCell className="max-w-[200px] truncate" title={referrer.source}>
                        {new URL(referrer.source).hostname}
                      </TableCell>
                      <TableCell className="text-right">{formatValue(referrer.total_visits, 'number')}</TableCell>
                      <TableCell className="text-right">{formatValue(referrer.conversion_rate, 'percentage')}</TableCell>
                      <TableCell className="text-right">{formatValue(referrer.total_revenue, 'currency')}</TableCell>
                      <TableCell className="text-right">
                        <span className={`flex items-center justify-end gap-1 ${referrer.change_percentage > 0 ? 'text-green-600' : referrer.change_percentage < 0 ? 'text-red-600' : 'text-muted-foreground'}`}>
                          {referrer.change_percentage > 0 ? <ArrowUp className="h-4 w-4" /> : referrer.change_percentage < 0 ? <ArrowDown className="h-4 w-4" /> : null}
                          {formatValue(Math.abs(referrer.change_percentage), 'percentage')}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {data.meta.total_pages > 1 && (
              <div className="py-4">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page === 1}
                      />
                    </PaginationItem>
                    
                    {[...Array(data.meta.total_pages)].map((_, i) => (
                      <PaginationItem key={i}>
                        <PaginationLink
                          onClick={() => setPage(i + 1)}
                          isActive={page === i + 1}
                        >
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    
                    <PaginationItem>
                      <PaginationNext
                        onClick={() => setPage(p => Math.min(data.meta.total_pages, p + 1))}
                        disabled={page === data.meta.total_pages}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ReferrerDistribution;
