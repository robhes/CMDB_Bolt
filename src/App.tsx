import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Database, Server, Box, Settings, Search } from 'lucide-react';
import { AuthForm } from './components/auth/AuthForm';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import HardwareAssets from './pages/HardwareAssets';
import SoftwareAssets from './pages/SoftwareAssets';
import AssetSearch from './pages/AssetSearch';
import Relationships from './pages/Relationships';
import CreateHardwareAsset from './pages/hardware/CreateHardwareAsset';
import CreateSoftwareAsset from './pages/software/CreateSoftwareAsset';
import CreateRelationship from './pages/relationships/CreateRelationship';
import { useAuth } from './lib/auth';

export default function App() {
  const { session, loading } = useAuth();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: Database },
    { path: '/hardware', label: 'Hardware', icon: Server },
    { path: '/software', label: 'Software', icon: Box },
    { path: '/search', label: 'Search', icon: Search },
    { path: '/relationships', label: 'Relationships', icon: Settings },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return <AuthForm />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar items={navItems} />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/hardware" element={<HardwareAssets />} />
            <Route path="/hardware/create" element={<CreateHardwareAsset />} />
            <Route path="/software" element={<SoftwareAssets />} />
            <Route path="/software/create" element={<CreateSoftwareAsset />} />
            <Route path="/search" element={<AssetSearch />} />
            <Route path="/relationships" element={<Relationships />} />
            <Route path="/relationships/create" element={<CreateRelationship />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}