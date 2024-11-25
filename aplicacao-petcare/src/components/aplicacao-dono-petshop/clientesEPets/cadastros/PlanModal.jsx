import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getAllCustomerAndPets } from '../../../../services/userService';
import styles from './ModalWrapper.module.css';
import planStyles from './PlanModal.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faTrash } from '@fortawesome/free-solid-svg-icons';
library.add(faUser, faTrash);


const PlanModal = ({ isOpen, onClose, onNext }) => {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);

  useEffect(() => {
    if (isOpen) {
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
    }
  }, [isOpen]);

  const handleClientSelect = (e) => {
    const clientId = e.target.value;
    const client = clients.find((c) => c.id === parseInt(clientId));
    setSelectedClient(client);
  };

  const clearSelection = () => {
    setSelectedClient(null);
  };

  const handleNext = () => {
    if (!selectedClient) {
      toast.error('Por favor, selecione um cliente.');
      return;
    }
    onNext(selectedClient);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className={styles.backdrop} onClick={onClose}></div>
      <div className={`${styles.modal} ${planStyles.customModal}`}>
        <h2 className={planStyles.title}>Atribuir Cliente</h2>
        <p className={planStyles.subtitle}>*Campos obrigatórios</p>

        <div className={planStyles.formGroup}>
          {/* <label className={planStyles.label}>Cliente</label> */}

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
                  {selectedClient.cellphone || 'Sem número'} {/* Mostra o número do cliente */}
                </p>
              </div>
              {selectedClient && (
                <button className={`${planStyles.deleteButton} ${planStyles.rightAligned}`} onClick={clearSelection}>
  <FontAwesomeIcon icon="trash" />
</button>

)}
            </div>
          )}
        </div>

        <div className={planStyles.buttonGroup}>
          <button className={planStyles.cancelButton} onClick={onClose}>
            Cancelar
          </button>
          <button
            className={planStyles.nextButton}
            onClick={handleNext}
          >
            Próximo - Atribuir Plano
          </button>
        </div>
      </div>
    </>
  );
};

export default PlanModal;
