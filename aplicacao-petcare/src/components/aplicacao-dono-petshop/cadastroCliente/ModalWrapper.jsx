import React, { useState } from 'react';
import Step1Form from './Step1Form';
import Step2Form from './Step2Form';
import Step3Form from './Step3Form';
import userService from '../../../services/userService'; // Corrigido
import styles from './ModalWrapper.module.css';

const ModalWrapper = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);
  const [formData, setFormData] = useState({}); // Estado para armazenar dados do formulário

  const handleNext = async (data) => {
    console.log("Dados do Passo Atual:", data); // Log dos dados
    setFormData(prevData => ({ ...prevData, ...data })); // Atualiza o estado com os dados do passo atual

    if (currentStep === 1) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === 2) {
      // Tente criar o pet
      try {
        const petData = {
          name: data.petName, // Use o nome do pet
          birthDate: data.birthDate,
          sexo: data.sexo,
          species: data.species,
          breed: data.breed,
          color: data.color,
          weight: data.weight,
          size: data.size,
          observations: data.observations,
        };

        const petResponse = await userService.createPet(petData); // Chame a função para criar o pet
        console.log("Pet criado com sucesso:", petResponse); // Exibe informações do pet
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
      // Envie os dados completos para criar o usuário
      const userData = {
        name: formData.name,
        userImg: "default_image.png", // Defina uma imagem padrão ou mude para coletar do formulário
        email: formData.email, // Supondo que você tenha coletado o email
        password: "default_password", // Você pode ajustar isso conforme necessário
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
        petIds: [] // Adicione IDs de pets se você estiver coletando isso
      };

      const response = await userService.createUser(userData);
      console.log("Usuário criado com sucesso:", response);
      alert("Usuário cadastrado com sucesso!");
      closeModal();
    } catch (err) {
      console.error("Erro ao criar usuário:", err);
      alert("Erro ao cadastrar usuário. Tente novamente.");
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

  const progressWidth = `${(currentStep / 3) * 100}%`; // Calcula a largura da barra de progresso

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
