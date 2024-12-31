import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NavItem } from './types';

interface DesktopNavProps {
  items: NavItem[];
}

export const DesktopNav: React.FC<DesktopNavProps> = ({ items }) => {
  const location = useLocation();

  return (
    <div className="hidden md:flex space-x-4">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
              isActive
                ? 'bg-gray-900 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Icon className="w-4 h-4 mr-2" />
            {item.label}
          </Link>
        );
      })}
    </div>
  );
};