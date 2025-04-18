
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  BarChart, 
  Link as LinkIcon, 
  QrCode, 
  Activity, 
  TrendingUp, 
  Plus, 
  ExternalLink,
  Tag,
  Palette,
  Target,
  User,
  HelpCircle
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import httpClient from '@/lib/http-client';

const Dashboard = () => {
  // Fetch data using React Query
  const { data: totalClicksData } = useQuery({
    queryKey: ['dashboardTotalClicks'],
    queryFn: httpClient.getDashboardTotalClicks,
  });

  const { data: topLinksData } = useQuery({
    queryKey: ['dashboardTopLinks'],
    queryFn: httpClient.getDashboardTopLinks,
  });

  const { data: tipsData } = useQuery({
    queryKey: ['dashboardTips'],
    queryFn: httpClient.getDashboardTips,
  });

  const { data: tricksData } = useQuery({
    queryKey: ['dashboardTricks'],
    queryFn: httpClient.getDashboardTricks,
  });

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <DashboardSidebar />
      
      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <DashboardHeader />
        
        {/* Main panel */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Hero welcome section */}
          <section className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Welcome to Your Blinkly Dashboard</h1>
            <p className="text-gray-600 mt-2">Your command center for link management and growth.</p>
          </section>
          
          {/* Analytics summary cards */}
          <section className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Total Clicks */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Total Clicks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline">
                    <span className="text-2xl font-bold">
                      {totalClicksData?.totalClicks?.toLocaleString() ?? '...'}
                    </span>
                    <span className="ml-2 text-sm font-medium text-green-600 flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      {totalClicksData?.trend ? `+${totalClicksData.trend}%` : '...'}
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="ghost" size="sm" className="text-xs text-blinkly-blue">
                    View details
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Top Performing Links */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Top Links</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {topLinksData?.links.slice(0, 2).map((link) => (
                      <div key={link.id} className="flex justify-between items-center">
                        <span className="text-sm truncate max-w-[120px]">
                          {link.alias}
                        </span>
                        <span className="text-sm font-semibold">
                          {link.clickCount}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="ghost" size="sm" className="text-xs text-blinkly-blue">
                    View all
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Plan Usage */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Plan Usage</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Free Plan</span>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        25/100 links
                      </span>
                    </div>
                    <Progress value={25} className="h-2" />
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="ghost" size="sm" className="text-xs text-blinkly-blue">
                    Upgrade
                  </Button>
                </CardFooter>
              </Card>
              
              {/* QR Codes Created */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">QR Codes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline">
                    <span className="text-2xl font-bold">8</span>
                    <span className="ml-2 text-sm text-gray-500">created</span>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="ghost" size="sm" className="text-xs text-blinkly-blue">
                    View all
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </section>
          
          {/* Quick Actions Section */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
            <div className="flex flex-wrap gap-3">
              <Button className="bg-blinkly-blue hover:bg-blinkly-violet">
                <LinkIcon className="mr-2 h-4 w-4" />
                Shorten a Link
              </Button>
              <Button variant="outline">
                <QrCode className="mr-2 h-4 w-4" />
                Create a QR Code
              </Button>
              <Button variant="outline">
                <Activity className="mr-2 h-4 w-4" />
                View Analytics
              </Button>
            </div>
          </section>
          
          {/* Maximize Your Impact Section */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Maximize Your Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4 flex">
                  <Activity className="h-6 w-6 mr-3 text-blinkly-blue" />
                  <div>
                    <h3 className="font-medium">Track Every Click</h3>
                    <p className="text-sm text-gray-500">Real-time analytics for all your links</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 flex">
                  <BarChart className="h-6 w-6 mr-3 text-blinkly-blue" />
                  <div>
                    <h3 className="font-medium">Optimize Campaigns</h3>
                    <p className="text-sm text-gray-500">Identify what works best</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 flex">
                  <User className="h-6 w-6 mr-3 text-blinkly-blue" />
                  <div>
                    <h3 className="font-medium">Grow Your Audience</h3>
                    <p className="text-sm text-gray-500">Use QR and dynamic links</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
          
          {/* Tips & Tricks Section */}
          <section className="mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Tips & Tricks</CardTitle>
                <CardDescription>Make the most of Blinkly</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tipsData?.tips.map((tip) => (
                    <div key={tip.title} className="flex">
                      <Tag className="h-5 w-5 mr-3 text-blinkly-blue" />
                      <div>
                        <p className="font-medium">{tip.title}</p>
                        <p className="text-sm text-gray-600">{tip.description}</p>
                      </div>
                    </div>
                  ))}
                  {tricksData?.tricks.map((trick, index) => (
                    <div key={index} className="flex">
                      <Target className="h-5 w-5 mr-3 text-blinkly-blue" />
                      <p className="text-sm">{trick}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>
          
          {/* Help & Support Section */}
          <section>
            <Card className="bg-gray-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <HelpCircle className="h-5 w-5 mr-2 text-blinkly-blue" />
                    <h3 className="font-medium">Need help?</h3>
                  </div>
                  <div className="flex space-x-3">
                    <Button variant="outline" size="sm">
                      Help Center
                    </Button>
                    <Button size="sm">
                      Contact Support
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
