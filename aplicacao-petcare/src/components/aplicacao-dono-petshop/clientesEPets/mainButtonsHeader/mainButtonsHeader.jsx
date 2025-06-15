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

function MainButtonsHeader({ selectedData, onCreateClickCliente, onDeleteClickCliente, filter, onGenerateReport, onCreatePet, onAssignPlain, }) {
  return (
    <div className={styles["containers-btn"]}>

      {/*CLIENTES*/}
      {/* Condição para mostrar ou esconder o botão de DELETAR DO CLIENTE*/}
      {filter === "Clientes" && selectedData.length > 0 && (
        <button className={`${styles["custom-btn"]} ${styles["delete"]}`} onClick={onDeleteClickCliente}>
          <RiDeleteBinLine />
          Deletar Cliente(s)
        </button>
      )}


      {/*PETS*/}
      {/* Condição para mostrar o botão de DELETAR de acordo com o filtro DO PET */}
      {filter === "Pets" && (
        <button className={`${styles["custom-btn"]} ${styles["delete"]}`} onClick={onDeleteClickPet}>
          <RiDeleteBinLine />
          Deletar Pet(s)
        </button>
      )}



      {/* Botões sempre visíveis */}
      <button className={`${styles["custom-btn"]} ${styles["create"]}`} onClick={onCreateClickCliente}>
        <IoMdAddCircle />
        Cliente
      </button>


      {/* modal da DANIELA, sua cowgirl */}
      <button className={`${styles["custom-btn"]} ${styles["create"]}`} onClick={onCreatePet}>
        <IoMdAddCircle />
        Pet
      </button>

      <button className={`${styles["custom-btn"]} ${styles["create"]}`} onClick={onAssignPlain}>
        <MdAssignment />
        Atribuir Plano
      </button>

      <button className={`${styles["custom-btn"]} ${styles["report"]}`} onClick={onGenerateReport}>
        <LuCloudDownload/>
        Gerar Relatório
      </button>
    </div>
  );
}


export default MainButtonsHeader;