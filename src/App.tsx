import React, { useState } from 'react';
import { Menu, Home, LineChart, Search } from 'lucide-react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import PredictPage from './pages/PredictPage';
import MyPredictionsPage from './pages/MyPredictionsPage';
import SearchPage from './pages/SearchPage';
import PredictionDetailPage from './pages/PredictionDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LandingPage from './pages/LandingPage';
import ProfileModal from './components/ProfileModal';
import TourGuide from './components/TourGuide';
import ProtectedRoute from './components/ProtectedRoute';
import { removeAuthToken } from './api/auth';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [showTourGuide, setShowTourGuide] = useState(false);
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  const isLandingPage = location.pathname === '/';

  const navigationItems = [
    { icon: Home, label: 'Home', path: '/dashboard' },
    { icon: LineChart, label: 'Predecir', path: '/dashboard/predict' },
    { icon: LineChart, label: 'Mis predicciones', path: '/dashboard/predictions' },
    { icon: Search, label: 'Averigua', path: '/dashboard/averigua' },
  ];

  const handleLogout = () => {
    removeAuthToken();
    window.location.href = '/';
  };

  if (isLandingPage) {
    return <LandingPage />;
  }

  if (isAuthPage) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <div data-tour="sidebar">
        <Sidebar 
          isOpen={sidebarOpen} 
          navigationItems={navigationItems}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
        />
      </div>
      
      <div className="flex-1 flex flex-col w-full">
        <header className="bg-white h-16 flex items-center justify-between px-6 shadow-sm">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-semibold text-gray-800 truncate">
              {location.pathname === '/dashboard' ? 'Dashboard' : 
               location.pathname === '/dashboard/predict' ? 'Predecir' :
               location.pathname === '/dashboard/predictions' ? 'Mis predicciones' :
               location.pathname === '/dashboard/averigua' ? 'Averigua' : ''}
            </h1>
          </div>
          
          <div className="flex items-center">
            <div data-tour="profile">
              <button 
                onClick={() => setIsProfileModalOpen(true)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100"
              >
                <div className="flex items-center gap-2">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=32&h=32&q=80"
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-sm font-medium hidden sm:inline">Sergio</span>
                </div>
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <HomePage onStartTour={() => setShowTourGuide(true)} />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/predict" 
              element={
                <ProtectedRoute>
                  <PredictPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/predictions" 
              element={
                <ProtectedRoute>
                  <MyPredictionsPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/predictions/:id" 
              element={
                <ProtectedRoute>
                  <PredictionDetailPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/averigua" 
              element={
                <ProtectedRoute>
                  <SearchPage />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>

        <ProfileModal
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
          onLogout={handleLogout}
        />

        <TourGuide 
          isOpen={showTourGuide} 
          onClose={() => setShowTourGuide(false)} 
        />
      </div>
    </div>
  );
}