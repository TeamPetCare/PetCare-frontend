import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import EditedEventModalCampos from "../editEventModalCampos/editEventModalCampos";
import StepsModal from "../../../../../shared/steps/StepsModal";
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
  handleCancelAction
}) => {
  const formatTime = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const items = [{ label: "Editar Agendamento" }];

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
        <StepsModal items={items} />
      </Modal.Header>

      {/* Corpo com os campos de entrada */}
      <Modal.Body>
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
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Button className={styles["btn-cancelar"]} onClick={handleCancelAction}>
              Cancelar
            </Button>
            <Button className={styles["btn-salvar"]} onClick={handleSave}>
              Salvar
            </Button>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Button
              className={styles["btn-cancelar-agenda"]}
              onClick={handleCancelEvent}
            >
              Cancelar Agendamento
            </Button>
            <Button className={styles["btn-editar"]} onClick={handleEdit}>
              Editar
            </Button>
          </div>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default EditEventModal;
