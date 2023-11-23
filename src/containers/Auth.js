import React, { useState, useEffect } from 'react';
import LoginForm from '../components/forms/LoginForm';
import SignUpForm from '../components/forms/SignUpForm';
import { useSelector, useDispatch } from 'react-redux';
import { sessionSlice, userSlice } from '../utils/slices';
import { useNavigate } from 'react-router-dom';
import { setNotification } from '../utils/slices';
import BrandContainer from '../sharedComponents/BrandContainer';

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(false);
  const dispatch = useDispatch();

  const handleAddUser = (userData) => {
    const payload = { email: userData.email, password: userData.password };
    dispatch(userSlice.addResources(payload)).then((action) => {
      if (action.type.endsWith('/fulfilled')) {
        dispatch(sessionSlice.actions.login());
      } else if (action.type.endsWith('/rejected')) {
        dispatch(setNotification({ message: action.payload, type: 'error' }));
      }
    });
  };

  const handleAddSession = (credentials) => {
    dispatch(sessionSlice.addResources({ email: credentials.email, password: credentials.password })).then((action) => {
      if (action.type.endsWith('/fulfilled')) {
        dispatch(sessionSlice.actions.login());
      } else if (action.type.endsWith('/rejected')) {
        dispatch(setNotification({ message: action.payload, type: 'error' }));
      }
    });
  };

  return (
    <div className="auth-page">
      <BrandContainer />
      <div className="auth-content">
        {isSignUp ? <SignUpForm handleSignUp={handleAddUser} /> : <LoginForm handleLogin={handleAddSession} />}
        <div className="auth-swap-link" onClick={() => setIsSignUp((prev) => !prev)}>
          {isSignUp ? (
            <>
              <p>Already have an account?</p>
              <p className="underline">Swap to login</p>
            </>
          ) : (
            <p className="underline">Create an account</p>
          )}
        </div>
      </div>
    </div>
  );
}
