import React from 'react';
import { Menu, X } from 'lucide-react';
import { NavItem } from './types';
import { MobileMenuItem } from './MobileMenuItem';

interface MobileMenuProps {
  items: NavItem[];
  isOpen: boolean;
  onToggle: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ items, isOpen, onToggle }) => {
  return (
    <div className="md:hidden">
      <button
        onClick={onToggle}
        className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {items.map((item) => (
              <MobileMenuItem key={item.path} item={item} onClick={onToggle} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};