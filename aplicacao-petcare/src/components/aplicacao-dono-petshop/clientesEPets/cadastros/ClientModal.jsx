import React, { useState } from 'react';
import { toast } from 'react-toastify';
import userService from '../../../../services/userService';
import clientStyles from './ClientModal.module.css';
import styles from './ModalWrapper.module.css';
import InputMask from 'react-input-mask';

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
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
      toast.success('Usuário cadastrado com sucesso!');
      onClose();
    } catch (err) {
      console.error('Erro ao criar usuário:', err);
      toast.error('Erro ao cadastrar usuário. Tente novamente.');
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className={styles.backdrop} onClick={onClose}></div>
      <div className={`${styles.modal} ${clientStyles.customModal}`}>
        <h2 className={clientStyles.title}>Cadastrar Cliente</h2>
        <p className={clientStyles.subtitle}>*Campos obrigatórios</p>

        <div className={clientStyles.formGroup}>
          {/* Nome e WhatsApp */}
          <div className={clientStyles.row}>
            <div className={`${clientStyles.field} ${clientStyles.wideInput}`}>
              <label className={clientStyles.label}>
                Nome <span>*</span>
              </label>
              <input
                  placeholder="Nome completo"
                type="text"
                name="name"
                className={clientStyles.input}
                onChange={handleInputChange}
              />
            </div>
            <div className={`${clientStyles.field} ${clientStyles.narrowInput}`}>
              <label className={clientStyles.label}>
                Número de WhatsApp <span>*</span>
              </label>
              <InputMask
                mask="(99) 99999-9999"
                value={formData.phoneNumber}
                onChange={(e) => handleInputChange(e)}
                name="phoneNumber"
                className={clientStyles.input}
              />
            </div>
          </div>

          {/* Email e CPF */}
          <div className={clientStyles.row}>
            <div className={clientStyles.field}>
              <label className={clientStyles.label}>
                Email <span>*</span>
              </label>
              <input
                type="email"
                name="email"
                className={clientStyles.input}
                onChange={handleInputChange}
              />
            </div>
            <div className={clientStyles.field}>
              <label className={clientStyles.label}>
                CPF <span>*</span>
              </label>
              <input
                type="text"
                name="cpfClient"
                className={clientStyles.input}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Endereço */}
          <h3 className={clientStyles.subtitleAddress}>Endereço</h3>
          <div className={clientStyles.row}>
            <div className={`${clientStyles.field} ${clientStyles.narrowInput}`}>
              <label className={clientStyles.label}>
                CEP <span>*</span>
              </label>
              <input
                type="text"
                name="cep"
                className={clientStyles.input}
                onChange={handleInputChange}
              />
            </div>
            <div className={`${clientStyles.field} ${clientStyles.wideInput}`}>
              <label className={clientStyles.label}>
                Logradouro <span>*</span>
              </label>
              <input
                type="text"
                name="street"
                className={clientStyles.input}
                onChange={handleInputChange}
              />
            </div>
            <div className={`${clientStyles.field} ${clientStyles.narrowInput}`}>
              <label className={clientStyles.label}>
                Número <span>*</span>
              </label>
              <input
                type="text"
                name="number"
                className={clientStyles.input}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className={clientStyles.row}>
            <div className={`${clientStyles.field} ${clientStyles.narrowInput}`}>
              <label className={clientStyles.label}>
                Complemento
              </label>
              <input
                type="text"
                name="complement"
                className={clientStyles.input}
                onChange={handleInputChange}
              />
            </div>
            <div className={`${clientStyles.field} ${clientStyles.wideInput}`}>
              <label className={clientStyles.label}>
                Bairro <span>*</span>
              </label>
              <input
                type="text"
                name="district"
                className={clientStyles.input}
                onChange={handleInputChange}
              />
            </div>
            <div className={`${clientStyles.field} ${clientStyles.narrowInput}`}>
              <label className={clientStyles.label}>
                Cidade <span>*</span>
              </label>
              <input
                type="text"
                name="city"
                className={clientStyles.input}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <div className={clientStyles.buttonGroup}>
          <button className={clientStyles.cancelButton} onClick={onClose}>
            Cancelar
          </button>
          <button className={clientStyles.submitButton} onClick={handleSubmit}>
            Cadastrar
          </button>
        </div>
      </div>
    </>
  );
};

export default ClientModal;
