import React, { useState } from 'react';
import Step1Form from './Step1Form';
import Step2Form from './Step2Form';
import Step3Form from './Step3Form';
import styles from './ModalWrapper.module.css';

const ModalWrapper = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const goToNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className={styles.backdrop} onClick={() => setCurrentStep(0)}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}> {/* Previne o clique do backdrop */}
        <div className={styles.stepIndicator}>Passo {currentStep}</div>
        {currentStep === 1 && <Step1Form onNext={goToNextStep} />}
        {currentStep === 2 && <Step2Form onNext={goToNextStep} onBack={goToPreviousStep} />}
        {currentStep === 3 && <Step3Form onBack={goToPreviousStep} />}
      </div>
    </div>
  );
};

export default ModalWrapper;
