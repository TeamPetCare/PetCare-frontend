import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ThreeDot } from "react-loading-indicators";

const showSideBarRoutes = [
  "/dono-petshop/inicio",
  "/dono-petshop/agendamentos",
  "/dono-petshop/cadastros",
  "/dono-petshop/clientes-pets",
  "/dono-petshop/gerenciar-funcionarios",
  "/dono-petshop/meus-dados",
  "/dono-petshop/pagamentos",
  "/dono-petshop/planos",
  "/dono-petshop/suporte",
];

const Autorizacao = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true); // Estado para controle de carregamento

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    const isProtectedRoute = showSideBarRoutes.includes(location.pathname);

    if (isProtectedRoute) {
      if (!token) {
        console.log(
          "Token não encontrado, redirecionando para a página inicial..."
        );
        navigate("/");
        setIsLoading(false); 
        return; 
      }

      try {
        const payloadBase64 = token.split(".")[1];
        const decodedPayload = JSON.parse(atob(payloadBase64));
        const isExpired = decodedPayload.exp * 1000 < Date.now();

        if (isExpired) {
          localStorage.removeItem("userToken");
          navigate("/");
          setIsLoading(false);
          return;
        }
      } catch (error) {
        console.error("Erro ao decodificar o token:", error);
        navigate("/");
        setIsLoading(false);
        return;
      }
    }

    setIsLoading(false);
  }, [location, navigate]);

  if (isLoading) {
    return (
      <ThreeDot
        variant="bounce"
        color="#005472"
        size="small"
        text=""
        textColor=""
      />
    );
  }

  return <>{children}</>;
};

export default Autorizacao;
