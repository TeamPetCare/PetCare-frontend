import React, { useState } from 'react';
import { toast } from 'react-toastify';
import userService from '../../../../services/userService';
import clientStyles from './ClientModal.module.css'; // Personalizações do ClientModal
import styles from './ModalWrapper.module.css'; // Estilo genérico do modal

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
 <div className={`${styles.modal} ${clientStyles.customModal}`}>
  <h2 className={clientStyles.title}>Cadastrar Cliente</h2>
  <div className={clientStyles.formGroup}>
    <div className={clientStyles.row}>
      <input
        type="text"
        name="name"
        placeholder="Nome Completo"
        className={clientStyles.fullInput}
        onChange={handleInputChange}
      />
    </div>
    <div className={clientStyles.row}>
      <input
        type="email"
        name="email"
        placeholder="Email"
        className={clientStyles.halfInput}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="phoneNumber"
        placeholder="Telefone"
        className={clientStyles.halfInput}
        onChange={handleInputChange}
      />
    </div>
    <div className={clientStyles.row}>
      <input
        type="text"
        name="cpfClient"
        placeholder="CPF"
        className={clientStyles.halfInput}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="cep"
        placeholder="CEP"
        className={clientStyles.halfInput}
        onChange={handleInputChange}
      />
    </div>
    <div className={clientStyles.row}>
      <input
        type="text"
        name="street"
        placeholder="Logradouro"
        className={clientStyles.fullInput}
        onChange={handleInputChange}
      />
    </div>
    <div className={clientStyles.row}>
      <input
        type="text"
        name="number"
        placeholder="Número"
        className={clientStyles.smallInput}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="complement"
        placeholder="Complemento"
        className={clientStyles.largeInput}
        onChange={handleInputChange}
      />
    </div>
    <div className={clientStyles.row}>
      <input
        type="text"
        name="district"
        placeholder="Bairro"
        className={clientStyles.halfInput}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="city"
        placeholder="Cidade"
        className={clientStyles.halfInput}
        onChange={handleInputChange}
      />
    </div>
  </div>
  <div className={clientStyles.buttonGroup}>
    <button className={clientStyles.submitButton} onClick={handleSubmit}>
      Cadastrar
    </button>
    <button className={clientStyles.cancelButton} onClick={onClose}>
      Cancelar
    </button>
  </div>
</div>


    </>
  );
};

export default ClientModal;
