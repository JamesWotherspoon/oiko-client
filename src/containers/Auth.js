import React, { useState, useEffect } from 'react';
import LoginForm from '../components/forms/LoginForm';
import SignUpForm from '../components/forms/SignUpForm';
import { useSelector, useDispatch } from 'react-redux';
import { sessionSlice, userSlice } from '../utils/slices';
import { useNavigate } from 'react-router-dom';
import { setNotification } from '../utils/slices';

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(false);
  const dispatch = useDispatch();

  const handleAddUser = (userData) => {
    const payload = { email: userData.email, password: userData.password };
    dispatch(userSlice.addResources(payload)).then((action) => {
      if (action.type.endsWith('/fulfilled')) {
        dispatch(sessionSlice.actions.login())
      } else if(action.type.endsWith('/rejected')){
        dispatch(setNotification({ message: action.payload, type: 'error' }));
      }
    });
  };

  const handleAddSession = (credentials) => {
    dispatch(sessionSlice.addResources({ email: credentials.email, password: credentials.password })).then((action) => {
      if (action.type.endsWith('/fulfilled')) {
        dispatch(sessionSlice.actions.login())
      } else if(action.type.endsWith('/rejected')){
        dispatch(setNotification({ message: action.payload, type: 'error' }));
      }
    });
  };

  return (
    <div className='auth-page'>
     <div className="brand-container">
        <div className="logo-container">
          <div className="bar bar-1" />
          <div className="bar bar-2" />
          <div className="bar bar-3" />
        </div>
        <h1 className="brand-name">
          <span>oi</span>
          <span className="accent-stop">ko.</span>
        </h1>
        <h3 className="brand-slogan">Make your money go futher</h3>
      </div>
      
      <div className="auth-content">
        {isSignUp ? <SignUpForm handleSignUp={handleAddUser} /> : <LoginForm handleLogin={handleAddSession} />}
        <div onClick={() => setIsSignUp((prev) => !prev)}>Swap to </div>
      </div>
    </div>
  );
}
