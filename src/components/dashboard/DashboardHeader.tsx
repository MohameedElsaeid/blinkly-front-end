
import React, { useState } from "react";
import { Bell, Menu, X, User, Settings, LogOut, PanelLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const DashboardHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white/60 border-b border-gray-200 shadow-sm sticky top-0 z-30">
      <div className="flex items-center justify-between p-4">
        {/* Mobile menu button */}
        <button
          type="button"
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Sidebar toggle button - desktop only */}
        <div className="hidden md:block">
          <SidebarTrigger />
        </div>

        {/* Logo - mobile only */}
        <div className="md:hidden">
          <img
            src="/lovable-uploads/42155296-07ef-4530-b05e-fc8ee23eeb8b.png"
            alt="Blinkly Logo"
            className="h-8 w-auto"
          />
        </div>

        {/* Push items to the right */}
        <div className="flex-1" />

        {/* Right side items */}
        <div className="flex items-center space-x-4 ml-auto">
          {/* Plan badge */}
          <span className="hidden sm:inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blinkly-blue/10 text-blinkly-blue">
            Free Plan
          </span>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
          </Button>

          {/* User dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {/* Mobile navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-white pt-2 pb-4 space-y-1 px-4 shadow animate-fade-in">
          <a
            href="/dashboard"
            className="flex items-center px-3 py-2 text-base font-medium rounded-md bg-blinkly-blue/10 text-blinkly-blue"
          >
            Dashboard
          </a>
          <a
            href="/dashboard/links"
            className="flex items-center px-3 py-2 text-base font-medium rounded-md text-gray-700 hover:bg-gray-50"
          >
            Links
          </a>
          <a
            href="/dashboard/analytics"
            className="flex items-center px-3 py-2 text-base font-medium rounded-md text-gray-700 hover:bg-gray-50"
          >
            Analytics
          </a>
          <a
            href="/dashboard/qr-codes"
            className="flex items-center px-3 py-2 text-base font-medium rounded-md text-gray-700 hover:bg-gray-50"
          >
            QR Codes
          </a>
          <a
            href="/dashboard/account"
            className="flex items-center px-3 py-2 text-base font-medium rounded-md text-gray-700 hover:bg-gray-50"
          >
            Account
          </a>
          <a
            href="/dashboard/help"
            className="flex items-center px-3 py-2 text-base font-medium rounded-md text-gray-700 hover:bg-gray-50"
          >
            Help
          </a>
        </nav>
      )}
    </header>
  );
};

export default DashboardHeader;
