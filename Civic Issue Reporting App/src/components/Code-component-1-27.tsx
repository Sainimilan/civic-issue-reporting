import React, { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Progress } from './ui/progress';
import { ArrowLeft, MapPin, Calendar, Clock, CheckCircle, AlertCircle, Timer } from 'lucide-react';

interface Report {
  id: string;
  title: string;
  category: string;
  status: 'pending' | 'in-progress' | 'resolved';
  address: string;
  date: string;
  progress: number;
  timeline: {
    step: string;
    date: string;
    completed: boolean;
  }[];
}

interface MyReportsProps {
  onNavigate: (page: string) => void;
}

const mockReports: Report[] = [
  {
    id: 'CR2024-001',
    title: 'Broken streetlight on Main St',
    category: 'Streetlight',
    status: 'in-progress',
    address: '123 Main Street',
    date: '2024-01-15',
    progress: 60,
    timeline: [
      { step: 'Report Submitted', date: '2024-01-15', completed: true },
      { step: 'Under Review', date: '2024-01-16', completed: true },
      { step: 'Assigned to Department', date: '2024-01-17', completed: true },
      { step: 'Work Scheduled', date: '2024-01-18', completed: false },
      { step: 'Issue Resolved', date: '', completed: false }
    ]
  },
  {
    id: 'CR2024-002',
    title: 'Large pothole on Oak Avenue',
    category: 'Road Maintenance',
    status: 'pending',
    address: '456 Oak Avenue',
    date: '2024-01-14',
    progress: 20,
    timeline: [
      { step: 'Report Submitted', date: '2024-01-14', completed: true },
      { step: 'Under Review', date: '', completed: false },
      { step: 'Assigned to Department', date: '', completed: false },
      { step: 'Work Scheduled', date: '', completed: false },
      { step: 'Issue Resolved', date: '', completed: false }
    ]
  },
  {
    id: 'CR2024-003',
    title: 'Overflowing trash bin',
    category: 'Waste Management',
    status: 'resolved',
    address: '789 Pine Street',
    date: '2024-01-10',
    progress: 100,
    timeline: [
      { step: 'Report Submitted', date: '2024-01-10', completed: true },
      { step: 'Under Review', date: '2024-01-10', completed: true },
      { step: 'Assigned to Department', date: '2024-01-11', completed: true },
      { step: 'Work Scheduled', date: '2024-01-12', completed: true },
      { step: 'Issue Resolved', date: '2024-01-12', completed: true }
    ]
  }
];

const statusIcons = {
  pending: AlertCircle,
  'in-progress': Timer,
  resolved: CheckCircle
};

const statusColors = {
  pending: 'bg-red-500',
  'in-progress': 'bg-yellow-500',
  resolved: 'bg-green-500'
};

const statusLabels = {
  pending: 'Pending',
  'in-progress': 'In Progress',
  resolved: 'Resolved'
};

export function MyReports({ onNavigate }: MyReportsProps) {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filteredReports = activeFilter === 'all' 
    ? mockReports 
    : mockReports.filter(report => report.status === activeFilter);

  const filters = [
    { key: 'all', label: 'All' },
    { key: 'pending', label: 'Pending' },
    { key: 'in-progress', label: 'In Progress' },
    { key: 'resolved', label: 'Resolved' }
  ];

  if (selectedReport) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="px-4 py-4 flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedReport(null)}
              className="mr-3 p-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Report Details</h1>
              <p className="text-sm text-gray-600">{selectedReport.id}</p>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-4">
          {/* Report Summary */}
          <Card className="shadow-sm border-0">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-medium text-gray-900">{selectedReport.title}</h3>
                <Badge className={`${statusColors[selectedReport.status]} text-white text-xs`}>
                  {statusLabels[selectedReport.status]}
                </Badge>
              </div>
              
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{selectedReport.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Reported on {selectedReport.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium">Category:</span>
                  <span className="text-xs">{selectedReport.category}</span>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Progress</span>
                  <span className="text-sm text-gray-600">{selectedReport.progress}%</span>
                </div>
                <Progress value={selectedReport.progress} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card className="shadow-sm border-0">
            <CardContent className="p-4">
              <h4 className="font-medium text-gray-900 mb-4">Progress Timeline</h4>
              
              <div className="space-y-4">
                {selectedReport.timeline.map((item, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <div className={`w-4 h-4 rounded-full border-2 ${
                        item.completed 
                          ? 'bg-[#2C6FF7] border-[#2C6FF7]' 
                          : 'bg-white border-gray-300'
                      }`}>
                        {item.completed && (
                          <div className="w-full h-full rounded-full bg-white scale-50"></div>
                        )}
                      </div>
                      {index < selectedReport.timeline.length - 1 && (
                        <div className={`w-0.5 h-8 ml-1.5 mt-1 ${
                          item.completed ? 'bg-[#2C6FF7]' : 'bg-gray-200'
                        }`} />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm ${
                        item.completed ? 'text-gray-900 font-medium' : 'text-gray-500'
                      }`}>
                        {item.step}
                      </p>
                      {item.date && (
                        <p className="text-xs text-gray-500 mt-1">{item.date}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          {selectedReport.status !== 'resolved' && (
            <Card className="shadow-sm border-0">
              <CardContent className="p-4">
                <h4 className="font-medium text-gray-900 mb-3">Actions</h4>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Clock className="h-4 w-4 mr-2" />
                    Request Status Update
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start text-red-600 border-red-200">
                    Report Additional Issues
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-4 py-4 flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('dashboard')}
            className="mr-3 p-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">My Reports</h1>
            <p className="text-sm text-gray-600">Track your submitted issues</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="px-4 py-4">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {filters.map((filter) => (
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
              {filter.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Reports List */}
      <div className="px-4 space-y-3">
        {filteredReports.map((report) => {
          const StatusIcon = statusIcons[report.status];
          return (
            <Card 
              key={report.id} 
              className="shadow-sm border-0 bg-white cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setSelectedReport(report)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0 mr-3">
                    <h3 className="font-medium text-gray-900 truncate">{report.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{report.id}</p>
                  </div>
                  <Badge className={`${statusColors[report.status]} text-white text-xs flex-shrink-0`}>
                    <StatusIcon className="h-3 w-3 mr-1" />
                    {statusLabels[report.status]}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="h-3 w-3" />
                    <span className="truncate">{report.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-3 w-3" />
                    <span>{report.date}</span>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-500">Progress</span>
                    <span className="text-xs text-gray-600">{report.progress}%</span>
                  </div>
                  <Progress value={report.progress} className="h-1.5" />
                </div>
              </CardContent>
            </Card>
          );
        })}

        {filteredReports.length === 0 && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Reports Found</h3>
            <p className="text-gray-600 mb-4">
              {activeFilter === 'all' 
                ? "You haven't submitted any reports yet." 
                : `No ${activeFilter} reports found.`}
            </p>
            <Button
              onClick={() => onNavigate('report')}
              className="bg-[#2C6FF7] hover:bg-[#2356d4] text-white"
            >
              Submit First Report
            </Button>
          </div>
        )}
      </div>

      {/* Bottom Spacer */}
      <div className="h-20" />
    </div>
  );
}