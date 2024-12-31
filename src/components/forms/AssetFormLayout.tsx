import React from 'react';

interface AssetFormLayoutProps {
  title: string;
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent) => void;
}

const AssetFormLayout: React.FC<AssetFormLayoutProps> = ({ title, children, onSubmit }) => {
  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
      <form onSubmit={onSubmit} className="space-y-6">
        {children}
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Create Asset
          </button>
        </div>
      </form>
    </div>
  );
};

export default AssetFormLayout;