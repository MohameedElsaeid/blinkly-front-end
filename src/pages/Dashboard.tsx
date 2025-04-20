
import React from 'react';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import KpiStrip from '@/components/dashboard/KpiStrip';
import WidgetGrid from '@/components/dashboard/WidgetGrid';
import FilterPanel from '@/components/dashboard/FilterPanel';

const Dashboard = () => {
  const [filterPanelOpen, setFilterPanelOpen] = React.useState(false);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <DashboardSidebar />
      
      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <DashboardHeader />
        
        {/* KPI Strip */}
        <KpiStrip />
        
        {/* Main panel with filter sidebar */}
        <div className="flex flex-1 overflow-hidden">
          {/* Filter Panel - conditionally render based on state */}
          {filterPanelOpen && (
            <FilterPanel onClose={() => setFilterPanelOpen(false)} />
          )}
          
          {/* Main dashboard content */}
          <main className="flex-1 overflow-y-auto p-6">
            {/* Action Bar */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <p className="text-muted-foreground">Your link management command center</p>
              </div>
            </div>
            
            {/* Widget Grid */}
            <WidgetGrid widgets={[
              { id: 'quick-create', title: 'Create New Link', type: 'create', size: 'large' },
              { id: 'top-links', title: 'Top 5 Links', type: 'chart', size: 'medium' },
              { id: 'global-map', title: 'Global Click Map', type: 'map', size: 'medium' },
              { id: 'click-trends', title: 'Clicks Over Time', type: 'trend', size: 'large' },
              { id: 'recent-activity', title: 'Recent Activity', type: 'feed', size: 'medium' },
            ]} />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
