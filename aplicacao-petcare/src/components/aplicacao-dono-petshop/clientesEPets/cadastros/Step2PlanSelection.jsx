import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import plansService from "../../../../services/plansService";
import planTypeService from "../../../../services/planTypeService";
import petService from "../../../../services/petService";
import { getAllServicos } from "../../../../services/servicosService";
import modalStyles from "./PlanModal.module.css";
import step2Styles from "./Step2Plan.module.css";

const Step2PlanSelection = ({ onNext, onPrevious, selectedClient, onPlanSelect }) => {
  const [planName, setPlanName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [planTypeId, setPlanTypeId] = useState(null);
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [petIds, setPetIds] = useState([]);
  const [pets, setPets] = useState([]);
  const [planTypes, setPlanTypes] = useState([]);
  const [applyDiscount, setApplyDiscount] = useState(false);
  const [finalPrice, setFinalPrice] = useState(0);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const fetchedPlanTypes = await planTypeService.getAllPlanTypes();
        setPlanTypes(fetchedPlanTypes);

        const fetchedServices = await getAllServicos();
        setServices(fetchedServices);

        const fetchedPets = await petService.getAllPets();
        const clientPets = fetchedPets.filter(
          (pet) => pet.userId === selectedClient.id
        );
        setPets(clientPets);
      } catch (error) {
        console.error("Erro ao buscar dados iniciais:", error);
        toast.error("Erro ao carregar dados iniciais.");
      }
    };

    if (selectedClient) {
      fetchInitialData();
    }
  }, [selectedClient]);

  useEffect(() => {
    const basePrice = parseFloat(price || 0);
    const discount = applyDiscount && petIds.length >= 2 ? basePrice * 0.1 : 0;
    setFinalPrice((basePrice - discount).toFixed(2));
  }, [price, applyDiscount, petIds]);

  const handlePlanTypeChange = (planTypeId) => {
    setPlanTypeId(planTypeId);
    const selectedPlanType = planTypes.find(
      (type) => type.id === parseInt(planTypeId)
    );
    if (selectedPlanType) {
      setSelectedServices(selectedPlanType.serviceIds || []);
    }
  };

  const handleDiscountChange = () => {
    if (petIds.length >= 2) {
      setApplyDiscount((prev) => !prev);
    } else {
      toast.error("Selecione 2 ou mais pets para ativar o desconto.");
    }
  };

  const handleSubmit = async () => {
    if (!planName || !price || !planTypeId || petIds.length === 0) {
      toast.error("Preencha todos os campos obrigatórios.");
      return;
    }

    const payload = {
      subscriptionDate: new Date().toISOString(),
      name: planName,
      price: parseFloat(finalPrice),
      active: true,
      description,
      planTypeId: parseInt(planTypeId),
      servicesIds: selectedServices,
      petIds,
    };

    try {
      console.log("Enviando payload:", payload);
      const createdPlan = await plansService.createPlan(payload);
      toast.success("Plano criado com sucesso!");
      onPlanSelect(createdPlan);
      onNext();
    } catch (error) {
      console.error("Erro ao criar plano:", error);
      toast.error("Erro ao criar plano.");
    }
  };

  return (
    <div className={modalStyles.modal}>
      <h2 className={modalStyles.title}>Criar Plano Personalizado</h2>
      <p className={modalStyles.subtitle}>*Campos obrigatórios</p>



      <div className={step2Styles.formGroup}>
        <label className={step2Styles.label}>Tipo de Plano*</label>
        <select
          className={step2Styles.select}
          value={planTypeId || ""}
          onChange={(e) => handlePlanTypeChange(e.target.value)}
        >
          <option value="">Selecione um tipo de plano</option>
          {planTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name} - Intervalo: {type.paymentInterval} dias
            </option>
          ))}
        </select>
      </div>

      <div className={step2Styles.formGroup}>
        <label className={step2Styles.label}>Descrição*</label>
        <textarea
          className={step2Styles.textarea}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Digite a descrição do plano"
        ></textarea>
      </div>

      <div className={step2Styles.gridContainer}>
        <div className={step2Styles.gridItem}>
          <label className={step2Styles.label}>Selecione os serviços do plano*</label>
          {services.length > 0 ? (
            services.map((service) => (
              <div key={service.id} className={step2Styles.checkboxGroup}>
                <label>
                  <input
                    type="checkbox"
                    value={service.id}
                    checked={selectedServices.includes(service.id)}
                    onChange={(e) => {
                      const id = parseInt(e.target.value);
                      setSelectedServices((prev) =>
                        prev.includes(id)
                          ? prev.filter((sid) => sid !== id)
                          : [...prev, id]
                      );
                    }}
                  />
                  {service.nome}
                </label>
              </div>
            ))
          ) : (
            <p className={step2Styles.noData}>Nenhum serviço disponível.</p>
          )}
        </div>

        <div className={step2Styles.gridItem}>
          <label className={step2Styles.label}>Quais pets irão utilizar este plano?*</label>
          {pets.length > 0 ? (
            pets.map((pet) => (
              <div key={pet.id} className={step2Styles.checkboxGroup}>
                <label>
                  <input
                    type="checkbox"
                    value={pet.id}
                    onChange={(e) => {
                      const id = parseInt(e.target.value);
                      setPetIds((prev) =>
                        prev.includes(id)
                          ? prev.filter((pid) => pid !== id)
                          : [...prev, id]
                      );
                    }}
                  />
                  {pet.name}
                </label>
              </div>
            ))
          ) : (
            <p className={step2Styles.noData}>
              Nenhum pet associado ao cliente selecionado.
            </p>
          )}
        </div>
      </div>


      <div className={step2Styles.inlineRow}>
        <div className={step2Styles.inlineField}>
          <label>Nome do Plano*</label>
          <input
            type="text"
            className={step2Styles.input}
            value={planName}
            onChange={(e) => setPlanName(e.target.value)}
            placeholder="Digite o nome do plano"
          />
        </div>

        <div className={step2Styles.inlineField}>
          <label>Preço (R$)*</label>
          <input
            type="number"
            className={step2Styles.inputSmall}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Digite o preço"
          />
        </div>

        <div className={step2Styles.inlineField}>
          <input
            type="checkbox"
            id="apply-discount"
            checked={applyDiscount}
            onChange={handleDiscountChange}
            disabled={petIds.length < 2}
          />
          <label htmlFor="apply-discount">Desconto (10%)</label>
        </div>

        <div className={step2Styles.inlineField}>
          <p className={step2Styles.finalPrice}>Total: R$ {finalPrice}</p>
        </div>
      </div>

      <div className={modalStyles.buttonGroup}>
        <button className={modalStyles.cancelButton} onClick={onPrevious}>
          Voltar
        </button>
        <button className={modalStyles.nextButton} onClick={handleSubmit}>
          Criar Plano - Agendar serviços
        </button>
      </div>
    </div>
  );
};

export default Step2PlanSelection;
