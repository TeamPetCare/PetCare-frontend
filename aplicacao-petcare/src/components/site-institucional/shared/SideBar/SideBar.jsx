import React from "react";
import styles from "./SideBar.module.css";
import iconXMobile from "../../../../utils/assets/site-institucional/header/iconXMobile.svg";
import { PiUserCircleLight } from "react-icons/pi";

import { Link } from "react-router-dom";

const SideBar = ({ active, scrollToSection04 }) => {
  const closeSideBar = () => {
    active(false);
  };

  return (
    <div className={styles.container} style={{ right: active ? "0" : "-100%" }}>
      <img
        onClick={closeSideBar}
        src={iconXMobile}
        className={styles.svg_close_mobile}
      />
      <div className={styles.content}>
        <ul>
          <Link to="/" className={styles.linkLi}>
            <li className={styles.selected}>Início</li>
          </Link>
          <Link to="/sobreNos" className={styles.linkLi}>
            <li>Sobre Nós</li>
          </Link>
          <Link to="/aplicativoPetCare" className={styles.linkLi}>
            <li>Aplicativo PetCare</li>
          </Link>
          <Link to="/suporte" className={styles.linkLi}>
            <li>Suporte</li>
          </Link>
          <Link to="/donoPetshop/login" className={styles.linkLi}>
            <li>
              <PiUserCircleLight color="#005472" size="1.4em" />
              Acesso ao Sistema
            </li>
          </Link>
        </ul>
        <Link style={{ width: "85%" }}>
          <button className={styles.btnTesteGratis} onClick={scrollToSection04}>
            Teste Grátis
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
