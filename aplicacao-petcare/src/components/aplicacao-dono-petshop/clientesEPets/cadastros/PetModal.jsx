import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import * as petService from '../../../../services/petService';
import userService from '../../../../services/userService';
import modalWrapperStyles from './ModalWrapper.module.css'; // Estilo do fundo do modal
import styles from './ModalWrapper.module.css'; // Estilo do fundo do modal

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
      <div className={modalWrapperStyles.backdrop} onClick={onClose}></div> {/* Usa o estilo de ModalWrapper */}
      <div className={styles.modal}> {/* Usa o estilo de PetModal */}
        <h2>Cadastrar Pet</h2>
        <select onChange={(e) => setSelectedClient(e.target.value)}>
          <option value="">Selecione o Cliente</option>
          {clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.name}
            </option>
          ))}
        </select>
        <input type="text" name="petName" placeholder="Nome do Pet" onChange={handleInputChange} />
        <input type="date" name="birthDate" placeholder="Data de Nascimento" onChange={handleInputChange} />
        <input type="text" name="sexo" placeholder="Sexo" onChange={handleInputChange} />
        <input type="text" name="species" placeholder="Espécie" onChange={handleInputChange} />
        <input type="text" name="breed" placeholder="Raça" onChange={handleInputChange} />
        <input type="text" name="color" placeholder="Cor" onChange={handleInputChange} />
        <input type="number" name="weight" placeholder="Peso" onChange={handleInputChange} />
        <input type="text" name="size" placeholder="Porte" onChange={handleInputChange} />
        <textarea name="observations" placeholder="Observações" onChange={handleInputChange} />
        <button onClick={handleSubmit}>Cadastrar</button>
        <button onClick={onClose}>Cancelar</button>
      </div>
    </>
  );
};

export default PetModal;
