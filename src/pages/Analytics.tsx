
import React, { useState } from 'react';
import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { analyticsSections } from "@/components/dashboard/config/sidebarNavigation";
import GlobalFilters from "@/components/analytics/GlobalFilters";
import KpiStrip from "@/components/dashboard/KpiStrip";
import AnalyticsGrid from "@/components/analytics/AnalyticsGrid";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileKpiCarousel from "@/components/dashboard/MobileKpiCarousel";

const Analytics = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const isMobile = useIsMobile();

    return (
        <DashboardLayout>
            {/* KPI Strip - Desktop only */}
            {!isMobile && <KpiStrip />}

            {/* KPI Carousel - Mobile only */}
            {isMobile && <MobileKpiCarousel />}

            <div className="px-4 md:px-6 pt-4 md:pt-6 pb-24 md:pb-12">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl md:text-[28px] font-bold">Analytics Dashboard</h1>
                        <p className="text-muted-foreground">Analyze your link performance in depth</p>
                    </div>
                </div>

                {/* Global Filters */}
                <Card className="mb-6 shadow-sm">
                    <CardContent className="p-4">
                        <GlobalFilters />
                    </CardContent>
                </Card>

                {/* Analytics Tabs */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-6">
                    <TabsList className="inline-flex h-10 items-center justify-start space-x-1 overflow-x-auto w-full border-b bg-transparent p-0">
                        {analyticsSections.map((section) => (
                            <TabsTrigger 
                                key={section.id} 
                                value={section.id}
                                className="h-10 rounded-none border-b-2 border-transparent bg-transparent px-4 pb-3 pt-2 text-sm font-medium text-muted-foreground shadow-none transition-none data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                            >
                                {section.label}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {/* Analytics Content based on selected tab */}
                    {analyticsSections.map((section) => (
                        <TabsContent key={section.id} value={section.id}>
                            <AnalyticsGrid section={section.id} />
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
        </DashboardLayout>
    );
};

export default Analytics;
