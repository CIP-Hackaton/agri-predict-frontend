import React from 'react';
import { Sprout } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface NavigationItem {
  icon: React.ElementType;
  label: string;
  path: string;
}

interface SidebarProps {
  isOpen: boolean;
  navigationItems: NavigationItem[];
  onToggle: () => void;
}

export default function Sidebar({ isOpen, navigationItems, onToggle }: SidebarProps) {
  const location = useLocation();

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:static h-screen z-30 transition-all duration-300 bg-white border-r border-gray-200 ${
          isOpen ? 'w-64 translate-x-0' : 'w-0 md:w-20 -translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-center gap-2">
            <Sprout className="text-green-500 flex-shrink-0" size={32} />
            {isOpen && <span className="font-bold text-xl whitespace-nowrap">AgriPredict</span>}
          </div>
        </div>

        <nav className="mt-6 overflow-y-auto">
          {navigationItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={index}
                to={item.path}
                className={`flex items-center px-4 py-3 mb-2 transition-colors ${
                  isActive
                    ? 'bg-green-100 text-green-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon size={20} className={isActive ? 'text-green-600 flex-shrink-0' : 'flex-shrink-0'} />
                {isOpen && (
                  <span className="ml-4 font-medium whitespace-nowrap">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}