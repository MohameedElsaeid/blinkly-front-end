import {
    BarChart2, HelpCircle, LinkIcon, QrCode, User
} from "lucide-react";
import React from "react";

export interface NavItem {
    to: string;
    icon: React.ReactNode;
    label: React.ReactNode;
    exact?: boolean;
    disabled?: boolean;
    isDropdown?: boolean;
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
        label: "Analytics"
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
        to: '/dashboard/analytics',
        icon: <BarChart2 className="h-4 w-4 mr-2" />
    },
    {
        id: 'traffic',
        label: 'Traffic Analysis',
        to: '/dashboard/analytics/traffic',
        icon: <Activity className="h-4 w-4 mr-2" />
    },
    {
        id: 'geography',
        label: 'Geographic Data',
        to: '/dashboard/analytics/geography',
        icon: <Map className="h-4 w-4 mr-2" />
    },
    {
        id: 'campaigns',
        label: 'Campaign Performance',
        to: '/dashboard/analytics/campaigns',
        icon: <PieChart className="h-4 w-4 mr-2" />
    },
    {
        id: 'trends',
        label: 'Performance Trends',
        to: '/dashboard/analytics/trends',
        icon: <LineChart className="h-4 w-4 mr-2" />
    }
];
