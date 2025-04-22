
import {BarChart2, LinkIcon, QrCode, User, HelpCircle} from "lucide-react";
import React from "react";
import PremiumBadge from "../PremiumBadge"; // Import the badge

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
        label: (
          <span className="flex items-center">
            Dynamic Links
            <PremiumBadge />
          </span>
        )
    },
    {
        to: "/dashboard/analytics",
        icon: <BarChart2 className="mr-3 h-5 w-5"/>,
        label: "Analytics",
        disabled: true
    },
    {
        to: "/dashboard/qr-codes",
        icon: <QrCode className="mr-3 h-5 w-5"/>,
        label: "QR Codes",
        disabled: true
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
