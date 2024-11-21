import api from './api'; // Importa o Axios configurado no api.js

const sizeService = {
  getAllSizes: async () => {
    try {
      const response = await api.get('/sizes'); // Tenta buscar os dados do backend
      console.log('Tamanhos carregados:', response.data);
      return response.data; // Retorna os dados reais
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
