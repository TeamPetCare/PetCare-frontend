import api from './api'; // Importa o Axios configurado no api.js

const sizeService = {
  getAllSizes: async () => {
    try {
      const response = await api.get('/api/sizes'); // Endpoint para buscar todos os tamanhos
      return response.data; // Retorna a lista de tamanhos
    } catch (error) {
      console.error('Erro ao buscar tamanhos:', error);
      console.log('Usando dados simulados para tamanhos.');
      return [
        { id: 1, name: 'Pequeno' },
        { id: 2, name: 'Médio' },
        { id: 3, name: 'Grande' },
      ]; // Retorna dados simulados
    }
  },
};



export default sizeService;
