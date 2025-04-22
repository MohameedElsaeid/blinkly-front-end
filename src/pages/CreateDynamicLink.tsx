
import React from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreateDynamicLinkForm from "@/components/dashboard/CreateDynamicLinkForm";

const CreateDynamicLink = () => {
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-2xl font-bold">Create Dynamic Link</h1>
            <p className="text-muted-foreground">Create smart links that adapt based on device, platform and more</p>
          </div>
          
          <Tabs defaultValue="create" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="create">Create Dynamic Link</TabsTrigger>
              <TabsTrigger value="bulk">Bulk Create</TabsTrigger>
            </TabsList>
            <TabsContent value="create" className="mt-4">
              <CreateDynamicLinkForm />
            </TabsContent>
            <TabsContent value="bulk" className="mt-4">
              <div className="flex flex-col items-center justify-center h-64 border border-dashed rounded-lg border-slate-300 bg-slate-50">
                <p className="text-muted-foreground">Bulk creation coming soon</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CreateDynamicLink;
