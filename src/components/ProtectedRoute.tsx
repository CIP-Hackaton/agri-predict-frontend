import React from 'react';
import Cookies from 'js-cookie';
import { Navigate, useLocation } from 'react-router-dom';
import { getAuthToken } from '../api/auth';
import { validateUserToken } from '../api/user';


interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const location = useLocation();
  const token = getAuthToken();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const isValid = validateUserToken();

  if (!isValid) {
    Cookies.remove('access_token');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}