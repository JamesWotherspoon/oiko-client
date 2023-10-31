import React, { useState } from 'react';
import { postApiRequest } from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './authContext';
import Input from '../../sharedComponents/Input';
import Button from '@mui/material/Button';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [awaitingApiResponse, setAwaitingApiResponse] = useState(false);
  const [errorLoggingIn, setErrorLoggingIn] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    setAwaitingApiResponse(true);

    try {
      const response = await postApiRequest('/sessions', { email, password });

      if (response.status === 200) {
        login();
        navigate('/dashboard');
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
      <form>
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
          variant="contained"
          onClick={handleLogin}
          disabled={awaitingApiResponse}
        >
          {awaitingApiResponse ? 'Logging In...' : 'Login'}
        </Button>
      </form>
    </div>
  );
}
