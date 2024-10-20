import api from './api';  // Importa o Axios configurado no api.js

// Criar nova espécie
export const createEspecie = async (especieData) => {
  try {
    const response = await api.post('/api/especies', especieData);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar espécie:', error);
    throw error;
  }
};

// Obter espécie por ID
export const getEspecieById = async (id) => {
  try {
    const response = await api.get(`/api/especies/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar espécie por ID:', error);
    throw error;
  }
};

// Listar todas as espécies
export const getAllEspecies = async () => {
  try {
    const response = await api.get('/api/especies');
    return response.data;
  } catch (error) {
    console.error('Erro ao listar espécies:', error);
    throw error;
  }
};

// Atualizar uma espécie
export const updateEspecie = async (id, especieData) => {
  try {
    const response = await api.put(`/api/especies/${id}`, especieData);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar espécie:', error);
    throw error;
  }
};

// Deletar uma espécie
export const deleteEspecie = async (id) => {
  try {
    await api.delete(`/api/especies/${id}`);
  } catch (error) {
    console.error('Erro ao deletar espécie:', error);
    throw error;
  }
};
