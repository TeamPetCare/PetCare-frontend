import React from "react";
import styles from "./EditEventModalCampos.module.css";
import DropDown from "../../../../../shared/dropDown/DropDown";
import TimePicker from "../../../../../shared/timePicker/TimePicker";
import { PiUserCircleThin, PiPawPrintThin } from "react-icons/pi";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { GoPeople } from "react-icons/go";
import { SiContactlesspayment } from "react-icons/si";

const EditEventModalCampos = ({
  editedEvent,
  handleChange,
  isEditing,
  formatTime,
}) => {
  const events = [
    {
      id: "1",
      title: "Tosa",
      paymentStatus: false,
      paymentMethod: "Dinheiro",
      start: new Date(2024, 9, 1, 8, 30, 0, 0),
      end: new Date(2024, 9, 1, 9, 30, 0, 0),
      status: "Concluído",
      funcionario: "Jaqueline",
      cliente: {
        nome: "Julia Cunha",
        whatsapp: "11912345678", // Removido +55 e espaços
        foto: "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg",
        pet: {
          nome: "Thor",
          teste: "Labrador",
          foto: "https://www.doglife.com.br/blog/assets/post/plano-de-saude-pet-sem-carencia-662bb2a183b68a52330af61d/plano-de-saude-pet-sem-carencia%20(2).webp",
        },
      },
    },
    {
      id: "2",
      title: "Big Meeting",
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
          teste: "Poodle",
          foto: "https://www.doglife.com.br/blog/assets/post/plano-de-saude-pet-sem-carencia-662bb2a183b68a52330af61d/plano-de-saude-pet-sem-carencia%20(2).webp",
        },
      },
    },
    {
      id: "3",
      title: "Tosa",
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
          teste: "Bulldog",
          foto: "https://www.doglife.com.br/blog/assets/post/plano-de-saude-pet-sem-carencia-662bb2a183b68a52330af61d/plano-de-saude-pet-sem-carencia%20(2).webp",
        },
      },
    },
    {
      id: "4",
      title: "Big Meeting",
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
          teste: "Beagle",
          foto: "https://www.doglife.com.br/blog/assets/post/plano-de-saude-pet-sem-carencia-662bb2a183b68a52330af61d/plano-de-saude-pet-sem-carencia%20(2).webp",
        },
      },
    },
    {
      id: "5",
      title: "Vacation",
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
          teste: "Labrador",
          foto: "https://www.doglife.com.br/blog/assets/post/plano-de-saude-pet-sem-carencia-662bb2a183b68a52330af61d/plano-de-saude-pet-sem-carencia%20(2).webp",
        },
      },
    },
    {
      id: "6",
      title: "Banho + Tosa",
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
          teste: "Bulldog",
          foto: "https://www.doglife.com.br/blog/assets/post/plano-de-saude-pet-sem-carencia-662bb2a183b68a52330af61d/plano-de-saude-pet-sem-carencia%20(2).webp",
        },
      },
    },
  ];
  const clientes = [...new Set(events.map((event) => event.cliente.nome))]; // Obter clientes únicos
  const pets = [...new Set(events.map((event) => event.cliente.pet.nome))];
  const servicos = [...new Set(events.map((event) => event.title))];
  const funcionarios = [...new Set(events.map((event) => event.funcionario))];
  const formasPagamento = [
    ...new Set(events.map((event) => event.paymentMethod)),
  ];

  return (
    <>
      <div className={styles["row1"]}>
        <DropDown
          agendamento={editedEvent}
          options={clientes}
          titulo={"Selecione um cliente*"}
          icon={PiUserCircleThin}
          selectedItem={editedEvent.cliente.nome}
          className={styles["container-dropdown"]}
          exibirInformacao={true}
        />

        <DropDown
          agendamento={editedEvent}
          options={pets}
          titulo={"Selecione um Pet*"}
          icon={PiPawPrintThin}
          selectedItem={editedEvent.cliente.pet.nome}
          exibirInformacao={true}
        />
      </div>
      <div className={styles["row2"]}>
        <DropDown
          agendamento={editedEvent}
          options={servicos}
          titulo={"Selecione um serviço*"}
          icon={HiOutlineShoppingBag}
          selectedItem={editedEvent.title}
          exibirInformacao={true}
        />
      </div>
      <div className={styles["row3"]}>
        <TimePicker dtInicial={editedEvent.start} dtFinal={editedEvent.end} />
        <DropDown
          agendamento={editedEvent}
          options={funcionarios}
          titulo={"Selecione um funcionário*"}
          icon={GoPeople}
          selectedItem={editedEvent.funcionario}
          className={styles["container-dropdown"]}
          exibirInformacao={false}
        />
      </div>
      <div className={styles["row4"]}>
        <label>Observações</label>
        <textarea
          name="observacoes"
          value={editedEvent.observacoes}
          onChange={handleChange}
          disabled={!isEditing}
          className={styles["input-observacoes"]}
          onClick={(e) => e.stopPropagation()}
        />
      </div>
      <div className={styles["row5"]}>
        <h5>Pagamento</h5>
        <div>
          <DropDown
            agendamento={editedEvent}
            options={formasPagamento}
            titulo={"Selecione um forma de pagamento*"}
            icon={SiContactlesspayment}
            selectedItem={editedEvent.paymentMethod}
            className={styles["container-dropdown"]}
            exibirInformacao={false}
          />
          <div className={styles["containe-status-pag"]}>
            <label>
              <strong>Status do Pagamento:</strong>
            </label>
            <div className={styles.checkboxGroup}>
              <label>
                <input
                  type="radio"
                  name="paymentStatus"
                  value="pendente"
                  checked={!editedEvent.paymentStatus}
                  onChange={handleChange}
                  disabled={!isEditing}
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
                  disabled={!isEditing}
                />
                Pago
              </label>
            </div>
          </div>
        </div>
      </div>
      <div>
        <label>
          <strong>Título:</strong>
        </label>
        <input
          type="text"
          name="title"
          value={editedEvent.title}
          onChange={handleChange}
          disabled={!isEditing}
          className={styles.input}
          onClick={(e) => e.stopPropagation()}
        />
      </div>
      <div>
        <label>
          <strong>Status:</strong>
        </label>
        <select
          name="status"
          value={editedEvent.status}
          onChange={handleChange}
          disabled={!isEditing}
          className={styles.input}
        >
          <option value="agendado">Agendado</option>
          <option value="concluido">Concluído</option>
          <option value="cancelado">Cancelado</option>
        </select>
      </div>
      <div>
        <label>
          <strong>Pagamento:</strong>
        </label>
        <select
          name="paymentMethod"
          value={editedEvent.paymentMethod}
          onChange={handleChange}
          disabled={!isEditing}
          className={styles.input}
          onClick={(e) => e.stopPropagation()}
        >
          <option value="pix">Pix</option>
          <option value="dinheiro">Dinheiro</option>
          <option value="cartao_credito">Cartão de Crédito</option>
          <option value="cartao_debito">Cartão de Débito</option>
        </select>
      </div>
      <div>
        <label>
          <strong>Status do Pagamento:</strong>
        </label>
        <div className={styles.checkboxGroup}>
          <label>
            <input
              type="radio"
              name="paymentStatus"
              value="pendente"
              checked={!editedEvent.paymentStatus}
              onChange={handleChange}
              disabled={!isEditing}
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
              disabled={!isEditing}
            />
            Pago
          </label>
        </div>
      </div>
      <div>
        <label>
          <strong>Horário de Início:</strong>
        </label>
        <input
          type="time"
          name="startTime"
          value={formatTime(editedEvent.start)}
          disabled={!isEditing}
          className={styles.input}
          onChange={handleChange}
          onClick={(e) => e.stopPropagation()}
        />
      </div>
      <div>
        <label>
          <strong>Horário de Fim:</strong>
        </label>
        <input
          type="time"
          name="endTime"
          value={formatTime(editedEvent.end)}
          disabled={!isEditing}
          className={styles.input}
          onChange={handleChange}
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </>
  );
};

export default EditEventModalCampos;
