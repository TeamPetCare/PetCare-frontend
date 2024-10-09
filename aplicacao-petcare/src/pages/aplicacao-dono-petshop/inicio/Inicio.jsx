import React, { useRef, useState } from "react";
import UserHeader from "../../../components/aplicacao-dono-petshop/shared/userHeader/UserHeader";
import styles from "./Inicio.module.css";

const Inicio = () => {

  return (
    <div className={styles["container"]}>
      <UserHeader />
    </div>
  );
};

export default Inicio;