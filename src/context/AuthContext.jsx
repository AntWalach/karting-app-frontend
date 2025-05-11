import { createContext, useContext, useEffect, useState } from 'react';
import * as authService from '../services/auth.service';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(authService.isAuthenticated());

  useEffect(() => {
    setAuthenticated(authService.isAuthenticated());
  }, []);

  const login = async (email, password) => {
    const response = await authService.login(email, password);
    setAuthenticated(true);
    return response;
  };

  const register = async (userData) => {
    const response = await authService.register(userData);
    setAuthenticated(true);
    return response;
  };

  const logout = async () => {
    await authService.logout();
    setAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ authenticated, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
