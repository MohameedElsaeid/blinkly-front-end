
import React from 'react';
import { ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, useLocation } from 'react-router-dom';
import { analyticsSections } from './config/sidebarNavigation';

const AnalyticsDropdownNav = () => {
  const location = useLocation();
  const currentSection = analyticsSections.find(section => 
    location.pathname === section.to
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center w-full px-3 py-2 text-sm font-medium rounded-lg transition-colors hover:bg-gray-100">
        <span className="flex-1 text-left">
          {currentSection?.label || "Analytics"}
        </span>
        <ChevronDown className="h-4 w-4 ml-2" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {analyticsSections.map((section) => (
          <DropdownMenuItem key={section.id} asChild>
            <Link
              to={section.to}
              className="w-full"
            >
              {section.label}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AnalyticsDropdownNav;
