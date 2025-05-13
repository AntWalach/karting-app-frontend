import api from '../api/api';

export const getLaps = async (raceId) => {
  const response = await api.get(`/races/${raceId}/laps`);
  return response.data.laps;
};

export const getLap = async (id) => {
  const response = await api.get(`/laps/${id}`);
  return response.data;
};

export const createLap = async (raceId, data) => {
  const response = await api.post(`/races/${raceId}/laps`, { lap: data });
  return response.data;
};

export const updateLap = async (id, data) => {
  const response = await api.put(`/laps/${id}`, { lap: data });
  return response.data;
};

export const deleteLap = async (id) => {
  await api.delete(`/laps/${id}`);
};
