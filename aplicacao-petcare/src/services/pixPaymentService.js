import api from './api'; // Importa o Axios configurado no api.js

// Criar pagamento PIX
// Criar novo pet sem imagem
const createPixPayment = async (userId, paymentData) => {
  const response = await api.post(`/payments/pix/${userId}`, paymentData);
  return response.data;
};

// Obter detalhes de um pagamento por ID
const getPaymentById = async (paymentId) => {
  try {
    const response = await api.get(`/payments/${paymentId}`);
    console.log('Resposta da API (detalhes do pagamento):', response.data); // Log da resposta
    return response.data;
  } catch (error) {
    console.error('Erro ao obter pagamento por ID:', error.response || error.message); // Log detalhado do erro
    throw error;
  }
};

// Exportação das funções
const pixPaymentService = {
  createPixPayment,
  getPaymentById,
};

export default pixPaymentService;