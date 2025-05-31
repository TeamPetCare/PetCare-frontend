import React, { useState } from 'react';
import { toast } from 'react-toastify';
import userService from '../../../../services/userService';
import styles from './ModalWrapper.module.css';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import {
  FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaHashtag,
  FaBuilding, FaCity, FaAddressCard
} from 'react-icons/fa';
import Modal from "react-bootstrap/Modal";
import StepProgressBar from '../../../shared/steps/StepProgressBar'

const ClientModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    street: '',
    number: '',
    complement: '',
    cep: '',
    district: '',
    city: '',
    cpfClient: '',
  });

  const [isLoadingCep, setIsLoadingCep] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCepBlur = async () => {
    const cepLimpo = formData.cep.replace(/\D/g, '');
    if (cepLimpo.length !== 8) return;

    try {
      setIsLoadingCep(true);
      const response = await axios.get(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = response.data;

      if (data.erro) {
        toast.error('CEP não encontrado.');
        return;
      }

      await new Promise(resolve => setTimeout(resolve, 2000));

      setFormData((prevData) => ({
        ...prevData,
        street: data.logradouro || '',
        district: data.bairro || '',
        city: data.localidade || '',
      }));
    } catch (error) {
      console.error('Erro ao buscar o endereço:', error);
      toast.error('Erro ao buscar o endereço. Verifique o CEP e tente novamente.');
    } finally {
      setIsLoadingCep(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const userData = {
        ...formData,
        userImg: 'default_image.png',
        password: 'default_password',
        role: 'ROLE_CUSTOMER',
        cellphone: formData.phoneNumber,
        cnpjOwner: null,
        roleEmployee: null,
        disponibilityStatus: false,
        petIds: [],
      };
      await userService.createUser(userData);
      setCurrentStep(2);
      toast.success('Usuário cadastrado com sucesso!');

      await new Promise(resolve => setTimeout(resolve, 1000));

      onClose();
    } catch (err) {
      console.error('Erro ao criar usuário:', err);
      toast.error('Erro ao cadastrar usuário. Tente novamente.');
    }
  };

  const steps = ["Editar Agendamento", "Confirmação"];

  return (
    <Modal
      show={isOpen}
      onHide={onClose}
      backdrop="static"
      keyboard={false}
      size="lg"
      centered
    >
      <Modal.Header closeButton className={styles.modalHeader}>
        <StepProgressBar steps={steps} currentStep={currentStep} />
      </Modal.Header>

      <Modal.Body>
        <div className={styles.modalTitle}>
          <h2>Cadastrar Cliente</h2>
          <p>*Campos Obrigatórios.</p>
        </div>

        <Form>
          <div className={styles.containerInputs}>
            <InputGroup className="mb-2">
              <InputGroup.Text className={styles.iconForm}><FaUser /></InputGroup.Text>
              <Form.Control
                className={styles.inputForm}
                type="text"
                name="name"
                placeholder="Nome Completo*"
                onChange={handleInputChange}
                value={formData.name}
                required
              />
            </InputGroup>

            <InputGroup className="mb-2">
              <InputGroup.Text className={styles.iconForm}><FaAddressCard /></InputGroup.Text>
              <Form.Control
                className={styles.inputForm}
                type="text"
                name="cpfClient"
                placeholder="CPF*"
                onChange={handleInputChange}
                value={formData.cpfClient}
              />
            </InputGroup>
          </div>

          <div className={styles.containerInputs}>
            <InputGroup className="mb-2">
              <InputGroup.Text className={styles.iconForm}><FaEnvelope /></InputGroup.Text>
              <Form.Control
                className={styles.inputForm}
                type="email"
                name="email"
                placeholder="E-mail*"
                onChange={handleInputChange}
                value={formData.email}
              />
            </InputGroup>

            <InputGroup className="mb-2">
              <InputGroup.Text className={styles.iconForm}><FaPhone /></InputGroup.Text>
              <Form.Control
                className={styles.inputForm}
                type="text"
                name="phoneNumber"
                placeholder="Telefone*"
                onChange={handleInputChange}
                value={formData.phoneNumber}
              />
            </InputGroup>
          </div>

          <InputGroup className="mb-2">
            <InputGroup.Text className={styles.iconForm}><FaMapMarkerAlt /></InputGroup.Text>
            <Form.Control
              className={styles.inputForm}
              type="text"
              name="cep"
              placeholder="CEP*"
              onChange={handleInputChange}
              onBlur={handleCepBlur}
              value={formData.cep}
            />
          </InputGroup>

          {isLoadingCep && <p>⏳ Buscando endereço...</p>}

          <InputGroup className="mb-2">
            <InputGroup.Text className={styles.iconForm}><FaMapMarkerAlt /></InputGroup.Text>
            <Form.Control
              className={styles.inputForm}
              type="text"
              name="street"
              placeholder="Logradouro*"
              onChange={handleInputChange}
              value={formData.street}
            />
          </InputGroup>

          <div className={styles.containerInputs}>
            <InputGroup className="mb-2">
              <InputGroup.Text className={styles.iconForm}><FaBuilding /></InputGroup.Text>
              <Form.Control
                className={styles.inputForm}
                type="text"
                name="district"
                placeholder="Bairro*"
                onChange={handleInputChange}
                value={formData.district}
              />
            </InputGroup>

            <InputGroup className="mb-2">
              <InputGroup.Text className={styles.iconForm}><FaHashtag /></InputGroup.Text>
              <Form.Control
                className={styles.inputForm}
                type="text"
                name="number"
                placeholder="Número*"
                onChange={handleInputChange}
                value={formData.number}
              />
            </InputGroup>
          </div>

          <div className={styles.containerInputs}>
            <InputGroup className="mb-2">
              <InputGroup.Text className={styles.iconForm}><FaBuilding /></InputGroup.Text>
              <Form.Control
                className={styles.inputForm}
                type="text"
                name="complement"
                placeholder="Complemento"
                onChange={handleInputChange}
                value={formData.complement}
              />
            </InputGroup>

            <InputGroup className="mb-2">
              <InputGroup.Text className={styles.iconForm}><FaCity /></InputGroup.Text>
              <Form.Control
                className={styles.inputForm}
                type="text"
                name="city"
                placeholder="Cidade*"
                onChange={handleInputChange}
                value={formData.city}
              />
            </InputGroup>
          </div>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <div className="d-flex w-100 gap-3">
          <button
            className={`${styles.btnCancelar} w-50`}
            type="button"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className={`${styles.btnCadastrar} w-50`}
            type="button"
            onClick={handleSubmit}
          >
            Cadastrar
          </button>
        </div>
      </Modal.Footer>

    </Modal>
  );
};

export default ClientModal;
