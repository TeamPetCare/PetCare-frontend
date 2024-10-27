import React, { useState } from 'react';
import Step1Form from './Step1Form';
import Step2Form from './Step2Form';
import Step3Form from './Step3Form';
import styles from './ModalWrapper.module.css';

const ModalWrapper = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  const goToNextStep = () => setCurrentStep(currentStep + 1);
  const goToPreviousStep = () => setCurrentStep(currentStep - 1);
  
  const closeModal = () => {
    setIsOpen(false);
    setCurrentStep(1);
    window.location.reload();
  };

  const renderStepTitles = () => {
    const steps = [
      { title: 'Cadastrar Cliente', index: 1 },
      { title: 'Cadastrar Pet', index: 2 },
      { title: 'Atribuir Planos', index: 3 },
    ];

    return (
      <ul className={styles.stepContainer}>
        {steps.map((step) => (
          <li
            key={step.index}
            className={`${styles.stepBox} ${step.index === currentStep ? styles.active : ''}`}
          >
            {step.index}. {step.title}
          </li>
        ))}
      </ul>
    );
  };

  const progressWidth = `${(currentStep / 3) * 100}%`; // Calcula a largura da barra de progresso

  if (!isOpen) return null;

  return (
    <>
      <div className={styles.modal}>
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: progressWidth }} />
        </div>
        <div className={styles.stepIndicator}>{renderStepTitles()}</div>
        {currentStep === 1 && <Step1Form onNext={goToNextStep} />}
        {currentStep === 2 && <Step2Form onNext={goToNextStep} onBack={goToPreviousStep} />}
        {currentStep === 3 && <Step3Form onBack={goToPreviousStep} />}
      </div>
      <div className={styles.backdrop} onClick={closeModal} />
    </>
  );
};

export default ModalWrapper;
