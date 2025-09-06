import React, { useState } from 'react';
import { WelcomeAuth } from './components/WelcomeAuth';
import { Dashboard } from './components/Dashboard';
import { ReportIssue } from './components/ReportIssue';
import { MyReports } from './components/MyReports';
import { Profile } from './components/Profile';
import { AdminDashboard } from './components/AdminDashboard';
import { BottomNavigation } from './components/BottomNavigation';
import { Button } from './components/ui/button';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isAdminView, setIsAdminView] = useState(false);

  const handleAuth = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage('dashboard');
    setIsAdminView(false);
  };

  const handleNavigation = (page: string) => {
    setCurrentPage(page);
  };

  const toggleAdminView = () => {
    setIsAdminView(!isAdminView);
  };

  // Show authentication screen if not logged in
  if (!isAuthenticated) {
    return <WelcomeAuth onAuthSuccess={handleAuth} />;
  }

  // Show admin dashboard if in admin view
  if (isAdminView) {
    return <AdminDashboard onBackToCitizen={() => setIsAdminView(false)} />;
  }

  // Render the appropriate page
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigation} />;
      case 'report':
        return <ReportIssue onNavigate={handleNavigation} />;
      case 'reports':
        return <MyReports onNavigate={handleNavigation} />;
      case 'profile':
        return <Profile onNavigate={handleNavigation} onLogout={handleLogout} />;
      default:
        return <Dashboard onNavigate={handleNavigation} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Toggle Button - Hidden in production, for demo purposes */}
      <div className="fixed top-4 right-4 z-50">
        <Button
          onClick={toggleAdminView}
          variant="outline"
          size="sm"
          className="bg-white shadow-lg"
        >
          Admin View
        </Button>
      </div>

      {/* Main Content */}
      <div className="pb-16">
        {renderCurrentPage()}
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation 
        activeTab={currentPage} 
        onNavigate={handleNavigation} 
      />
    </div>
  );
}