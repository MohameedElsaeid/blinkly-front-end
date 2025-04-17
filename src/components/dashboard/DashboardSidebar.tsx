
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Link as LinkIcon, 
  BarChart2, 
  QrCode, 
  User, 
  HelpCircle, 
  Settings,
  LogOut
} from 'lucide-react';

const DashboardSidebar = () => {
  return (
    <div className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200">
      {/* Logo */}
      <div className="p-4 border-b">
        <Link to="/dashboard" className="flex items-center">
          <img 
            src="/lovable-uploads/42155296-07ef-4530-b05e-fc8ee23eeb8b.png" 
            alt="Blinkly Logo" 
            className="h-8 w-auto" 
          />
          <span className="ml-2 text-lg font-semibold text-gray-900">Blinkly</span>
        </Link>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        <Link 
          to="/dashboard" 
          className="flex items-center px-3 py-2 text-sm font-medium rounded-md bg-blue-50 text-blinkly-blue"
        >
          <BarChart2 className="mr-3 h-5 w-5" />
          Dashboard
        </Link>
        
        <Link 
          to="/dashboard/links" 
          className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 hover:text-blinkly-blue"
        >
          <LinkIcon className="mr-3 h-5 w-5" />
          Links
        </Link>
        
        <Link 
          to="/dashboard/analytics" 
          className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 hover:text-blinkly-blue"
        >
          <BarChart2 className="mr-3 h-5 w-5" />
          Analytics
        </Link>
        
        <Link 
          to="/dashboard/qr-codes" 
          className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 hover:text-blinkly-blue"
        >
          <QrCode className="mr-3 h-5 w-5" />
          QR Codes
        </Link>
        
        <Link 
          to="/dashboard/account" 
          className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 hover:text-blinkly-blue"
        >
          <User className="mr-3 h-5 w-5" />
          Account
        </Link>
        
        <Link 
          to="/dashboard/help" 
          className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 hover:text-blinkly-blue"
        >
          <HelpCircle className="mr-3 h-5 w-5" />
          Help
        </Link>
      </nav>
      
      {/* Footer */}
      <div className="p-4 border-t">
        <Link 
          to="/dashboard/settings" 
          className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 hover:text-blinkly-blue"
        >
          <Settings className="mr-3 h-5 w-5" />
          Settings
        </Link>
        
        <button 
          className="flex w-full items-center px-3 py-2 mt-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 hover:text-red-600"
        >
          <LogOut className="mr-3 h-5 w-5" />
          Log Out
        </button>
      </div>
    </div>
  );
};

export default DashboardSidebar;
