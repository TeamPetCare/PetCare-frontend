import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import EditedEventModalCampos from "../editEventModalCampos/editEventModalCampos"
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
  handleDelete,
}) => {
  const formatTime = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const items = [
    { label: 'Cadastrar Agendamento' }
  ];

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      onClick={(e) => e.stopPropagation()}
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
          <>
            <Button variant="primary" onClick={handleSave}>
              Salvar
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Cancelar
            </Button>
          </>
        ) : (
          <>
            <Button variant="primary" onClick={handleEdit}>
              Editar
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Deletar
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Fechar
            </Button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default EditEventModal;
