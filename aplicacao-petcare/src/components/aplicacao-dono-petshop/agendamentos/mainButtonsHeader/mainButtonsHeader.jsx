import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import styles from './mainButtonsHeader.module.css';
import { LuDownloadCloud } from "react-icons/lu";
import { IoMdAddCircle } from "react-icons/io";
import { RiDeleteBinLine } from "react-icons/ri";
import { PiBoundingBoxFill } from "react-icons/pi";
import { MdAssignment } from "react-icons/md";

function MainButtonsHeader({ onCreateClickCliente, onDeleteClickCliente, filter, onGenerateReport, onCreatePet, onAssignPlain, }) {
  return (
    <div className={styles["containers-btn"]}>

      {/* Condição para mostrar o botão de DELETAR de acordo com o filtro*/}
      {filter === "Agendamentos" && (
        <button className={`${styles["custom-btn"]} ${styles["delete"]}`}>
          <RiDeleteBinLine />
          Deletar Agendamentos(s)
        </button>
      )}

      <button className={`${styles["custom-btn"]} ${styles["create"]}`} onClick={onCreateClickCliente}>
        <IoMdAddCircle />
        Agendamento
      </button>

      <button className={`${styles["custom-btn"]} ${styles["report"]}`} onClick={onGenerateReport}>
        <LuDownloadCloud />
        Gerar Relatório
      </button>
    </div>
  );
}


export default MainButtonsHeader;
