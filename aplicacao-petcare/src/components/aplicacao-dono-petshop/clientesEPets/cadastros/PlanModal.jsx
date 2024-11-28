import React, { useState } from 'react';
import styles from './ModalWrapper.module.css';
import Step1ClientSelection from './Step1ClientSelection';
import Step2PlanSelection from './Step2PlanSelection';
import Step3ScheduleServices from './Step3ScheduleServices';

const PlanModal = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [schedule, setSchedule] = useState([]);

  const handleNextStep = () => setCurrentStep((prev) => prev + 1);
  const handlePreviousStep = () => setCurrentStep((prev) => prev - 1);

  const handleClose = () => {
    setCurrentStep(1);
    setSelectedClient(null);
    setSelectedPlan(null);
    setSchedule([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className={styles.backdrop} onClick={handleClose}></div>
      <div className={styles.modal}>
        {currentStep === 1 && (
          <Step1ClientSelection
            onNext={handleNextStep}
            onClose={handleClose}
            onClientSelect={setSelectedClient}
            selectedClient={selectedClient}
          />
        )}
        {currentStep === 2 && (
          <Step2PlanSelection
            onNext={handleNextStep}
            onPrevious={handlePreviousStep}
            selectedClient={selectedClient}
            onPlanSelect={setSelectedPlan}
            selectedPlan={selectedPlan}
          />
        )}
        {currentStep === 3 && (
          <Step3ScheduleServices
            onPrevious={handlePreviousStep}
            onClose={handleClose}
            selectedClient={selectedClient}
            selectedPlan={selectedPlan}
            schedule={schedule}
            onScheduleUpdate={setSchedule}
          />
        )}
      </div>
    </>
  );
};

export default PlanModal;
