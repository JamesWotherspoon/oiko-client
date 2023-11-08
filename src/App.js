import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import NotFoundPage from './features/NotFoundPage';
import { useAuth } from './features/authentication/authContext';
import { AuthProvider } from './features/authentication/authContext';
import PageLayout from './features/layout/PageLayout';

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/auth" />;
  return <PageLayout>{element}</PageLayout>;
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<PageLayout />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
