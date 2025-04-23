
import React, { useState } from 'react';
import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { analyticsSections } from "@/components/dashboard/config/sidebarNavigation";
import GlobalFilters from "@/components/analytics/GlobalFilters";
import KpiStrip from "@/components/dashboard/KpiStrip";
import AnalyticsGrid from "@/components/analytics/AnalyticsGrid";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileKpiCarousel from "@/components/dashboard/MobileKpiCarousel";
import { useLocation } from "react-router-dom";
import { useDashboardAnalytics } from "@/hooks/use-dashboard-analytics";
import MetricCard from "@/components/analytics/MetricCard";
import { 
    BarChart2, 
    Activity, 
    Users, 
    Clock, 
    TagIcon, 
    PieChart, 
    QrCode 
} from "lucide-react";

const sectionStyles = {
  overview: "bg-gradient-to-tr from-blue-50 via-white to-indigo-50",
  traffic: "bg-gradient-to-tr from-green-50 via-white to-emerald-50",
  geography: "bg-gradient-to-tr from-amber-50 via-white to-yellow-50",
  campaigns: "bg-gradient-to-tr from-purple-50 via-white to-violet-50",
  trends: "bg-gradient-to-tr from-pink-50 via-white to-rose-50"
};

const Analytics = () => {
    const [days, setDays] = useState(30);
    const isMobile = useIsMobile();
    const location = useLocation();
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

                    {/* Global Filters */}
                    <Card className="mb-6 shadow-sm backdrop-blur-sm bg-white/80">
                        <CardContent className="p-4">
                            <GlobalFilters onTimeframeChange={handleTimeframeChange} />
                        </CardContent>
                    </Card>

                    {/* Analytics Content based on route */}
                    {currentSection === 'overview' && analyticsData && (
                        <div className="space-y-6">
                            {/* Metric Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <MetricCard 
                                    title="Total Links" 
                                    value={analyticsData.linkCreation.totalLinks}
                                    icon={BarChart2}
                                />
                                <MetricCard 
                                    title="Daily Active Users" 
                                    value={analyticsData.retention.dailyActiveUsers}
                                    icon={Users}
                                    change={analyticsData.retention.dailyActiveUsers > 0 ? 0 : 0}
                                />
                                <MetricCard 
                                    title="Monthly Active Users" 
                                    value={analyticsData.retention.monthlyActiveUsers}
                                    icon={Users}
                                />
                                <MetricCard 
                                    title="Sessions" 
                                    value={analyticsData.sessions.totalSessions}
                                    icon={Activity}
                                    change={0}
                                    changeLabel="vs. last period"
                                />
                                <MetricCard 
                                    title="Average Session" 
                                    value={`${analyticsData.sessions.averageSessionDuration.toFixed(1)}s`}
                                    icon={Clock}
                                />
                                <MetricCard 
                                    title="Bounce Rate" 
                                    value={`${analyticsData.sessions.bounceRate}%`}
                                    icon={Activity}
                                    variant={analyticsData.sessions.bounceRate > 70 ? 'warning' : 'default'}
                                />
                                <MetricCard 
                                    title="Total QR Scans" 
                                    value={analyticsData.qrCodes.totalScans}
                                    icon={QrCode}
                                />
                                <MetricCard 
                                    title="Conversions" 
                                    value={analyticsData.conversions.totalConversions}
                                    icon={TagIcon}
                                    change={0}
                                    variant={analyticsData.conversions.totalConversions > 0 ? 'success' : 'default'}
                                />
                            </div>

                            {/* Regular Analytics Grid */}
                            <AnalyticsGrid section={currentSection} analyticsData={analyticsData} />
                        </div>
                    )}
                    
                    {currentSection !== 'overview' && (
                        <AnalyticsGrid section={currentSection} analyticsData={analyticsData} />
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Analytics;
