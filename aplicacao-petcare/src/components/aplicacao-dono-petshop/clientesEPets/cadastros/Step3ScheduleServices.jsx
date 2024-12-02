import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import petService from "../../../../services/petService"; // Para buscar detalhes dos pets
import { getAllServicos } from "../../../../services/servicosService"; // Para buscar os serviços pelo ID
import modalStyles from "./Step3Modal.module.css";

const Step3ScheduleServices = ({ onPrevious, onClose, selectedPlan }) => {
  const [pets, setPets] = useState([]);
  const [servicesByPet, setServicesByPet] = useState({}); // Serviços agrupados por pet

  useEffect(() => {
    const fetchPetsAndServices = async () => {
      try {
        // 1. Buscar os detalhes dos pets associados ao plano
        const petDetails = await Promise.all(
          selectedPlan.petIds.map((petId) => petService.getPetById(petId))
        );
        setPets(petDetails);

        // 2. Buscar todos os serviços disponíveis
        const allServices = await getAllServicos();

        // 3. Filtrar apenas os serviços associados ao plano
        const planServices = selectedPlan.servicesIds
          .map((serviceId) => allServices.find((service) => service.id === serviceId))
          .filter((service) => service !== undefined); // Remove serviços não encontrados

        // 4. Agrupar os serviços por petId
        const groupedServices = petDetails.reduce((acc, pet) => {
          acc[pet.id] = planServices.map((service) => ({
            ...service,
            status: "Pendente", // Status inicial
          }));
          return acc;
        }, {});
        setServicesByPet(groupedServices);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        toast.error("Erro ao carregar os pets e serviços.");
      }
    };

    if (selectedPlan) {
      fetchPetsAndServices();
    }
  }, [selectedPlan]);

  const handleEditService = (service) => {
    // Lógica para editar/agendar um serviço
    toast.info(`Editar serviço: ${service?.name || "Sem nome"}`);
  };

  return (
    <div className={modalStyles.modal}>
      <h2 className={modalStyles.title}>Agendar Serviços do Plano</h2>
      <p className={modalStyles.subtitle}>
        *Campos obrigatórios.
        <br />
        Não deixe nenhum serviço em "Pendente". Apague-o, se não for necessário.
      </p>

      <div className={modalStyles.petServicesContainer}>
        {pets.map((pet) => (
          <div key={pet.id} className={modalStyles.petSection}>
            {/* Nome do Pet */}
            <div className={modalStyles.petHeader}>
              <img
                src={pet.photo || "default-pet.png"}
                alt={pet.name}
                className={modalStyles.petPhoto}
              />
              <div>
                <h3>{pet.name}</h3>
                <p>{pet.breed}</p>
              </div>
            </div>

            {/* Serviços do Pet */}
            <div className={modalStyles.servicesList}>
              {servicesByPet[pet.id]?.map((service) => (
                <div key={service.id} className={modalStyles.serviceItem}>
                  <div className={modalStyles.serviceInfo}>
                    <span className={modalStyles.serviceName}>
                      {service?.nome || "Serviço não encontrado"} {/* Exibe o nome */}
                    </span>
                    <span
                      className={`${modalStyles.serviceStatus} ${
                        service.status === "Agendado"
                          ? modalStyles.scheduled
                          : modalStyles.pending
                      }`}
                    >
                      {service.status === "Agendado"
                        ? `Agendado`
                        : "Pendente"}
                    </span>
                  </div>
                  <button
                    className={modalStyles.editButton}
                    onClick={() => handleEditService(service)}
                  >
                    Editar
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Botões de ação */}
      <div className={modalStyles.buttonGroup}>
        <button className={modalStyles.cancelButton} onClick={onPrevious}>
          Voltar
        </button>
        <button className={modalStyles.finishButton} onClick={onClose}>
          Finalizar Cadastro
        </button>
      </div>
    </div>
  );
};

export default Step3ScheduleServices;
