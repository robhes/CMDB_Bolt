import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NavItem } from './types';

interface MobileMenuItemProps {
  item: NavItem;
  onClick: () => void;
}

export const MobileMenuItem: React.FC<MobileMenuItemProps> = ({ item, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === item.path;
  const Icon = item.icon;

  return (
    <Link
      to={item.path}
      onClick={onClick}
      className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
        isActive
          ? 'bg-gray-900 text-white'
          : 'text-gray-700 hover:bg-gray-100'
      }`}
    >
      <Icon className="w-5 h-5 mr-3" />
      {item.label}
    </Link>
  );
};