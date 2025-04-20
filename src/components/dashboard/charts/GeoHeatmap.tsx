
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { Globe } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

// Sample country data - would be replaced with API data
const countryData = [
  { country: "United States", code: "US", clicks: 12475 },
  { country: "United Kingdom", code: "GB", clicks: 5842 },
  { country: "Germany", code: "DE", clicks: 4320 },
  { country: "France", code: "FR", clicks: 3765 },
  { country: "India", code: "IN", clicks: 3421 },
  { country: "Canada", code: "CA", clicks: 3215 },
  { country: "Australia", code: "AU", clicks: 2876 },
  { country: "Japan", code: "JP", clicks: 2543 },
  { country: "Brazil", code: "BR", clicks: 2187 },
  { country: "Italy", code: "IT", clicks: 1986 },
  { country: "Spain", code: "ES", clicks: 1754 },
  { country: "Mexico", code: "MX", clicks: 1632 },
  { country: "South Korea", code: "KR", clicks: 1520 },
  { country: "Netherlands", code: "NL", clicks: 1426 },
  { country: "Russia", code: "RU", clicks: 1375 }
];

const GeoHeatmap = () => {
  const isMobile = useIsMobile();
  const [expanded, setExpanded] = useState(false);
  
  // Simulate data loading with react-query
  const { data, isLoading } = useQuery({
    queryKey: ['geoData'],
    queryFn: () => {
      // This would be an actual API call in production
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(countryData);
        }, 800);
      });
    },
  });

  // Sort countries by click count
  const sortedCountries = [...(data || [])].sort((a, b) => b.clicks - a.clicks);
  const maxClicks = sortedCountries[0]?.clicks || 1;

  return (
    <Card 
      className={`shadow-sm hover:shadow-md transition-all ${isMobile && expanded ? 'fixed inset-0 z-50 m-2 rounded-lg' : ''}`}
      onClick={() => isMobile && !expanded && setExpanded(true)}
    >
      <CardHeader className="px-6 py-4 flex flex-row justify-between items-center">
        <CardTitle className="text-lg sm:text-xl">Geographic Distribution</CardTitle>
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
        ) : (
          <div className="h-full flex flex-col md:flex-row gap-4">
            {/* Map visualization - placeholder for real map implementation */}
            <div className="relative md:w-2/3 h-[180px] md:h-full bg-gray-50 rounded-lg flex items-center justify-center">
              <Globe className="h-20 w-20 text-gray-200" />
              <div className="absolute text-center">
                <p className="font-medium">World Map Visualization</p>
                <p className="text-xs text-muted-foreground">Click data across {sortedCountries.length} countries</p>
              </div>
            </div>
            
            {/* Top countries list */}
            <div className="md:w-1/3">
              <h3 className="text-sm font-medium mb-2">Top Countries</h3>
              <div className="space-y-2 overflow-y-auto max-h-[220px] pr-2">
                {sortedCountries.slice(0, isMobile && !expanded ? 5 : 10).map((country) => (
                  <div key={country.code} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-6 mr-2 text-sm">{country.code}</div>
                      <span className="text-sm">{country.country}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-[100px] bg-gray-100 h-2 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blinkly-blue"
                          style={{ width: `${(country.clicks / maxClicks) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium w-12 text-right">
                        {country.clicks.toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GeoHeatmap;
