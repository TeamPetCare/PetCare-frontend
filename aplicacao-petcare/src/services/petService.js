import api from './api';  // Importa o Axios configurado no api.js

// Criar novo pet
export const createPet = async (petData) => {
  try {
    const response = await api.post('/api/pets', petData);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar pet:', error);
    throw error;
  }
};

// Atualizar pet existente
export const updatePet = async (id, petData) => {
  try {
    const response = await api.put(`/api/pets/${id}`, petData);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar pet:', error);
    throw error;
  }
};

// Obter pet por ID
export const getPetById = async (id) => {
  try {
    const response = await api.get(`/api/pets/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar pet por ID:', error);
    throw error;
  }
};

// Listar todos os pets
export const getAllPets = async () => {
  try {
    const response = await api.get('/api/pets');
    return response.data;
  } catch (error) {
    console.error('Erro ao listar pets:', error);
    throw error;
  }
};

// Deletar pet
export const deletePet = async (id) => {
  try {
    await api.delete(`/api/pets/${id}`);
  } catch (error) {
    console.error('Erro ao deletar pet:', error);
    throw error;
  }
};

export const getAllPetsAndPlans = async () => {
  try {
    const response = await api.get("pets/pets-list");
    return response.data;
  } catch (error) {
    console.error('Erro ao listar pets e planos:', error);
    throw error;
  }
}
