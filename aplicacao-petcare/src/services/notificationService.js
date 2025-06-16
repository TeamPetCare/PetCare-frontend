import api from './api';

const notificationService = {
  getSchedulesNaoVistas: async (id) => {
    try {
      const response = await api.get(`/notifications/user/${id}?page=0`);
      return response.data;
    } catch (error) {
      console.error('Erro ao listar notificações não vistas:', error);
      throw error;
    }
  },

  putAtualizarSchedules: async (ids) => {
    try {
      const response = await api.put('/notifications/saw', {
        params: { ids: ids.join(',') }
      }); // http://api.pet-care.software/api/notifications/saw?ids=2
      return response.data;
    } catch (error) {
      console.error('Erro ao listar notificações não vistas:', error);
      throw error;
    }
  },
};

export default especieService;