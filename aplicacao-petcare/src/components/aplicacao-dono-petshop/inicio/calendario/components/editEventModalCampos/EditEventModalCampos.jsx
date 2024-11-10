import React, { useEffect, useState } from "react";

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
    {
      id: "1",
      title: ["Tosa", "Banho"],
      paymentStatus: false, //ADICIONAR INFORMAÇÃO
      paymentMethod: "Dinheiro", //ADICIONAR INFORMAÇÃO ENUM
      start: new Date(2024, 9, 1, 8, 30, 0, 0), //ADICIONAR INFORMAÇÃO
      end: new Date(2024, 9, 1, 9, 30, 0, 0), //ADICIONAR INFORMAÇÃO
      status: "Concluído",
      funcionario: "Jaqueline", //MANIPULAR INFORMAÇÕES PARA SEPARA USER CLIENTE E CUSTOOMER (GET_ROLE)
      cliente: {
        nome: "Julia Cunha",
        whatsapp: "11912345678", //TELEFONE
        foto: "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg", //ADICIONAR INFORMAÇÃO
        pet: {
          nome: "Thor",
          raca: "Labrador",
          foto: "https://www.doglife.com.br/blog/assets/post/plano-de-saude-pet-sem-carencia-662bb2a183b68a52330af61d/plano-de-saude-pet-sem-carencia%20(2).webp",
        },
      },
      observacoes:
        "Thor apresentava caspa antes do atendimento, mas agora está limpo. O dono prefere tosar apenas a parte de trás do corpo.",
    },
    {
      id: "2",
      title: ["Big Meeting"],
      paymentStatus: true,
      paymentMethod: "Pix",
      start: new Date(2024, 9, 1, 10, 30, 0, 0),
      end: new Date(2024, 9, 1, 11, 30, 0, 0),
      status: "Cancelado",
      funcionario: "Jaqueline",
      cliente: {
        nome: "José",
        whatsapp: "11987654321", // Removido +55 e espaços
        foto: "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg",
        pet: {
          nome: "Maria",
          raca: "Poodle",
          foto: "https://www.doglife.com.br/blog/assets/post/plano-de-saude-pet-sem-carencia-662bb2a183b68a52330af61d/plano-de-saude-pet-sem-carencia%20(2).webp",
        },
      },
      observacoes:
        "Maria está em tratamento de pele e requer atenção especial com produtos hipoalergênicos.",
    },
    {
      id: "3",
      title: ["Tosa"],
      paymentStatus: false,
      paymentMethod: "Dinheiro",
      start: new Date(2024, 9, 1, 14, 30, 0, 0),
      end: new Date(2024, 9, 1, 15, 30, 0, 0),
      status: "Agendado",
      funcionario: "Jaqueline",
      cliente: {
        nome: "Heitor Lima",
        whatsapp: "11923456789", // Removido +55 e espaços
        foto: "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg",
        pet: {
          nome: "Madonna",
          raca: "Bulldog",
          foto: "https://www.doglife.com.br/blog/assets/post/plano-de-saude-pet-sem-carencia-662bb2a183b68a52330af61d/plano-de-saude-pet-sem-carencia%20(2).webp",
        },
      },
      observacoes:
        "Madonna gosta de ser acariciada durante o banho. O dono prefere horários tranquilos.",
    },
    {
      id: "4",
      title: ["Big Meeting"],
      paymentStatus: true,
      paymentMethod: "Pix",
      start: new Date(2024, 9, 1, 17, 30, 0, 0),
      end: new Date(2024, 9, 1, 18, 0, 0, 0),
      status: "Concluído",
      funcionario: "Isaac",
      cliente: {
        nome: "Leo",
        whatsapp: "11934567890", // Removido +55 e espaços
        foto: "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg",
        pet: {
          nome: "Bobby",
          raca: "Beagle",
          foto: "https://www.doglife.com.br/blog/assets/post/plano-de-saude-pet-sem-carencia-662bb2a183b68a52330af61d/plano-de-saude-pet-sem-carencia%20(2).webp",
        },
      },
      observacoes:
        "Bobby teve problemas de alergia anteriormente, cuidado com produtos perfumados.",
    },
    {
      id: "5",
      title: ["Vacation"],
      paymentStatus: true,
      paymentMethod: "Cartão de Crédito",
      start: new Date(2024, 9, 7, 10, 30, 0, 0),
      end: new Date(2024, 9, 7, 12, 30, 0, 0),
      status: "Agendado",
      funcionario: "Jaqueline",
      cliente: {
        nome: "Julia Cunha",
        whatsapp: "11912345678", // Removido +55 e espaços
        foto: "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg",
        pet: {
          nome: "Thor",
          raca: "Labrador",
          foto: "https://www.doglife.com.br/blog/assets/post/plano-de-saude-pet-sem-carencia-662bb2a183b68a52330af61d/plano-de-saude-pet-sem-carencia%20(2).webp",
        },
      },
      observacoes:
        "Thor já foi tosado e está acostumado a longas sessões, mas não gosta de secador.",
    },
    {
      id: "6",
      title: ["Banho", "Tosa"],
      paymentStatus: false,
      paymentMethod: "Pix",
      start: new Date(2024, 9, 12, 10, 35, 0, 0),
      end: new Date(2024, 9, 12, 12, 30, 0, 0),
      status: "Cancelado",
      funcionario: "Isaac",
      cliente: {
        nome: "Heitor Lima",
        whatsapp: "11923456789", // Removido +55 e espaços
        foto: "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg",
        pet: {
          nome: "Madonna",
          raca: "Bulldog",
          foto: "https://www.doglife.com.br/blog/assets/post/plano-de-saude-pet-sem-carencia-662bb2a183b68a52330af61d/plano-de-saude-pet-sem-carencia%20(2).webp",
        },
      },
      observacoes:
        "Madonna está na fase de adaptação, preferindo ambientes calmos e pouco barulhentos.",
    },
  ];
  const clientes = [...new Set(events.map((event) => event.cliente.nome))];
  const pets = [...new Set(events.map((event) => event.cliente.pet.nome))];
  const servicos = [
    ...new Set(events.flatMap((event) => event.title)), 
  ];
  const funcionarios = [...new Set(events.map((event) => event.funcionario))];
  const formasPagamento = [
    ...new Set(events.map((event) => event.paymentMethod)),
  ];

  const [selectedServices, setSelectedServices] = useState(editedEvent.title);

  const removeService = (service) => {
    setSelectedServices((prevServices) =>
      prevServices.filter((item) => item !== service)
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
          exibirInformacao={false}
          isDisabled={true}
        />

        {/* Renderização das etiquetas abaixo do campo de serviço */}
        <div className={styles["selected-services"]}>
          {selectedServices.map((item, index) => (
            <span className={styles["service-chip"]} key={index}>
              {item}
              <button disabled={true} onClick={() => removeService(item)}>
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
        <label>Observações*</label>
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
