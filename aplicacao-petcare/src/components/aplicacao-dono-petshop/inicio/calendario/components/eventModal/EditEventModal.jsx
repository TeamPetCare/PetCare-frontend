import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
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

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      onClick={(e) => e.stopPropagation()}
    >
      <Modal.Header closeButton>
        <Modal.Title>Detalhes do Evento</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <div>
            <label>
              <strong>Título:</strong>
            </label>
            <input
              type="text"
              name="title"
              value={editedEvent.title}
              onChange={handleChange}
              disabled={!isEditing}
              className={styles.input}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <div>
            <label>
              <strong>Status:</strong>
            </label>
            <select
              name="status"
              value={editedEvent.status}
              onChange={handleChange}
              disabled={!isEditing}
              className={styles.input}
            >
              <option value="agendado">Agendado</option>
              <option value="concluido">Concluído</option>
              <option value="cancelado">Cancelado</option>
            </select>
          </div>
          <div>
            <label>
              <strong>Pagamento:</strong>
            </label>
            <select
              name="paymentMethod"
              value={editedEvent.paymentMethod}
              onChange={(e) => {
                handleChange(e);
              }}
              disabled={!isEditing}
              className={styles.input}
              onClick={(e) => e.stopPropagation()}
            >
              <option value="pix">Pix</option>
              <option value="dinheiro">Dinheiro</option>
              <option value="cartao_credito">Cartão de Crédito</option>
              <option value="cartao_debito">Cartão de Débito</option>
            </select>
          </div>
          <div>
            <label>
              <strong>Status do Pagamento:</strong>
            </label>
            <div className={styles.checkboxGroup}>
              <label>
                <input
                  type="radio"
                  name="paymentStatus"
                  value="pendente"
                  checked={!editedEvent.paymentStatus}
                  onChange={(e) => handleChange(e)}
                  disabled={!isEditing}
                />
                Pendente
              </label>
              <label>
                <input
                  type="radio"
                  name="paymentStatus"
                  value="pago"
                  checked={editedEvent.paymentStatus}
                  onChange={(e) => handleChange(e)}
                  disabled={!isEditing}
                />
                Pago
              </label>
            </div>
          </div>

          <div>
            <label>
              <strong>Horário de Início:</strong>
            </label>
            <input
              type="time"
              name="startTime" 
              value={formatTime(editedEvent.start)} 
              disabled={!isEditing}
              className={styles.input}
              onChange={handleChange} 
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <div>
            <label>
              <strong>Horário de Fim:</strong>
            </label>
            <input
              type="time"
              name="endTime" 
              value={formatTime(editedEvent.end)} 
              disabled={!isEditing}
              className={styles.input}
              onChange={handleChange}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        {isEditing ? (
          <>
            <Button variant="primary" onClick={handleSave}>
              Salvar
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                handleClose();
              }}
            >
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
