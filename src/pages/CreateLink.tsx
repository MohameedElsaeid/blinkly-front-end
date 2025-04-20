
import React from 'react';
import CreateLinkForm from '@/components/dashboard/CreateLinkForm';

const CreateLink = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Create New Link</h1>
      <CreateLinkForm />
    </div>
  );
};

export default CreateLink;
