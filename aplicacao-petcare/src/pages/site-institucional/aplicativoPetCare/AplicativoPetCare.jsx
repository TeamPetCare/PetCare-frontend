import MainHeaderApp from "../../../components/site-institucional/aplicativoPetcare/MainHeaderApp/MainHeaderApp.jsx";
import Section01 from "../../../components/site-institucional/aplicativoPetcare/section01/Section01.jsx";
import imgMulherComGato from "../../../utils/assets/site-institucional/aplicativo-petcare/imgMulherComGato.png";
import Section02 from "../../../components/site-institucional/aplicativoPetcare/section02/Section02.jsx";
import { HiOutlineDownload } from "react-icons/hi";
const aplicativoPetCare = () => {
  return (
    <div>
      <MainHeaderApp/>
      <Section01
        img={imgMulherComGato}
        preTitulo=" "
        titulo={["Baixe o aplicativo PetCare e agende serviços com facilidade!"]}
        textoDetalhado="Nosso app gratuito e intuitivo permite que você marque consultas, banhos, tosa e outros serviços para o seu pet diretamente do seu celular."
        iconBotao={HiOutlineDownload}
        botao="Download Gratuito"/>
        <Section02 />
    </div>
    
  );
};

{/* titulo={["Menos tarefas,", <br key="line1" />, "mais cuidados."]}*/}

export default aplicativoPetCare;