import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './features/authentication/AuthPage';
import Dashboard from './features/dashboard/Dashboard';
import MoneyPot from './features/moneyPot/MoneyPot';
import NotFoundPage from './features/NotFoundPage';
import { useAuth } from './features/authentication/authContext';
import LoggedInLayout from './features/layout/LoggedInLayout';
import { AuthProvider } from './features/authentication/authContext';
import { display } from '@mui/system';

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/auth" />;
  return <LoggedInLayout>{element}</LoggedInLayout>;
};

const NewApp = (children) => {

  return (
    <>
      <header css={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '80px',
        padding: '0 40px',
      }}>
        <div className="brand-container">
            <img alt="oiko logo" />
            <h1 css={{}}>oiko</h1>
        </div>
        <nav>
            <ul>
                <li><a href="#">overiew</a></li>
                <li><a href="#">accounts</a></li>
                <li><a href="#">categories</a></li>
            </ul>
            <div className='auth-container'>
                <a href="#">Log In</a>
                <a href="#">Create an account</a>
            </div>
        </nav>
      </header>

    </>
  );
};

export default NewApp;
