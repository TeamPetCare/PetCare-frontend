import axios from 'axios';

const API_URL = 'http://localhost:8080/api/schedules'; 
const scheduleService = {
  createSchedule: async (scheduleData) => {
    try {
      const response = await axios.post(API_URL, scheduleData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getScheduleById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getAllSchedules: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  

  //Função para Atualizar Agendamento
  updateSchedule: async (id, scheduleData) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, scheduleData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },


  //Função para Excluir Agendamento
  deleteSchedule: async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
      throw error;
    }
  },

  // Função para Obter Estatísticas de Agendamento, busca:  AGENDADO, CANCELADO, CONCLUIDO
  getScheduleStats: async () => {
    try {
      const response = await axios.get(`${API_URL}/stats`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  //Função para Filtrar Agendamentos, data, hora inicio, hora fim, servico
  getSchedulesByDateAndTimeAndService: async (date, startTime, endTime, serviceId) => {
    try {
      const response = await axios.get(`${API_URL}/filter-agendamento`, {
        params: { date, startTime, endTime, serviceId }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
};


export default scheduleService;
