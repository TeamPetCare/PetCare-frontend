import React from 'react';
//import styles from './Step3.module.css';

const Step3ScheduleServices = ({ onPrevious, onClose, selectedClient, selectedPlan }) => {
  return (
    <div>
      <h2>Agendar Serviços</h2>
      <p>Cliente: {selectedClient.name}</p>
      <p>Plano: {selectedPlan.name}</p>
      {/* Lógica para agendamento de serviços */}
      <button onClick={onPrevious}>Voltar</button>
      <button onClick={onClose}>Finalizar</button>
    </div>
  );
};

export default Step3ScheduleServices;