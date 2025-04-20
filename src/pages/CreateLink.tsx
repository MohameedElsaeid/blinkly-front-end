
import React from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import CreateLinkForm from "@/components/dashboard/CreateLinkForm";

const CreateLink = () => {
  return (
    <DashboardLayout>
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Create New Link</h1>
        <CreateLinkForm />
      </div>
    </DashboardLayout>
  );
};

export default CreateLink;
