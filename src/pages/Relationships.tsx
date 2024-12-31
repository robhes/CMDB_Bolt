import React from 'react';
import { Link } from 'react-router-dom';
import { RelationshipVisualization } from '../components/relationships/RelationshipVisualization';
import { RelationshipList } from '../components/relationships/RelationshipList';

const Relationships: React.FC = () => {
  const [view, setView] = React.useState<'list' | 'graph'>('graph');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold text-gray-900">Asset Relationships</h1>
          <div className="flex rounded-md shadow-sm" role="group">
            <button
              type="button"
              onClick={() => setView('list')}
              className={`px-4 py-2 text-sm font-medium border ${
                view === 'list'
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              } rounded-l-lg`}
            >
              List View
            </button>
            <button
              type="button"
              onClick={() => setView('graph')}
              className={`px-4 py-2 text-sm font-medium border-t border-b border-r ${
                view === 'graph'
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              } rounded-r-lg`}
            >
              Graph View
            </button>
          </div>
        </div>
        <Link
          to="/relationships/create"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Add Relationship
        </Link>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        {view === 'list' ? <RelationshipList /> : <RelationshipVisualization />}
      </div>
    </div>
  );
};

export default Relationships;