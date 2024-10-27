import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import styles from "./ModalConfirmacao.module.css";

const ModalConfirmacao = ({
  handleBtn1,
  handleBtn2,
  menssagem,
  confirmAction,
  onBack,
  show,
  onHide,
}) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      backdrop="static"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title
          id="contained-modal-title-vcenter"
          className={styles["contained-modal-title-vcenter"]}
        >
          <h4>Confirmar conclusão de agendamento</h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body
        className={styles["container-body"]}
        dangerouslySetInnerHTML={{ __html: menssagem }}
      />

      <Modal.Footer
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Button
          variant="secondary"
          onClick={onBack}
          className={styles["btn-voltar"]}
        >
          Voltar
        </Button>
        <Button
          variant="Danger"
          onClick={confirmAction}
          className={styles["btn-continuar"]}
        >
          Prosseguir
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalConfirmacao;
