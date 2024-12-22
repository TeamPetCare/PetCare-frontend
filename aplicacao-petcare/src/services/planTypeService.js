import api from './api'; // Importa a configuração do Axios

const planTypeService = {
  // Buscar todos os tipos de plano
  getAllPlanTypes: async () => {
    try {
      const response = await api.get('/plan-types');
      return response.data; // Retorna os dados dos tipos de plano
    } catch (error) {
      console.error('Erro ao buscar tipos de planos:', error);
      throw error;
    }
  },

  // Buscar tipo de plano por ID
  getPlanTypeById: async (id) => {
    try {
      const response = await api.get(`/plan-types/${id}`);
      return response.data; // Retorna o tipo de plano correspondente ao ID
    } catch (error) {
      console.error(`Erro ao buscar tipo de plano com ID ${id}:`, error);
      throw error;
    }
  },

  // Criar um novo tipo de plano
  createPlanType: async (planTypeData) => {
    try {
      const response = await api.post('/plan-types', planTypeData);
      return response.data; // Retorna os dados do tipo de plano criado
    } catch (error) {
      console.error('Erro ao criar tipo de plano:', error);
      throw error;
    }
  },

  // Atualizar um tipo de plano existente
  updatePlanType: async (id, planTypeData) => {
    try {
      const response = await api.put(`/plan-types/${id}`, planTypeData);
      return response.data; // Retorna os dados atualizados do tipo de plano
    } catch (error) {
      console.error(`Erro ao atualizar tipo de plano com ID ${id}:`, error);
      throw error;
    }
  },

  // Deletar um tipo de plano por ID
  deletePlanType: async (id) => {
    try {
      await api.delete(`/plan-types/${id}`);
    } catch (error) {
      console.error(`Erro ao deletar tipo de plano com ID ${id}:`, error);
      throw error;
    }
  },
};

export default planTypeService;