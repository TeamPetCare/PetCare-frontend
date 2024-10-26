import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import styles from './mainButtonsHeader.module.css';
import { LuDownloadCloud } from "react-icons/lu";
import { IoMdAddCircle } from "react-icons/io";
import { RiDeleteBinLine } from "react-icons/ri";

function mainButtonsHeader({ btn1Name, btn2Name, btn3Name }) {

    return (
        <>
            <div className={styles["containers-btn"]}>
                <button className={`${styles["custom-btn"]} ${styles["delete"]}`}>
                <RiDeleteBinLine />
                    Deletar
                </button>
                <button className={`${styles["custom-btn"]} ${styles["create"]}`}>
                <IoMdAddCircle />
                    Cliente
                </button>
                <button className={`${styles["custom-btn"]} ${styles["report"]}`}>
                <LuDownloadCloud />
                    Gerar Relatório
                </button>
            </div>
        </>
    );
}

export default mainButtonsHeader;
