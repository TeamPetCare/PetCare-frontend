import { BrowserRouter as Router, useLocation } from "react-router-dom";
import MainHeader from "../components/site-institucional/shared/MainHeader/MainHeader.jsx";
import SideBar from "../components/aplicacao-dono-petshop/shared/sideBar/SideBar.jsx";

export const HeaderWithConditional = ({ section04Ref }) => {
    const location = useLocation();
  
    // Define as rotas onde o MainHeader deve ser exibido
    const showHeaderRoutes = ["/", "/sobreNos", "/suporte"];
  
    const shouldShowHeader = showHeaderRoutes.includes(location.pathname);
  
    return shouldShowHeader ? (
      <MainHeader scrollToSection04={() => section04Ref.current?.scrollIntoView({ behavior: "smooth" })} />
    ) : null;
  };
  
export const SideBarWithConditional = () => {
    const location = useLocation();
  
    const showSideBarRoutes = ["/donoPetshop/inicio", "/donoPetshop/agendamentos", "/donoPetshop/cadastros", "/donoPetshop/clientesEPets/", "/donoPetshop/gerenciarFuncionarios", "/donoPetshop/meusDados", "/donoPetshop/pagamentos", "/donoPetshop/planosMensais", "/donoPetshop/suporte"];
  
    const shouldShowSideBar = showSideBarRoutes.includes(location.pathname);
  
    return shouldShowSideBar ? (
      <SideBar />
    ) : null;
  };