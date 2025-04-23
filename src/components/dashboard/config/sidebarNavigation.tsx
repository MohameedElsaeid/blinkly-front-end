
import {BarChart2, HelpCircle, LinkIcon, QrCode, User, PieChart, Activity, Map, LineChart} from "lucide-react";
import React from "react";

export interface NavItem {
    to: string;
    icon: React.ReactNode;
    label: React.ReactNode;
    exact?: boolean;
    disabled?: boolean;
}

export const navigationItems: NavItem[] = [
    {
        to: "/dashboard",
        icon: <BarChart2 className="mr-3 h-5 w-5"/>,
        label: "Dashboard",
        exact: true
    },
    {
        to: "/dashboard/links",
        icon: <LinkIcon className="mr-3 h-5 w-5"/>,
        label: "Links"
    },
    {
        to: "/dashboard/dynamic-links",
        icon: <LinkIcon className="mr-3 h-5 w-5"/>,
        label: "Dynamic Links"
    },
    {
        to: "/dashboard/qr-codes",
        icon: <QrCode className="mr-3 h-5 w-5"/>,
        label: "QR Codes",
    },
    {
        to: "/dashboard/analytics",
        icon: <BarChart2 className="mr-3 h-5 w-5"/>,
        label: "Analytics",
    },
    {
        to: "/dashboard/analytics/traffic",
        icon: <Activity className="mr-3 h-5 w-5"/>,
        label: "Traffic Analysis",
        disabled: false
    },
    {
        to: "/dashboard/analytics/geography",
        icon: <Map className="mr-3 h-5 w-5"/>,
        label: "Geographic Data",
        disabled: false
    },
    {
        to: "/dashboard/analytics/campaigns",
        icon: <PieChart className="mr-3 h-5 w-5"/>,
        label: "Campaign Performance",
        disabled: false
    },
    {
        to: "/dashboard/analytics/trends",
        icon: <LineChart className="mr-3 h-5 w-5"/>,
        label: "Performance Trends",
        disabled: false
    },
    {
        to: "/dashboard/account",
        icon: <User className="mr-3 h-5 w-5"/>,
        label: "Account"
    },
    {
        to: "/help",
        icon: <HelpCircle className="mr-3 h-5 w-5"/>,
        label: "Help"
    },
];

export const analyticsSections = [
    {
        id: 'overview',
        label: 'Overview',
        to: '/dashboard/analytics'
    },
    {
        id: 'traffic',
        label: 'Traffic Analysis',
        to: '/dashboard/analytics/traffic'
    },
    {
        id: 'geography',
        label: 'Geographic Data',
        to: '/dashboard/analytics/geography'
    },
    {
        id: 'campaigns',
        label: 'Campaign Performance',
        to: '/dashboard/analytics/campaigns'
    },
    {
        id: 'trends',
        label: 'Performance Trends',
        to: '/dashboard/analytics/trends'
    }
];
