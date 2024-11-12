import React, { useState } from 'react';
import { toast } from 'react-toastify';
import userService from '../../../services/userService';
import styles from './ModalWrapper.module.css';


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
      <div className={styles.modal}>
        <h2>Cadastrar Cliente</h2>
        <input type="text" name="name" placeholder="Nome" onChange={handleInputChange} />
        <input type="email" name="email" placeholder="Email" onChange={handleInputChange} />
        <input type="text" name="phoneNumber" placeholder="Telefone" onChange={handleInputChange} />
        <input type="text" name="cep" placeholder="CEP" onChange={handleInputChange} />
        <input type="text" name="street" placeholder="Logradouro" onChange={handleInputChange} />
        <input type="text" name="number" placeholder="Número" onChange={handleInputChange} />
        <input type="text" name="complement" placeholder="Complemento" onChange={handleInputChange} />
        <input type="text" name="district" placeholder="Bairro" onChange={handleInputChange} />
        <input type="text" name="city" placeholder="Cidade" onChange={handleInputChange} />
        <input type="text" name="cpfClient" placeholder="CPF" onChange={handleInputChange} />
        <button onClick={handleSubmit}>Cadastrar</button>
        <button onClick={onClose}>Cancelar</button>
      </div>
    </>
  );
};

export default ClientModal;
