import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import styles from './ModalPut.module.css'; // Supondo que você tenha esse arquivo CSS

function ModalPut({
  showPut,
  handleClosePut,
  onPut = () => { },
  dados = [],
  title = "Editar Cliente",
  cliente = {},
  setClienteAtual,
  nonEditableFields = [],
}) {
  useEffect(() => {
    if (showPut && dados.length > 0 && !cliente.id) {
      const dataOriginal = dados[0].dtUltimoAgendamento;
      const dataFormatada = formatarDataParaIso(dataOriginal);

      setClienteAtual({
        ...dados[0],
        dtUltimoAgendamento: dataFormatada,
      });
    }
  }, [dados, showPut, cliente.id, setClienteAtual]);

  const formatarDataParaIso = (data) => {
    if (!data) return "";
    const partes = data.split("/");
    if (partes.length === 3) {
      const [dia, mes, ano] = partes;
      return `${ano}-${mes.padStart(2, "0")}-${dia.padStart(2, "0")}`;
    }
    return data;
  };

  const formatarDataParaExibicao = (data) => {
    if (!data) return "";
    const partes = data.split("-");
    if (partes.length === 3) {
      const [ano, mes, dia] = partes;
      return `${dia}/${mes}/${ano}`;
    }
    return data;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (!nonEditableFields.includes(name)) {
      setClienteAtual((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(cliente); // Agora reflete diretamente o estado principal
    onPut(cliente); // Envia o estado atualizado para o componente principal
    handleClosePut();
  };

  return (
    <Modal
      show={showPut}
      onHide={handleClosePut}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className={styles["modal"]}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className={styles["title"]}>
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit} className={styles["container"]}>
          <Form.Group controlId="formNome">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              name="cliente"
              value={cliente.cliente || ""}
              onChange={handleInputChange}
              readOnly={nonEditableFields.includes("cliente")}
            />
          </Form.Group>
          <Form.Group controlId="formWhatsApp">
            <Form.Label>WhatsApp</Form.Label>
            <Form.Control
              type="text"
              name="WhatsApp"
              value={cliente.WhatsApp || ""}
              onChange={handleInputChange}
              readOnly={nonEditableFields.includes("WhatsApp")}
            />
          </Form.Group>
          <Form.Group controlId="formRua">
            <Form.Label>Rua</Form.Label>
            <Form.Control
              type="text"
              name="rua"
              value={cliente.rua || ""}
              onChange={handleInputChange}
              readOnly={nonEditableFields.includes("rua")}
            />
          </Form.Group>
          <Form.Group controlId="formNumero">
            <Form.Label>Número</Form.Label>
            <Form.Control
              type="text"
              name="numero"
              value={cliente.numero || ""}
              onChange={handleInputChange}
              readOnly={nonEditableFields.includes("numero")}
            />
          </Form.Group>
          <Form.Group controlId="formBairro">
            <Form.Label>Bairro</Form.Label>
            <Form.Control
              type="text"
              name="bairro"
              value={cliente.bairro || ""}
              onChange={handleInputChange}
              readOnly={nonEditableFields.includes("bairro")}
            />
          </Form.Group>
          <Form.Group controlId="formComplemento">
            <Form.Label>Complemento</Form.Label>
            <Form.Control
              type="text"
              name="complemento"
              value={cliente.complemento || ""}
              onChange={handleInputChange}
              readOnly={nonEditableFields.includes("complemento")}
            />
          </Form.Group>
          <Form.Group controlId="formCep">
            <Form.Label>CEP</Form.Label>
            <Form.Control
              type="text"
              name="cep"
              value={cliente.cep || ""}
              onChange={handleInputChange}
              readOnly={nonEditableFields.includes("cep")}
            />
          </Form.Group>
          <Form.Group controlId="formNumeroDePets">
            <Form.Label>Número de Pets</Form.Label>
            <Form.Control
              type="number"
              name="numeroDePets"
              value={cliente.numeroDePets || 0}
              onChange={handleInputChange}
              readOnly={nonEditableFields.includes("numeroDePets")}
              disabled
            />
          </Form.Group>
          <Form.Group controlId="formDtUltimoAgendamento">
            <Form.Label>Data do Último Agendamento</Form.Label>
            <Form.Control
              type="text"
              name="dtUltimoAgendamento"
              value={formatarDataParaExibicao(cliente.dtUltimoAgendamento) || ""}
              onChange={handleInputChange}
              readOnly
              disabled
            />
          </Form.Group>
          <Form.Group controlId="formTotalAgendamentos">
            <Form.Label>Total de Agendamentos</Form.Label>
            <Form.Control
              type="number"
              name="totalAgendamentos"
              value={cliente.totalAgendamentos || 0}
              onChange={handleInputChange}
              readOnly={nonEditableFields.includes("totalAgendamentos")}
              disabled
            />
          </Form.Group>
          <Button variant="primary" type="submit" className={styles["submitButton"]}>
            Salvar Alterações
          </Button>
          <Button variant="secondary" onClick={handleClosePut} className={styles["cancelButton"]}>
            Fechar
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>

      </Modal.Footer>
    </Modal>
  );
}

export default ModalPut;