import api from './api';

export const getAllSchedulesMonthly = async (mes ) => {
  try {
    const [year, month] = mes.split("-").map(Number);

    const primeiroDiaMes = new Date(year, month - 1, 1, 3, 0, 0);
    const mesFormatado = primeiroDiaMes.toISOString().slice(0, 19);

    const response = await api.get(`/schedules/monthly-schedules?month=${mesFormatado}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao listar agendamentos:", error);
    throw error;
  }
};

export const getAllSchedules = async ( ) => {
  try {

    const response = await api.get(`/schedules`);
    return response.data;
  } catch (error) {
    console.error("Erro ao listar agendamentos:", error);
    throw error;
  }
};

 export const updateSchedule = async (id, scheduleData) => {
    try {
      const response = await api.put(`/schedules/${id}`, scheduleData);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar o agendamento:', error);
      throw error;
    }
  }

  export const createSchedule = async (scheduleData) => {
    try {
      const response = await api.post('/schedules', scheduleData);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar agendamento:', error);
      throw error;
    }
  }

  export const deleteSchedule = async (id) => {
    try {
      const response = await api.delete(`/schedules/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao deletar agendamento:', error);
      throw error;
    }
  }

// const API_URL = 'http://localhost:8080/api/schedules'; 
// const scheduleService = {
//   createSchedule: async (scheduleData) => {
//     try {
//       const response = await axios.post(API_URL, scheduleData);
//       return response.data;
//     } catch (error) {
//       throw error;
//     }
//   },

//   getScheduleById: async (id) => {
//     try {
//       const response = await axios.get(`${API_URL}/${id}`);
//       return response.data;
//     } catch (error) {
//       throw error;
//     }
//   },

//   getAllSchedulesMonthly: async () => {
//     try {
//       const response = await axios.get(API_URL);
//       return response.data;
//     } catch (error) {
//       throw error;
//     }
//   },

//  


//   //Função para Excluir Agendamento
//   deleteSchedule: async (id) => {
//     try {
//       await axios.delete(`${API_URL}/${id}`);
//     } catch (error) {
//       throw error;
//     }
//   },

//   // Função para Obter Estatísticas de Agendamento, busca:  AGENDADO, CANCELADO, CONCLUIDO
//   getScheduleStats: async () => {
//     try {
//       const response = await axios.get(`${API_URL}/stats`);
//       return response.data;
//     } catch (error) {
//       throw error;
//     }
//   },

//   //Função para Filtrar Agendamentos, data, hora inicio, hora fim, servico
//   getSchedulesByDateAndTimeAndService: async (date, startTime, endTime, serviceId) => {
//     try {
//       const response = await axios.get(`${API_URL}/filter-agendamento`, {
//         params: { date, startTime, endTime, serviceId }
//       });
//       return response.data;
//     } catch (error) {
//       throw error;
//     }
//   },
  
// };


// export default scheduleService;
