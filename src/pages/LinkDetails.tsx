
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import DashboardLayout from '@/layouts/DashboardLayout';
import httpClient from '@/lib/http-client';
import { LinkDetails as LinkDetailsType } from '@/types/link';
import LinkEventsTable from '@/components/links/LinkEventsTable';
import LinkAnalytics from '@/components/links/LinkAnalytics';

const LinkDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: link, isLoading } = useQuery<LinkDetailsType>({
    queryKey: ['link', id],
    queryFn: () => httpClient.getLinkById(id!),
  });

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="p-6 space-y-6">
          <Skeleton className="h-8 w-64" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!link) {
    return (
      <DashboardLayout>
        <div className="p-6">
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">Link not found</p>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Link Details</h1>
          <p className="text-muted-foreground">Detailed information and analytics</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Link Information</CardTitle>
            <CardDescription>Basic details about your shortened link</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Short URL</label>
                <p className="mt-1 font-mono bg-muted p-2 rounded-md">
                  {`${window.location.origin}/${link.alias}`}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium">Original URL</label>
                <p className="mt-1 text-sm text-muted-foreground overflow-hidden text-ellipsis">
                  {link.originalUrl}
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium">Status</label>
                <div className="mt-1">
                  <Badge variant={link.isActive ? "default" : "secondary"}>
                    {link.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Created At</label>
                <p className="mt-1 text-sm text-muted-foreground">
                  {format(new Date(link.createdAt), 'PPpp')}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium">Expires At</label>
                <p className="mt-1 text-sm text-muted-foreground">
                  {link.expiresAt ? format(new Date(link.expiresAt), 'PPpp') : 'Never'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="analytics" className="w-full">
          <TabsList>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="events">Click Events</TabsTrigger>
          </TabsList>

          <TabsContent value="analytics" className="mt-6">
            <LinkAnalytics analytics={link.analytics} />
          </TabsContent>

          <TabsContent value="events" className="mt-6">
            <LinkEventsTable events={link.clickEvents} />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default LinkDetails;
