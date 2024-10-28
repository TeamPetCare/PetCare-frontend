import axios from 'axios';

const LOGIN_URL = "http://localhost:8080/auth/login"

const userService = {
  createUser: async (userData) => {
    try {
      const response = await axios.post('http://localhost:8080/auth/register', userData);
      return response.data; // Aqui você pode lidar com a resposta recebida
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      throw error; // Propagar o erro se necessário
    }
  },
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

// Exemplo de uso
const userData = {
  name: "Cirilo",
  userImg: "cirilo_image.png",
  email: "cirilo@gmail.com",
  password: "cirilo123",
  cellphone: "98765432100",
  role: "ROLE_CUSTOMER",
  street: "Rua dos Lírios",
  number: 456,
  complement: "Casa 2",
  cep: "54321-098",
  district: "Vila Nova",
  city: "São Paulo",
  cnpjOwner: null,
  roleEmployee: null,
  disponibilityStatus: false,
  cpfClient: "98765432100",
  petIds: []
};

// Chame a função de criação de usuário
userService.createUser(userData)
  .then(data => {
    console.log("Usuário criado com sucesso:", data);
  })
  .catch(err => {
    console.error("Erro ao processar registro:", err);
  });


export default userService;

