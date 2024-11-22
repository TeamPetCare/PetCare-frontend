import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import plansService from '../../../../services/plansService';
import petService from '../../../../services/petService';
import styles from './ModalWrapper.module.css';
import planStyles from './PlanModal.module.css';

const PlanModal = ({ isOpen, onClose }) => {
  const [plans, setPlans] = useState([]);
  const [pets, setPets] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState('');
  const [selectedPet, setSelectedPet] = useState('');

  useEffect(() => {
    if (isOpen) {
      const fetchData = async () => {
        try {
          console.log('Buscando planos e pets...');
          const [planList, petList] = await Promise.all([
            plansService.getAllPlans(),
            petService.getAllPets(),
          ]);

          console.log('Planos carregados:', planList);
          setPlans(planList);

          console.log('Pets carregados:', petList);
          setPets(petList);
        } catch (error) {
          console.error('Erro ao buscar dados:', error);
          toast.error('Erro ao carregar os dados. Tente novamente.');
        }
      };

      fetchData();
    }
  }, [isOpen]);

  const handlePlanChange = (e) => {
    setSelectedPlan(e.target.value);
  };

  const handlePetChange = (e) => {
    setSelectedPet(e.target.value);
  };

  const handleSubmit = async () => {
    if (!selectedPlan || !selectedPet) {
      toast.error('Por favor, selecione um plano e um pet.');
      return;
    }

    console.log('Plano selecionado:', selectedPlan);
    console.log('Pet selecionado:', selectedPet);

    try {
      // Simule o envio ao backend
      console.log('Atribuindo plano ao pet...');
      // Aqui você pode integrar a chamada ao backend, se necessário
      toast.success('Plano atribuído ao pet com sucesso!');
      onClose();
    } catch (error) {
      console.error('Erro ao atribuir plano ao pet:', error);
      toast.error('Erro ao atribuir plano. Tente novamente.');
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className={styles.backdrop} onClick={onClose}></div>
      <div className={`${styles.modal} ${planStyles.customModal}`}>
        <h2 className={planStyles.title}>Atribuir Plano ao Pet</h2>
        <div className={planStyles.formGroup}>
          {/* Listar Planos */}
          <label className={planStyles.label}>Selecione o Plano:</label>
          <select
            className={planStyles.select}
            value={selectedPlan}
            onChange={handlePlanChange}
          >
            <option value="">Selecione um plano</option>
            {plans?.map((plan) => (
              <option key={plan.id} value={plan.id}>
                {plan.name} - R$ {plan.price}
              </option>
            ))}
          </select>
        </div>
        <div className={planStyles.formGroup}>
          {/* Listar Pets */}
          <label className={planStyles.label}>Selecione o Pet:</label>
          <select
            className={planStyles.select}
            value={selectedPet}
            onChange={handlePetChange}
          >
            <option value="">Selecione um pet</option>
            {pets?.map((pet) => (
              <option key={pet.id} value={pet.id}>
                {pet.name || 'Sem Nome'}
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
