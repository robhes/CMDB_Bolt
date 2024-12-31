import React from 'react';
import { Database, Server, Box } from 'lucide-react';
import { StatCard } from '../components/dashboard/StatCard';
import { RecentActivities } from '../components/dashboard/RecentActivities';
import { AssetHealth } from '../components/dashboard/AssetHealth';
import { useAssets } from '../hooks/useAssets';

const Dashboard: React.FC = () => {
  const { assets, loading, error } = useAssets();

  if (loading) {
    return <div className="text-center py-8">Loading dashboard...</div>;
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-md">
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  const hardwareCount = assets.filter(a => a.type === 'hardware').length;
  const softwareCount = assets.filter(a => a.type === 'software').length;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Assets"
          value={assets.length}
          icon={Database}
          iconColor="text-blue-500"
        />
        <StatCard
          title="Hardware Assets"
          value={hardwareCount}
          icon={Server}
          iconColor="text-green-500"
        />
        <StatCard
          title="Software Assets"
          value={softwareCount}
          icon={Box}
          iconColor="text-purple-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivities assets={assets} />
        <AssetHealth assets={assets} />
      </div>
    </div>
  );
};

export default Dashboard;