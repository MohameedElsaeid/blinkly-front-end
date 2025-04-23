
import React from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import QrCodeGeneratorPage from "./QrCodeGeneratorPage";

const QrCodesPage: React.FC = () => {
  return (
    <DashboardLayout>
      <QrCodeGeneratorPage />
    </DashboardLayout>
  );
};

export default QrCodesPage;
