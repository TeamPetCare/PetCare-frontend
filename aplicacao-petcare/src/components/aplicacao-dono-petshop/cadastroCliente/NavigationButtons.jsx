import React from 'react';
import styles from './NavigationButtons.module.css';

const NavigationButtons = ({ onCancel, onBack, onNext, isFinalStep }) => (
  <div className={styles.buttonContainer}>
    {onCancel && <button onClick={onCancel}>Cancelar</button>}
    {onBack && <button onClick={onBack}>Voltar</button>}
    <button onClick={onNext}>{isFinalStep ? 'Cadastrar Cliente' : 'Próximo'}</button>
  </div>
);

export default NavigationButtons;
