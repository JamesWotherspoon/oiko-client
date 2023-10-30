import React, { useState } from 'react';
import { postApiRequest } from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './authContext';
import Input from '../../sharedComponents/Input';
import Button from '../../sharedComponents/Button';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [awaitingApiResponse, setAwaitingApiResponse] = useState(false);
  const [errorLoggingIn, setErrorLoggingIn] = useState(false);
  const navigate = useNavigate();
  const { login, logout } = useAuth();

  const handleRegistration = async (e) => {
    e.preventDefault();
    setAwaitingApiResponse(true);

    try {
      const response = await postApiRequest('/users', { email, password });

      if (response.status === 201) {
        // Registration successful, you can handle it as needed
        login();
        navigate('/home');
      }
    } catch (error) {
      setErrorLoggingIn(true);
      console.error(error);
    } finally {
      setAwaitingApiResponse(false);
    }
  };

  return (
    <div>
      {awaitingApiResponse ? <div>Processing request</div> : null}
      {errorLoggingIn ? <div>Error</div> : null}

      {/* Registration form */}
      <form onSubmit={handleRegistration}>
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={awaitingApiResponse}
        />
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={awaitingApiResponse}
        />
        <Button 
          text={awaitingApiResponse ? 'Registering...' : 'Register'}
          onClick={handleRegistration}
          disabled={awaitingApiResponse}
        />
      </form>
    </div>
  );
}
