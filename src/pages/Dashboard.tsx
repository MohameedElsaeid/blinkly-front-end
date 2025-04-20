
import React from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import KpiStrip from "@/components/dashboard/KpiStrip";
import WidgetGrid from "@/components/dashboard/WidgetGrid";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <KpiStrip />
      <div className="mt-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Your link management command center</p>
          </div>
        </div>
        <WidgetGrid
          widgets={[
            { id: "quick-create", title: "Create New Link", type: "create", size: "large" },
            { id: "top-links", title: "Top 5 Links", type: "chart", size: "medium" },
          ]}
        />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
