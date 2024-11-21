// petService.js
import api from './api'; // Importa o Axios configurado no api.js

// Criar novo pet sem imagem
export const createPet = async (petData) => {
  try {
    const response = await api.post('/pets', petData);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar pet:', error);
    throw error;
  }
};

// Criar novo pet com imagem
export const createPetWithImage = async (formData) => {
  try {
    const response = await api.post('/pets', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao criar pet com imagem:', error);
    throw error;
  }
};

// Atualizar pet existente
export const updatePet = async (id, petData) => {
  try {
    const response = await api.put(`/pets/pets-list/${id}`, petData);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar pet:', error);
    throw error;
  }
};

// Obter pet por ID
export const getPetById = async (id) => {
  try {
    const response = await api.get(`/pets/${id}`);
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

// Deletar múltiplos pets
export const deletePetList = async (selectedData) => {
  try {
    const response = await api.delete("/pets/pets-list", {
      data: selectedData, // O corpo da requisição DELETE é enviado aqui
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Exportação default contendo todas as funções
const petService = {
  createPet,
  createPetWithImage,
  updatePet,
  getPetById,
  getAllPets,
  deletePet,
  deletePetList,
};

export default petService;
