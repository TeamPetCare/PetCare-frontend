import React, { useState } from 'react';
import Step1Form from './Step1Form';
import Step2Form from './Step2Form';
import Step3Form from './Step3Form';
import styles from './ModalWrapper.module.css';

const ModalWrapper = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true); // Novo estado para controlar a visibilidade do modal

  const goToNextStep = () => setCurrentStep(currentStep + 1);
  const goToPreviousStep = () => setCurrentStep(currentStep - 1);
  
  const closeModal = () => {
    setIsOpen(false); // Fecha o modal
    setCurrentStep(1); // Redefine o passo inicial para 1 quando o modal é fechado
    window.location.reload();

  };

  if (!isOpen) return null; // Não renderiza o modal se ele estiver fechado

  return (
    <>
      <div className={styles.modal}>
        <div className={styles.stepIndicator}>Passo {currentStep}</div>
        {currentStep === 1 && <Step1Form onNext={goToNextStep} />}
        {currentStep === 2 && <Step2Form onNext={goToNextStep} onBack={goToPreviousStep} />}
        {currentStep === 3 && <Step3Form onBack={goToPreviousStep} />}
      </div>
      <div className={styles.backdrop} onClick={closeModal} />
    </>
  );
};

export default ModalWrapper;
