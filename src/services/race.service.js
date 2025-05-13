import api from '../api/api';

export const getRaces = async (trackId) => {
  const response = await api.get(`/tracks/${trackId}/races`);
  return response.data.races;
};

export const getRace = async (id) => {
  const response = await api.get(`/races/${id}`);
  return response.data;
};

export const createRace = async (trackId, data) => {
  const response = await api.post(`/tracks/${trackId}/races`, { race: data });
  return response.data;
};

export const updateRace = async (id, data) => {
  const response = await api.put(`/races/${id}`, { race: data });
  return response.data;
};

export const deleteRace = async (id) => {
  await api.delete(`/races/${id}`);
};
