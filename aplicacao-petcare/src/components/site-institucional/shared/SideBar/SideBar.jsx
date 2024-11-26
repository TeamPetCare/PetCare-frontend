import React, { useEffect } from "react";
import styles from "./SideBar.module.css";
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
    else {
      navigate("/");
    }
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
            <li className={styles.selected} onClick={closeSideBar}>
              Início
            </li>
          </Link>
          <Link to="/sobreNos" className={styles.linkLi}>
            <li onClick={closeSideBar}>Sobre Nós</li>
          </Link>
          <Link to="/aplicativoPetcare" className={styles.linkLi}>
            <li onClick={closeSideBar}>Aplicativo PetCare</li>
          </Link>
          <Link to="/suporte" className={styles.linkLi}>
            <li onClick={closeSideBar}>Suporte</li>
          </Link>
          <Link to="/dono-petshop/login" className={styles.linkLi}>
            <li onClick={closeSideBar}>
              <PiUserCircleLight color="#005472" size="1.4em" />
              Acesso ao Sistema
            </li>
          </Link>
        </ul>
        <li
          className={styles.btnTesteGratis}
          onClick={() => {
            handleTesteGratisClick();
            closeSideBar();
          }}
        >
          Teste Grátis
        </li>
      </div>
    </div>
  );
};

export default SideBar;
