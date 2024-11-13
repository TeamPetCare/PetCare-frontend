import axios from 'axios';

const api = axios.create({
  baseURL: 'https://petcarebackend-fgfdcvh7frcyd7eu.centralus-01.azurewebsites.net',
});

// Interceptor para adicionar o token de autenticação em todas as requisições
// api.interceptors.request.use(
//   (config) => {
//     // const token = sessionStorage.getItem("token"); // Obter o token do sessionStorage
//     const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJsb2dpbi1hdXRoLWFwaSIsInN1YiI6ImNpcmlsb0BnbWFpbC5jb20iLCJleHAiOjE3MzAwNzI1OTV9.Awvfjd3OtJADFez6SdyUWKkh0kgL-a-cqhzOz_EvjE4";

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export default api;
