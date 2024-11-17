import React, { useState } from 'react';
import styles from './ModalWrapper.module.css'; // Estilo genérico do modal
import planStyles from './PlanModal.module.css'; // Estilo específico para PlanModal

const PlanModal = ({ isOpen, onClose, pets }) => {
  const [selectedPlan, setSelectedPlan] = useState('');
  const [selectedPet, setSelectedPet] = useState('');

  const handlePlanChange = (e) => {
    setSelectedPlan(e.target.value);
  };

  const handlePetChange = (e) => {
    setSelectedPet(e.target.value);
  };

  const handleSubmit = () => {
    console.log('Plano selecionado:', selectedPlan);
    console.log('Pet selecionado:', selectedPet);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className={styles.backdrop} onClick={onClose}></div>
      <div className={`${styles.modal} ${planStyles.customModal}`}>
        <h2 className={planStyles.title}>Atribuir Plano</h2>
        <div className={planStyles.formGroup}>
          <label className={planStyles.label}>Selecione o Plano:</label>
          <div className={planStyles.radioGroup}>
            <label className={planStyles.radioOption}>
              <input
                type="radio"
                name="plan"
                value="Mensal"
                checked={selectedPlan === 'Mensal'}
                onChange={handlePlanChange}
              />
              Mensal
            </label>
            <label className={planStyles.radioOption}>
              <input
                type="radio"
                name="plan"
                value="Quinzenal"
                checked={selectedPlan === 'Quinzenal'}
                onChange={handlePlanChange}
              />
              Quinzenal
            </label>
          </div>
        </div>
        <div className={planStyles.formGroup}>
          <label className={planStyles.label}>Selecione o Pet:</label>
          <select
            className={planStyles.select}
            value={selectedPet}
            onChange={handlePetChange}
          >
            <option value="">Selecione um pet</option>
            {pets.map((pet) => (
              <option key={pet.id} value={pet.id}>
                {pet.name}
              </option>
            ))}
          </select>
        </div>
        <div className={planStyles.buttonGroup}>
          <button className={planStyles.submitButton} onClick={handleSubmit}>
            Confirmar
          </button>
          <button className={planStyles.cancelButton} onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </>
  );
};

export default PlanModal;
