
import React from "react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import Footer from "@/components/Footer";

interface DashboardLayoutProps {
  children: React.ReactNode;
  showFooter?: boolean;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, showFooter = false }) => {
  return (
    <div className="min-h-screen flex bg-gradient-to-tr from-slate-50 via-white to-blinkly-blue/10">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Header */}
        <DashboardHeader />

        {/* Main children content */}
        <main className="flex-1 overflow-y-auto p-6 bg-transparent">
          {children}
        </main>

        {/* Optional footer */}
        {showFooter && (
          <Footer />
        )}
      </div>
    </div>
  );
};

export default DashboardLayout;
