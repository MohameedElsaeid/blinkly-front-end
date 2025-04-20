
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  BarChart, 
  Link as LinkIcon, 
  QrCode, 
  Activity, 
  Plus,
  MapPin,
  TrendingUp,
  Globe,
  Clock,
  Command,
  Search,
  X,
  Filter,
  Settings,
  LayoutGrid,
  Table as TableIcon,
  ChevronDown
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import KpiStrip from '@/components/dashboard/KpiStrip';
import WidgetGrid from '@/components/dashboard/WidgetGrid';
import FilterPanel from '@/components/dashboard/FilterPanel';
import LinkCard from '@/components/dashboard/LinkCard';
import httpClient from '@/lib/http-client';
import { useToast } from "@/hooks/use-toast";
import { Widget, WidgetType, WidgetSize } from '@/types/dashboard';

const Dashboard = () => {
  const { toast } = useToast();
  const [commandOpen, setCommandOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  
  // Demo widgets for the initial dashboard
  const [widgets, setWidgets] = useState<Widget[]>([
    { id: 'quick-create', title: 'Create New Link', type: 'create', size: 'large' },
    { id: 'top-links', title: 'Top 5 Links', type: 'chart', size: 'medium' },
    { id: 'global-map', title: 'Global Click Map', type: 'map', size: 'medium' },
    { id: 'click-trends', title: 'Clicks Over Time', type: 'trend', size: 'large' },
    { id: 'recent-activity', title: 'Recent Activity', type: 'feed', size: 'medium' },
  ]);

  // Fetch data using React Query
  const { data: totalClicksData } = useQuery({
    queryKey: ['dashboardTotalClicks'],
    queryFn: httpClient.getDashboardTotalClicks,
  });

  const { data: topLinksData } = useQuery({
    queryKey: ['dashboardTopLinks'],
    queryFn: httpClient.getDashboardTopLinks,
  });

  // Command palette keyboard shortcut
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const handleCreateLink = () => {
    toast({
      title: "Create Link",
      description: "The link creation modal would open here",
    });
  };

  const handleFilterToggle = () => {
    setFilterPanelOpen(!filterPanelOpen);
  };

  // Demo data
  const linkItems = topLinksData?.links || [
    { id: '1', alias: 'product-launch', clicks: 3245, trend: 12, status: 'active' },
    { id: '2', alias: 'summer-sale', clicks: 2789, trend: -3, status: 'active' },
    { id: '3', alias: 'webinar-signup', clicks: 1982, trend: 8, status: 'active' },
    { id: '4', alias: 'newsletter', clicks: 1650, trend: 5, status: 'paused' },
    { id: '5', alias: 'blog-feature', clicks: 1240, trend: 2, status: 'active' },
  ];

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
        
        {/* Command Palette Dialog */}
        <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Actions">
              <CommandItem onSelect={() => {
                handleCreateLink();
                setCommandOpen(false);
              }}>
                <Plus className="mr-2 h-4 w-4" />
                <span>Create New Link</span>
              </CommandItem>
              <CommandItem onSelect={() => {
                toast({ title: "Generate QR Code", description: "QR code generator would open here" });
                setCommandOpen(false);
              }}>
                <QrCode className="mr-2 h-4 w-4" />
                <span>Generate QR Code</span>
              </CommandItem>
              <CommandItem onSelect={() => {
                setFilterPanelOpen(true);
                setCommandOpen(false);
              }}>
                <Filter className="mr-2 h-4 w-4" />
                <span>Filter Links</span>
              </CommandItem>
            </CommandGroup>
            <CommandGroup heading="Navigation">
              <CommandItem onSelect={() => {
                toast({ title: "Analytics", description: "Navigating to analytics page" });
                setCommandOpen(false);
              }}>
                <BarChart className="mr-2 h-4 w-4" />
                <span>Go to Analytics</span>
              </CommandItem>
              <CommandItem onSelect={() => {
                toast({ title: "Settings", description: "Navigating to settings page" });
                setCommandOpen(false);
              }}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Go to Settings</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
        
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
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handleFilterToggle}>
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => setViewMode('grid')}>
                        <LayoutGrid className={`h-4 w-4 ${viewMode === 'grid' ? 'text-primary' : ''}`} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Grid View</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => setViewMode('table')}>
                        <TableIcon className={`h-4 w-4 ${viewMode === 'table' ? 'text-primary' : ''}`} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Table View</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <Button 
                  size="sm" 
                  className="bg-blinkly-blue hover:bg-blinkly-violet"
                  onClick={handleCreateLink}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Link
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setCommandOpen(true)}
                >
                  <Command className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Command</span>
                  <kbd className="ml-2 hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100">
                    <span className="text-xs">⌘</span>K
                  </kbd>
                </Button>
              </div>
            </div>
            
            {/* Widget Grid */}
            <WidgetGrid widgets={widgets} />
            
            {/* Link Management Section */}
            <section className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Your Links</h2>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search links..."
                      className="pl-8 h-9 w-[200px] rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors"
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    <span>Sort</span>
                    <ChevronDown className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
              
              {/* Links Grid/Table View */}
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {linkItems.map(link => (
                    <LinkCard 
                      key={link.id} 
                      link={link} 
                      onEdit={() => toast({ title: "Edit", description: `Editing ${link.alias}` })}
                      onToggle={() => toast({ title: "Toggle Status", description: `Toggling ${link.alias}` })}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-card rounded-lg border shadow-sm">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="p-3 text-left font-medium">Link</th>
                        <th className="p-3 text-left font-medium">Clicks</th>
                        <th className="p-3 text-left font-medium">Trend</th>
                        <th className="p-3 text-left font-medium">Status</th>
                        <th className="p-3 text-left font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {linkItems.map(link => (
                        <tr key={link.id} className="border-b hover:bg-muted/50">
                          <td className="p-3 font-medium">{link.alias}</td>
                          <td className="p-3">{link.clicks.toLocaleString()}</td>
                          <td className="p-3">
                            <span className={`flex items-center ${link.trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {link.trend > 0 ? '+' : ''}{link.trend}%
                              {link.trend > 0 ? <TrendingUp className="h-4 w-4 ml-1" /> : <TrendingUp className="h-4 w-4 ml-1 rotate-180" />}
                            </span>
                          </td>
                          <td className="p-3">
                            <span className={`px-2 py-1 rounded-full text-xs ${link.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                              {link.status}
                            </span>
                          </td>
                          <td className="p-3">
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" onClick={() => toast({ title: "Edit", description: `Editing ${link.alias}` })}>
                                Edit
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => toast({ title: "QR", description: `QR code for ${link.alias}` })}>
                                <QrCode className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
