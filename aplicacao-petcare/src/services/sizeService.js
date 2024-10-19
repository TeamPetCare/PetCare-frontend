import api from './api';  // Importa o Axios configurado no api.js

// Criar novo tamanho
export const createSize = async (sizeData) => {
  try {
    const response = await api.post('/api/sizes', sizeData);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar tamanho:', error);
    throw error;
  }
};

// Atualizar tamanho existente
export const updateSize = async (id, sizeData) => {
  try {
    const response = await api.put(`/api/sizes/${id}`, sizeData);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar tamanho:', error);
    throw error;
  }
};

// Obter tamanho por ID
export const getSizeById = async (id) => {
  try {
    const response = await api.get(`/api/sizes/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar tamanho por ID:', error);
    throw error;
  }
};

// Listar todos os tamanhos
export const getAllSizes = async () => {
  try {
    const response = await api.get('/api/sizes');
    return response.data;
  } catch (error) {
    console.error('Erro ao listar tamanhos:', error);
    throw error;
  }
};

// Deletar tamanho
export const deleteSize = async (id) => {
  try {
    await api.delete(`/api/sizes/${id}`);
  } catch (error) {
    console.error('Erro ao deletar tamanho:', error);
    throw error;
  }
};
