import styles from "./MobileFooter.module.css";
import { FaFacebookSquare, FaGithubSquare } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import logoBrancoPetCare from "../../../utils/assets/logos/logoBrancoPetCare.svg";

const MobileFooter = () => {
  return (
    <div className={styles["container-bck"]}>
      <div className={styles["container"]}>
        <img src={logoBrancoPetCare} alt="" />

        <div className={styles["container-links"]}>
          <div className={styles["container-links-petcare"]}>
            <p>PetCare</p>
            <ul>
              <li>Funcionalidades</li>
              <li>Teste Grátis</li>
              <li>Suporte</li>
              <li>Acesso ao Sistema</li>
            </ul>
          </div>
          <div className={styles["container-links-donos"]}>
            <p>Donos de Pet</p>
            <ul>
              <li>Baixe o aplicativo</li>
            </ul>
          </div>
          <div className={styles["container-links-institucional"]}>
            <p>Institucional</p>
            <ul>
              <li>Sobre nós</li>
              <li>Política de Privacidade</li>
            </ul>
          </div>
          <div className={styles["container-links-fale-conosco"]}>
            <p>Fale Conosco</p>
            <ul>
              <li>timepetcare@gmail.com</li>
              <li>++55 (11) 98178-3286</li>
            </ul>
            <div className={styles["container-links-icons"]}>
              <FaFacebookSquare />
              <FaGithubSquare />
              <AiFillInstagram />
            </div>
          </div>
        </div>

        <p>
          Copyright © 2024 PetCare | <br />
          Todos Direitos Reservados
        </p>
      </div>
    </div>
  );
};

export default MobileFooter;
