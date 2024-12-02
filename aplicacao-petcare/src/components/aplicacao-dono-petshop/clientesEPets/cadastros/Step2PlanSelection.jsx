import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import plansService from "../../../../services/plansService";
import planTypeService from "../../../../services/planTypeService";
import petService from "../../../../services/petService";
import { getAllServicos } from "../../../../services/servicosService";
import modalStyles from "./PlanModal.module.css";
import step2Styles from "./Step2Plan.module.css";

const Step2PlanSelection = ({ onNext, onPrevious, selectedClient }) => {
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
        console.log("Buscando tipos de planos...");
        const fetchedPlanTypes = await planTypeService.getAllPlanTypes();
        setPlanTypes(fetchedPlanTypes);

        console.log("Buscando serviços...");
        const fetchedServices = await getAllServicos();
        console.log("Serviços carregados:", fetchedServices);
        setServices(fetchedServices);

        console.log("Buscando pets...");
        const fetchedPets = await petService.getAllPets();
        const clientPets = fetchedPets.filter(
          (pet) => pet.userId === selectedClient.id
        );
        setPets(clientPets);

        console.log("Dados carregados com sucesso!");
      } catch (error) {
        console.error("Erro ao buscar dados iniciais:", error);
        toast.error("Erro ao carregar dados iniciais.");
      }
    };

    if (selectedClient) {
      console.log("Cliente selecionado:", selectedClient);
      fetchInitialData();
    }
  }, [selectedClient]);

  useEffect(() => {
    const calculatedPrice = applyDiscount
      ? (parseFloat(price || 0) * 0.8).toFixed(2)
      : parseFloat(price || 0).toFixed(2);
    setFinalPrice(calculatedPrice);
  }, [price, applyDiscount]);

  const handlePlanTypeChange = (planTypeId) => {
    setPlanTypeId(planTypeId);
    const selectedPlanType = planTypes.find(
      (type) => type.id === parseInt(planTypeId)
    );
    if (selectedPlanType) {
      console.log("Serviços associados ao Plan Type:", selectedPlanType.serviceIds);
  
      // Adicionar serviços do Plan Type aos selecionados
      const mergedServices = new Set([
        ...selectedServices,
        ...(selectedPlanType.serviceIds || []),
      ]);
      setSelectedServices(Array.from(mergedServices));
  
      // Aplicar desconto baseado no Plan Type
      if (selectedPlanType.id === 1) {
        setApplyDiscount(true);
        setFinalPrice((prevPrice) => (prevPrice * 0.95).toFixed(2)); // 5% de desconto
      } else if (selectedPlanType.id === 2) {
        setApplyDiscount(true);
        setFinalPrice((prevPrice) => (prevPrice * 0.90).toFixed(2)); // 10% de desconto
      } else {
        setApplyDiscount(false);
      }
    }
  };
  

  const handleSubmit = async () => {
    if (!planName || !price || !planTypeId || petIds.length === 0) {
      toast.error("Preencha todos os campos obrigatórios.");
      return;
    }
  
    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`; // Corrigido para incluir 'T'
    };
  
    const payload = {
      subscriptionDate: formatDate(new Date()), // Formato ISO-8601
      name: planName,
      price: parseFloat(price),
      active: true,
      renewal: 30,
      hasDiscount: applyDiscount,
      description,
      planTypeId: parseInt(planTypeId),
      servicesIds: selectedServices.length > 0 ? selectedServices : [0],
      repeatQuantity: Array(selectedServices.length).fill(1),
      paymentIds: [0],
      petIds,
    };
  
    try {
      console.log("Enviando payload:", payload);
      await plansService.createPlan(payload);
      toast.success("Plano criado com sucesso!");
      onNext();
    } catch (error) {
      console.error("Erro ao criar plano:", error.response?.data || error.message);
      toast.error("Erro ao criar plano. Verifique os dados e tente novamente.");
    }
  };
  
  return (
    <div className={modalStyles.modal}>
      <h2 className={modalStyles.title}>Criar Plano Personalizado</h2>
      <p className={modalStyles.subtitle}>*Campos obrigatórios</p>

      <div className={step2Styles.formGroup}>
        <label className={step2Styles.label}>Nome do Plano*</label>
        <input
          type="text"
          className={step2Styles.input}
          value={planName}
          onChange={(e) => setPlanName(e.target.value)}
          placeholder="Digite o nome do plano"
        />
      </div>

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

      {/* Grid com Serviços e Pets */}
      <div className={step2Styles.gridContainer}>
        {/* Coluna de Serviços */}
        <div className={step2Styles.gridItem}>
          <label className={step2Styles.label}>Serviços*</label>
          {services.length > 0 ? (
            services.map((service) => (
              <div key={service.id} className={step2Styles.checkboxGroup}>
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
                <label>{service.nome}</label>
              </div>
            ))
          ) : (
            <p className={step2Styles.noData}>Nenhum serviço disponível.</p>
          )}
        </div>

        {/* Coluna de Pets */}
        <div className={step2Styles.gridItem}>
          <label className={step2Styles.label}>Pets Associados*</label>
          {pets.length > 0 ? (
            pets.map((pet) => (
              <div key={pet.id} className={step2Styles.checkboxGroup}>
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
                <label>{pet.name}</label>
              </div>
            ))
          ) : (
            <p className={step2Styles.noData}>
              Nenhum pet associado ao cliente selecionado.
            </p>
          )}
        </div>
      </div>

      <div className={step2Styles.formGroup}>
        <label className={step2Styles.label}>Preço (R$)*</label>
        <input
          type="number"
          className={step2Styles.input}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Digite o preço"
        />
      </div>

      <div className={step2Styles.discountRow}>
        <input
          type="checkbox"
          id="apply-discount"
          checked={applyDiscount}
          onChange={() => setApplyDiscount((prev) => !prev)}
        />
        <label htmlFor="apply-discount">Aplicar Desconto (20%)</label>
      </div>

      <div className={step2Styles.priceRow}>
        <p className={step2Styles.price}>Valor Final: R$ {finalPrice}</p>
      </div>

      <div className={modalStyles.buttonGroup}>
        <button className={modalStyles.cancelButton} onClick={onPrevious}>
          Voltar
        </button>
        <button className={modalStyles.nextButton} onClick={handleSubmit}>
          Criar Plano
        </button>
      </div>
    </div>
  );
};

export default Step2PlanSelection;
