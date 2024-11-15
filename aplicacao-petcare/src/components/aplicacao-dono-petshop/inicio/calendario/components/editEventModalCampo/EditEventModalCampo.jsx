import React, { useEffect, useState } from "react";

import styles from "./EditEventModalCampo.module.css";
import DropDown from "../../../../../shared/dropDown/DropDown";
import TimePicker from "../../../../../shared/timePicker/TimePicker";
import { PiUserCircleThin, PiPawPrintThin } from "react-icons/pi";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { GoPeople } from "react-icons/go";
import { SiContactlesspayment } from "react-icons/si";
import { MdOutlineSchedule } from "react-icons/md";

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
  const funcionarios = ["Jaqueline", "Isaac"];

  const [selectedServices, setSelectedServices] = useState(editedEvent.services);

  const [selectedItem, setSelectedItem] = useState("");

  // Função para atualizar o valor selecionado
  const handleDropdownChange = (event) => {
    setSelectedItem(event.target.value);
    handleChange(event);
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
    const formattedMethods = {
      PIX: "Pix",
      CARTAO_CREDITO: "Cartão Crédito",
      CARTAO_DEBITO: "Cartão Débito",
      DINHEIRO: "Dinheiro"
    };
    
    return formattedMethods[method] || method
      .toLowerCase() 
      .split('_') 
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' '); 
  };

  return (
    <div className={styles["container"]}>
      <div className={styles["row1"]}>
      <DropDown
          agendamento={editedEvent}
          options={clientes}
          titulo={"Selecione um cliente*"}
          icon={PiUserCircleThin}
          selectedItem={editedEvent.payment.user.name}  // Passa o nome do cliente aqui
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
          selectedItem={capitalizeFirstLetter(editedEvent.scheduleStatus)}
          exibirInformacao={false}
          isDisabled={!isEditing}
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
          options={funcionarios}
          titulo={"Selecione um funcionário*"}
          icon={GoPeople}
          selectedItem={"JAQUELINE MOCKADO"}
          className={styles["container-dropdown"]}
          exibirInformacao={false}
          isDisabled={!isEditing} 
        />
      </div>
      <div className={styles["row4"]}>
        <label>Observações*</label>
        <textarea
          name="observacoes"
          value={editedEvent.scheduleNote}
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
            selectedItem={formatPaymentMethod(editedEvent.payment.paymentMethod)}
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
                  value="pendente"
                  checked={!editedEvent.paymentStatus}
                  onChange={handleChange}
                  disabled={ 
                    !isEditing || editedEvent.payment.paymentMethod !== "PIX"
                  } 
                />
                Pendente
              </label>
              <label>
                <input
                  type="radio"
                  name="paymentStatus"
                  value="pago"
                  checked={editedEvent.paymentStatus}
                  onChange={handleChange}
                  disabled={!isEditing || editedEvent.payment.paymentMethod !== "PIX"} 
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