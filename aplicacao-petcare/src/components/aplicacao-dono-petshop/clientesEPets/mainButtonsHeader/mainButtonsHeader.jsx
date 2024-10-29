import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import styles from './mainButtonsHeader.module.css';
import { LuDownloadCloud } from "react-icons/lu";
import { IoMdAddCircle } from "react-icons/io";
import { RiDeleteBinLine } from "react-icons/ri";

function MainButtonsHeader({ onCreateClick, onDeleteClick }) {
    return (
      <div className={styles["containers-btn"]}>
        <button className={`${styles["custom-btn"]} ${styles["delete"]}`} onClick={onDeleteClick}>
          <RiDeleteBinLine />
          Deletar
        </button>
        <button className={`${styles["custom-btn"]} ${styles["create"]}`} onClick={onCreateClick}>
          <IoMdAddCircle />
          Cliente
        </button>
        <button className={`${styles["custom-btn"]} ${styles["report"]}`}>
          <LuDownloadCloud />
          Gerar Relatório
        </button>
      </div>
    );
  }
  
  export default MainButtonsHeader;
