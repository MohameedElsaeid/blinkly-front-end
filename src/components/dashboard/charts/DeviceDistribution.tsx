import React from 'react';
import {Card, CardHeader, CardTitle, CardContent} from "@/components/ui/card";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Skeleton} from "@/components/ui/skeleton";
import {useQuery} from "@tanstack/react-query";
import {Smartphone, Laptop, Chrome, Apple} from "lucide-react";
import httpClient from '@/lib/http-client';
import {DeviceDistributionResponse} from '@/types/analytics';
import PieChartDisplay from './PieChartDisplay';
import {formatDate} from '@/utils/date-utils';

const COLORS = ['#0fa0ce', '#9b87f5', '#f1c40f', '#e74c3c', '#2ecc71'];

const DeviceDistribution = () => {
    const {data, isLoading} = useQuery<DeviceDistributionResponse>({
        queryKey: ['deviceDistribution'],
        queryFn: httpClient.getDeviceDistribution,
    });

    const getPieChartData = (distribution: Record<string, number> = {}) => {
        return Object.entries(distribution).map(([name, value], index) => ({
            name,
            value,
            color: COLORS[index % COLORS.length]
        }));
    };

    const renderStats = () => (
        <div className="grid grid-cols-3 gap-4 mb-6">
            <StatCard
                icon={<Smartphone className="h-4 w-4"/>}
                label="Unique Devices"
                value={data?.unique_devices || 0}
            />
            <StatCard
                icon={<Chrome className="h-4 w-4"/>}
                label="Unique Browsers"
                value={data?.unique_browsers || 0}
            />
            <StatCard
                icon={<Apple className="h-4 w-4"/>}
                label="Unique OS"
                value={data?.unique_operating_systems || 0}
            />
        </div>
    );

    const renderDateRange = () => (
        <div className="text-sm text-muted-foreground mb-6">
            {data?.period_start && data?.period_end && (
                <p>
                    {formatDate(data.period_start)} - {formatDate(data.period_end)}
                </p>
            )}
        </div>
    );

    return (
        <Card className="shadow-sm hover:shadow-md transition-all">
            <CardHeader className="px-6 py-4">
                <CardTitle className="text-lg">Distribution Analytics</CardTitle>
            </CardHeader>

            <CardContent className="px-6 pb-4 pt-0">
                {isLoading ? (
                    <div className="space-y-4">
                        <div className="grid grid-cols-3 gap-4">
                            {[...Array(3)].map((_, i) => (
                                <Skeleton key={i} className="h-20"/>
                            ))}
                        </div>
                        <Skeleton className="h-[200px]"/>
                    </div>
                ) : (
                    <>
                        {renderStats()}
                        {renderDateRange()}
                        <Tabs defaultValue="devices" className="space-y-4">
                            <TabsList className="grid grid-cols-3 gap-4">
                                <TabsTrigger value="devices">Devices</TabsTrigger>
                                <TabsTrigger value="browsers">Browsers</TabsTrigger>
                                <TabsTrigger value="os">Operating Systems</TabsTrigger>
                            </TabsList>

                            <TabsContent value="devices" className="space-y-4">
                                <div className="bg-card rounded-lg p-4">
                                    <h3 className="font-medium mb-4">Device Distribution</h3>
                                    <PieChartDisplay
                                        data={getPieChartData(data?.devices.distribution)}
                                        title="Device"
                                    />
                                </div>
                            </TabsContent>

                            <TabsContent value="browsers" className="space-y-4">
                                <div className="bg-card rounded-lg p-4">
                                    <h3 className="font-medium mb-4">Browser Distribution</h3>
                                    <PieChartDisplay
                                        data={getPieChartData(data?.browsers.distribution)}
                                        title="Browser"
                                    />
                                </div>
                                <div className="bg-card rounded-lg p-4">
                                    <h3 className="font-medium mb-4">Browser Versions</h3>
                                    <PieChartDisplay
                                        data={getPieChartData(data?.browser_versions.distribution)}
                                        title="Browser Version"
                                    />
                                </div>
                            </TabsContent>

                            <TabsContent value="os" className="space-y-4">
                                <div className="bg-card rounded-lg p-4">
                                    <h3 className="font-medium mb-4">OS Distribution</h3>
                                    <PieChartDisplay
                                        data={getPieChartData(data?.operating_systems.distribution)}
                                        title="Operating System"
                                    />
                                </div>
                                <div className="bg-card rounded-lg p-4">
                                    <h3 className="font-medium mb-4">OS Versions</h3>
                                    <PieChartDisplay
                                        data={getPieChartData(data?.os_versions.distribution)}
                                        title="OS Version"
                                    />
                                </div>
                            </TabsContent>
                        </Tabs>
                    </>
                )}
            </CardContent>
        </Card>
    );
};

interface StatCardProps {
    icon: React.ReactNode;
    label: string;
    value: number;
}

const StatCard = ({icon, label, value}: StatCardProps) => (
    <div className="bg-card rounded-lg p-4 flex flex-col items-center justify-center">
        <div className="flex items-center gap-2 text-muted-foreground mb-2">
            {icon}
            <span className="text-sm font-medium">{label}</span>
        </div>
        <span className="text-2xl font-bold">{value.toLocaleString()}</span>
    </div>
);

export default DeviceDistribution;
