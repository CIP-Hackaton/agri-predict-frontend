import { useState, useEffect } from 'react';
import { Menu, Home, LineChart, Search } from 'lucide-react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import HomePage from './HomePage';
import PredictPage from './PredictPage';
import MyPredictionsPage from './MyPredictionsPage';
import SearchPage from './SearchPage';
import PredictionDetailPage from './PredictionDetailPage';
import ProfileModal from '../components/ProfileModal';
import TourGuide from '../components/TourGuide';
import ProtectedRoute from '../components/ProtectedRoute';
import { removeAuthToken } from '../api/auth';
import { fetchUserData } from '../api/user';
import { UserData } from '../types/user';
import { getAuthToken, validateUserToken } from '../api/user';


export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [showTourGuide, setShowTourGuide] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  const validateAuth = async () => {
    try {
      const token = getAuthToken();
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      const isValid = await validateUserToken();
      if (!isValid) {
        removeAuthToken();
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
      }
    } catch (error) {
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchData = async () => {
    const userData = await fetchUserData();

    setUserData({
      ...userData,
      avatarUrl: userData.avatarUrl || 'https://sigc.edu/sigc/ad-sigc/datas/images/user.png',
    });
  };

  useEffect(() => {
    validateAuth();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    removeAuthToken();
    window.location.href = '/';
  };

  const navigationItems = [
    { icon: Home, label: 'Home', path: '/dashboard' },
    { icon: LineChart, label: 'Predecir', path: '/dashboard/predict' },
    { icon: LineChart, label: 'Mis predicciones', path: '/dashboard/predictions' },
    { icon: Search, label: 'Averigua', path: '/dashboard/averigua' },
  ];

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
                    src={userData?.avatarUrl}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-sm font-medium hidden sm:inline">{userData?.name}</span>
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
                <ProtectedRoute isAuthenticated={isAuthenticated} isLoading={isLoading}>
                  <HomePage onStartTour={() => setShowTourGuide(true)} userName={userData?.name || ""} />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/predict" 
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated} isLoading={isLoading}>
                  <PredictPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/predictions" 
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated} isLoading={isLoading}>
                  <MyPredictionsPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/predictions/:id" 
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated} isLoading={isLoading}>
                  <PredictionDetailPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/averigua" 
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated} isLoading={isLoading}>
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
          user={userData}
        />

        <TourGuide 
          isOpen={showTourGuide} 
          onClose={() => setShowTourGuide(false)} 
        />
      </div>
    </div>
  );

}