import api from './api'; // Importa o Axios configurado no api.js

const plansService = {
  // Buscar todos os planos
  getAllPlans: async () => {
    try {
      const response = await api.get('/api/plans');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar planos:', error);
      throw error;
    }
  },

  // Buscar um plano por ID
  getPlanById: async (id) => {
    try {
      const response = await api.get(`/api/plans/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar plano com ID ${id}:`, error);
      throw error;
    }
  },

  // Criar um novo plano
  createPlan: async (planData) => {
    try {
      const response = await api.post('/api/plans', planData);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar plano:', error);
      throw error;
    }
  },

  // Atualizar um plano existente
  updatePlan: async (id, planData) => {
    try {
      const response = await api.put(`/api/plans/${id}`, planData);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar plano com ID ${id}:`, error);
      throw error;
    }
  },

  // Deletar um plano por ID
  deletePlan: async (id) => {
    try {
      await api.delete(`/api/plans/${id}`);
    } catch (error) {
      console.error(`Erro ao deletar plano com ID ${id}:`, error);
      throw error;
    }
  },

  // Aplicar desconto em um plano por ID
  applyDiscount: async (id) => {
    try {
      const response = await api.get(`/api/plans/apply-discount/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao aplicar desconto no plano com ID ${id}:`, error);
      throw error;
    }
  },
};

export default plansService;
