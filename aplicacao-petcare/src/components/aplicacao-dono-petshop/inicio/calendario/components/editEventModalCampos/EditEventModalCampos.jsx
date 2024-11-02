import React from "react";
import styles from "./EditEventModalCampos.module.css";
import DropDown from "../../../../../shared/dropDown/DropDown";
import TimePicker from "../../../../../shared/timePicker/TimePicker";
import { PiUserCircleThin, PiPawPrintThin } from "react-icons/pi";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { GoPeople } from "react-icons/go";
import { SiContactlesspayment } from "react-icons/si";
import { MdOutlineSchedule } from "react-icons/md";

const EditEventModalCampos = ({
  editedEvent,
  handleChange,
  isEditing,
  formatTime,
}) => {
  const events = [
    // ... (conteúdo dos eventos)
  ];
  const clientes = [...new Set(events.map((event) => event.cliente.nome))];
  const pets = [...new Set(events.map((event) => event.cliente.pet.nome))];
  const servicos = [...new Set(events.map((event) => event.title))];
  const funcionarios = [...new Set(events.map((event) => event.funcionario))];
  const formasPagamento = [
    ...new Set(events.map((event) => event.paymentMethod)),
  ];

  return (
    <div className={styles["container"]}>
      <div className={styles["row1"]}>
        <DropDown
          agendamento={editedEvent}
          options={clientes}
          titulo={"Selecione um cliente*"}
          icon={PiUserCircleThin}
          selectedItem={editedEvent.cliente.nome}
          className={styles["container-dropdown"]}
          exibirInformacao={true}
          isDisabled={true} // Campo sempre desabilitado
        />

        <DropDown
          agendamento={editedEvent}
          options={pets}
          titulo={"Selecione um pet*"}
          icon={PiPawPrintThin}
          selectedItem={editedEvent.cliente.pet.nome}
          exibirInformacao={true}
          isDisabled={true} // Campo sempre desabilitado
        />

        <DropDown
          agendamento={editedEvent}
          options={["Agendado", "Concluído", "Cancelado"]}
          titulo={"Configure um status*"}
          icon={MdOutlineSchedule}
          selectedItem={editedEvent.status}
          exibirInformacao={false}
          isDisabled={!isEditing} // Campo pode ser editado
        />
      </div>
      <div className={styles["row2"]}>
        <DropDown
          agendamento={editedEvent}
          options={servicos}
          titulo={"Selecione um serviço*"}
          icon={HiOutlineShoppingBag}
          selectedItem={editedEvent.title}
          exibirInformacao={false}
          isDisabled={true} // Campo sempre desabilitado
        />
      </div>
      <div className={styles["row3"]}>
        <TimePicker
          dtInicial={editedEvent.start}
          dtFinal={editedEvent.end}
          isDisabled={true} // Campo sempre desabilitado
        />
        <DropDown
          agendamento={editedEvent}
          options={funcionarios}
          titulo={"Selecione um funcionário*"}
          icon={GoPeople}
          selectedItem={editedEvent.funcionario}
          className={styles["container-dropdown"]}
          exibirInformacao={false}
          isDisabled={!isEditing} // Campo pode ser editado
        />
      </div>
      <div className={styles["row4"]}>
        <label>Observações</label>
        <textarea
          name="observacoes"
          value={editedEvent.observacoes}
          onChange={handleChange}
          disabled={!isEditing} // Campo pode ser editado
          className={styles["input-observacoes"]}
          onClick={(e) => e.stopPropagation()}
        />
      </div>
      <div className={styles["row5"]}>
        <h5>Pagamento</h5>
        <div className={styles["container-pag"]}>
          <DropDown
            agendamento={editedEvent}
            options={formasPagamento}
            titulo={"Selecione uma forma de pagamento*"}
            icon={SiContactlesspayment}
            selectedItem={editedEvent.paymentMethod}
            className={styles["container-dropdown"]}
            exibirInformacao={false}
            isDisabled={true} // Campo sempre desabilitado
          />
          <div className={styles["container-status-pag"]}>
            <label className={styles["label-title"]}>
              Status do Pagamento:
            </label>
            <div className={styles.checkboxGroup}>
              <label>
                <input
                  type="radio"
                  name="paymentStatus"
                  value="pendente"
                  checked={!editedEvent.paymentStatus}
                  onChange={handleChange}
                  disabled={true} // Campo sempre desabilitado
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
                  disabled={true} // Campo sempre desabilitado
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

export default EditEventModalCampos;
