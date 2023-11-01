import { createContext, useContext, useState, useEffect } from 'react';
import { getApiRequest, deleteApiRequest } from '../../utils/api';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getApiRequest('/sessions')
      .then((response) => {
        if (response.status === 200) isAuthenticated(true);
        if (response.status === 404) isAuthenticated(false);
        if (response.status === 500) console.log('Server Error');
      })
      .catch(() => {
        console.log('Server Error');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = async () => {
    const response = await deleteApiRequest('/sessions');
    if (response.status !== 200) console.log('Failed to logout');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {isLoading ? <h1>Loading ...</h1> : children}
    </AuthContext.Provider>
  );
};
