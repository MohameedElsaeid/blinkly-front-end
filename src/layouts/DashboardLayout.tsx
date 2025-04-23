
import React from "react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import Footer from "@/components/Footer";
import {SidebarProvider} from "@/components/ui/sidebar";
import {Button} from "@/components/ui/button";
import {ChevronLeft, ChevronRight} from "lucide-react";
import {useSidebar} from "@/components/ui/sidebar";

interface DashboardLayoutProps {
    children: React.ReactNode;
    showFooter?: boolean;
}

const SidebarToggle = () => {
    const {state, toggleSidebar} = useSidebar();
    
    return (
        <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 fixed left-[270px] bottom-8 rounded-full z-50 bg-white shadow-md border border-gray-200 lg:flex hidden"
            onClick={toggleSidebar}
        >
            {state === "expanded" ? (
                <ChevronLeft className="h-4 w-4" />
            ) : (
                <ChevronRight className="h-4 w-4" />
            )}
        </Button>
    );
};

const DashboardLayout: React.FC<DashboardLayoutProps> = ({children, showFooter = false}) => {
    return (
        <SidebarProvider>
            <div className="min-h-screen flex w-full bg-gradient-to-tr from-slate-50 via-white to-blinkly-blue/10">
                {/* Sidebar */}
                <DashboardSidebar/>
                <SidebarToggle />

                {/* Main Content Area */}
                <div className="flex flex-col flex-1 min-w-0">
                    {/* Header */}
                    <DashboardHeader/>

                    {/* Main children content */}
                    <main className="flex-1 overflow-y-auto p-6 bg-transparent">
                        {children}
                    </main>

                    {/* Optional footer */}
                    {showFooter && <Footer/>}
                </div>
            </div>
        </SidebarProvider>
    );
};

export default DashboardLayout;
