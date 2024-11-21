import api from './api'; // Importa o Axios configurado no api.js

const sizeService = {
  // Obter todos os tamanhos
  getAllSizes: async () => {
    try {
      const response = await api.get('/sizes'); // Endpoint para buscar todos os tamanhos
      return response.data; // Retorna a lista de tamanhos
    } catch (error) {
      console.error('Erro ao buscar tamanhos:', error);
      throw error; // Propaga o erro para ser tratado no componente
    }
  },
};

export default sizeService;
