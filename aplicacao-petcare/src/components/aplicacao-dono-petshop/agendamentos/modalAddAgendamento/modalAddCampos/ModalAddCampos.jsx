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

const ModalAddCampos = ({ dados }) => {
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

  const [funcionariosNomes, setFuncionariosNomes] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
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
      }));
      setServices(servicosFormatos);
      console.log("SERVICES: " + JSON.stringify(services));
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
        console.log("SELECTED SERICES antes: ", prevServices);
        console.log("O TL SELECIONADO: ", selectedService.target.option);
        console.log("SELECTED SERICES depois: ", updatedServices);
        return updatedServices;
      }
      return prevServices;
    });
  };

  // ** Funções - Pagamento **
  const handlePaymentMethodChange = (selectedOption) => {
    setSelectedPaymentMethod(selectedOption);
    console.log("Forma de pagamento selecionada:", selectedOption);
  };

  const handlePaymentStatusChange = (event) => {
    const value = event.target.value === "true"; // Converte a string "true"/"false" para boolean
    setPaymentStatus(value);
    console.log("Status de pagamento alterado para:", value ? "Pago" : "Pendente");
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
    setSelectedStatus(event.target.value);
  };

  const handleDropdownChange = (selectedOption) => {
    setSelectedItem(selectedOption.name);
  };

  const formatPaymentMethod = (method) => {
    const formattedMethods = {
      PIX: "Pix",
      CARTAO_CREDITO: "Cartão Crédito",
      CARTAO_DEBITO: "Cartão Débito",
      DINHEIRO: "Dinheiro",
    };
    return formattedMethods[method] || method.toLowerCase().replace("_", " ");
  };

  // ** Inicialização **
  useEffect(() => {
    loadCustomers();
    loadEmployees();
    loadServices();
  }, []);

  useEffect(() => {
    console.log("SELECTED SERICES atualizado: ", selectedServices);
  }, [sele]);

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
                    console.log("SELECED CLIENT: " + JSON.stringify(client));
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
          onChange={(option) => setSelectedPet(option)}
        />

        <DropDown
          options={["Agendado", "Concluído", "Cancelado"]}
          onChange={handleSelectChange}
          titulo={"Selecione o status*"}
          icon={MdOutlineSchedule}
          selectedItem={selectedStatus}
          exibirInformacao={false}
          isDisabled={false} // Permite editar o status
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
        <TimePicker isDisabled={false} />
        <DropDown
          options={funcionariosNomes}
          onChange={handleDropdownChange}
          titulo={"Selecione um funcionário*"}
          icon={GoPeople}
          selectedItem={selectedItem}
          className={styles["container-dropdown"]}
          exibirInformacao={false}
          isDisabled={false}
        />
      </div>
      <div className={styles["row4"]}>
        <label>Observações*</label>
        <textarea
          name="observacoes"
          onChange={(e) => {}}
          disabled={false} // Permite edição das observações
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
