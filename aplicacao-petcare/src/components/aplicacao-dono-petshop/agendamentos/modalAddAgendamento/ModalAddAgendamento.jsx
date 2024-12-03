import React, { useState, useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa"; // Ícone de conclusão
import { toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import styles from "./ModalAddAgendamento.module.css";
import ModalAddCampos from "./modalAddCampos/ModalAddCampos";
import { createSchedule } from "../../../../services/scheduleService";
import { createPayment } from "../../../../services/paymentService";

const ModalAddAgendamento = (
  {
    show,
    handleClose,
    dados,
    fetchData
    //   handleChange,
    //   isEditing,
    //   handleEdit,
    //   handleCancelEvent,
    //   handleCancelAction,
  },
  ref
) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [dadosPostSchedule, setDadosPostSchedule] = useState([]);
  const [dadosPostPayment, setDadosPostPayment] = useState([]);

  const handleFormCompletion = (isComplete) => {
    setIsFormComplete(isComplete);
  };

  const formatTime = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };
  useEffect(() => {
    if (isFormComplete) {
      setCurrentStep(1);
    } else {
      setCurrentStep(0);
    }
  }, [isFormComplete]);

  const progressWidth = `${(currentStep / 1) * 100}%`;
  const isComplete = currentStep === 1;

  const handleSave = (dadosSchedule, dadosPayment) => {
    setDadosPostSchedule(dadosSchedule);
    setDadosPostPayment(dadosPayment);
  };

  const handlePostPaymentAndSchedule = async () => {
    try {
      const paymentResponse = await createPayment(dadosPostPayment);
      const paymentId = paymentResponse?.id;

      if (!paymentId) {
        throw new Error("Erro ao obter ID do pagamento.");
      }

      const updatedSchedule = {
        ...dadosPostSchedule,
        paymentId,
      };
      setDadosPostSchedule(updatedSchedule);

      await createSchedule(updatedSchedule);
      toast.success("Agendamento criado com sucesso!", { autoClose: 2000 });
      handleClose();
      fetchData();
    } catch (error) {
      console.error("Erro ao processar pagamento e criar agendamento:", error);
      toast.error(
        `Falha ao salvar agendamento. Detalhes: ${
          error.message || "Tente novamente."
        }`
      );
    }
  };

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
          <h2>Cadastrar Novo Agendamento</h2>
          <p>*Campos Obrigatórios.</p>
        </div>

        <ModalAddCampos
          dados={dados}
          checkFormCompletionCallback={handleFormCompletion}
          handleSaveCallback={handleSave}
          //   editedEvent={editedEvent}
          //   handleChange={handleChange}
          //   isEditing={isEditing}
          //   formatTime={formatTime}
        />
      </Modal.Body>

      {/* Rodapé com os botões */}
      <Modal.Footer>
        <div className={styles["div-footer"]}>
          <Button
            className={styles["btn-cancelar-agenda"]}
            onClick={handleClose}
          >
            Cancelar
          </Button>
          <Button
            className={styles["btn-editar"]}
            disabled={!isFormComplete}
            onClick={() => {
              handlePostPaymentAndSchedule();
              // dados?.handleSaveCallback?.();
            }}
          >
            Salvar
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalAddAgendamento;
