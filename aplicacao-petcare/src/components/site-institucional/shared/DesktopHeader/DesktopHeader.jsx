import React, { useState } from "react";
import logoPetCare from "../../../../utils/assets/logos/logoPetCare.svg";
import styles from "./DesktopHeader.module.css";
import { PiUserCircleLight } from "react-icons/pi";
import { Link, useLocation, useNavigate } from "react-router-dom";

function DesktopHeader({ scrollToSection04 }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleTesteGratisClick = () => {
    if (location.pathname === "/") scrollToSection04();
    else  {
      navigate("/");
    }
  }
  return (
    <div className={styles["container"]}>
      <div className={styles["container_desktop_subheader"]}>
        <ul>
          <li>
            <Link to="/aplicativoPetcare" className={styles["linkLi"]}>
              Aplicativo PetCare
            </Link>
          </li>
          <li>
            <Link to="/suporte" className={styles["linkLi"]}>
              Suporte
            </Link>
          </li>
          <li>
            <Link to="/donoPetshop/login" className={styles["linkLi"]}>
              <PiUserCircleLight
                size="1.4em"
                className={styles["iconUserCircle"]}
              />
              Acesso ao Sistema
            </Link>
          </li>
        </ul>
      </div>
      <div className={styles.container_desktop_header}>
        <Link to="/">
          <img src={logoPetCare} alt="Logo da Pet Care" />
        </Link>
        <ul>
          <li>
            <Link to="/" className={styles["linkLi"]}>
              Início
            </Link>
          </li>
          <li>
            <Link to="/sobreNos" className={styles["linkLi"]}>
              Sobre Nós
            </Link>
          </li>
          <li onClick={handleTesteGratisClick}>Teste Grátis</li>
        </ul>
      </div>
    </div>
  );
}

export default DesktopHeader;
