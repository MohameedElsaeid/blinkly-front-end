import React from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import KpiStrip from "@/components/dashboard/KpiStrip";
import TimeSeriesChart from "@/components/dashboard/charts/TimeSeriesChart";
import GeoHeatmap from "@/components/dashboard/charts/GeoHeatmap";
import DeviceDistribution from "@/components/dashboard/charts/DeviceDistribution";
import ReferrerDistribution from "@/components/dashboard/charts/ReferrerDistribution";
import TopLinksTable from "@/components/dashboard/TopLinksTable";
import MobileKpiCarousel from "@/components/dashboard/MobileKpiCarousel";
import FilterButton from "@/components/dashboard/FilterButton";
import {useIsMobile} from "@/hooks/use-mobile";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

const Dashboard = () => {
    const isMobile = useIsMobile();

    return (
        <DashboardLayout>
            {/* KPI Strip - Desktop only */}
            {!isMobile && <KpiStrip/>}

            {/* KPI Carousel - Mobile only */}
            {isMobile && <MobileKpiCarousel/>}

            <div className="px-4 md:px-6 pt-4 md:pt-6 pb-24 md:pb-12">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl md:text-[28px] font-bold">Analytics Dashboard</h1>
                        <p className="text-muted-foreground">Your link performance at a glance</p>
                    </div>
                </div>

                {/* Main content grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
                    {/* Time Series Chart */}
                    <Card className="lg:col-span-8 shadow-sm">
                        <CardHeader className="pb-0">
                            <CardTitle className="text-lg font-medium">Click Performance</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <TimeSeriesChart/>
                        </CardContent>
                    </Card>

                    {/* Device Distribution */}
                    <Card className="lg:col-span-4 shadow-sm">
                        <CardHeader className="pb-0">
                            <CardTitle className="text-lg font-medium">Device Analytics</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <DeviceDistribution/>
                        </CardContent>
                    </Card>

                    {/* Geographic Distribution */}
                    <Card className="lg:col-span-6 shadow-sm">
                        <CardHeader className="pb-0">
                            <CardTitle className="text-lg font-medium">Geographic Distribution</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <GeoHeatmap/>
                        </CardContent>
                    </Card>

                    {/* Referrer Distribution */}
                    <Card className="lg:col-span-6 shadow-sm">
                        <CardHeader className="pb-0">
                            <CardTitle className="text-lg font-medium">Top Referrers</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ReferrerDistribution/>
                        </CardContent>
                    </Card>

                    {/* Top Links Table - Full Width */}
                    <Card className="lg:col-span-12 shadow-sm">
                        <CardHeader className="pb-0">
                            <CardTitle className="text-lg font-medium">Top Performing Links</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <TopLinksTable/>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Mobile Floating Filter Button */}
            {isMobile && <FilterButton/>}
        </DashboardLayout>
    );
};

export default Dashboard;
