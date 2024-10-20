import React from "react";
import { Route, Routes } from "react-router-dom";
import Inicio from "../pages/site-institucional/inicio/Inicio.jsx";
import SobreNos from "../pages/site-institucional/sobreNos/SobreNos.jsx";
import Suporte from "../pages/site-institucional/suporte/Suporte.jsx";
import AplicativoPetcare from "../pages/site-institucional/aplicativoPetCare/AplicativoPetCare.jsx";
import DonoPetshopInicio from "../pages/aplicacao-dono-petshop/inicio/Inicio.jsx";
import Login from "../pages/aplicacao-dono-petshop/login/Login.jsx";
import NotFound from "../pages/shared/notFound/NotFound.jsx";
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

      {/* Rotas Aplicação Dono do Petshop */}
      <Route path="/donoPetshop/login" element={<Login />} />
      <Route path="/donoPetshop/inicio" element={<DonoPetshopInicio />} />

     {/* Rota para criar usuário */}
     <Route path="/create-user" element={<UserCreateTest />} />
       
      {/*Rotas Aplicação Dono do Pet */}
      <Route path="/donoPet/login" element={<LoginDonoPet />} />
      <Route path="/donoPet/cadastro" element={<SignUp />} />
    </Routes>
  );
};
export default AppRoutes;
