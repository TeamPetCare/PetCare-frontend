import React from "react";
import styles from "./SideBarApp.module.css";
import iconXMobile from "../../../../utils/assets/site-institucional/header/iconXMobile.svg";
import { PiUserCircleLight } from "react-icons/pi";
import { Link, useLocation, useNavigate } from "react-router-dom";

const SideBar = ({ active, scrollToSection04 }) => {
  const closeSideBar = () => {
    active(false);
  };

  const location = useLocation();
  const navigate = useNavigate();

  const handleTesteGratisClick = () => {
    if (location.pathname === "/") scrollToSection04();
    else  {
      navigate("/");
    }
  }

  return (
    <div className={styles.container} style={{ right: active ? "0" : "-100%" }}>
      <img
        onClick={closeSideBar}
        src={iconXMobile}
        className={styles.svg_close_mobile}
      />
      <div className={styles.content}>
        <ul>
          <Link to="/donoPet/login" className={styles.linkLi}>
            <li>Login</li>
          </Link>
        </ul>
          <Link to="/donoPet/cadastro" className={ `${styles["linkButton"]}`}>
            <li className={ `${styles["btnTesteGratis"]} ${styles["bgBtnYellow"]}`}>Cadastre-se</li>
          </Link>

          {/* Link que redireciona para baixar o aplicativo:*/}
          <Link to="/" className={ `${styles["linkButton"]}`}>
            <li className={ `${styles["btnTesteGratis"]} ${styles["bgBtnBlue"]}`} >Baixe o Aplicativo</li>
          </Link>
        <ul>
          <Link to="/suporte" className={styles.linkLi}>
            <li>Central de Ajuda</li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
