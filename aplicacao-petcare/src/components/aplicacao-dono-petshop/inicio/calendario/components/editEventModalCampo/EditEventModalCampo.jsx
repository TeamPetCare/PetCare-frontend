import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import styles from "./EditEventModalCampo.module.css";
import DropDown from "../../../../../shared/dropDown/DropDown";
import TimePicker from "../../../../../shared/timePicker/TimePicker";
import { PiUserCircleThin, PiPawPrintThin } from "react-icons/pi";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { GoPeople } from "react-icons/go";
import { SiContactlesspayment } from "react-icons/si";
import { MdOutlineSchedule } from "react-icons/md";
import { getAllEmployees } from "../../../../../../services/employeeService";

const EditedEventModalCampo = ({
  editedEvent,
  handleChange,
  isEditing,
  formatTime,
}) => {
  const clientes = [];
  const pets = [];
  const servicos = [];
  const formasPagamento = [];

  // const pets = [...new Set(events.map((event) => event.cliente.pet.nome))];
  const [funcionariosNomes, setFuncionariosNomes] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState( editedEvent.scheduleStatus);

  useEffect(() => {
    const loadFuncionarios = async () => {
      try {
        const todosFuncionarios = await getAllEmployees();
        const funcionariosFormatados = todosFuncionarios.map((funcionario) => ({
          id: funcionario.id,
          name: funcionario.name,
        }));
        setFuncionariosNomes(funcionariosFormatados);
      } catch (error) {
        console.error("Erro ao carregar funcionários:", error);
      }
    };

    loadFuncionarios();
  }, []);



  const [selectedServices, setSelectedServices] = useState(
    editedEvent.services
  );

  const [selectedItem, setSelectedItem] = useState("");
  const isMobile = useMediaQuery({ query: "(max-width: 1023px)" });

  // Função para atualizar o valor selecionado
  const handleDropdownChange = (event) => {
    handleChange({
      target: {
        name: "Selecione um funcionário", // Nome que identifica a mudança
        value: { id: event.target.option.id, name: event.target.option.name }, // Passe o ID selecionado
      },
    })
  };

  const handleSelectChange = (event) => {
    handleChange({
      target: {
        name: "paymentStatus",
        value: event.target.value,
      }
    })
  };

  const removeService = (service) => {
    setSelectedServices((prevServices) =>
      prevServices.filter((item) => item !== service)
    );
  };

  const capitalizeFirstLetter = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };

  const formatPaymentMethod = (method) => {
    if (!method) {
      return "Método não especificado"; // Ou qualquer valor que você queira retornar
    }
  
    const formattedMethods = {
      PIX: "Pix",
      CARTAO_CREDITO: "Cartão Crédito",
      CARTAO_DEBITO: "Cartão Débito",
      DINHEIRO: "Dinheiro",
    };

    return (
      formattedMethods[method] ||
      method
        .toLowerCase()
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    );
  };

  return (
    <div className={styles["container"]}>
      <div className={styles["row1"]}>
        <DropDown
          agendamento={editedEvent}
          options={clientes}
          titulo={"Selecione um cliente*"}
          icon={PiUserCircleThin}
          selectedItem={editedEvent.pet?.user?.name || ""} // Passa o nome do cliente aqui
          className={styles["container-dropdown"]}
          exibirInformacao={true}
          isDisabled={true}
        />

        <DropDown
          agendamento={editedEvent}
          options={pets}
          titulo={"Selecione um pet*"}
          icon={PiPawPrintThin}
          selectedItem={editedEvent.pet.name}
          exibirInformacao={true}
          isDisabled={true}
        />

        <DropDown
          agendamento={editedEvent}
          options={["Agendado", "Concluído", "Cancelado"]}
          onChange={handleChange}
          titulo={"Configure um status*"}
          icon={MdOutlineSchedule}
          selectedItem={capitalizeFirstLetter(selectedStatus)}
          exibirInformacao={false}
          isDisabled={!isEditing}
          name="scheduleStatus"
        />
      </div>
      <div className={styles["row2"]}>
        <DropDown
          agendamento={editedEvent}
          options={servicos}
          onChange={handleDropdownChange}
          titulo={"Selecione um serviço*"}
          icon={HiOutlineShoppingBag}
          exibirInformacao={false}
          isDisabled={true}
        />

        <div className={styles["selected-services"]}>
          {selectedServices.map((item, index) => (
            <span className={styles["service-chip"]} key={index}>
              {item.name}
              <button disabled={true} onClick={() => removeService(item.name)}>
                x
              </button>
            </span>
          ))}
        </div>
      </div>
      <div className={styles["row3"]}>
        <TimePicker
          dtInicial={editedEvent.start}
          dtFinal={editedEvent.end}
          isDisabled={true}
        />
        <DropDown
          agendamento={editedEvent}
          options={funcionariosNomes}
          onChange={handleDropdownChange}
          titulo={"Selecione um funcionário*"}
          icon={GoPeople}
          selectedItem={editedEvent.employee?.name}
          className={styles["container-dropdown"]}
          exibirInformacao={false}
          isDisabled={!isEditing}
          name="employee"
        />
      </div>
      <div className={styles["row4"]}>
        <label>Observações*</label>
        <textarea
          name="observacoes"
          value={editedEvent?.scheduleNote || ""}
          onChange={handleChange}
          disabled={!isEditing}
          className={styles["input-observacoes"]}
          onClick={(e) => e.stopPropagation()}
        />
      </div>
      <div className={styles["row5"]}>
        <div className={styles["container-pag"]}>
          <DropDown
            agendamento={editedEvent}
            options={formasPagamento}
            titulo={"Selecione uma forma de pagamento*"}
            icon={SiContactlesspayment}
            selectedItem={formatPaymentMethod(
              editedEvent.payment?.paymentMethod
            )}
            className={styles["container-dropdown"]}
            exibirInformacao={false}
            isDisabled={true}
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
                  checked={editedEvent.payment?.paymentStatus === false}
                  onChange={handleSelectChange} 
                  disabled={
                    !isEditing || editedEvent.payment?.paymentMethod == "PIX"
                  }
                />
                Pendente
              </label>
              <label>
                <input
                  type="radio"
                  name="paymentStatus"
                  value="true"
                  checked={editedEvent.payment?.paymentStatus === true}
                  onChange={handleSelectChange} 
                  disabled={
                    !isEditing || editedEvent.payment?.paymentMethod == "PIX"
                  }
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

export default EditedEventModalCampo;
