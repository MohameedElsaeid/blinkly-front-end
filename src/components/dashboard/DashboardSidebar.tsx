
import React from "react";
import { Settings, LogOut } from "lucide-react";
import { navigationItems } from "./config/sidebarNavigation";
import SidebarLogo from "./SidebarLogo";
import SidebarNavItem from "./SidebarNavItem";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";

const DashboardSidebar: React.FC = () => {
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarLogo />
      </SidebarHeader>

      {/* Navigation */}
      <SidebarContent className="p-4 space-y-1">
        {navigationItems.map((item) => (
          <SidebarNavItem key={item.to} item={item} />
        ))}
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="p-4 border-t mt-auto">
        <button
          className="flex items-center px-3 py-2 mb-1 text-sm font-medium rounded-lg opacity-50 cursor-not-allowed pointer-events-none text-gray-400"
        >
          <Settings className="mr-3 h-5 w-5" />
          Settings
        </button>
        <button
          className="flex w-full items-center px-3 py-2 mt-2 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-100 hover:text-red-600 transition-colors"
        >
          <LogOut className="mr-3 h-5 w-5" />
          Log Out
        </button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardSidebar;
