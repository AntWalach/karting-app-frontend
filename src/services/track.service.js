import api from '../api/api';

export const getTracks = async () => {
  const response = await api.get('/tracks');
  return response.data;
};

export const getTrack = async (id) => {
  const response = await api.get(`/tracks/${id}`);
  return response.data;
};

export const createTrack = async (data) => {
  const response = await api.post('/tracks', { track: data });
  return response.data;
};

export const updateTrack = async (id, data) => {
  const response = await api.put(`/tracks/${id}`, { track: data });
  return response.data;
};

export const deleteTrack = async (id) => {
  await api.delete(`/tracks/${id}`);
};
