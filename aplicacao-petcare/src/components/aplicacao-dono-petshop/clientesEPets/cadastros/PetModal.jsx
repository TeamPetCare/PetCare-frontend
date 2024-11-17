import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import * as petService from '../../../../services/petService';
import userService from '../../../../services/userService';
import modalWrapperStyles from './ModalWrapper.module.css'; // Estilo do fundo do modal
import styles from './ModalWrapper.module.css'; // Estilo do fundo do modal
import petStyles from './PetModal.module.css'; // Personalizações do ClientModal

const PetModal = ({ isOpen, onClose }) => {
  const [petData, setPetData] = useState({});
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState('');

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const clientList = await userService.getAllCustomers();
        setClients(clientList);
      } catch (error) {
        console.error("Erro ao buscar clientes:", error);
      }
    };
    fetchClients();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPetData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const dataToSave = {
        ...petData,
        ownerId: selectedClient,
      };
      await petService.createPet(dataToSave);
      toast.success('Pet cadastrado com sucesso!');
      onClose();
    } catch (err) {
      console.error('Erro ao cadastrar pet:', err);
      toast.error('Erro ao cadastrar pet. Tente novamente.');
    }
  };

  if (!isOpen) return null;

  return (
    <>
 <div className={modalWrapperStyles.backdrop} onClick={onClose}></div>
<div className={`${modalWrapperStyles.modal} ${petStyles.customModal}`}>
  <h2 className={petStyles.title}>Cadastrar Pet</h2>
  <div className={petStyles.formGroup}>
    <div className={petStyles.row}>
      <select
        className={petStyles.select}
        onChange={(e) => setSelectedClient(e.target.value)}
      >
        <option value="">Selecione o Cliente</option>
        {clients.map((client) => (
          <option key={client.id} value={client.id}>
            {client.name}
          </option>
        ))}
      </select>
    </div>
    <div className={petStyles.row}>
      <input
        type="text"
        name="petName"
        placeholder="Nome do Pet"
        className={petStyles.fullInput}
        onChange={handleInputChange}
      />
    </div>
    <div className={petStyles.row}>
      <input
        type="date"
        name="birthDate"
        placeholder="Data de Nascimento"
        className={petStyles.halfInput}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="sexo"
        placeholder="Sexo"
        className={petStyles.halfInput}
        onChange={handleInputChange}
      />
    </div>
    <div className={petStyles.row}>
      <input
        type="text"
        name="species"
        placeholder="Espécie"
        className={petStyles.halfInput}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="breed"
        placeholder="Raça"
        className={petStyles.halfInput}
        onChange={handleInputChange}
      />
    </div>
    <div className={petStyles.row}>
      <input
        type="text"
        name="color"
        placeholder="Cor"
        className={petStyles.halfInput}
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="weight"
        placeholder="Peso"
        className={petStyles.halfInput}
        onChange={handleInputChange}
      />
    </div>
    <div className={petStyles.row}>
      <input
        type="text"
        name="size"
        placeholder="Porte"
        className={petStyles.halfInput}
        onChange={handleInputChange}
      />
    </div>
    <div className={petStyles.row}>
      <textarea
        name="observations"
        placeholder="Observações"
        className={petStyles.fullTextarea}
        onChange={handleInputChange}
      />
    </div>
  </div>
  <div className={petStyles.buttonGroup}>
    <button className={petStyles.submitButton} onClick={handleSubmit}>
      Cadastrar
    </button>
    <button className={petStyles.cancelButton} onClick={onClose}>
      Cancelar
    </button>
  </div>
</div>



    </>
  );
};

export default PetModal;
