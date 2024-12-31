import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { NavItem } from './navigation/types';
import { MobileMenu } from './navigation/MobileMenu';
import { DesktopNav } from './navigation/DesktopNav';

interface NavbarProps {
  items: NavItem[];
}

const Navbar: React.FC<NavbarProps> = ({ items }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-800">
              CMDB
            </Link>
          </div>
          
          <DesktopNav items={items} />
          <MobileMenu 
            items={items}
            isOpen={isMobileMenuOpen}
            onToggle={toggleMobileMenu}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;