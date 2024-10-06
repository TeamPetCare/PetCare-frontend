import React from "react";
import { Route, Routes } from "react-router-dom";
import Inicio from "../pages/site-institucional/inicio/Inicio.jsx";
import SobreNos from "../pages/site-institucional/sobreNos/SobreNos.jsx";
import Suporte from "../pages/site-institucional/suporte/Suporte.jsx";
import AplicativoPetCare from "../pages/site-institucional/aplicativoPetCare/AplicativoPetCare.jsx";
import DonoPetshopInicio from "../pages/aplicacao-dono-petshop/inicio/inicio.jsx";
import Login from "../pages/aplicacao-dono-petshop/login/Login.jsx";

import NotFound from "../pages/shared/notFound/NotFound.jsx";

const AppRoutes = ({ section04Ref }) => {
  return (
    <Routes>
      {/* Rotas Gerais */}
      <Route path="*" element={<NotFound />} />

      {/* Rotas Site Institucional */}
      <Route path="/" element={<Inicio section04Ref={section04Ref} />} />
      <Route path="/sobreNos" element={<SobreNos />} />
      <Route path="/suporte" element={<Suporte />} />
      <Route path="/aplicativoPetCare" element={<AplicativoPetCare />} />

      {/* Rotas Aplicação Dono do Petshop */}
      <Route path="/donoPetshop/login" element={<Login />} />
      <Route path="/donoPetshop/inicio" element={<DonoPetshopInicio />} />
    </Routes>
  );
};
export default AppRoutes;
