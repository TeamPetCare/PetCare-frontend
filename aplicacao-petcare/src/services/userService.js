import axios from 'axios';

const API_URL = 'http://localhost:8080/api/users';
const LOGIN_URL = 'http://localhost:8080/auth/login';
const REGISTER_URL = 'http://localhost:8080/auth/register';

const userService = {
  // Função para criar um novo usuário
  createUser: async (userData) => {
    try {
      const response = await axios.post(REGISTER_URL, userData);

      // Salva o token no sessionStorage
      if (response.data.token) {
        sessionStorage.setItem('userToken', response.data.token);
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Função para logar e armazenar o token
  loginUser: async (loginData) => {
    try {
      const response = await axios.post(LOGIN_URL, loginData);

      // Salva o token no sessionStorage
      if (response.data.token) {
        sessionStorage.setItem('userToken', response.data.token);
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default userService;