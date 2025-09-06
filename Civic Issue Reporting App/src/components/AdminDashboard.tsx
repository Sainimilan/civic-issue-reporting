import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Search, Filter, MapPin, Calendar, User, MessageSquare, 
  BarChart3, TrendingUp, Clock, CheckCircle, AlertTriangle,
  Users, Building, Car, Lightbulb, Trash2, MoreHorizontal
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

interface AdminIssue {
  id: string;
  title: string;
  category: 'streetlight' | 'pothole' | 'garbage' | 'other';
  status: 'pending' | 'assigned' | 'in-progress' | 'resolved';
  priority: 'low' | 'medium' | 'high';
  location: string;
  address: string;
  reporter: string;
  date: string;
  assignedTo?: string;
  department?: string;
  description: string;
}

interface AdminDashboardProps {
  onBackToCitizen: () => void;
}

const mockAdminIssues: AdminIssue[] = [
  {
    id: 'CR2024-001',
    title: 'Broken streetlight on Main St',
    category: 'streetlight',
    status: 'in-progress',
    priority: 'high',
    location: '40.7128,-74.0060',
    address: '123 Main Street',
    reporter: 'John Doe',
    date: '2024-01-15',
    assignedTo: 'Mike Johnson',
    department: 'Public Works',
    description: 'Streetlight has been out for 3 days, creating safety concern for pedestrians.'
  },
  {
    id: 'CR2024-002',
    title: 'Large pothole on Oak Avenue',
    category: 'pothole',
    status: 'pending',
    priority: 'medium',
    location: '40.7120,-74.0050',
    address: '456 Oak Avenue',
    reporter: 'Jane Smith',
    date: '2024-01-14',
    description: 'Deep pothole causing damage to vehicles.'
  },
  {
    id: 'CR2024-003',
    title: 'Overflowing trash bin',
    category: 'garbage',
    status: 'resolved',
    priority: 'low',
    location: '40.7140,-74.0070',
    address: '789 Pine Street',
    reporter: 'Bob Wilson',
    date: '2024-01-10',
    assignedTo: 'Sarah Davis',
    department: 'Sanitation',
    description: 'Trash bin overflowing for several days.'
  }
];

const analyticsData = {
  monthlyReports: [
    { month: 'Jan', reports: 45, resolved: 38 },
    { month: 'Feb', reports: 52, resolved: 41 },
    { month: 'Mar', reports: 61, resolved: 55 },
    { month: 'Apr', reports: 48, resolved: 44 },
    { month: 'May', reports: 67, resolved: 59 },
    { month: 'Jun', reports: 73, resolved: 66 }
  ],
  categoryData: [
    { name: 'Streetlights', value: 35, color: '#2C6FF7' },
    { name: 'Potholes', value: 28, color: '#28A745' },
    { name: 'Garbage', value: 22, color: '#FFC107' },
    { name: 'Other', value: 15, color: '#DC3545' }
  ],
  resolutionTimes: [
    { category: 'Streetlight', avgDays: 3.2 },
    { category: 'Pothole', avgDays: 7.5 },
    { category: 'Garbage', avgDays: 1.8 },
    { category: 'Other', avgDays: 4.1 }
  ]
};

const categoryIcons = {
  streetlight: Lightbulb,
  pothole: Car,
  garbage: Trash2,
  other: MoreHorizontal
};

const statusColors = {
  pending: 'bg-red-500',
  assigned: 'bg-blue-500',
  'in-progress': 'bg-yellow-500',
  resolved: 'bg-green-500'
};

const priorityColors = {
  low: 'bg-gray-500',
  medium: 'bg-yellow-500',
  high: 'bg-red-500'
};

export function AdminDashboard({ onBackToCitizen }: AdminDashboardProps) {
  const [selectedIssue, setSelectedIssue] = useState<AdminIssue | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredIssues = mockAdminIssues.filter(issue => {
    const matchesSearch = issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         issue.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         issue.reporter.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || issue.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || issue.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const stats = {
    totalIssues: mockAdminIssues.length,
    pendingIssues: mockAdminIssues.filter(i => i.status === 'pending').length,
    inProgressIssues: mockAdminIssues.filter(i => i.status === 'in-progress').length,
    resolvedIssues: mockAdminIssues.filter(i => i.status === 'resolved').length
  };

  if (selectedIssue) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center">
              <Button
                variant="ghost"
                onClick={() => setSelectedIssue(null)}
                className="mr-4"
              >
                ← Back
              </Button>
              <div>
                <h1 className="text-xl font-semibold">Issue Details</h1>
                <p className="text-sm text-gray-600">{selectedIssue.id}</p>
              </div>
            </div>
            <Button onClick={onBackToCitizen} variant="outline" size="sm">
              Citizen View
            </Button>
          </div>
        </div>

        <div className="p-6 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Issue Details */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{selectedIssue.title}</h3>
                    <div className="flex gap-2">
                      <Badge className={`${statusColors[selectedIssue.status]} text-white`}>
                        {selectedIssue.status.charAt(0).toUpperCase() + selectedIssue.status.slice(1)}
                      </Badge>
                      <Badge className={`${priorityColors[selectedIssue.priority]} text-white`}>
                        {selectedIssue.priority.charAt(0).toUpperCase() + selectedIssue.priority.slice(1)}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <label className="font-medium text-gray-700">Reporter:</label>
                      <p>{selectedIssue.reporter}</p>
                    </div>
                    <div>
                      <label className="font-medium text-gray-700">Date Reported:</label>
                      <p>{selectedIssue.date}</p>
                    </div>
                    <div>
                      <label className="font-medium text-gray-700">Location:</label>
                      <p>{selectedIssue.address}</p>
                    </div>
                    <div>
                      <label className="font-medium text-gray-700">Category:</label>
                      <p className="capitalize">{selectedIssue.category}</p>
                    </div>
                  </div>

                  <div>
                    <label className="font-medium text-gray-700">Description:</label>
                    <p className="mt-1">{selectedIssue.description}</p>
                  </div>

                  {selectedIssue.assignedTo && (
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <label className="font-medium text-gray-700">Assigned To:</label>
                        <p>{selectedIssue.assignedTo}</p>
                      </div>
                      <div>
                        <label className="font-medium text-gray-700">Department:</label>
                        <p>{selectedIssue.department}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Location Map */}
              <Card>
                <CardHeader>
                  <h3 className="font-semibold">Location</h3>
                </CardHeader>
                <CardContent>
                  <div className="h-48 bg-gradient-to-br from-blue-100 to-green-100 rounded flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-12 w-12 text-[#2C6FF7] mx-auto mb-2" />
                      <p className="text-gray-600">Interactive Map View</p>
                      <p className="text-sm text-gray-500">{selectedIssue.address}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Actions Panel */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <h3 className="font-semibold">Actions</h3>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Select defaultValue={selectedIssue.status}>
                    <SelectTrigger>
                      <SelectValue placeholder="Update Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="assigned">Assigned</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select defaultValue={selectedIssue.department || ''}>
                    <SelectTrigger>
                      <SelectValue placeholder="Assign to Department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public-works">Public Works</SelectItem>
                      <SelectItem value="sanitation">Sanitation</SelectItem>
                      <SelectItem value="transportation">Transportation</SelectItem>
                      <SelectItem value="utilities">Utilities</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button className="w-full bg-[#2C6FF7] hover:bg-[#2356d4] text-white">
                    Update Issue
                  </Button>

                  <Button variant="outline" className="w-full">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Add Note
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <h3 className="font-semibold">Priority & Timeline</h3>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Select defaultValue={selectedIssue.priority}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low Priority</SelectItem>
                      <SelectItem value="medium">Medium Priority</SelectItem>
                      <SelectItem value="high">High Priority</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="text-sm text-gray-600">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-4 w-4" />
                      <span>Days since reported: 5</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      <span>Avg resolution: 3.2 days</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Manage civic issues and reports</p>
          </div>
          <Button onClick={onBackToCitizen} variant="outline">
            Citizen View
          </Button>
        </div>
      </div>

      <div className="p-6">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid grid-cols-3 w-full max-w-md">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="issues">Issues</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Issues</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.totalIssues}</p>
                    </div>
                    <AlertTriangle className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Pending</p>
                      <p className="text-2xl font-bold text-red-600">{stats.pendingIssues}</p>
                    </div>
                    <Clock className="h-8 w-8 text-red-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">In Progress</p>
                      <p className="text-2xl font-bold text-yellow-600">{stats.inProgressIssues}</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Resolved</p>
                      <p className="text-2xl font-bold text-green-600">{stats.resolvedIssues}</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Map Overview */}
            <Card className="shadow-sm">
              <CardHeader>
                <h3 className="font-semibold">City Overview Map</h3>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gradient-to-br from-blue-100 to-green-100 rounded flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-16 w-16 text-[#2C6FF7] mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">Interactive City Map</p>
                    <p className="text-sm text-gray-500">Clustered issue markers with filters</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="issues" className="space-y-6">
            {/* Filters */}
            <Card className="shadow-sm">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search issues, locations, or reporters..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="assigned">Assigned</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="streetlight">Streetlights</SelectItem>
                      <SelectItem value="pothole">Potholes</SelectItem>
                      <SelectItem value="garbage">Garbage</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Issues List */}
            <div className="space-y-3">
              {filteredIssues.map((issue) => {
                const CategoryIcon = categoryIcons[issue.category];
                return (
                  <Card 
                    key={issue.id} 
                    className="shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => setSelectedIssue(issue)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="bg-gray-100 rounded-full p-2 flex-shrink-0">
                          <CategoryIcon className="h-5 w-5 text-gray-600" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-gray-900 truncate">{issue.title}</h4>
                            <div className="flex gap-2 flex-shrink-0">
                              <Badge className={`${statusColors[issue.status]} text-white text-xs`}>
                                {issue.status.charAt(0).toUpperCase() + issue.status.slice(1)}
                              </Badge>
                              <Badge className={`${priorityColors[issue.priority]} text-white text-xs`}>
                                {issue.priority.charAt(0).toUpperCase() + issue.priority.slice(1)}
                              </Badge>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              <span className="truncate">{issue.address}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              <span>{issue.reporter}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              <span>{issue.date}</span>
                            </div>
                          </div>

                          {issue.assignedTo && (
                            <div className="mt-2 text-sm text-gray-600">
                              <span className="font-medium">Assigned to:</span> {issue.assignedTo} ({issue.department})
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            {/* Analytics Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Monthly Reports Chart */}
              <Card className="shadow-sm">
                <CardHeader>
                  <h3 className="font-semibold">Monthly Reports & Resolutions</h3>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={analyticsData.monthlyReports}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Bar dataKey="reports" fill="#2C6FF7" />
                        <Bar dataKey="resolved" fill="#28A745" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Category Distribution */}
              <Card className="shadow-sm">
                <CardHeader>
                  <h3 className="font-semibold">Issue Categories</h3>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={analyticsData.categoryData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          dataKey="value"
                        >
                          {analyticsData.categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {analyticsData.categoryData.map((item, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <div 
                          className="w-3 h-3 rounded"
                          style={{ backgroundColor: item.color }}
                        />
                        <span>{item.name}: {item.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Resolution Times */}
              <Card className="shadow-sm lg:col-span-2">
                <CardHeader>
                  <h3 className="font-semibold">Average Resolution Times by Category</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analyticsData.resolutionTimes.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="font-medium">{item.category}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-[#2C6FF7] h-2 rounded-full"
                              style={{ width: `${(item.avgDays / 10) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-600">{item.avgDays} days</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}