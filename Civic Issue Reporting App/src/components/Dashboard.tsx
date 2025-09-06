import React, { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Bell, Camera, Plus, MapPin, Filter, Lightbulb, Car, Trash2, MoreHorizontal } from 'lucide-react';

interface Issue {
  id: string;
  type: 'streetlight' | 'pothole' | 'garbage' | 'other';
  status: 'pending' | 'progress' | 'resolved';
  location: { lat: number; lng: number };
  address: string;
  description: string;
  date: string;
}

interface DashboardProps {
  onNavigate: (page: string) => void;
}

const mockIssues: Issue[] = [
  {
    id: '1',
    type: 'streetlight',
    status: 'pending',
    location: { lat: 40.7128, lng: -74.0060 },
    address: '123 Main St',
    description: 'Streetlight is out',
    date: '2024-01-15'
  },
  {
    id: '2',
    type: 'pothole',
    status: 'progress',
    location: { lat: 40.7120, lng: -74.0050 },
    address: '456 Oak Ave',
    description: 'Large pothole in road',
    date: '2024-01-14'
  },
  {
    id: '3',
    type: 'garbage',
    status: 'resolved',
    location: { lat: 40.7140, lng: -74.0070 },
    address: '789 Pine St',
    description: 'Overflowing trash bin',
    date: '2024-01-13'
  }
];

const typeIcons = {
  streetlight: Lightbulb,
  pothole: Car,
  garbage: Trash2,
  other: MoreHorizontal
};

const statusColors = {
  pending: 'bg-red-500',
  progress: 'bg-yellow-500', 
  resolved: 'bg-green-500'
};

const statusLabels = {
  pending: 'Pending',
  progress: 'In Progress',
  resolved: 'Resolved'
};

export function Dashboard({ onNavigate }: DashboardProps) {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [showMap, setShowMap] = useState(true);

  const filteredIssues = activeFilter === 'all' 
    ? mockIssues 
    : mockIssues.filter(issue => issue.type === activeFilter);

  const filters = [
    { key: 'all', label: 'All', icon: Filter },
    { key: 'streetlight', label: 'Streetlight', icon: Lightbulb },
    { key: 'pothole', label: 'Pothole', icon: Car },
    { key: 'garbage', label: 'Garbage', icon: Trash2 },
    { key: 'other', label: 'Other', icon: MoreHorizontal }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
            <p className="text-sm text-gray-600">Your community issues</p>
          </div>
          <button
            onClick={() => onNavigate('profile')}
            className="relative"
          >
            <Bell className="h-6 w-6 text-gray-600" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              3
            </span>
          </button>
        </div>
      </div>

      {/* Quick Filters */}
      <div className="px-4 py-4">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {filters.map((filter) => {
            const Icon = filter.icon;
            return (
              <Button
                key={filter.key}
                variant={activeFilter === filter.key ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter(filter.key)}
                className={`flex-shrink-0 ${
                  activeFilter === filter.key 
                    ? 'bg-[#2C6FF7] text-white' 
                    : 'bg-white text-gray-700 border-gray-300'
                }`}
              >
                <Icon className="h-4 w-4 mr-2" />
                {filter.label}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Map View */}
      {showMap && (
        <div className="mx-4 mb-4">
          <Card className="overflow-hidden shadow-md">
            <div className="h-48 bg-gradient-to-br from-blue-100 to-green-100 relative">
              {/* Mock Map */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-[#2C6FF7] mx-auto mb-2" />
                  <p className="text-gray-600 text-sm">Interactive Map</p>
                  <p className="text-xs text-gray-500">Showing {filteredIssues.length} issues</p>
                </div>
              </div>

              {/* Issue Pins */}
              {filteredIssues.map((issue, index) => (
                <div
                  key={issue.id}
                  className={`absolute w-4 h-4 rounded-full ${statusColors[issue.status]} border-2 border-white shadow-lg`}
                  style={{
                    left: `${20 + index * 25}%`,
                    top: `${30 + (index % 2) * 20}%`
                  }}
                />
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Recent Issues List */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-medium text-gray-900">Recent Reports</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('reports')}
            className="text-[#2C6FF7]"
          >
            View All
          </Button>
        </div>

        <div className="space-y-3">
          {filteredIssues.slice(0, 5).map((issue) => {
            const Icon = typeIcons[issue.type];
            return (
              <Card key={issue.id} className="shadow-sm border-0 bg-white">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-gray-100 rounded-full p-2 flex-shrink-0">
                      <Icon className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-gray-900 truncate">
                          {issue.description}
                        </p>
                        <Badge 
                          variant="secondary" 
                          className={`text-white text-xs ${statusColors[issue.status]}`}
                        >
                          {statusLabels[issue.status]}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <MapPin className="h-3 w-3" />
                        <span>{issue.address}</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">{issue.date}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6">
        <Button
          onClick={() => onNavigate('report')}
          className="bg-[#2C6FF7] hover:bg-[#2356d4] text-white rounded-full w-14 h-14 shadow-lg"
          size="icon"
        >
          <Plus className="h-6 w-6" />
        </Button>
      </div>

      {/* Bottom Navigation Spacer */}
      <div className="h-20" />
    </div>
  );
}