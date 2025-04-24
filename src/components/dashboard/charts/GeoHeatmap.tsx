
import React, {useState} from 'react';
import {useQuery} from "@tanstack/react-query";
import {
    Table,
    TableHeader,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
} from "@/components/ui/table";
import {Skeleton} from "@/components/ui/skeleton";
import {GeoDistributionResponse} from '@/types/analytics';
import {formatDate} from "@/utils/date-utils";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import analyticsClient from '@/lib/analytics/analytics-client';

const GeoHeatmap = () => {
    const [activeTab, setActiveTab] = useState<"countries" | "cities">("countries");

    const {data, isLoading} = useQuery<GeoDistributionResponse>({
        queryKey: ['geoDistribution'],
        queryFn: () => analyticsClient.getGeoDistribution(),
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

    if (isLoading) {
        return (
            <div className="space-y-4">
                <Skeleton className="h-8 w-full"/>
                {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-12 w-full"/>
                ))}
            </div>
        );
    }

    if (!data || (!data.unique_countries && !data.unique_cities)) {
        return (
            <div className="text-center py-8">
                <p className="text-sm text-muted-foreground">No geographic data available yet</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "countries" | "cities")}
                      className="w-full">
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

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Location</TableHead>
                        <TableHead className="text-right">Clicks</TableHead>
                        <TableHead className="text-right">Percentage</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {getTopLocations(activeTab).map((location) => (
                        <TableRow key={location.name}>
                            <TableCell className="font-medium">{location.name}</TableCell>
                            <TableCell className="text-right">{location.clicks.toLocaleString()}</TableCell>
                            <TableCell className="text-right">{location.percentage.toFixed(1)}%</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {getTopLocations(activeTab).length === 0 && (
                <div className="text-center py-4">
                    <p className="text-sm text-muted-foreground">No data available for this view</p>
                </div>
            )}
        </div>
    );
};

export default GeoHeatmap;
