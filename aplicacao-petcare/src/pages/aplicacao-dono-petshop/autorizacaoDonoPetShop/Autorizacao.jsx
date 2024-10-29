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
    const token = sessionStorage.getItem("userToken");
    const isProtectedRoute = showSideBarRoutes.includes(location.pathname);

    console.log("Token:", token);
    console.log("Is Protected Route:", isProtectedRoute);

    if (isProtectedRoute) {
      if (!token) {
        console.log(
          "Token não encontrado, redirecionando para a página inicial..."
        );
        navigate("/"); // Redireciona para a página de login se não houver token
        setIsLoading(false); // Finaliza o carregamento
        return; // Garante que a lógica não continue após o redirecionamento
      }

      try {
        const payloadBase64 = token.split(".")[1];
        const decodedPayload = JSON.parse(atob(payloadBase64));
        const isExpired = decodedPayload.exp * 1000 < Date.now();

        console.log("Token Decoded:", decodedPayload);
        console.log("Is Token Expired:", isExpired);

        if (isExpired) {
          sessionStorage.removeItem("userToken");
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
