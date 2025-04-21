
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Link as LinkIcon,
  BarChart2,
  QrCode,
  User,
  HelpCircle,
  Settings,
  LogOut,
  Plus,
} from "lucide-react";

const navItems = [
  { to: "/dashboard", icon: <BarChart2 className="mr-3 h-5 w-5" />, label: "Dashboard", exact: true },
  { to: "/dashboard/create-link", icon: <Plus className="mr-3 h-5 w-5" />, label: "Create New Link" },
  { to: "/dashboard/links", icon: <LinkIcon className="mr-3 h-5 w-5" />, label: "Links" },
  { to: "/dashboard/analytics", icon: <BarChart2 className="mr-3 h-5 w-5" />, label: "Analytics", disabled: true },
  { to: "/dashboard/qr-codes", icon: <QrCode className="mr-3 h-5 w-5" />, label: "QR Codes", disabled: true },
  { to: "/dashboard/account", icon: <User className="mr-3 h-5 w-5" />, label: "Account", disabled: true },
  { to: "/dashboard/help", icon: <HelpCircle className="mr-3 h-5 w-5" />, label: "Help", disabled: true },
];

const DashboardSidebar: React.FC = () => {
  const location = useLocation();

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white/80 border-r border-gray-200 min-h-screen shadow-md">
      {/* Logo */}
      <div className="p-6 border-b flex items-center">
        <Link to="/dashboard" className="flex items-center">
          <img
            src="/lovable-uploads/42155296-07ef-4530-b05e-fc8ee23eeb8b.png"
            alt="Blinkly Logo"
            className="h-8 w-auto"
          />
          <span className="ml-2 text-lg font-extrabold text-blinkly-blue tracking-tight">Blinkly</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.disabled ? "#" : item.to}
            className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
              item.disabled 
                ? "opacity-50 cursor-not-allowed pointer-events-none text-gray-400"
                : location.pathname === item.to
                ? "bg-blinkly-blue/10 text-blinkly-blue font-semibold"
                : "text-gray-700 hover:bg-gray-100 hover:text-blinkly-blue"
            }`}
            onClick={item.disabled ? (e) => e.preventDefault() : undefined}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t mt-auto">
        <Link
          to="#"
          className="flex items-center px-3 py-2 mb-1 text-sm font-medium rounded-lg opacity-50 cursor-not-allowed pointer-events-none text-gray-400"
        >
          <Settings className="mr-3 h-5 w-5" />
          Settings
        </Link>
        <button
          className="flex w-full items-center px-3 py-2 mt-2 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-100 hover:text-red-600 transition-colors"
        >
          <LogOut className="mr-3 h-5 w-5" />
          Log Out
        </button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
