import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa"; // Ícone de conclusão
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import EditedEventModalCampos from "../editEventModalCampos/editEventModalCampos";
import styles from "./EditEventModal.module.css";

const EditEventModal = ({
  show,
  handleClose,
  editedEvent,
  handleChange,
  isEditing,
  handleSave,
  handleEdit,
  handleCancelEvent,
  handleCancelAction,
}) => {
  const [currentStep, setCurrentStep] = useState(1); // Passo atual para a barra de progresso

  const formatTime = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  // Função para renderizar os títulos das etapas
  const renderStepTitles = () => {
    const steps = [{ title: "Editar Agendamento", index: 1 }]; // Adicione outras etapas conforme necessário
    return (
      <ul className={styles.stepContainer}>
        {steps.map((step) => (
          <li
            key={step.index}
            className={`${styles.stepBox} ${
              step.index === currentStep ? styles.active : ""
            }`}
          >
            {step.index}. {step.title}
          </li>
        ))}
      </ul>
    );
  };

  const progressWidth = `${(currentStep / 1) * 100}%`; // Ajuste conforme o número de passos
  const isComplete = currentStep === 1; // Indica se o processo está completo

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      onClick={(e) => e.stopPropagation()}
      size="lg"
    >
      {/* Cabeçalho do Modal */}
      <Modal.Header closeButton>
        {/* Barra de Títulos das Etapas */}
        <div className={styles.containerProgress}>
          <div style={{ display: "flex", width: "100%", alignItems: "center" }}>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: progressWidth }}
              />
            </div>
            {isComplete && (
              <FaCheckCircle className={styles.completeIcon} size={20} /> // Ícone de "completo"
            )}
          </div>
        </div>
      </Modal.Header>

      {/* Corpo com os campos de entrada */}
      <Modal.Body
        className={styles["modal-body"]}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles["modal-title"]}>
          <h2>Editar Agendamento</h2>
          <p>*Campos Obrigatórios.</p>
        </div>

        <EditedEventModalCampos
          editedEvent={editedEvent}
          handleChange={handleChange}
          isEditing={isEditing}
          formatTime={formatTime}
        />
      </Modal.Body>

      {/* Rodapé com os botões */}
      <Modal.Footer>
        {isEditing ? (
          <div className={styles["div-footer"]}>
            <Button
              className={styles["btn-cancelar"]}
              onClick={handleCancelAction}
            >
              Cancelar
            </Button>
            <Button
              className={styles["btn-salvar"]}
              onClick={() => {
                handleSave();
              }}
            >
              Salvar
            </Button>
          </div>
        ) : (
          <div className={styles["div-footer"]}>
            <Button
              className={styles["btn-cancelar-agenda"]}
              onClick={handleClose}
            >
              Cancelar
            </Button>
            <Button
              className={styles["btn-editar"]}
              onClick={() => {
                handleEdit();
              }}
            >
              Editar
            </Button>
          </div>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default EditEventModal;
