
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Usage } from '@/types/user';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';
import { LinkIcon, QrCode } from 'lucide-react';

interface UsageSectionProps {
  usage: Usage;
}

const UsageSection: React.FC<UsageSectionProps> = ({ usage }) => {
  const usageItems = [
    {
      name: 'Links',
      icon: <LinkIcon className="h-4 w-4" />,
      data: usage.links,
      href: '/dashboard/links'
    },
    {
      name: 'Dynamic Links',
      icon: <LinkIcon className="h-4 w-4" />,
      data: usage.dynamicLinks,
      href: '/dashboard/dynamic-links'
    },
    {
      name: 'QR Codes',
      icon: <QrCode className="h-4 w-4" />,
      data: usage.qrCodes,
      href: '/dashboard/qr-codes'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Usage & Limits</CardTitle>
        <CardDescription>
          Your current usage and remaining allocations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {usageItems.map((item) => {
            const percentUsed = item.data.limit ? (item.data.count / item.data.limit) * 100 : 0;
            
            return (
              <div key={item.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {item.icon}
                    <span className="font-medium">{item.name}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {item.data.count} / {item.data.limit}
                  </span>
                </div>
                <Progress value={percentUsed} className="h-2" />
                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted-foreground">
                    {item.data.remaining} remaining
                  </span>
                  <Link to={item.href} className="text-primary hover:underline">
                    Manage
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default UsageSection;
