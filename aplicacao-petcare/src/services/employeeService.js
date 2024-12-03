import api from './api';

export const getAllEmployees = async () => {
    try {
      const response = await api.get('users/employees');
      return response.data;
    } catch (error) {
      console.error('Erro ao listar os funcionários:', error);
      throw error;
    }
  }