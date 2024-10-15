import React, { useRef, useState } from "react";
import UserHeader from "../../../components/aplicacao-dono-petshop/shared/userHeader/UserHeader";
import styles from "./Inicio.module.css";
import Calendario from "../../../components/aplicacao-dono-petshop/inicio/calendario/Calendario";

const Inicio = () => {

  return (
    <div className={styles["container"]}>
      <UserHeader />
      <Calendario />
    </div>
  );
};

export default Inicio;