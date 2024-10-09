import { BrowserRouter as Router, useLocation } from "react-router-dom";
import MainHeader from "../components/site-institucional/shared/MainHeader/MainHeader.jsx";
import SideBar from "../components/aplicacao-dono-petshop/shared/sideBar/SideBar.jsx";
import UserWay from "../components/shared/useWay/UserWay.jsx";

export const HeaderWithConditional = ({ section04Ref }) => {
    const location = useLocation();
  
    // Define as rotas onde o MainHeader deve ser exibido
    const showHeaderRoutes = ["/", "/sobreNos", "/suporte", "/aplicativoPetcare"];
  
    const shouldShowHeader = showHeaderRoutes.includes(location.pathname);
  
    return shouldShowHeader ? (
      <>
      <MainHeader scrollToSection04={() => section04Ref.current?.scrollIntoView({ behavior: "smooth" })} />
      <UserWay />
      </>
    ) : null;
  };
  
export const SideBarWithConditional = ({ isOpen, toggleSideBar }) => {
    const location = useLocation();
  
    const showSideBarRoutes = ["/dono-petshop/inicio", "/dono-petshop/agendamentos", "/dono-petshop/cadastros", "/dono-petshop/clientes-pets/", "/dono-petshop/gerenciar-funcionarios", "/dono-petshop/meus-dados", "/dono-petshop/pagamentos", "/dono-petshop/planos", "/dono-petshop/suporte"];
  
    const shouldShowSideBar = showSideBarRoutes.includes(location.pathname);
  
    return shouldShowSideBar ? (
      <SideBar isOpen={isOpen} toggleSideBar={toggleSideBar} />
    ) : null;
  };