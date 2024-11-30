import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getAllCustomerAndPets } from '../../../../services/userService';
import planStyles from './PlanModal.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faTrash } from '@fortawesome/free-solid-svg-icons';

library.add(faUser, faTrash);

const Step1ClientSelection = ({ onNext, onClose, onClientSelect, selectedClient }) => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const clientList = await getAllCustomerAndPets();
        setClients(clientList);
      } catch (error) {
        console.error('Erro ao buscar clientes:', error);
        toast.error('Erro ao carregar os clientes. Tente novamente.');
      }
    };

    fetchClients();
  }, []);

  const handleClientSelect = (e) => {
    const clientId = e.target.value;
    const client = clients.find((c) => c.id === parseInt(clientId));
    onClientSelect(client);
  };

  const clearSelection = () => {
    onClientSelect(null);
  };

  const handleNext = () => {
    if (!selectedClient) {
      toast.error('Por favor, selecione um cliente.');
      return;
    }
    onNext();
  };

  return (
    <>
      <h2 className={planStyles.title}>Atribuir Cliente</h2>
      <p className={planStyles.subtitle}>*Campos obrigatórios</p>

      <div className={planStyles.formGroup}>
        <div className={planStyles.selectWrapper}>
          <select
            className={planStyles.select}
            onChange={handleClientSelect}
            value={selectedClient?.id || ''}
          >
            <option value="">Selecione um cliente*</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.name}
              </option>
            ))}
          </select>
          <FontAwesomeIcon icon="user" className={planStyles.iconInsideSelect} />
        </div>

        {selectedClient && (
          <div className={planStyles.selectedClient}>
            <img
              src={selectedClient.photo || '/default-user.png'}
              alt="Cliente"
              className={planStyles.clientPhoto}
            />
            <div>
              <p className={planStyles.clientName}>{selectedClient.name}</p>
              <p className={planStyles.clientPhone}>
                {selectedClient.cellphone || 'Sem número'}
              </p>
            </div>
            <button
              className={`${planStyles.deleteButton} ${planStyles.rightAligned}`}
              onClick={clearSelection}
            >
              <FontAwesomeIcon icon="trash" />
            </button>
          </div>
        )}
      </div>

      <div className={planStyles.buttonGroup}>
        <button className={planStyles.cancelButton} onClick={onClose}>
          Cancelar
        </button>
        <button className={planStyles.nextButton} onClick={handleNext}>
          Próximo - Atribuir Plano
        </button>
      </div>
    </>
  );
};

export default Step1ClientSelection;