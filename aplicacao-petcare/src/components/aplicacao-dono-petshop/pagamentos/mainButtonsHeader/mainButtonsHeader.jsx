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

function MainButtonsHeader({ onGenerateReport }) {
  
  return (
    <div className={styles["containers-btn"]}>
      <button className={`${styles["custom-btn"]} ${styles["report"]}`} onClick={onGenerateReport}>
        <LuDownloadCloud />
        Gerar Relatório
      </button>
    </div>
  );
}

export default MainButtonsHeader;