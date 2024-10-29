import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Step1Form from './Step1Form';
import Step2Form from './Step2Form';
import Step3Form from './Step3Form';
import userService from '../../../services/userService';
import styles from './ModalWrapper.module.css';

const ModalWrapper = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);
  const [formData, setFormData] = useState({});

  const handleNext = async (data) => {
    console.log("Dados do Passo Atual:", data);
    setFormData((prevData) => ({ ...prevData, ...data }));

    if (currentStep === 1) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === 2) {
      try {
        const petData = {
          name: data.petName,
          birthDate: data.birthDate,
          sexo: data.sexo,
          species: data.species,
          breed: data.breed,
          color: data.color,
          weight: data.weight,
          size: data.size,
          observations: data.observations,
        };

        const petResponse = await userService.createPet(petData);
        console.log("Pet criado com sucesso:", petResponse);
      } catch (err) {
        console.error("Erro ao criar pet:", err);
      }

      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const closeModal = () => {
    setIsOpen(false);
    setCurrentStep(1);
    window.location.reload();
  };

  const handleSubmit = async () => {
    try {
      const userData = {
        name: formData.name,
        userImg: "default_image.png",
        email: formData.email,
        password: "default_password",
        cellphone: formData.phoneNumber,
        role: "ROLE_CUSTOMER",
        street: formData.street,
        number: formData.number,
        complement: formData.complement,
        cep: formData.cep,
        district: formData.district,
        city: formData.city,
        cnpjOwner: null,
        roleEmployee: null,
        disponibilityStatus: false,
        cpfClient: formData.cpfClient,
        petIds: []
      };

      const response = await userService.createUser(userData);
      console.log("Usuário criado com sucesso:", response);
      toast.success("Usuário cadastrado com sucesso!"); // Exibe a notificação de sucesso
      //closeModal();
    } catch (err) {
      console.error("Erro ao criar usuário:", err);
      toast.error("Erro ao cadastrar usuário. Tente novamente."); // Notificação de erro
    }
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

  const progressWidth = `${(currentStep / 3) * 100}%`;

  if (!isOpen) return null;

  return (
    <>
      <div className={styles.modal}>
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: progressWidth }} />
        </div>
        <div className={styles.stepIndicator}>{renderStepTitles()}</div>
        {currentStep === 1 && <Step1Form onNext={handleNext} />}
        {currentStep === 2 && <Step2Form onNext={handleNext} onBack={handleBack} />}
        {currentStep === 3 && <Step3Form onBack={handleBack} onSubmit={handleSubmit} />}
      </div>
      <div className={styles.backdrop} onClick={closeModal} />
    </>
  );
};

export default ModalWrapper;