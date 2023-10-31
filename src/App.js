import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './features/authentication/AuthPage';
import Dashboard from './features/dashboard/Dashboard';
import NotFoundPage from './features/NotFoundPage';
import './styles/main.scss';
import { useAuth } from './features/authentication/authContext';
import { getApiRequest } from './utils/api';
import SideNav from './features/sideNav/SideNav';

// ProtectedRoute Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  console.log(isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  }
  return children;
};

const App = () => {
  const { login, logout } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await getApiRequest('/sessions');
        console.log(response);
        if (response.status === 200) {
          login();
        } else {
          logout();
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
      } finally {
        console.log(isLoading);
        setIsLoading(false);
      }
    };
    checkAuthentication();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <SideNav />
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;
