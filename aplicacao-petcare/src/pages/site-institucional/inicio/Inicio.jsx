import styles from "./Inicio.module.css";
import React, { useRef, useState, useEffect } from "react";
import imgMulherComCachorro from "../../../utils/assets/site-institucional/inicio/imgMulherComCachorro.jpg";
import Cat from "../../../utils/assets/site-institucional/inicio/Cat.svg";
import Bird from "../../../utils/assets/site-institucional/inicio/Bird.svg";
import Dog from "../../../utils/assets/site-institucional/inicio/Dog.svg";
import Section01 from "../../../components/site-institucional/shared/section01/Section01.jsx";
import Section02 from "../../../components/site-institucional/inicio/section02/Section02.jsx";
import Section03 from "../../../components/site-institucional/inicio/section03/Section03.jsx";
import Section04 from "../../../components/site-institucional/inicio/section04/Section04.jsx";
import Card from "../../../components/site-institucional/shared/Card/Card.jsx";
import Section06 from "../../../components/site-institucional/inicio/section06/Section06.jsx";
import Footer from "../../../components/site-institucional/shared/Footer/Footer.jsx";
import { ThreeDots } from "react-loader-spinner"; // Certifique-se de que está usando o pacote correto
import { PiUserCircleLight } from "react-icons/pi";
import { MdDevices } from "react-icons/md";
import { TbReport } from "react-icons/tb";
import { IoNotificationsOutline } from "react-icons/io5";

function Inicio({ section04Ref }) {
  const section06Ref = useRef(null);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const [fatosData, setFatosData] = useState(""); // Inicializa com string vazia
  const [loading, setLoading] = useState(false); // Inicializa sem carregamento

  useEffect(() => {
    setLoading(true); // Inicia o estado de carregamento
    fetch("https://meowfacts.herokuapp.com/?lang=por-br&count=1")
      .then((response) => response.json())
      .then((data) => {
        setTimeout(() => {
          setFatosData(data.data[0]); // Atualiza o dado recebido após o delay
          setLoading(false); // Desativa o carregamento após o delay
        }, 1000); // Delay de 1 segundo (1000 ms)
      })
      .catch((error) => {
        console.error("Erro ao buscar o fato:", error);
        setLoading(false); // Mesmo em caso de erro, desativa o carregamento
      });
  }, []); // useEffect sem dependências para rodar apenas na montagem do componente

  return (
    <div>
      <Section01
        img={imgMulherComCachorro}
        preTitulo="O melhor amigo do seu petshop."
        titulo={["Menos tarefas,", <br key="line1" />, "mais cuidados."]}
        textoDetalhado="Simplifique o gerenciamento de agendamentos e obtenha insights essenciais. Concentre-se no que realmente importa: o bem-estar dos pets e a satisfação dos clientes."
        iconBotao={PiUserCircleLight}
        botao="Iniciar teste grátis com 10 dias*"
        scrollToSection04={() => scrollToSection(section04Ref)}
      />
      <Section02 />
      <Section03 />
      <div ref={section04Ref}>
        <Section04 />
      </div>
      <div className={styles["container-section05"]}>
        <h1>Diferenciais PetCare</h1>
        <div className={styles["container-cards"]}>
          <Card
            icon={MdDevices}
            titulo="Multiplataforma"
            descricao="Acesse e gerencie seu petshop de qualquer lugar, em qualquer dispositivo (no computador, celular ou tablet)."
            animalSvg={Cat}
            scrollToSection04={() => scrollToSection(section04Ref)}
          />
          <Card
            icon={TbReport}
            titulo="Relatórios Inteligentes"
            descricao="Veja relatórios simples e úteis para otimizar seus serviços e tomar decisões mais informadas com facilidade."
            animalSvg={Bird}
            scrollToSection04={() => scrollToSection(section04Ref)}
          />
          <Card
            icon={IoNotificationsOutline}
            titulo="Notificações automáticas"
            descricao="Envie lembretes automáticos para seus clientes e evite faltas. Mantenha todos atualizados sem esforço."
            animalSvg={Dog}
            scrollToSection04={() => scrollToSection(section04Ref)}
          />
        </div>
      </div>
      <div ref={section06Ref}>
        <Section06 />
      </div>
      <div className="parent-container">
        <div className={styles["fatos-container"]}>
          <h1>Você sabia que...?</h1>
          {loading ? (
            <ThreeDots color="#FFFFFF" height={50} width={50} />
          ) : (
            <p className={styles["fato"]}>{fatosData}...</p> // Exibe o fato recebido
          )}
        </div>
      </div>


      <Footer
        scrollToSection04={() => scrollToSection(section04Ref)}
        scrollToSection06={() => scrollToSection(section06Ref)}
      />
    </div>
  );
}

export default Inicio;