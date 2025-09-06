import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ArrowLeft, Camera, MapPin, Mic, Image, CheckCircle } from 'lucide-react';

interface ReportIssueProps {
  onNavigate: (page: string) => void;
}

export function ReportIssue({ onNavigate }: ReportIssueProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    category: '',
    description: '',
    location: '',
    photo: null as File | null
  });
  const [isRecording, setIsRecording] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, photo: file }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    
    // Simulate submission delay
    setTimeout(() => {
      onNavigate('dashboard');
    }, 2000);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Mock voice recording functionality
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false);
        setFormData(prev => ({ 
          ...prev, 
          description: prev.description + (prev.description ? ' ' : '') + '[Voice note: Broken streetlight near bus stop]'
        }));
      }, 3000);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-lg border-0">
          <CardContent className="text-center py-8">
            <div className="w-16 h-16 bg-[#28A745] rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Report Submitted!</h2>
            <p className="text-gray-600 mb-4">
              Thank you for helping improve your community. You'll receive updates on the progress.
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Report ID: #CR2024-{Math.floor(Math.random() * 1000).toString().padStart(3, '0')}
            </p>
            <Button
              onClick={() => onNavigate('dashboard')}
              className="bg-[#2C6FF7] hover:bg-[#2356d4] text-white"
            >
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
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
            <h1 className="text-xl font-semibold text-gray-900">Report Issue</h1>
            <p className="text-sm text-gray-600">Help improve your community</p>
          </div>
        </div>
      </div>

      <div className="p-4">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Photo Upload */}
          <Card className="shadow-sm border-0">
            <CardHeader className="pb-3">
              <h3 className="font-medium text-gray-900">Add Photo</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                  <div className="bg-[#2C6FF7] text-white rounded-lg p-4 text-center hover:bg-[#2356d4] transition-colors">
                    <Camera className="h-6 w-6 mx-auto mb-2" />
                    <span className="text-sm font-medium">Take Photo</span>
                  </div>
                </label>
                
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                  <div className="bg-gray-100 text-gray-700 rounded-lg p-4 text-center hover:bg-gray-200 transition-colors">
                    <Image className="h-6 w-6 mx-auto mb-2" />
                    <span className="text-sm font-medium">Gallery</span>
                  </div>
                </label>
              </div>
              
              {formData.photo && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                  <p className="text-sm text-green-700">Photo added: {formData.photo.name}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Location */}
          <Card className="shadow-sm border-0">
            <CardHeader className="pb-3">
              <h3 className="font-medium text-gray-900">Location</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full justify-start text-left"
                  onClick={() => {
                    // Mock GPS location
                    setFormData(prev => ({ ...prev, location: '123 Main Street, City, State 12345' }));
                  }}
                >
                  <MapPin className="h-4 w-4 mr-2 text-[#2C6FF7]" />
                  {formData.location || 'Use Current Location'}
                </Button>
                
                {formData.location && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="h-24 bg-gradient-to-br from-blue-100 to-green-100 rounded flex items-center justify-center">
                      <div className="text-center">
                        <MapPin className="h-6 w-6 text-[#2C6FF7] mx-auto mb-1" />
                        <p className="text-xs text-gray-600">Location Preview</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Category */}
          <Card className="shadow-sm border-0">
            <CardHeader className="pb-3">
              <h3 className="font-medium text-gray-900">Issue Category</h3>
            </CardHeader>
            <CardContent>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="streetlight">Streetlight Issue</SelectItem>
                  <SelectItem value="pothole">Pothole</SelectItem>
                  <SelectItem value="garbage">Garbage/Waste</SelectItem>
                  <SelectItem value="graffiti">Graffiti</SelectItem>
                  <SelectItem value="sidewalk">Sidewalk Issue</SelectItem>
                  <SelectItem value="traffic">Traffic Signal</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Description */}
          <Card className="shadow-sm border-0">
            <CardHeader className="pb-3">
              <h3 className="font-medium text-gray-900">Description</h3>
            </CardHeader>
            <CardContent className="space-y-3">
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe the issue in detail..."
                rows={4}
                className="resize-none"
              />
              
              <div className="flex items-center justify-center">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={toggleRecording}
                  className={`${
                    isRecording 
                      ? 'bg-red-50 border-red-300 text-red-700' 
                      : 'text-gray-700 border-gray-300'
                  }`}
                >
                  <Mic className={`h-4 w-4 mr-2 ${isRecording ? 'animate-pulse' : ''}`} />
                  {isRecording ? 'Recording...' : 'Add Voice Note'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="pt-4">
            <Button
              type="submit"
              className="w-full bg-[#2C6FF7] hover:bg-[#2356d4] text-white py-3"
              disabled={!formData.category || !formData.description || !formData.location}
            >
              Submit Report
            </Button>
          </div>
        </form>
      </div>

      {/* Bottom Spacer */}
      <div className="h-6" />
    </div>
  );
}