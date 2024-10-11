import React from "react";
import styles from "./SobreNos.module.css"; // Estilos para SobreNos
import SectionSobreNos from "../../../components/site-institucional/sobrenos/SectionSobreNos.jsx"; 
import imagem from "../../../utils/assets/site-institucional/sobrenos/mulhersobrenos.svg";

const SobreNos = () => {
  return (
    <div className={styles.sobreNos}>
      <SectionSobreNos
        titulo="A paixão e o cuidado"
        titulo2=" que seu pet merece."
        textoDetalhado="Conheça nossa missão de oferecer serviços excepcionais e um atendimento personalizado que faz a diferença na vida do seu bichinho."
        imagem={imagem}
        valores="Nossos valores:"
        valores1="Simplicidade e Usabilidade"
        valores2="Foco no Cliente"
        valores3="Inovação"
        valores4="Cuidado e Bem-Estar Animal"
      />
    </div>
  );
};

export default SobreNos;
