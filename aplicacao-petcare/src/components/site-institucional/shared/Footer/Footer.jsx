import styles from "./Footer.module.css";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { FaFacebookSquare, FaGithubSquare } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import logoBrancoPetCare from "../../../../utils/assets/logos/logoBrancoPetCare.svg";

const Footer = ({ scrollToSection04, scrollToSection06 }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const isNotMobile = useMediaQuery({ query: "(min-width: 768px)" });

  return (
    <div className={styles["container-bck"]}>
      {isMobile && (
        <div className={styles["container"]}>
          <img src={logoBrancoPetCare} alt="" />

          <div className={styles["container-links"]}>
            <div className={styles["container-links-petcare"]}>
              <p>PetCare</p>
              <ul>
                <li onClick={scrollToSection06}>Funcionalidades</li>
                <li onClick={scrollToSection04}>Teste Grátis</li>
                <Link to="/suporte" className={styles["linkLi"]}>
                  <li>Suporte</li>
                </Link>
                <li>
                  <Link to="/donoPetshop/login" className={styles["linkLi"]}>
                    Acesso ao Sistema
                  </Link>
                </li>
              </ul>
            </div>
            <div className={styles["container-links-donos"]}>
              <p>Donos de Pet</p>
              <ul>
                <Link to="/aplicativoPetCare" className={styles["linkLi"]}>
                  <li>Baixe o aplicativo</li>
                </Link>
              </ul>
            </div>
            <div className={styles["container-links-institucional"]}>
              <p>Institucional</p>
              <ul>
                <Link to="/sobreNos" className={styles["linkLi"]}>
                  <li>Sobre nós</li>
                </Link>
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
                <FaGithubSquare
                  onClick={() =>
                    (window.location.href = "https://github.com/TeamPetCare")
                  }
                />
                <AiFillInstagram />
              </div>
            </div>
          </div>

          <p>
            Copyright © 2024 PetCare | <br />
            Todos Direitos Reservados
          </p>
        </div>
      )}

      {isNotMobile && (
        <div className={styles["container"]}>
          <div className={styles["container-petcare"]}>
            <img src={logoBrancoPetCare} alt="" />
            <p>
              Copyright © 2024 PetCare | <br />
              Todos Direitos Reservados
            </p>
          </div>

          <div className={styles["container-links"]}>
            <div className={styles["container-links-petcare"]}>
              <p>PetCare</p>
              <ul>
                <li onClick={scrollToSection06}>Funcionalidades</li>
                <li onClick={scrollToSection04}>Teste Grátis</li>
                <Link to="/suporte" className={styles["linkLi"]}>
                  <li>Suporte</li>
                </Link>
                <li>
                  <Link to="/donoPetshop/login" className={styles["linkLi"]}>
                    Acesso ao Sistema
                  </Link>
                </li>
              </ul>
            </div>
            <div className={styles["container-links-2"]}>
              <div className={styles["container-links-donos"]}>
                <p>Donos de Pet</p>
                <ul>
                  <Link to="/aplicativoPetCare" className={styles["linkLi"]}>
                    <li>Baixe o aplicativo</li>
                  </Link>
                </ul>
              </div>
              <div className={styles["container-links-institucional"]}>
                <p>Institucional</p>
                <ul>
                  <Link to="/sobreNos" className={styles["linkLi"]}>
                    <li>Sobre nós</li>
                  </Link>
                  <li>Política de Privacidade</li>
                </ul>
              </div>
            </div>

            <div className={styles["container-links-fale-conosco"]}>
              <p>Fale Conosco</p>
              <ul>
                <li>timepetcare@gmail.com</li>
                <li>++55 (11) 98178-3286</li>
              </ul>
              <div className={styles["container-links-icons"]}>
                <FaFacebookSquare />
                <FaGithubSquare
                  onClick={() =>
                    (window.location.href = "https://github.com/TeamPetCare")
                  }
                  style={{
                    cursor: "pointer",
                  }}
                />
                <AiFillInstagram />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Footer;
