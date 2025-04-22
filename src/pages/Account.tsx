
import React from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import ProfileSection from '@/components/account/ProfileSection';
import UsageSection from '@/components/account/UsageSection';
import SubscriptionSection from '@/components/account/SubscriptionSection';
import { useQuery } from '@tanstack/react-query';
import httpClient from '@/lib/http-client';
import { Loader2 } from 'lucide-react';

const Account = () => {
    const { data: userProfile, isLoading, error } = useQuery({
        queryKey: ['userProfile'],
        queryFn: () => httpClient.getUserProfile()
    });

    if (isLoading) {
        return (
            <DashboardLayout>
                <div className="flex items-center justify-center h-[calc(100vh-80px)]">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            </DashboardLayout>
        );
    }

    if (error || !userProfile) {
        return (
            <DashboardLayout>
                <div className="px-4 md:px-6 py-6">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
                        An error occurred while loading your profile data. Please try again later.
                    </div>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="px-4 md:px-6 pt-4 md:pt-6 pb-24 md:pb-12">
                <div className="mb-6">
                    <h1 className="text-2xl md:text-[28px] font-bold">Account</h1>
                    <p className="text-muted-foreground">Manage your account settings and subscription</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Profile Section */}
                    <div className="lg:col-span-7 space-y-6">
                        <ProfileSection userProfile={userProfile} />
                    </div>

                    {/* Usage and Subscription Sections */}
                    <div className="lg:col-span-5 space-y-6">
                        <UsageSection usage={userProfile.usage} />
                        <SubscriptionSection subscription={userProfile.activeSubscription} />
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Account;
