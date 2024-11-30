import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import plansService from '../../../../services/plansService';
import petService from '../../../../services/petService';
import modalStyles from './PlanModal.module.css'; // Estilos gerais do modal
import step2Styles from './Step2Plan.module.css'; // Estilos específicos deste step

const Step2PlanSelection = ({ onNext, onPrevious, selectedClient, onPlanSelect, selectedPlan }) => {
  const [plans, setPlans] = useState([]);
  const [pets, setPets] = useState([]);
  const [selectedPlans, setSelectedPlans] = useState(selectedPlan ? [selectedPlan.id] : []); // Agora um array
  const [applyDiscount, setApplyDiscount] = useState(false);

  useEffect(() => {
    const fetchPlansAndPets = async () => {
      try {
        const fetchedPlans = await plansService.getAllPlans();
        const fetchedPets = await petService.getAllPets();

        // Filtrar pets associados ao cliente selecionado
        const clientPets = fetchedPets.filter((pet) => pet.userId === selectedClient.id);
        setPlans(fetchedPlans);
        setPets(clientPets);
      } catch (error) {
        console.error('Erro ao buscar planos e pets:', error);
        toast.error('Erro ao carregar planos ou pets.');
      }
    };

    if (selectedClient) fetchPlansAndPets();
  }, [selectedClient]);

  const handlePlanSelect = (planId) => {
    setSelectedPlans((prevSelected) => {
      if (prevSelected.includes(planId)) {
        // Remove o plano se já estiver selecionado
        return prevSelected.filter((id) => id !== planId);
      } else {
        // Adiciona o plano se não estiver selecionado
        return [...prevSelected, planId];
      }
    });
  };

  const calculatePrice = (price) => {
    return applyDiscount ? (price * 0.8).toFixed(2) : price.toFixed(2);
  };

  const handleNext = () => {
    if (selectedPlans.length === 0) {
      toast.error('Por favor, selecione pelo menos um plano.');
      return;
    }
    const selectedPlanObjects = plans.filter((plan) => selectedPlans.includes(plan.id));
    onPlanSelect(selectedPlanObjects); // Passa os planos selecionados para o próximo passo
    onNext();
  };

  return (
    <div className={modalStyles.modal}>
      <h2 className={modalStyles.title}>Atribuir Planos</h2>
      <p className={modalStyles.subtitle}>
        *Campos obrigatórios.
        <br />
        Ao selecionar um plano, o cliente será vinculado a ele e deverá efetuar o pagamento correspondente.
      </p>

      {/* Grid com duas colunas: Planos e Pets */}
      <div className={step2Styles.gridContainer}>
        {/* Coluna: Selecionar Plano */}
        <div className={step2Styles.gridItem}>
          <label className={step2Styles.label}>Selecione o plano*</label>
          <div className={step2Styles.checkboxGroup}>
            {plans.map((plan) => (
              <label key={plan.id} className={step2Styles.checkboxLabel}>
                <input
                  type="checkbox"
                  id={`plan-${plan.id}`}
                  name={`plan-${plan.id}`}
                  value={plan.id}
                  checked={selectedPlans.includes(plan.id)}
                  onChange={() => handlePlanSelect(plan.id)}
                />
                {plan.name} - R$ {calculatePrice(plan.price)}
              </label>
            ))}
          </div>
        </div>

        {/* Coluna: Pets Associados */}
        <div className={step2Styles.gridItem}>
          <label className={step2Styles.label}>Pets associados ao cliente</label>
          <div className={step2Styles.checkboxGroup}>
            {pets.length > 0 ? (
              pets.map((pet) => (
                <label key={pet.id} className={step2Styles.checkboxLabel}>
                  <input type="checkbox" id={`pet-${pet.id}`} />
                  <div className={step2Styles.petInfo}>
                    <img
                      src={pet.image || 'defaultPetImage.png'}
                      alt={pet.name}
                      className={step2Styles.petImage}
                    />
                    <span>{pet.name}</span>
                  </div>
                </label>
              ))
            ) : (
              <p className={step2Styles.noData}>Nenhum pet associado ao cliente.</p>
            )}
          </div>
        </div>
      </div>

      {/* Linha para Preço e Desconto */}
      <div className={step2Styles.priceRow}>
        {/* Preço do Plano */}
        <p className={step2Styles.price}>
          Preço do Plano: R$ {selectedPlan ? calculatePrice(selectedPlan.price) : '0.00'}
        </p>

        {/* Checkbox de Desconto */}
        <div className={step2Styles.discountCheckboxGroup}>
          <input
            type="checkbox"
            id="apply-discount"
            className={step2Styles.checkboxLabel} /* Aplica o mesmo estilo */
            checked={applyDiscount}
            onChange={() => setApplyDiscount((prev) => !prev)}
          />
          <label htmlFor="apply-discount">Aplicar Desconto (20%)</label>
        </div>
      </div>

      {/* Botões de Navegação */}
      <div className={modalStyles.buttonGroup}>
        <button className={modalStyles.cancelButton} onClick={onPrevious}>
          Voltar
        </button>
        <button className={modalStyles.nextButton} onClick={handleNext}>
          Próximo - Agendar Serviços
        </button>
      </div>
    </div>
  );
};

export default Step2PlanSelection;