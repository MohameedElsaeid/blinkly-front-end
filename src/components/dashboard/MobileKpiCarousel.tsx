import React, {useEffect, useState, useRef} from 'react';
import {TrendingUp, TrendingDown, Link as LinkIcon, Globe, MousePointer, ArrowUp, ArrowDown} from 'lucide-react';
import {Card} from "@/components/ui/card";
import {useQuery} from '@tanstack/react-query';
import {Skeleton} from '@/components/ui/skeleton';
import {animate} from 'framer-motion';
import analyticsClient from '@/lib/analytics/analytics-client';
import { useDashboardAnalytics } from '@/hooks/use-dashboard-analytics';

const MobileKpiCarousel = () => {
    const scrollRef = useRef<HTMLDivElement>(null);

    // Use the dashboard analytics hook
    const { data: analyticsData, isLoading } = useDashboardAnalytics();

    // Demo KPI data - would be replaced with actual API data
    const kpis = [
        {
            id: 'clicks-today',
            icon: <TrendingUp className="h-5 w-5 text-blinkly-blue"/>,
            label: 'Clicks Today',
            value: analyticsData?.clicks_today?.count || 3482,
            previousValue: 3312,
            change: '+5.1%',
            isPositive: true
        },
        {
            id: 'links-created',
            icon: <LinkIcon className="h-5 w-5 text-blinkly-blue"/>,
            label: 'Links Created (24h)',
            value: analyticsData?.links_24h?.count || 218,
            previousValue: 195,
            change: '+11.8%',
            isPositive: true
        },
        {
            id: 'unique-countries',
            icon: <Globe className="h-5 w-5 text-blinkly-blue"/>,
            label: 'Unique Countries (24h)',
            value: analyticsData?.unique_countries_24h?.count || 45,
            previousValue: 45,
            change: '0%',
            isPositive: true
        },
        {
            id: 'avg-ctr',
            icon: <MousePointer className="h-5 w-5 text-blinkly-blue"/>,
            label: 'Avg. CTR (7d)',
            value: analyticsData?.avg_ctr_7d?.percentage || 12.7,
            previousValue: 13.8,
            change: '-8.0%',
            isPositive: false
        },
    ];

    return (
        <div className="sticky top-[60px] z-20 bg-background border-b pb-3 pt-3">
            <div
                ref={scrollRef}
                className="flex overflow-x-auto pb-1 px-4 gap-3 scrollbar-none snap-x snap-mandatory"
            >
                {isLoading ? (
                    // Skeleton loading state
                    [...Array(4)].map((_, i) => (
                        <Card key={`skeleton-${i}`} className="border shadow-sm flex-shrink-0 w-[80%] snap-center">
                            <div className="p-3">
                                <Skeleton className="h-4 w-20 mb-2"/>
                                <Skeleton className="h-6 w-28 mb-2"/>
                                <Skeleton className="h-4 w-16"/>
                            </div>
                        </Card>
                    ))
                ) : (
                    // Actual KPI cards
                    kpis.map((kpi) => (
                        <MobileKpiCard key={kpi.id} kpi={kpi}/>
                    ))
                )}
            </div>

            {/* Indicator dots */}
            <div className="flex justify-center gap-1.5 mt-2">
                {kpis.map((kpi, index) => (
                    <div
                        key={`dot-${kpi.id}`}
                        className="h-1.5 w-1.5 rounded-full bg-primary opacity-50"
                    />
                ))}
            </div>
        </div>
    );
};

// Mobile KPI Card component with animation
const MobileKpiCard = ({kpi}) => {
    const [count, setCount] = useState(0);

    // Animate the counter on load
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
        <Card className="border shadow-sm flex-shrink-0 w-[80%] snap-center">
            <div className="p-3">
                <div className="flex items-center gap-2 mb-1">
                    {kpi.icon}
                    <p className="text-sm text-muted-foreground">{kpi.label}</p>
                </div>
                <p className="text-xl font-bold mb-1">{displayValue}{kpi.id === 'avg-ctr' ? '%' : ''}</p>
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

export default MobileKpiCarousel;
