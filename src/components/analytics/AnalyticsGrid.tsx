
import React from 'react';
import { useMediaQuery } from '@/hooks/use-media-query';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Info, MoreHorizontal } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import TimeSeriesChart from '@/components/dashboard/charts/TimeSeriesChart';
import DeviceDistribution from '@/components/dashboard/charts/DeviceDistribution';
import GeoHeatmap from '@/components/dashboard/charts/GeoHeatmap';
import TopLinksTable from '@/components/dashboard/TopLinksTable';
import ReferrerDistribution from '@/components/dashboard/charts/ReferrerDistribution';
import SessionDurationChart from '@/components/analytics/charts/SessionDurationChart';
import CampaignPerformanceChart from '@/components/analytics/charts/CampaignPerformanceChart';
import QrVsLinkClicksChart from '@/components/analytics/charts/QrVsLinkClicksChart';
import StatusCodesChart from '@/components/analytics/charts/StatusCodesChart';
import LinkCreationChart from '@/components/analytics/charts/LinkCreationChart';
import RetentionChart from '@/components/analytics/charts/RetentionChart';
import CampaignSourceTable from '@/components/analytics/charts/CampaignSourceTable';
import { DashboardAnalyticsResponse } from '@/types/analytics';

interface AnalyticsGridProps {
  section: string;
  analyticsData?: DashboardAnalyticsResponse;
}

const AnalyticsGrid: React.FC<AnalyticsGridProps> = ({ section, analyticsData }) => {
  const isLargeScreen = useMediaQuery("(min-width: 1440px)");
  const isExtraLargeScreen = useMediaQuery("(min-width: 1920px)");

  const columns = isExtraLargeScreen ? 3 : isLargeScreen ? 2 : 1;

  const renderSectionContent = () => {
    switch (section) {
      case 'overview':
        return (
          <div className={`grid grid-cols-1 lg:grid-cols-${columns} gap-4 md:gap-6`}>
            <WidgetCard title="New Links Over Time" info="Shows the number of new links created per day">
              {analyticsData?.linkCreation.newLinksPerDay && analyticsData.linkCreation.newLinksPerDay.length > 0 ? (
                <LinkCreationChart data={analyticsData.linkCreation.newLinksPerDay} />
              ) : (
                <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                  No link creation data available
                </div>
              )}
            </WidgetCard>
            
            <WidgetCard title="Retention by Week" info="User retention rate week over week">
              {analyticsData?.retention.retentionByWeek && analyticsData.retention.retentionByWeek.length > 0 ? (
                <RetentionChart data={analyticsData.retention.retentionByWeek} />
              ) : (
                <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                  No retention data available
                </div>
              )}
            </WidgetCard>
            
            <WidgetCard title="Traffic Sources" info="Where your traffic is coming from" className="lg:col-span-2">
              {analyticsData?.campaigns.bySources && analyticsData.campaigns.bySources.length > 0 ? (
                <CampaignSourceTable data={analyticsData.campaigns.bySources} />
              ) : (
                <div className="flex items-center justify-center h-[200px] text-muted-foreground">
                  No campaign source data available
                </div>
              )}
              <CardFooter className="pt-2 px-0 border-t">
                <p className="text-sm text-muted-foreground">Data based on tracked campaign parameters</p>
              </CardFooter>
            </WidgetCard>
            
            <WidgetCard title="Geographic Distribution" info="Distribution of clicks by country and city">
              <GeoHeatmap />
            </WidgetCard>
            
            <WidgetCard title="Top Links" info="Your most clicked links" className="lg:col-span-2">
              <TopLinksTable />
            </WidgetCard>
          </div>
        );
      case 'traffic':
        return (
          <div className={`grid grid-cols-1 lg:grid-cols-${columns} gap-4 md:gap-6`}>
            <WidgetCard title="Referrer Distribution" info="Sources of your traffic">
              <ReferrerDistribution />
            </WidgetCard>
            <WidgetCard title="Session Duration" info="How long users spend on your links">
              <SessionDurationChart />
            </WidgetCard>
            <WidgetCard title="Device Distribution" info="Breakdown of clicks by device type">
              <DeviceDistribution />
            </WidgetCard>
          </div>
        );
      case 'geography':
        return (
          <div className={`grid grid-cols-1 lg:grid-cols-${columns} gap-4 md:gap-6`}>
            <WidgetCard title="Geographic Distribution" info="Distribution of clicks by country and city" className="lg:col-span-2">
              <GeoHeatmap />
            </WidgetCard>
          </div>
        );
      case 'campaigns':
        return (
          <div className={`grid grid-cols-1 lg:grid-cols-${columns} gap-4 md:gap-6`}>
            <WidgetCard title="Campaign Performance" info="Performance of different marketing campaigns">
              <CampaignPerformanceChart />
            </WidgetCard>
            <WidgetCard title="QR vs Link Clicks" info="Comparison of QR code scans vs direct link clicks">
              <QrVsLinkClicksChart />
            </WidgetCard>
            <WidgetCard title="Campaign Sources" info="Traffic sources by campaign">
              {analyticsData?.campaigns.bySources && analyticsData.campaigns.bySources.length > 0 ? (
                <CampaignSourceTable data={analyticsData.campaigns.bySources} />
              ) : (
                <div className="flex items-center justify-center h-[200px] text-muted-foreground">
                  No campaign source data available
                </div>
              )}
            </WidgetCard>
          </div>
        );
      case 'trends':
        return (
          <div className={`grid grid-cols-1 lg:grid-cols-${columns} gap-4 md:gap-6`}>
            <WidgetCard title="Status Codes & Response Time" info="Performance metrics for your links">
              <StatusCodesChart />
            </WidgetCard>
            <WidgetCard title="Clicks Over Time" info="Shows the number of clicks per day over time">
              <TimeSeriesChart />
            </WidgetCard>
            <WidgetCard title="Retention Trends" info="User retention over time">
              {analyticsData?.retention.retentionByWeek && analyticsData.retention.retentionByWeek.length > 0 ? (
                <RetentionChart data={analyticsData.retention.retentionByWeek} />
              ) : (
                <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                  No retention data available
                </div>
              )}
            </WidgetCard>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {renderSectionContent()}
    </div>
  );
};

interface WidgetCardProps {
  title: string;
  children: React.ReactNode;
  info?: string;
  className?: string;
}

const WidgetCard: React.FC<WidgetCardProps> = ({ title, children, info, className }) => {
  return (
    <Card className={`shadow-sm transition-all hover:shadow-md ${className}`}>
      <CardHeader className="pb-0 flex flex-row items-center justify-between">
        <div className="flex items-center">
          <CardTitle className="text-lg font-medium">
            {title}
          </CardTitle>
          {info && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 ml-1">
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{info}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Download className="mr-2 h-4 w-4" />
              Export Data
            </DropdownMenuItem>
            <DropdownMenuItem>View Details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};

export default AnalyticsGrid;
