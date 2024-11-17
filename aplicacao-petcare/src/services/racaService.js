import api from './api';

const racaService = {
  getAllRaces: async () => {
    try {
      const response = await api.get('/races'); // Caminho relativo ao baseURL no api.js
      return response.data;
    } catch (error) {
      console.error('Erro ao listar raças:', error);
      throw error;
    }
  },
};

export default racaService;
