import { createContext, useContext, useEffect, useState } from 'react';
import * as authService from '../services/auth.service';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(authService.isAuthenticated());
  const [role, setRole] = useState(localStorage.getItem('role_mask')); // Zapis roli w stanie

  useEffect(() => {
    if (authenticated) {
      const storedRole = localStorage.getItem('role_mask');
      setRole(storedRole);
    }
  }, [authenticated]);

  const login = async (email, password) => {
    const response = await authService.login(email, password);
    setAuthenticated(true);
    setRole(localStorage.getItem('role_mask')); // Po zalogowaniu, ustawiamy rolę
    return response;
  };

  const register = async (userData) => {
    const response = await authService.register(userData);
    setAuthenticated(true);
    setRole(localStorage.getItem('role_mask')); // Po rejestracji, ustawiamy rolę
    return response;
  };

  const logout = async () => {
    await authService.logout();
    setAuthenticated(false);
    setRole(null); // Usuwamy rolę z stanu po wylogowaniu
  };

  return (
    <AuthContext.Provider value={{ authenticated, login, logout, register, role }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
