import api from './api';  // Importa o Axios configurado no api.js

// Criar novo serviço
export const createServico = async (servicoData) => {
  try {
    const response = await api.post('/api/servicos', servicoData);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar serviço:', error);
    throw error;
  }
};

// Atualizar serviço existente
export const updateServico = async (id, servicoData) => {
  try {
    const response = await api.put(`/api/servicos/${id}`, servicoData);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar serviço:', error);
    throw error;
  }
};

// Deletar serviço
export const deleteServico = async (id) => {
  try {
    await api.delete(`/api/servicos/${id}`);
  } catch (error) {
    console.error('Erro ao deletar serviço:', error);
    throw error;
  }
};

// Listar todos os serviços
export const getAllServicos = async () => {
  try {
    const response = await api.get("/services");
    return response.data;
  } catch (error) {
    console.error('Erro ao listar serviços:', error);
    throw error;
  }
};