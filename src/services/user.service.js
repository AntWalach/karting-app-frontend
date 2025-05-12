import api from '../api/api';

export const getUsers = async (page = 1, query = {}) => {
  try {
    const response = await api.get('/users', {
      params: {
        page,
        q: query
      }
    });
    return response.data.users;
  } catch (error) {
    throw error.response?.data || { error: 'Błąd pobierania użytkowników' };
  }
};