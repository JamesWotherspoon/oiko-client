import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NotFoundPage from './containers/NotFoundPage';
import { ProtectedLayout } from './containers/ProtectedLayout';
import Auth from './containers/Auth';
import { useDispatch, useSelector } from 'react-redux';
import Dashboard from './containers/Dashboard';
import Transactions from './containers/Transactions';
import Categories from './containers/Categories';
import ScheduledActions from './containers/ScheduledActions';
import MoneyPots from './containers/MoneyPots';
import { sessionSlice } from './utils/slices';

const ProtectedRoute = ({ element }) => {
  const isAuthenticated = useSelector((state) => state.session.isAuthenticated);
  if (!isAuthenticated) return <Navigate to="/auth" />;
  return <ProtectedLayout>{element}</ProtectedLayout>;
};

const App = () => {
  const dispatch = useDispatch()
  const sessionStatus = useSelector((state) => state.session.status);
  const isAuthenticated = useSelector((state) => state.session.isAuthenticated);

  if (sessionStatus === 'idle') dispatch(sessionSlice.fetchItems());
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
