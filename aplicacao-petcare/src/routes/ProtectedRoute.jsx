import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import tokenService from '../services/tokenService';
import { ThreeDot } from "react-loading-indicators";
import { toast } from 'react-toastify';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  // // Serviço de validação do token
  // const tokenService = {
  //   verifyToken: async () => {
  //     try {
  //       const token = localStorage.getItem("userToken"); // Obtém o token do localStorage
  //       if (!token) return false; // Retorna false se o token não existir
        
  //       // Simulação de validação de token (substitua pela lógica real, se necessário)
  //       const isValid = token === "validToken"; // Exemplo de validação
  //       return isValid;
  //     } catch (error) {
  //       console.error("Erro ao verificar o token:", error);
  //       return false;
  //     }
  //   },
  // };

  useEffect(() => {
    const checkToken = async () => {
      const validToken = await tokenService.verifyToken();
      setIsAuthenticated(validToken);
    };

    checkToken();
  }, []);

  const toastNaoAutenticado = () =>{
    setTimeout(() => {
      toast.info("Erro autenticar usuário. Realize o login novamente.");
    }, 300);
  }

  if (isAuthenticated === null) {
    return (
      <div style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <ThreeDot
          variant="bounce"
          color="#005472"
          size="small"
          text=""
          textColor=""
        />
      </div>
    );
  }

  if (!isAuthenticated) {
    toastNaoAutenticado();
    return (
      <Navigate to="/dono-petshop/login" replace />
    ) // Redireciona se o token não for válido
  }

  return children; // Renderiza os filhos se o usuário estiver autenticado
};

export default ProtectedRoute;