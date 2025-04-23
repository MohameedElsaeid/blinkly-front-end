
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { analyticsSections } from './config/sidebarNavigation';

const AnalyticsDropdownNav = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  
  const currentSection = analyticsSections.find(section => 
    location.pathname === section.to
  );

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full">
      <button 
        onClick={toggleDropdown}
        className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-gray-700 hover:text-blinkly-blue focus:outline-none"
      >
        <span className="flex-1 text-left">
          {currentSection?.label || "Analytics"}
        </span>
        {isOpen ? (
          <ChevronUp className="h-4 w-4 ml-2" />
        ) : (
          <ChevronDown className="h-4 w-4 ml-2" />
        )}
      </button>
      
      {isOpen && (
        <div className="bg-white border-l-2 border-blinkly-blue/30 mt-1 ml-3">
          {analyticsSections.map((section) => (
            <Link
              key={section.id}
              to={section.to}
              className={`flex items-center w-full px-3 py-2 text-sm ${
                location.pathname === section.to
                  ? "font-medium text-blinkly-blue bg-blinkly-blue/10"
                  : "text-gray-700 hover:bg-gray-100 hover:text-blinkly-blue"
              }`}
              onClick={() => setIsOpen(false)}
            >
              {section.icon}
              {section.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default AnalyticsDropdownNav;
