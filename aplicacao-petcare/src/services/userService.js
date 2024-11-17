import api from './api';

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
    console.error('Erro ao buscar usuário por ID:', error);
    throw error;
  }
};

export const loginUser = async (loginData) => {
  try {
    const response = await api.post('/auth/login', loginData);
    if (response.data.token) {
      sessionStorage.setItem('userToken', response.data.token);
      sessionStorage.setItem('userName', response.data.name);
    }
    return response.data;
  } catch (error) {
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
          'Authorization': `Bearer ${sessionStorage.getItem('userToken')}`
        },
        responseType: 'blob' // Define o tipo de resposta como blob
      });
  
      return response.data; // Retorna o blob do arquivo
    } catch (error) {
      throw error;
    }
  }
  

};

export default userService;
