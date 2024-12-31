import React from 'react';
import { CreateRelationshipForm } from '../../components/relationships/CreateRelationshipForm';

const CreateRelationship: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Create Relationship</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <CreateRelationshipForm />
      </div>
    </div>
  );
};

export default CreateRelationship;