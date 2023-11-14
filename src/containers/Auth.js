import React, { useState, useEffect } from 'react';
import LoginForm from '../components/forms/LoginForm';
import SignUpForm from '../components/forms/SignUpForm';
import { useSelector, useDispatch } from 'react-redux';
import { sessionSlice, userSlice } from '../utils/slices';
import { login } from '../utils/actionsReducers';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleAddUser = (userData) => {
    const payload = { email: userData.email, password: userData.password };
    dispatch(userSlice.addItems(payload)).then((action) => {
      if (action.type.endsWith('/fulfilled')) {
        dispatch(login());
        navigate('/dashboard');
      }
    });
  };

  const handleAddSession = (credentials) => {
    dispatch(sessionSlice.addItems({ email: credentials.email, password: credentials.password })).then((action) => {
      if (action.type.endsWith('/fulfilled')) {
        dispatch(login());
        navigate('/dashboard');
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
