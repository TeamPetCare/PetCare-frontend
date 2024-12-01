import axios from 'axios';

const API_URL = 'https://petcarebackend-fgfdcvh7frcyd7eu.centralus-01.azurewebsites.net/validate-token';

const tokenService = {
  verifyToken: async () => {
  console.log("Passei por aqui");

    const token = localStorage.getItem("userToken");
    if (!token) return false;

    try {
      const response = await axios.get(`${API_URL}?token=${token}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const isValidToken = response.data ? true : false;
      console.log("Token válido:", isValidToken); 

      return isValidToken; 

    } catch (error) {
      console.error("Erro ao verificar o token:", error);
      return false; 
    }
  },
};

export default tokenService;