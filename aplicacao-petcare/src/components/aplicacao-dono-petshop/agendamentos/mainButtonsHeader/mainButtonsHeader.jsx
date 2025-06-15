import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import styles from "./mainButtonsHeader.module.css";
import { LuCloudDownload } from "react-icons/lu";
import { IoMdAddCircle } from "react-icons/io";
import { RiDeleteBinLine } from "react-icons/ri";
import { PiBoundingBoxFill } from "react-icons/pi";
import { MdAssignment } from "react-icons/md";

function MainButtonsHeader({
  onCreateAgendamento,
  onDeleteAgendamento,
  filter,
  onGenerateReport,
  onCreatePet,
  onAssignPlain,
}) {
  return (
    <div className={styles["containers-btn"]}>
      <button
        className={`${styles["custom-btn"]} ${styles["delete"]}`}
        onClick={onDeleteAgendamento}
      >
        <RiDeleteBinLine />
        Deletar Agendamentos(s)
      </button>
      <button
        className={`${styles["custom-btn"]} ${styles["create"]}`}
        onClick={onCreateAgendamento}
      >
        <IoMdAddCircle />
        Agendamento
      </button>

      <button
        className={`${styles["custom-btn"]} ${styles["report"]}`}
        onClick={onGenerateReport}
      >
        <LuCloudDownload/>
        Gerar Relatório
      </button>
     
    </div>
  );
}

export default MainButtonsHeader;
