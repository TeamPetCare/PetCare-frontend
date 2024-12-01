import api from './api';  // Importa o Axios configurado no api.js

export const getAllPayments = async () => {
  try {
    const response = await api.get('/payments');
    return response.data;
  } catch (error) {
    console.error('Erro ao listar pagamentos:', error);
    throw error;
  }
};

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
  
