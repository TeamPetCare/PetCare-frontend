import React from 'react';
import styles from './ModalWrapper.module.css'; // Estilo do fundo do modal
// import styles from './PlanModal.module.css';

const PlanModal = ({ isOpen, onClose, pets }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className={styles.backdrop} onClick={onClose}></div>
      <div className={styles.modal}>
        <h2>Atribuir Plano</h2>
        <div>
          <label>Selecione o Plano:</label>
          <input type="radio" name="plan" value="Mensal" /> Mensal
          <input type="radio" name="plan" value="Quinzenal" /> Quinzenal
          <input type="radio" name="plan" value="Nenhum" /> Nenhum
        </div>
        <div>
          <label>Pets:</label>
          {pets.map((pet) => (
            <div key={pet.id}>
              <input type="checkbox" value={pet.id} /> {pet.name}
            </div>
          ))}
        </div>
        <button onClick={onClose}>Cancelar</button>
      </div>
    </>
  );
};

export default PlanModal;
