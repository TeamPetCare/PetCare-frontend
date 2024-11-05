import React, { useState } from 'react';
import Step1Form from './Step1Form';
import Step2Form from './Step2Form';
import Step3Form from './Step3Form';
import styles from './ModalWrapper.module.css';

const ModalWrapper = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const goToNextStep = () => setCurrentStep(currentStep + 1);
  const goToPreviousStep = () => setCurrentStep(currentStep - 1);

  return (
    <div className={styles.modal}>
      <div className={styles.stepIndicator}>Passo {currentStep}</div>
      {currentStep === 1 && <Step1Form onNext={goToNextStep} />}
      {currentStep === 2 && <Step2Form onNext={goToNextStep} onBack={goToPreviousStep} />}
      {currentStep === 3 && <Step3Form onBack={goToPreviousStep} />}
      <div className={styles.backdrop} onClick={() => setCurrentStep(0)} />
    </div>
  );
};

export default ModalWrapper;
