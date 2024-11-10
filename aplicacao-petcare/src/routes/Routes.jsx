import React from "react";
import { Route, Routes } from "react-router-dom";
import Inicio from "../pages/site-institucional/inicio/Inicio.jsx";
import SobreNos from "../pages/site-institucional/sobreNos/SobreNos.jsx";
import Suporte from "../pages/site-institucional/suporte/Suporte.jsx";
import AplicativoPetcare from "../pages/site-institucional/aplicativoPetCare/AplicativoPetCare.jsx";
import DonoPetshopInicio from "../pages/aplicacao-dono-petshop/inicio/Inicio.jsx";
import Login from "../pages/aplicacao-dono-petshop/login/Login.jsx";
import Layout from "../pages/aplicacao-dono-petshop/layout/Layout.jsx";
import NotFound from "../pages/shared/notFound/NotFound.jsx";
import MeusDados from "../pages/aplicacao-dono-petshop/meusDados/MeusDados.jsx";
import Agendamentos from "../pages/aplicacao-dono-petshop/agendamentos/Agendamentos.jsx";
import ClientesEPets from "../pages/aplicacao-dono-petshop/clientesEPets/ClientesEPets.jsx";
import Cadastros from "../pages/aplicacao-dono-petshop/cadastros/Cadastros.jsx";
import GerenciarFuncionarios from "../pages/aplicacao-dono-petshop/gerenciarFuncionarios/GerenciarFuncionarios.jsx";
import Pagamentos from "../pages/aplicacao-dono-petshop/pagamentos/Pagamentos.jsx";
import Planos from "../pages/aplicacao-dono-petshop/planos/Planos.jsx";
import SuporteDonoPetshop from "../pages/aplicacao-dono-petshop/suporte/Suporte.jsx";
import UserCreateTest from "../components/user-test/UserCreateTest";
import LoginDonoPet from "../pages/aplicacao-dono-pet/login/Login.jsx";
import SignUp from "../pages/aplicacao-dono-pet/signUp/SignUp.jsx";
import ProtectedRoute from "./ProtectedRoute"; // Importe o ProtectedRoute
import { SelectedDataProvider } from "../pages/aplicacao-dono-petshop/clientesEPets/SelectedDataContext.jsx";

// Função que verifica autenticação (exemplo usando localStorage)
const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

const AppRoutes = ({ section04Ref }) => {
  return (
    <Routes>
      {/* Rotas Gerais */}
      <Route path="*" element={<NotFound />} />

      {/* Rotas Site Institucional */}
      <Route path="/" element={<Inicio section04Ref={section04Ref} />} />
      <Route path="/sobreNos" element={<SobreNos />} />
      <Route path="/suporte" element={<Suporte />} />
      <Route path="/aplicativoPetcare" element={<AplicativoPetcare />} />

      {/* Rotas Aplicação Dono do Pet */}
      <Route path="/dono-pet/login" element={<LoginDonoPet />} />

      {/* Rotas Aplicação Dono do Petshop sem Layout */}
      <Route path="/dono-petshop/login" element={<Login />} />

      {/* Rotas Aplicação Dono do Petshop com Layout (Protegidas) */}
      <Route
        path="/dono-petshop/inicio"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated()}>
            <Layout>
              <DonoPetshopInicio />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/dono-petshop/agendamentos"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated()}>
            <Layout>
              <Agendamentos />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/dono-petshop/cadastros"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated()}>
            <Layout>
              <Cadastros />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/dono-petshop/clientes-pets"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated()}>
            <SelectedDataProvider>
              <Layout>
                <ClientesEPets />
              </Layout>
            </SelectedDataProvider>
          </ProtectedRoute>
        }
      />
      <Route
        path="/dono-petshop/gerenciar-funcionarios"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated()}>
            <Layout>
              <GerenciarFuncionarios />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/dono-petshop/pagamentos"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated()}>
            <Layout>
              <Pagamentos />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/dono-petshop/planos"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated()}>
            <Layout>
              <Planos />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/dono-petshop/suporte"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated()}>
            <Layout>
              <SuporteDonoPetshop />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/dono-petshop/meus-dados"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated()}>
            <Layout>
              <MeusDados />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* Rota para criar usuário */}
      <Route path="/create-user" element={<UserCreateTest />} />
    </Routes>
  );
};

export default AppRoutes;
