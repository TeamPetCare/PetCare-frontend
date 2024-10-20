import React from "react";
import styles from "./SectionSobreNos.module.css";
import easyIcon from "../../../utils/assets/site-institucional/sobrenos/Easy.png";
import clientManagementIcon from "../../../utils/assets/site-institucional/sobrenos/Client Management.png";
import heartPawIcon from "../../../utils/assets/site-institucional/sobrenos/Heart with dog paw.png";
import ideaSharingIcon from "../../../utils/assets/site-institucional/sobrenos/Idea Sharing.png";

const SectionSobreNos = ({
  titulo,
  titulo2,
  textoDetalhado,
  imagem,
  valores,
  valores1,
  valores2,
  valores3,
  valores4,
}) => {
  return (
    <div className={styles.sectionSobreNos}>
      <div className={styles.imageContainer}>
        <img src={imagem} alt="Descrição da imagem" className={styles.imagem} />
      </div>

      <div className={styles.textContainer}>
        <h1>{titulo}</h1>
        <h1>{titulo2}</h1>
        <p>{textoDetalhado}</p>
        <h4>{valores}</h4>

        <div className={styles.valoresContainer}>
          <button className={styles.button}>
            <img src={easyIcon} alt="Fácil de usar" className={styles.icon} />
            {valores1}
          </button>
          <button className={styles.button}>
            <img src={clientManagementIcon} alt="Gestão de Clientes" className={styles.icon} />
            {valores2}
          </button>
          <button className={styles.button}>
            <img src={ideaSharingIcon} alt="Cuidado com os Pets" className={styles.icon} />
            {valores3}
          </button>
          <button className={styles.button}>
            <img src={heartPawIcon} alt="Compartilhamento de Ideias" className={styles.icon} />
            {valores4}
          </button>
        </div>

      </div>
    </div>
  );
};

export default SectionSobreNos;
