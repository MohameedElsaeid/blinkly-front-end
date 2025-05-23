
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { NavItem } from "./config/sidebarNavigation";

interface SidebarNavItemProps {
    item: NavItem;
}

const SidebarNavItem: React.FC<SidebarNavItemProps> = ({item}) => {
    const location = useLocation();
    const isActive = item.exact
        ? location.pathname === item.to
        : location.pathname.startsWith(item.to);

    return (
        <Link
            to={item.disabled ? "#" : item.to}
            className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                item.disabled
                    ? "opacity-50 cursor-not-allowed pointer-events-none text-gray-400"
                    : isActive
                        ? "bg-blinkly-blue/10 text-blinkly-blue font-semibold"
                        : "text-gray-700 hover:bg-gray-100 hover:text-blinkly-blue"
            }`}
            onClick={item.disabled ? (e) => e.preventDefault() : undefined}
        >
            {item.icon}
            <span>{item.label}</span>
        </Link>
    );
};

export default SidebarNavItem;
