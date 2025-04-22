import React, {useEffect, useState} from 'react';
import {TrendingUp, TrendingDown, Link as LinkIcon, Globe, MousePointer, ArrowUp, ArrowDown} from 'lucide-react';
import {Card} from "@/components/ui/card";
import {useQuery} from '@tanstack/react-query';
import httpClient from '@/lib/http-client';
import {Skeleton} from '@/components/ui/skeleton';
import {animate} from 'framer-motion';

const KpiStrip = () => {
    // Fetch analytics data using React Query
    const {data: analyticsData, isLoading} = useQuery({
        queryKey: ['dashboardAnalytics'],
        queryFn: httpClient.getDashboardAnalytics,
    });

    const kpis = analyticsData ? [
        {
            id: 'clicks-today',
            icon: <TrendingUp className="h-5 w-5 text-blinkly-blue"/>,
            label: 'Clicks Today',
            value: analyticsData.clicks_today.count,
            change: `${analyticsData.clicks_today.change_percentage}%`,
            isPositive: analyticsData.clicks_today.change_percentage >= 0
        },
        {
            id: 'links-created',
            icon: <LinkIcon className="h-5 w-5 text-blinkly-blue"/>,
            label: 'Links Created (24h)',
            value: analyticsData.links_24h.count,
            change: `${analyticsData.links_24h.change_percentage}%`,
            isPositive: analyticsData.links_24h.change_percentage >= 0
        },
        {
            id: 'unique-countries',
            icon: <Globe className="h-5 w-5 text-blinkly-blue"/>,
            label: 'Unique Countries (24h)',
            value: analyticsData.unique_countries_24h.count,
            change: `${analyticsData.unique_countries_24h.change_percentage}%`,
            isPositive: analyticsData.unique_countries_24h.change_percentage >= 0
        },
        {
            id: 'avg-ctr',
            icon: <MousePointer className="h-5 w-5 text-blinkly-blue"/>,
            label: 'Avg. CTR (7d)',
            value: analyticsData.avg_ctr_7d.percentage,
            change: 'N/A',
            isPositive: true
        },
    ] : [];

    return (
        <div className="bg-card/50 border-y px-4 py-3">
            <div className="mx-auto grid grid-cols-4 gap-4">
                {isLoading ? (
                    [...Array(4)].map((_, i) => (
                        <Card key={`skeleton-${i}`}
                              className="border shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-1">
                            <div className="p-4">
                                <Skeleton className="h-4 w-20 mb-2"/>
                                <Skeleton className="h-8 w-28 mb-2"/>
                                <Skeleton className="h-4 w-16"/>
                            </div>
                        </Card>
                    ))
                ) : (
                    kpis.map((kpi) => (
                        <KpiCard key={kpi.id} kpi={kpi}/>
                    ))
                )}
            </div>
        </div>
    );
};

const KpiCard = ({kpi}) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const controls = animate(0, kpi.value, {
            duration: 1.5,
            onUpdate: value => {
                if (Number.isInteger(kpi.value)) {
                    setCount(Math.floor(value));
                } else {
                    setCount(parseFloat(value.toFixed(1)));
                }
            }
        });

        return () => controls.stop();
    }, [kpi.value]);

    const displayValue = typeof count === 'number' ?
        (Number.isInteger(kpi.value) ? count.toLocaleString() : count.toLocaleString(undefined, {
            minimumFractionDigits: 1,
            maximumFractionDigits: 1
        })) :
        count;

    return (
        <Card className="border shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-1">
            <div className="p-4">
                <div className="flex items-center gap-2 mb-1">
                    {kpi.icon}
                    <p className="text-sm text-muted-foreground">{kpi.label}</p>
                </div>
                <p className="text-2xl font-bold mb-1">{displayValue}{kpi.id === 'avg-ctr' ? '%' : ''}</p>
                <div className={`text-sm flex items-center ${kpi.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {kpi.change}
                    {kpi.isPositive ? (
                        <ArrowUp className="h-3.5 w-3.5 ml-1"/>
                    ) : kpi.change !== '0%' ? (
                        <ArrowDown className="h-3.5 w-3.5 ml-1"/>
                    ) : null}
                </div>
            </div>
        </Card>
    );
};

export default KpiStrip;
