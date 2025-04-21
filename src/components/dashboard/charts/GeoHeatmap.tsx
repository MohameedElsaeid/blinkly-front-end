
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { Globe } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { GeoDistributionResponse } from "@/types/analytics";
import { formatDate } from "@/utils/date-utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import httpClient from "@/lib/http-client";

const GeoHeatmap = () => {
  const isMobile = useIsMobile();
  const [expanded, setExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<"countries" | "cities">("countries");
  
  const { data, isLoading } = useQuery<GeoDistributionResponse>({
    queryKey: ['geoDistribution'],
    queryFn: () => httpClient.getGeoDistribution(),
  });

  const getTopLocations = (type: "countries" | "cities") => {
    if (!data) return [];
    const distribution = data[type].distribution;
    return Object.entries(distribution)
      .map(([name, clicks]) => ({
        name,
        clicks,
        percentage: data[type].percentages[name] || 0
      }))
      .sort((a, b) => b.clicks - a.clicks);
  };

  return (
    <Card 
      className={`shadow-sm hover:shadow-md transition-all ${isMobile && expanded ? 'fixed inset-0 z-50 m-2 rounded-lg' : ''}`}
      onClick={() => isMobile && !expanded && setExpanded(true)}
    >
      <CardHeader className="px-6 py-4 flex flex-row justify-between items-center">
        <div className="space-y-1">
          <CardTitle className="text-lg sm:text-xl">Geographic Distribution</CardTitle>
          {data && (
            <p className="text-sm text-muted-foreground">
              {formatDate(data.period_start)} - {formatDate(data.period_end)}
            </p>
          )}
        </div>
        {isMobile && expanded && (
          <button 
            className="text-sm font-medium"
            onClick={(e) => {
              e.stopPropagation();
              setExpanded(false);
            }}
          >
            Close
          </button>
        )}
      </CardHeader>
      
      <CardContent className={`px-6 pb-4 pt-0 ${isMobile ? (expanded ? 'h-[calc(100%-70px)]' : 'h-[280px]') : 'h-[320px]'}`}>
        {isLoading ? (
          <div className="h-full flex items-center justify-center">
            <div className="w-full space-y-4">
              <Skeleton className="h-[240px] w-full" />
              <div className="flex justify-between">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-20" />
              </div>
            </div>
          </div>
        ) : !data || (!data.unique_countries && !data.unique_cities) ? (
          <div className="h-full flex items-center justify-center text-center">
            <div className="space-y-2">
              <Globe className="h-12 w-12 mx-auto text-muted-foreground/50" />
              <p className="text-sm text-muted-foreground">No geographic data available yet</p>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "countries" | "cities")} className="w-full">
                <TabsList className="grid w-[200px] grid-cols-2">
                  <TabsTrigger value="countries">
                    <span className="flex flex-col">
                      <span className="font-medium">{data.unique_countries}</span>
                      <span className="text-xs text-muted-foreground">Countries</span>
                    </span>
                  </TabsTrigger>
                  <TabsTrigger value="cities">
                    <span className="flex flex-col">
                      <span className="font-medium">{data.unique_cities}</span>
                      <span className="text-xs text-muted-foreground">Cities</span>
                    </span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              <div className="text-sm text-muted-foreground">
                {data.total_clicks.toLocaleString()} total clicks
              </div>
            </div>

            <div className="flex-1 flex gap-4">
              {/* Map visualization placeholder */}
              <div className="relative w-[60%] h-full bg-gray-50 rounded-lg flex items-center justify-center">
                <Globe className="h-20 w-20 text-gray-200" />
                <div className="absolute text-center">
                  <p className="font-medium">Interactive Map Coming Soon</p>
                  <p className="text-xs text-muted-foreground">
                    Visualizing data across {activeTab === "countries" ? data.unique_countries : data.unique_cities} {activeTab}
                  </p>
                </div>
              </div>

              {/* Location list */}
              <div className="w-[40%]">
                <div className="space-y-2 h-full overflow-y-auto pr-2">
                  {getTopLocations(activeTab).map((location) => (
                    <div key={location.name} className="flex items-center justify-between text-sm">
                      <span className="truncate flex-1" title={location.name}>
                        {location.name}
                      </span>
                      <div className="flex items-center gap-2 min-w-[120px]">
                        <div className="w-16 bg-gray-100 h-1.5 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-purple-500 to-purple-700"
                            style={{ width: `${location.percentage}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium w-12 text
                        -right">
                          {location.clicks}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GeoHeatmap;
