import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import styles from './ModalPut.module.css'; // Supondo que você tenha esse arquivo CSS

function ModalPut({
  showPut,
  handleClosePut,
  onPut,
  dados = [],
  title = "Editar Cliente",
  cliente = {},
  nonEditableFields = [], // Campos não editáveis
}) {
  const [clienteAtual, setClienteAtual] = useState(cliente);

  useEffect(() => {
    if (dados.length > 0) {
      const dataOriginal = dados[0].dtUltimoAgendamento;
      const dataFormatada = formatarDataParaIso(dataOriginal);

      setClienteAtual({
        ...dados[0],
        dtUltimoAgendamento: dataFormatada,
      });
    }
  }, [dados, showPut]);

  const formatarDataParaIso = (data) => {
    if (!data) return "";
    const partes = data.split("/");
    if (partes.length === 3) {
      const [dia, mes, ano] = partes;
      return `${ano}-${mes.padStart(2, "0")}-${dia.padStart(2, "0")}`;
    }
    return data; // Retorna como está caso o formato não seja o esperado
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
    onPut(clienteAtual);
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
          {/** Campos de Formulário **/}
          <Form.Group controlId="formNome">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              name="cliente"
              value={clienteAtual.cliente || ""}
              onChange={handleInputChange}
              readOnly={nonEditableFields.includes("cliente")}
            />
          </Form.Group>
          <Form.Group controlId="formWhatsApp">
            <Form.Label>WhatsApp</Form.Label>
            <Form.Control
              type="text"
              name="WhatsApp"
              value={clienteAtual.WhatsApp || ""}
              onChange={handleInputChange}
              readOnly={nonEditableFields.includes("WhatsApp")}
            />
          </Form.Group>
          <Form.Group controlId="formRua">
            <Form.Label>Rua</Form.Label>
            <Form.Control
              type="text"
              name="rua"
              value={clienteAtual.rua || ""}
              onChange={handleInputChange}
              readOnly={nonEditableFields.includes("rua")}
            />
          </Form.Group>
          <Form.Group controlId="formNumero">
            <Form.Label>Número</Form.Label>
            <Form.Control
              type="text"
              name="numero"
              value={clienteAtual.numero || ""}
              onChange={handleInputChange}
              readOnly={nonEditableFields.includes("numero")}
            />
          </Form.Group>
          <Form.Group controlId="formBairro">
            <Form.Label>Bairro</Form.Label>
            <Form.Control
              type="text"
              name="bairro"
              value={clienteAtual.bairro || ""}
              onChange={handleInputChange}
              readOnly={nonEditableFields.includes("bairro")}
            />
          </Form.Group>
          <Form.Group controlId="formComplemento">
            <Form.Label>Complemento</Form.Label>
            <Form.Control
              type="text"
              name="complemento"
              value={clienteAtual.complemento || ""}
              onChange={handleInputChange}
              readOnly={nonEditableFields.includes("complemento")}
            />
          </Form.Group>
          <Form.Group controlId="formCep">
            <Form.Label>CEP</Form.Label>
            <Form.Control
              type="text"
              name="cep"
              value={clienteAtual.cep || ""}
              onChange={handleInputChange}
              readOnly={nonEditableFields.includes("cep")}
            />
          </Form.Group>
          <Form.Group controlId="formDtUltimoAgendamento">
            <Form.Label>Data do Último Agendamento</Form.Label>
            <Form.Control
              type="date"
              name="dtUltimoAgendamento"
              value={clienteAtual.dtUltimoAgendamento || ""}
              onChange={handleInputChange}
              readOnly
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" type="submit" className={styles["submitButton"]} onClick={handleSubmit}>
          Salvar Alterações
        </Button>
        <Button variant="secondary" onClick={handleClosePut} className={styles["cancelButton"]}>
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalPut;
