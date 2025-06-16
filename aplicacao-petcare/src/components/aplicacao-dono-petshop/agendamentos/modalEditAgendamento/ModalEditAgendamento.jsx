import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import DropDown from "../../../shared/dropDown/DropDown";
import TimePicker from "../../../shared/timePicker/TimePicker";
import styles from "./ModalEditAgendamento.module.css";

const ModalEditAgendamento = ({ show, handleClose, dados, onSave }) => {
  const [formData, setFormData] = useState({
    cliente: "",
    pet: "",
    servicos: [],
    funcionario: "",
    formaPagamento: "",
    statusPagamento: false,
    observacoes: "",
    horario: { inicio: null, fim: null },
  });

  const formasPagamento = ["PIX", "CARTÃO DÉBITO", "CARTÃO CRÉDITO", "DINHEIRO"];

  useEffect(() => {

    if (dados) {
      setFormData({
        cliente: dados.cliente || "",
        pet: dados.pet || "",
        servicos: dados.servicos || [],
        funcionario: dados.funcionario || "",
        formaPagamento: dados.formaPagamento || "",
        statusPagamento: dados.statusPagamento || false,
        observacoes: dados.observacoes || "",
        horario: dados.horario || { inicio: null, fim: null },
      });

      console.log(formData)
    }

  }, [dados]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleServiceRemove = (service) => {
    setFormData((prev) => ({
      ...prev,
      servicos: prev.servicos.filter((item) => item !== service),
    }));
  };

  const handleSave = () => {
    onSave(formData);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Editar Agendamento</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={styles.formGroup}>
          <label>Cliente</label>
          <DropDown
            options={dados?.clientes || []}
            selectedOption={formData.cliente}
            onChange={(option) => handleInputChange("cliente", option)}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Pet</label>
          <DropDown
            options={dados?.pets || []}
            selectedOption={formData.pet}
            onChange={(option) => handleInputChange("pet", option)}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Serviços</label>
          <DropDown
            options={dados?.servicos || []}
            multiple
            selectedOptions={formData.servicos}
            onChange={(options) => handleInputChange("servicos", options)}
          />
          <ul>
            {formData.servicos.map((service, index) => (
              <li key={index}>
                {service}
                <button onClick={() => handleServiceRemove(service)}>Remover</button>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.formGroup}>
          <label>Funcionário</label>
          <DropDown
            options={dados?.funcionarios || []}
            selectedOption={formData.funcionario}
            onChange={(option) => handleInputChange("funcionario", option)}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Forma de Pagamento</label>
          <DropDown
            options={formasPagamento}
            selectedOption={formData.formaPagamento}
            onChange={(option) => handleInputChange("formaPagamento", option)}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Status do Pagamento</label>
          <select
            value={formData.statusPagamento}
            onChange={(e) =>
              handleInputChange("statusPagamento", e.target.value === "true")
            }
          >
            <option value={false}>Pendente</option>
            <option value={true}>Pago</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label>Horário</label>
          <TimePicker
            startTime={formData.horario.inicio}
            endTime={formData.horario.fim}
            onChange={(times) => handleInputChange("horario", times)}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Observações</label>
          <textarea
            value={formData.observacoes}
            onChange={(e) => handleInputChange("observacoes", e.target.value)}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Salvar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEditAgendamento;
