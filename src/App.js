import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './features/authentication/AuthPage';
import Dashboard from './features/dashboard/Dashboard';
import NotFoundPage from './features/NotFoundPage';
import './styles/main.scss';
import { useAuth } from './features/authentication/authContext';
import SideNav from './features/sideNav/SideNav';

// ProtectedRoute Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/auth" />;
  return children;
};

const App = () => {

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
