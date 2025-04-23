
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
import { useLocation } from "react-router-dom";

const sectionStyles = {
  overview: "bg-gradient-to-tr from-blue-50 via-white to-indigo-50",
  traffic: "bg-gradient-to-tr from-green-50 via-white to-emerald-50",
  geography: "bg-gradient-to-tr from-amber-50 via-white to-yellow-50",
  campaigns: "bg-gradient-to-tr from-purple-50 via-white to-violet-50",
  trends: "bg-gradient-to-tr from-pink-50 via-white to-rose-50"
};

const Analytics = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const isMobile = useIsMobile();
    const location = useLocation();
    const currentSection = analyticsSections.find(section => 
        location.pathname === section.to
    )?.id || 'overview';

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
                            <p className="text-muted-foreground">Analyze your link performance in depth</p>
                        </div>
                    </div>

                    {/* Global Filters */}
                    <Card className="mb-6 shadow-sm backdrop-blur-sm bg-white/80">
                        <CardContent className="p-4">
                            <GlobalFilters />
                        </CardContent>
                    </Card>

                    {/* Analytics Content based on route */}
                    <AnalyticsGrid section={currentSection} />
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Analytics;
