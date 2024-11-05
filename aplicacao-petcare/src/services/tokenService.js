import axios from 'axios';

const API_URL = 'http://localhost:8080/validate-token';

const tokenService = {
  verifyToken: async () => {
    const token = sessionStorage.getItem("userToken");
    if (!token) return false;

    try {
      const response = await axios.get(`${API_URL}?token=${token}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const isValidToken = response.data ? true : false;
      console.log("Token vÃ¡lido:", isValidToken); 

      return isValidToken; 

    } catch (error) {
      console.error("Erro ao verificar o token:", error);
      return false; 
    }
  },
};

export default tokenService;