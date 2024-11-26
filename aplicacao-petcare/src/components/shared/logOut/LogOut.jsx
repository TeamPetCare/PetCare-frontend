import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ThreeDot } from "react-loading-indicators";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import styles from "./LogOut.module.css";
import logoPetCare from "../../../utils/assets/logos/logoPetCare.svg";

const LogOut = ({ show, onHide }) => {
  const [loading, setLoading] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();
  const timeoutRef = useRef(null);

  const handleToggleSair = () => {
    setLoading(true);
    setIsLoggingOut(true);
    localStorage.clear();

    timeoutRef.current = setTimeout(() => {
      onHide();
      navigate("/dono-petshop/login");
      setLoading(false);
      setIsLoggingOut(false);
    }, 2000);
  };

  const handleCancel = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setLoading(false);
    setIsLoggingOut(false);
    onHide();
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      backdrop="static"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <img
            src={logoPetCare}
            alt="Logo PetCare"
            className={styles["logo-petcare"]}
          />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body
        className={`${styles["container-body"]} ${
          loading ? styles["container-body-loading"] : ""
        }`}
      >
        {loading ? (
          <ThreeDot
            variant="bounce"
            color="#005472"
            size="small"
            className={styles["loading"]}
            text=""
            textColor=""
          />
        ) : (
          <>
            <h2>Deseja sair?</h2>
            <p>Tem certeza que deseja encerrar a sessão?</p>
          </>
        )}
      </Modal.Body>
      <Modal.Footer className={styles["footer"]}>
        <Button
          variant="secondary"
          onClick={handleCancel}
          className={styles["btn-cancelar"]}
        >
          Cancelar
        </Button>
        <Button
          variant="Danger"
          onClick={handleToggleSair}
          className={styles["btn-sair"]}
        >
          Sair
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LogOut;
