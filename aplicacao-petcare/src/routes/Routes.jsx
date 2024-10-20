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
import UserCreateTest from '../components/user-test/UserCreateTest'; // Ajuste o caminho conforme necessário
import LoginDonoPet from "../pages/aplicacao-dono-pet/login/Login.jsx";
import SignUp from "../pages/aplicacao-dono-pet/signUp/SignUp.jsx"

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

      {/* Rotas Aplicação Dono do Petshop sem Layout */}
      <Route path="/dono-petshop/login" element={<Login />} />

      {/* Rotas Aplicação Dono do Petshop com Layout */}
      <Route
        path="/dono-petshop/inicio"
        element={<Layout><DonoPetshopInicio /></Layout>}
      />
      <Route
        path="/dono-petshop/agendamentos"
        element={<Layout><Agendamentos /></Layout>}
      />
      <Route
        path="/dono-petshop/cadastros"
        element={<Layout><Cadastros /></Layout>}
      />
      <Route
        path="/dono-petshop/clientes-pets"
        element={<Layout><ClientesEPets /></Layout>}
      />
      <Route
        path="/dono-petshop/gerenciar-funcionarios"
        element={<Layout><GerenciarFuncionarios /></Layout>}
      />
      <Route
        path="/dono-petshop/pagamentos"
        element={<Layout><Pagamentos /></Layout>}
      />
      <Route
        path="/dono-petshop/planos"
        element={<Layout><Planos /></Layout>}
      />
      <Route
        path="/dono-petshop/suporte"
        element={<Layout><SuporteDonoPetshop /></Layout>}
      />
      <Route
        path="/dono-petshop/meus-dados"
        element={<Layout><MeusDados /></Layout>}
      />

     {/* Rota para criar usuário */}
     <Route path="/create-user" element={<UserCreateTest />} />
    </Routes>
  );
};

export default AppRoutes;
