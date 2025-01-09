import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LandingPage from './pages/LandingPage';

import {validateUserToken} from './api/user';
import Dashboard from './pages/Dashboard';

export default function App() {

  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  const isLandingPage = location.pathname === '/';


  // Landing page
  if (isLandingPage) {
    return <LandingPage />;
  }

  // Auth pages
  if (isAuthPage) {

    (async () => {
      const isValid = await validateUserToken();
      if (isValid) {
      return <Navigate to="/dashboard" replace />;
      }
    })();

    return (
      <Routes>
        <Route path="/login" element={
              <LoginPage />
            }/>            
        <Route path="/register" element={
            <RegisterPage />
          } />
      </Routes>
    );
  }

  // Dashboard
  return <Dashboard />;

}