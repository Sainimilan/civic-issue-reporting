import React from 'react';
import { Button } from './ui/button';
import { Home, FileText, User, Plus } from 'lucide-react';

interface BottomNavigationProps {
  activeTab: string;
  onNavigate: (page: string) => void;
}

export function BottomNavigation({ activeTab, onNavigate }: BottomNavigationProps) {
  const navItems = [
    { key: 'dashboard', label: 'Home', icon: Home },
    { key: 'reports', label: 'Reports', icon: FileText },
    { key: 'report', label: 'Report', icon: Plus, isSpecial: true },
    { key: 'profile', label: 'Profile', icon: User }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-pb">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.key;
          
          if (item.isSpecial) {
            return (
              <Button
                key={item.key}
                onClick={() => onNavigate(item.key)}
                className="bg-[#2C6FF7] hover:bg-[#2356d4] text-white rounded-full w-12 h-12"
                size="icon"
              >
                <Icon className="h-6 w-6" />
              </Button>
            );
          }
          
          return (
            <Button
              key={item.key}
              variant="ghost"
              onClick={() => onNavigate(item.key)}
              className={`flex-1 flex flex-col items-center gap-1 py-2 h-auto ${
                isActive ? 'text-[#2C6FF7]' : 'text-gray-500'
              }`}
            >
              <Icon className={`h-5 w-5 ${isActive ? 'text-[#2C6FF7]' : 'text-gray-500'}`} />
              <span className={`text-xs ${isActive ? 'text-[#2C6FF7]' : 'text-gray-500'}`}>
                {item.label}
              </span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}