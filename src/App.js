import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NotFoundPage from './containers/NotFoundPage';
import PageLayout from './containers/PageLayout';
import Auth from './containers/Auth';
import { useSelector } from 'react-redux';
import { useFetchData } from './utils/helpers';
import Dashboard from './containers/Dashboard';
import Transactions from './containers/Transactions';
import Categories from './containers/Categories';
import ScheduledActions from './containers/ScheduledActions';
import MoneyPots from './containers/MoneyPots';

const ProtectedRoute = ({ element }) => {
  const isAuthenticated = useSelector((state) => state.session.isAuthenticated);
  if (!isAuthenticated) return <Navigate to="/auth" />;
  return <PageLayout>{element}</PageLayout>;
};

const App = () => {
  useFetchData();
  const sessionStatus = useSelector((state) => state.session.status);
  const isAuthenticated = useSelector((state) => state.session.isAuthenticated);

  if (sessionStatus === 'idle' || sessionStatus === 'loading') return <div>Loading...</div>;

  return (
    <Routes>
      <Route path="/auth" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Auth />} />
      <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
      <Route path="/transactions" element={<ProtectedRoute element={<Transactions />} />} />
      <Route path="/categories" element={<ProtectedRoute element={<Categories />} />} />
      <Route path="/accounts" element={<ProtectedRoute element={<MoneyPots />} />} />
      <Route path="/scheduled-actions" element={<ProtectedRoute element={<ScheduledActions />} />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
