import api from './api';

export const updatePayment = async (id, paymentData) => {
    try {
      console.log(`Atualizando pagamento: ${id}`, paymentData);
      const response = await api.put(`/payments/${id}`, paymentData);
      console.log('Resposta do servidor:', response.data);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar o pagamento:', error.response?.data || error.message);
      throw error;
    }
  };
  