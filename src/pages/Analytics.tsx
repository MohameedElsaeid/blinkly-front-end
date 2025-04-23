
import React, { useState } from 'react';
import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { analyticsSections } from "@/components/dashboard/config/sidebarNavigation";
import GlobalFilters from "@/components/analytics/GlobalFilters";
import KpiStrip from "@/components/dashboard/KpiStrip";
import AnalyticsGrid from "@/components/analytics/AnalyticsGrid";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileKpiCarousel from "@/components/dashboard/MobileKpiCarousel";
import { useLocation, useNavigate } from "react-router-dom";
import { useDashboardAnalytics } from "@/hooks/use-dashboard-analytics";
import { Button } from "@/components/ui/button";

const Analytics = () => {
    const [days, setDays] = useState(30);
    const isMobile = useIsMobile();
    const location = useLocation();
    const navigate = useNavigate();
    const currentSection = analyticsSections.find(section => 
        location.pathname === section.to
    )?.id || 'overview';

    const { data: analyticsData, isLoading } = useDashboardAnalytics(days);

    // Update days when GlobalFilters changes timeframe
    const handleTimeframeChange = (newDays: number) => {
        setDays(newDays);
    };

    return (
        <DashboardLayout>
            <div className={`min-h-screen ${sectionStyles[currentSection as keyof typeof sectionStyles]}`}>
                {/* KPI Strip - Desktop only */}
                {!isMobile && <KpiStrip />}

                {/* KPI Carousel - Mobile only */}
                {isMobile && <MobileKpiCarousel />}

                <div className="px-4 md:px-6 pt-4 md:pt-6 pb-24 md:pb-12">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h1 className="text-2xl md:text-[28px] font-bold">Analytics Dashboard</h1>
                            <p className="text-muted-foreground">
                                Data from {analyticsData?.timeRange?.startDate ? new Date(analyticsData.timeRange.startDate).toLocaleDateString() : ''}
                                {' '}to{' '}
                                {analyticsData?.timeRange?.endDate ? new Date(analyticsData.timeRange.endDate).toLocaleDateString() : ''}
                            </p>
                        </div>
                    </div>

                    {/* Analytics Navigation */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {analyticsSections.map((section) => (
                            <Button
                                key={section.id}
                                variant={location.pathname === section.to ? "default" : "outline"}
                                className="flex items-center gap-2"
                                onClick={() => navigate(section.to)}
                            >
                                {section.icon}
                                {section.label}
                            </Button>
                        ))}
                    </div>

                    {/* Global Filters */}
                    <Card className="mb-6 shadow-sm backdrop-blur-sm bg-white/80">
                        <CardContent className="p-4">
                            <GlobalFilters onTimeframeChange={handleTimeframeChange} />
                        </CardContent>
                    </Card>

                    {/* Analytics Content based on route */}
                    <AnalyticsGrid section={currentSection} analyticsData={analyticsData} />
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Analytics;
