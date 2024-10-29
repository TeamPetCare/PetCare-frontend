import api from './api';  // Importa o Axios configurado no api.js

// Criar nova raça
export const createRace = async (raceData) => {
  try {
    const response = await api.post('/api/races', raceData);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar raça:', error);
    throw error;
  }
};

// Atualizar raça existente
export const updateRace = async (id, raceData) => {
  try {
    const response = await api.put(`/api/races/${id}`, raceData);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar raça:', error);
    throw error;
  }
};

// Obter raça por ID
export const getRaceById = async (id) => {
  try {
    const response = await api.get(`/api/races/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar raça por ID:', error);
    throw error;
  }
};

// Listar todas as raças
export const getAllRaces = async () => {
  try {
    const response = await api.get('/api/races');
    return response.data;
  } catch (error) {
    console.error('Erro ao listar raças:', error);
    throw error;
  }
};

// Deletar raça
export const deleteRace = async (id) => {
  try {
    await api.delete(`/api/races/${id}`);
  } catch (error) {
    console.error('Erro ao deletar raça:', error);
    throw error;
  }
};
