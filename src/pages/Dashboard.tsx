
import React from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import KpiStrip from "@/components/dashboard/KpiStrip";
import TimeSeriesChart from "@/components/dashboard/charts/TimeSeriesChart";
import GeoHeatmap from "@/components/dashboard/charts/GeoHeatmap";
import DeviceDistribution from "@/components/dashboard/charts/DeviceDistribution";
import ReferrerDistribution from "@/components/dashboard/charts/ReferrerDistribution";
import ActivityFeed from "@/components/dashboard/ActivityFeed";
import TopLinksTable from "@/components/dashboard/TopLinksTable";
import MobileKpiCarousel from "@/components/dashboard/MobileKpiCarousel";
import FilterButton from "@/components/dashboard/FilterButton";
import { useIsMobile } from "@/hooks/use-mobile";

const Dashboard = () => {
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
            <p className="text-muted-foreground">Your link performance at a glance</p>
          </div>
        </div>
        
        {/* Main content - Desktop: 2 columns, Mobile: 1 column */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Left Column (66% on desktop) */}
          <div className="lg:col-span-2 space-y-6">
            <TimeSeriesChart />
            <GeoHeatmap />
          </div>
          
          {/* Right Column (34% on desktop) */}
          <div className="space-y-6">
            <DeviceDistribution />
            <ReferrerDistribution />
            <ActivityFeed />
          </div>
        </div>
        
        {/* Footer Section (full-width) */}
        <div className="mt-6">
          <TopLinksTable />
        </div>
      </div>
      
      {/* Mobile Floating Filter Button */}
      {isMobile && <FilterButton />}
    </DashboardLayout>
  );
};

export default Dashboard;
