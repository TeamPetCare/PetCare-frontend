import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import styles from "./ModalAddCampos.module.css";
import DropDown from "../../../../shared/dropDown/DropDown";
import TimePicker from "../../../../shared/timePicker/TimePicker";
import { toast } from "react-toastify";
import { PiUserCircleThin, PiPawPrintThin } from "react-icons/pi";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { GoPeople } from "react-icons/go";
import { SiContactlesspayment } from "react-icons/si";
import { MdOutlineSchedule } from "react-icons/md";
import { getAllEmployees } from "../../../../../services/employeeService";
import { getAllCustomerAndPets } from "../../../../../services/userService";
import { getAllServicos } from "../../../../../services/servicosService";

const ModalAddCampos = ({
  dados,
  checkFormCompletionCallback,
  handleSaveCallback,
}) => {
  // ** Constantes Estáticas **
  const formasPagamento = [
    "PIX",
    "CARTAO_DEBITO",
    "CARTAO_CREDITO",
    "DINHEIRO",
  ];

  // ** Estados Globais **
  const [clientes, setClientes] = useState([]);
  const [selectedClient, setSelectedClient] = useState("");
  const [filteredClients, setFilteredClients] = useState([]);

  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState("");
  const [filteredPets, setFilteredPets] = useState([]);

  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  const [paymentStatus, setPaymentStatus] = useState(null);

  const [selectedDates, setSelectedDates] = useState({
    startDate: null,
    endDate: null,
  });

  const [funcionariosNomes, setFuncionariosNomes] = useState([]);
  const [selectedFuncionario, setSelectedFuncionario] = useState("");

  const [observacoes, setObservacoes] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("Agendado");
  const isMobile = useMediaQuery({ query: "(max-width: 1023px)" });

  // ** Funções - Clientes e Pets **
  const loadCustomers = async () => {
    try {
      const response = await getAllCustomerAndPets();
      const clientesFormatados = response.map((cliente) => ({
        id: cliente.id,
        name: cliente.name,
        ft: cliente.userImg,
        cellphone: cliente.cellphone,
        pets: cliente.pet.map((pet) => ({
          id: pet.id,
          name: pet.name,
        })),
      }));
      const petsFormatados = response.flatMap((cliente) =>
        cliente.pet.map((pet) => ({
          id: pet.id,
          name: pet.name,
          clientId: cliente.id,
        }))
      );
      setClientes(clientesFormatados);
      setPets(petsFormatados);
    } catch (error) {
      console.error("Erro ao carregar clientes e pets:", error);
    }
  };

  const handleClientSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (value.length >= 3) {
      const results = clientes.filter((cliente) =>
        cliente.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredClients(results);
    } else {
      setFilteredClients([]);
    }
  };

  const handleClientChange = (client) => {
    setSelectedClient(client);
    setSearchTerm(client.name);
    setFilteredClients([]);
    checkFormCompletion();
  };

  const handlePetChange = (selectedOption) => {
    setSelectedPet(selectedOption);
    checkFormCompletion();
  };

  useEffect(() => {
    if (selectedClient) {
      const petsDoCliente = pets.filter(
        (pet) => pet.clientId === selectedClient.id
      );
      if (petsDoCliente.length === 0) {
        setSelectedPet(null);
        setFilteredPets([]);
        toast.info("O cliente não possui pet cadastrado.", { autoClose: 2000 });
      } else {
        setFilteredPets(petsDoCliente);
        if (petsDoCliente.length === 1) setSelectedPet(petsDoCliente[0].name);
      }
    }
  }, [selectedClient, pets]);

  // ** Funções - Serviços **
  const loadServices = async () => {
    try {
      const response = await getAllServicos();
      const servicosFormatos = response.map((service) => ({
        id: service.id,
        name: service.nome,
        time: service.estimatedTime,
      }));
      setServices(servicosFormatos);
    } catch (error) {
      console.error("Erro ao carregar serviços:", error);
    }
  };

  const handleServiceSelection = (selectedService) => {
    setSelectedServices((prevServices) => {
      if (
        !prevServices.find(
          (service) => service.id === selectedService.target.option.id
        )
      ) {
        const updatedServices = [
          ...prevServices,
          selectedService.target.option,
        ];
        checkFormCompletion();
        return updatedServices;
      }
      return prevServices;
    });
  };

  // ** Funções - Pagamento **
  const handlePaymentMethodChange = (selectedOption) => {
    setSelectedPaymentMethod(selectedOption);
    checkFormCompletion();
  };

  const handlePaymentStatusChange = (event) => {
    const value = event.target.value === "true"; // Converte a string "true"/"false" para boolean
    setPaymentStatus(value);
    checkFormCompletion();

  };

  // ** Funções - HoraData e Observações**
  const handleDateChange = (dates) => {
    setSelectedDates(dates);
    checkFormCompletion();

  };

  const handleObservacoesChange = (e) => {
    setObservacoes(e.target.value);
  };

  // ** Funções - Funcionários **
  const loadEmployees = async () => {
    try {
      const response = await getAllEmployees();
      const funcionariosFormatados = response.map((funcionario) => ({
        id: funcionario.id,
        name: funcionario.name,
      }));
      setFuncionariosNomes(funcionariosFormatados);
    } catch (error) {
      console.error("Erro ao carregar funcionários:", error);
    }
  };

  // ** Funções - Serviços e Pagamento **
  const removeService = (service) => {
    setSelectedServices((prevServices) =>
      prevServices.filter(
        (item) => item.name !== service.name && item.id !== service.id
      )
    );
  };

  const handleSelectChange = (event) => {
    setSelectedStatus(event.target.option);
    checkFormCompletion();
  };

  const handleDropdownChange = (selectedOption) => {
    setSelectedFuncionario(selectedOption.target.option.name);
    checkFormCompletion();
  };


  const checkFormCompletion = () => {
    const isComplete =
      selectedClient &&
      selectedPet &&
      selectedStatus &&
      selectedDates &&
      selectedServices.length > 0 &&
      selectedPaymentMethod !== "" &&
      paymentStatus !== null &&
      selectedFuncionario !== "";

    if (typeof checkFormCompletionCallback === "function") {
      checkFormCompletionCallback(isComplete);
    }

    return isComplete;
  };

  const calculateDuration = () => {
    if (!selectedDates.startDate || !selectedDates.endDate) {
      return "00:00:00";
    }

    // Converte as datas para objetos Date
    const start = new Date(selectedDates.startDate);
    const end = new Date(selectedDates.endDate);

    // Calcula a diferença em milissegundos
    const differenceInMilliseconds = end - start;

    // Verifica se a diferença é válida
    if (differenceInMilliseconds < 0) {
      return "00:00:00";
    }

    // Converte para segundos totais
    const totalSeconds = Math.floor(differenceInMilliseconds / 1000);

    // Calcula horas, minutos e segundos
    const hours = Math.floor(totalSeconds / 3600);
    const remainingSecondsAfterHours = totalSeconds % 3600;
    const minutes = Math.floor(remainingSecondsAfterHours / 60);
    const seconds = remainingSecondsAfterHours % 60;

    // Formata para "hh:mm:ss"
    const formattedDuration = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

    return formattedDuration;
  };

  const formatDate = (date) => {
    const formattedDate = new Date(date);
    const year = formattedDate.getFullYear();
    const month = String(formattedDate.getMonth() + 1).padStart(2, "0");
    const day = String(formattedDate.getDate()).padStart(2, "0");
    const hours = String(formattedDate.getHours()).padStart(2, "0");
    const minutes = String(formattedDate.getMinutes()).padStart(2, "0");
    const seconds = String(formattedDate.getSeconds()).padStart(2, "0");

  
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  };

  const handleSave = () => {
    let date = new Date();
    const dataSchedule = {
      scheduleStatus: selectedStatus
        .toUpperCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, ""),
      scheduleDate: selectedDates.startDate,
      scheduleTime: calculateDuration(),
      scheduleNote: observacoes === null ? "..." : observacoes,
      creationDate: formatDate(date),
      petId:
        pets.find((pet) => pet.name === selectedPet.target.option.name)?.id ||
        null,
      serviceIds: selectedServices.map((service) => service.id),
      employeeId:
        funcionariosNomes.find((emp) => emp.name === selectedFuncionario)?.id ||
        null,
    };

    const totalPrice = selectedServices.reduce(
      (acc, service) => acc + (service.price || 0),
      0
    );

    const dataPayment = {
      price: totalPrice,
      paymentDate: formatDate(date),
      paymentId: null,
      paymentMethod: selectedPaymentMethod.target.option,
      paymentStatus: paymentStatus,
      userId:
        pets.find((pet) => pet.name === selectedPet.target.option.name)
          ?.clientId || null,
    };

    if (typeof handleSaveCallback === "function") {
      handleSaveCallback(dataSchedule, dataPayment);
    } else {
      toast.info("Complete todos os dados", { autoClose: 2000 });
    }
  };

  // ** Inicialização **
  useEffect(() => {
    loadCustomers();
    loadEmployees();
    loadServices();
  }, []);

  useEffect(() => {
    if (checkFormCompletion() === true) {
      handleSave();
    }
  }, [
    paymentStatus,
    selectedClient,
    selectedPet,
    selectedStatus,
    selectedDates,
    selectedServices.length,
    selectedPaymentMethod,
    paymentStatus,
    selectedFuncionario,
    observacoes
  ]);

  return (
    <div className={styles["container"]}>
      <div className={styles["row1"]}>
        <div className={styles["dropdown-container"]}>
          <div className={styles["input-wrapper"]}>
            <PiUserCircleThin className={styles["icon"]} />
            <input
              type="text"
              placeholder="Digite o nome do cliente"
              value={searchTerm}
              onChange={handleClientSearchChange}
              className={styles["search-input"]}
            />
          </div>
          {searchTerm.length >= 3 && filteredClients.length > 0 && (
            <ul
              className={`${styles["dropdown-list"]} ${
                searchTerm.length < 3 || filteredClients.length === 0
                  ? styles["hidden"]
                  : ""
              }`}
            >
              {filteredClients.map((client) => (
                <li
                  key={client.id}
                  onClick={() => {
                    setSelectedClient(client);
                    setSearchTerm(client.name);
                    setFilteredClients([]);
                  }}
                  className={styles["dropdown-item"]}
                >
                  {client.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <DropDown
          options={filteredPets}
          titulo={"Selecione um pet*"}
          icon={PiPawPrintThin}
          selectedItem={selectedPet}
          exibirInformacao={false}
          isDisabled={!selectedClient}
          onChange={handlePetChange}
        />

        <DropDown
          options={["Agendado", "Concluído", "Cancelado"]}
          onChange={handleSelectChange}
          titulo={"Selecione o status*"}
          icon={MdOutlineSchedule}
          selectedItem={selectedStatus}
          exibirInformacao={false}
          isDisabled={false}
        />
      </div>
      <div className={styles["row2"]}>
        <DropDown
          options={services}
          onChange={(selectedOption) => handleServiceSelection(selectedOption)}
          titulo={"Selecione um serviço*"}
          icon={HiOutlineShoppingBag}
          selectedItem={null}
          exibirInformacao={false}
          isDisabled={false}
        />

        <div className={styles["selected-services"]}>
          {selectedServices.map((item, index) => (
            <span className={styles["service-chip"]} key={index}>
              {item.name}
              <button onClick={() => removeService(item)}>x</button>
            </span>
          ))}
        </div>
      </div>
      <div className={styles["row3"]}>
        <TimePicker
          dtInicial={null}
          dtFinal={null}
          isDisabled={false}
          onDateChange={handleDateChange}
        />
        <DropDown
          options={funcionariosNomes}
          onChange={handleDropdownChange}
          titulo={"Selecione um funcionário*"}
          icon={GoPeople}
          selectedItem={selectedFuncionario}
          className={styles["container-dropdown"]}
          exibirInformacao={false}
          isDisabled={false}
        />
      </div>
      <div className={styles["row4"]}>
        <label>Observações</label>
        <textarea
          placeholder="Digite aqui observações do agendamento..."
          name="observacoes"
          value={observacoes}
          onChange={handleObservacoesChange}
          disabled={false}
          className={styles["input-observacoes"]}
        />
      </div>
      <div className={styles["row5"]}>
        <div className={styles["container-pag"]}>
          <DropDown
            options={formasPagamento}
            titulo={"Selecione uma forma de pagamento*"}
            icon={SiContactlesspayment}
            selectedItem={selectedPaymentMethod}
            onChange={handlePaymentMethodChange}
            className={styles["container-dropdown"]}
            exibirInformacao={false}
            isDisabled={false}
          />

          <div className={styles["container-status-pag"]}>
            <label className={styles["label-title"]}>
              Status do Pagamento*
            </label>
            <div className={styles.checkboxGroup}>
              <label>
                <input
                  type="radio"
                  name="paymentStatus"
                  value="false"
                  checked={paymentStatus === false}
                  onChange={handlePaymentStatusChange}
                />
                Pendente
              </label>
              <label>
                <input
                  type="radio"
                  name="paymentStatus"
                  value="true"
                  checked={paymentStatus === true}
                  onChange={handlePaymentStatusChange}
                />
                Pago
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAddCampos;
