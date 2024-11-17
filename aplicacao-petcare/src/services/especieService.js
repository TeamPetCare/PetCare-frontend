import api from './api';

const especieService = {
  getAllEspecies: async () => {
    try {
      const response = await api.get('/species'); // Caminho relativo ao baseURL
      return response.data;
    } catch (error) {
      console.error('Erro ao listar espécies:', error);
      throw error;
    }
  },
};

export default especieService;