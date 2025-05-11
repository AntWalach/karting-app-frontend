import api from '../api/api';

export const register = async (userData) => {
  try {
    const response = await api.post('/registrations', { user: userData });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Błąd rejestracji' };
  }
};

export const login = async (email, password) => {
  try {
    const response = await api.post('/login', { email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Błąd logowania' };
  }
};

export const logout = async () => {
  try {
    await api.delete('/logout');
    localStorage.removeItem('token');
    return { success: true };
  } catch (error) {
    throw error.response?.data || { error: 'Błąd wylogowania' };
  }
};

export const isAuthenticated = () => {
  return localStorage.getItem('token') !== null;
};