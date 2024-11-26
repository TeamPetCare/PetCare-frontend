import api from './api';
import { jwtDecode } from "jwt-decode"; // Usando import para front-end


export const getUserIdFromToken = () => {
  const token = localStorage.getItem('userToken'); 
  if (token) {
    try {
      const decoded = jwtDecode(token); 
      return decoded.userId;  
    } catch (error) {
      console.error("Erro ao decodificar o token:", error);
      return null;
    }
  }
  return null; 
}

export const loginUser = async (loginData) => {
  try {
    const response = await api.post('/auth/login', loginData);
    if (response.data.token) {
      localStorage.setItem('userToken', response.data.token);
    }
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const getUserInfoById = async (id) => {
  try {
    const response = await api.get(`/users/info/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao listar informações do usuário pelo id:", error);
    throw error;
  }
}

export const getAllCustomerAndPets = async () => {
  try {
    const response = await api.get('/users/customers');
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const getUserById = async (id) => {
  try {
    const response = await api.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao exibir o usuário pelo id:", error);
    throw error;
  }
}

const userService = {
  createUser: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      throw error;
    }
  },

  deleteCustomers: async (selectedData) => {
    try {
      const response = await api.delete('/users/customers/delete', { data: selectedData });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getFileCsvCustomerAndPets: async () => {
    try {
      const response = await api.get(API_URL + "/reportCustumersAndPets", {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('userToken')}`
        },
        responseType: 'blob' // Define o tipo de resposta como blob
      });
  
      return response.data; // Retorna o blob do arquivo
    } catch (error) {
      throw error;
    }
  },
};

export default userService;
