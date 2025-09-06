import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader } from './ui/card';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import { ArrowLeft, User, Mail, Phone, Bell, Shield, LogOut, Edit2, Save, X } from 'lucide-react';

interface ProfileProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export function Profile({ onNavigate, onLogout }: ProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567'
  });
  const [editData, setEditData] = useState(userData);
  const [notifications, setNotifications] = useState({
    push: true,
    email: true,
    sms: false,
    updates: true,
    resolved: true
  });

  const handleSaveProfile = () => {
    setUserData(editData);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditData(userData);
    setIsEditing(false);
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to log out?')) {
      onLogout();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate('dashboard')}
              className="mr-3 p-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Profile</h1>
              <p className="text-sm text-gray-600">Manage your account</p>
            </div>
          </div>
          
          {!isEditing && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="p-2"
            >
              <Edit2 className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Profile Information */}
        <Card className="shadow-sm border-0">
          <CardHeader className="pb-3">
            <h3 className="font-medium text-gray-900">Personal Information</h3>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Profile Picture */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-[#2C6FF7] rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-white" />
              </div>
              {isEditing && (
                <Button variant="outline" size="sm">
                  Change Photo
                </Button>
              )}
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <div className="relative mt-1">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="name"
                    value={isEditing ? editData.name : userData.name}
                    onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
                    disabled={!isEditing}
                    className={`pl-10 ${!isEditing ? 'bg-gray-50' : ''}`}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    value={isEditing ? editData.email : userData.email}
                    onChange={(e) => setEditData(prev => ({ ...prev, email: e.target.value }))}
                    disabled={!isEditing}
                    className={`pl-10 ${!isEditing ? 'bg-gray-50' : ''}`}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative mt-1">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="phone"
                    type="tel"
                    value={isEditing ? editData.phone : userData.phone}
                    onChange={(e) => setEditData(prev => ({ ...prev, phone: e.target.value }))}
                    disabled={!isEditing}
                    className={`pl-10 ${!isEditing ? 'bg-gray-50' : ''}`}
                  />
                </div>
              </div>
            </div>

            {/* Edit Actions */}
            {isEditing && (
              <div className="flex gap-2 pt-2">
                <Button
                  onClick={handleSaveProfile}
                  className="flex-1 bg-[#2C6FF7] hover:bg-[#2356d4] text-white"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
                <Button
                  onClick={handleCancelEdit}
                  variant="outline"
                  className="flex-1"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="shadow-sm border-0">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-gray-600" />
              <h3 className="font-medium text-gray-900">Notification Preferences</h3>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Push Notifications</p>
                <p className="text-sm text-gray-600">Get notified on your device</p>
              </div>
              <Switch
                checked={notifications.push}
                onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, push: checked }))}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Email Updates</p>
                <p className="text-sm text-gray-600">Receive updates via email</p>
              </div>
              <Switch
                checked={notifications.email}
                onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, email: checked }))}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">SMS Notifications</p>
                <p className="text-sm text-gray-600">Get text message alerts</p>
              </div>
              <Switch
                checked={notifications.sms}
                onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, sms: checked }))}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Status Updates</p>
                <p className="text-sm text-gray-600">When your reports are updated</p>
              </div>
              <Switch
                checked={notifications.updates}
                onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, updates: checked }))}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Resolution Alerts</p>
                <p className="text-sm text-gray-600">When issues are resolved</p>
              </div>
              <Switch
                checked={notifications.resolved}
                onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, resolved: checked }))}
              />
            </div>
          </CardContent>
        </Card>

        {/* Account Stats */}
        <Card className="shadow-sm border-0">
          <CardHeader className="pb-3">
            <h3 className="font-medium text-gray-900">Your Impact</h3>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-[#2C6FF7]">12</p>
                <p className="text-xs text-gray-600">Reports Submitted</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#28A745]">8</p>
                <p className="text-xs text-gray-600">Issues Resolved</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-700">67%</p>
                <p className="text-xs text-gray-600">Resolution Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Security */}
        <Card className="shadow-sm border-0">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-gray-600" />
              <h3 className="font-medium text-gray-900">Privacy & Security</h3>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" size="sm" className="w-full justify-start">
              <Shield className="h-4 w-4 mr-2" />
              Change Password
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start">
              Privacy Policy
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start">
              Terms of Service
            </Button>
          </CardContent>
        </Card>

        {/* Logout */}
        <Card className="shadow-sm border-0 border-red-200 bg-red-50">
          <CardContent className="p-4">
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="w-full justify-start text-red-600 hover:bg-red-100"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Spacer */}
      <div className="h-6" />
    </div>
  );
}