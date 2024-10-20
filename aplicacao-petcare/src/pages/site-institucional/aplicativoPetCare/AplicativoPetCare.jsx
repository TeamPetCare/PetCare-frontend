import React, { useState, useEffect } from 'react';
import MainHeaderApp from "../../../components/site-institucional/aplicativoPetcare/MainHeaderApp/MainHeaderApp.jsx";
import Section01 from "../../../components/site-institucional/aplicativoPetcare/section01/Section01.jsx";
import Section03 from "../../../components/site-institucional/aplicativoPetcare/section03/Section03.jsx"
import imgMulherComGato from "../../../utils/assets/site-institucional/aplicativo-petcare/imgMulherComGato.png";
import Section02 from "../../../components/site-institucional/aplicativoPetcare/section02/Section02.jsx";
import { HiOutlineDownload } from "react-icons/hi";
import { RiCalendarTodoFill } from "react-icons/ri";
import { IoNotificationsOutline } from "react-icons/io5";
import { MdOutlinePhoneIphone } from "react-icons/md";
import { FaPix } from "react-icons/fa6";
import { BiSolidCustomize } from "react-icons/bi";
import { TbCalendarBolt } from "react-icons/tb";
import Cat from "../../../utils/assets/site-institucional/inicio/Cat.svg";
import Bird from "../../../utils/assets/site-institucional/inicio/Bird.svg";
import Dog from "../../../utils/assets/site-institucional/inicio/Dog.svg";
import Papagaio from "../../../utils/assets/site-institucional/aplicativo-petcare/Papagaio.svg"
import Blackcat from "../../../utils/assets/site-institucional/aplicativo-petcare/Blackcat.svg"
import Spaniel from "../../../utils/assets/site-institucional/aplicativo-petcare/Spaniel.svg";
import styles from "./AplicativoPetCare.module.css"
import Card from "../../../components/site-institucional/shared/Card/Card.jsx";
import Footer from "../../../components/site-institucional/shared/Footer/Footer.jsx";
import imgDesktopAreaAtendimento from "../../../utils/assets/site-institucional/inicio/imgDesktopAreaAtendimento.png"
const AplicativoPetCare = () => {
  const [mostrarBotao, setMostrarBotao] = useState(false);
  const [mostrarUltimosCards, setMostrarUltimosCards] = useState(false);

  useEffect(() => {
    const verificarTamanhoTela = () => {
      if (window.innerWidth <= 553) {
        setMostrarBotao(true);
        setMostrarUltimosCards(false); // Ocultar os últimos cards quando for 553px ou menos
      } else {
        setMostrarBotao(false);
        setMostrarUltimosCards(true); // Mostrar todos os cards quando for maior que 553px
      }
    };

    verificarTamanhoTela();

    window.addEventListener('resize', verificarTamanhoTela);

    return () => {
      window.removeEventListener('resize', verificarTamanhoTela);
    };
  }, []);

  const handleMostrarCards = () => {
    setMostrarUltimosCards(!mostrarUltimosCards);
  };

  return (
    <div>
      <MainHeaderApp />
      <Section01
        img={imgMulherComGato}
        preTitulo=" "
        titulo={["Baixe o aplicativo PetCare e agende serviços com facilidade!"]}
        textoDetalhado="Nosso app gratuito e intuitivo permite que você marque consultas, banhos, tosa e outros serviços para o seu pet diretamente do seu celular."
        iconBotao={HiOutlineDownload}
        botao="Download Gratuito"
      />
      <Section02 />
      <div className={styles["container-section05"]}>
        <h1>Principais Funcionalidades</h1>
        <div className={styles["container-cards"]}>
          <Card
            icon={RiCalendarTodoFill}
            titulo="Marque Serviços em Segundos"
            descricao="Agendar banho ou consulta? Agora você faz isso na palma da mão, rapidinho."
            animalSvg={Cat}
            scrollToSection04={null}
            txtButton={"Baixe Gratuitamente"}
          />
          <Card
            icon={IoNotificationsOutline}
            titulo="Não Esqueça Nada"
            descricao="Lembretes automáticos garantem que você nunca mais perca um horário para seu pet."
            animalSvg={Bird}
            scrollToSection04={null}
            txtButton={"Baixe Gratuitamente"}
          />
          <Card
            icon={MdOutlinePhoneIphone}
            titulo="Tudo no Mesmo Lugar"
            descricao="Acompanhe o histórico de serviços e tenha todas as informações do seu pet organizadas no aplicativo."
            animalSvg={Dog}
            scrollToSection04={null}
            txtButton={"Baixe Gratuitamente"}
          />

          {/* Exibir os últimos três cards apenas se mostrarUltimosCards for true */}
          {mostrarUltimosCards && (
            <>
              <Card
                icon={FaPix}
                titulo="Pague com Pix, Fácil e Rápido"
                descricao="Finalize seu agendamento e pague pelo serviço direto no app com Pix, sem complicação."
                animalSvg={Papagaio}
                scrollToSection04={null}
                txtButton={"Baixe Gratuitamente"}
              />
              <Card
                icon={BiSolidCustomize}
                titulo="Personalize o Atendimento"
                descricao="Deixe recados especiais para o petshop, como o corte preferido do seu pet ou o funcionário que você confia para cuidar do seu bichinho."
                animalSvg={Blackcat}
                scrollToSection04={null}
                txtButton={"Baixe Gratuitamente"}
              />
              <Card
                icon={TbCalendarBolt}
                titulo="Ajuste Rápido de Agendamentos"
                descricao="Precisa mudar o horário ou serviço? Faça ajustes no agendamento facilmente, sem stress e sem precisar ligar para o petshop."
                animalSvg={Spaniel}
                scrollToSection04={null}
                txtButton={"Baixe Gratuitamente"}
              />
            </>
          )}

          {/* Botão para exibir/ocultar os últimos três cards */}
          {mostrarBotao && (
            <button onClick={handleMostrarCards} className={styles["buttonMore"]} >
              {mostrarUltimosCards ? 'Mostrar Menos' : 'Mostrar Mais...'}
            </button>
          )}
        </div>
      </div>
      <Section03
        img={imgDesktopAreaAtendimento}
        preTitulo=" "
        titulo={["Cuide do seu pet com um toque!"]}
        textoDetalhado="Baixe o aplicativo da PetCare e descubra como é fácil e prático manter seu bichinho sempre bem cuidado."
        iconBotao={HiOutlineDownload}
        botao="Download Gratuito"
      />
      <Footer
        scrollToSection04={() => scrollToSection(section04Ref)}
        scrollToSection06={() => scrollToSection(section06Ref)}
      />
    </div>
  );
};

export default AplicativoPetCare;