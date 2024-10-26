import React from "react";
import styles from "./EditEventModalCampos.module.css";
import DropDown from "../../../../../shared/dropDown/DropDown";
import { PiUserCircleThin, PiPawPrintThin } from "react-icons/pi";

const EditEventModalCampos = ({
  editedEvent,
  handleChange,
  isEditing,
  formatTime,
}) => {
  const dataClientes = [
    {
      nome: "Julia Cunha",
      whatsapp: "+5511912345678", // Número de WhatsApp (no formato internacional)
      foto: "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg", // URL da foto
      whatsappLink: "https://wa.me/5511976116870", // Link direto para WhatsApp
    },
    {
      nome: "José",
      whatsapp: "+5511987654321", // Número de WhatsApp (no formato internacional)
      foto: "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg", // URL da foto
      whatsappLink: "https://wa.me/5511976116870", // Link direto para WhatsApp
    },
    {
      nome: "Heitor Lima",
      whatsapp: "+5511923456789", // Número de WhatsApp (no formato internacional)
      foto: "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg", // URL da foto
      whatsappLink: "https://wa.me/5511976116870", // Link direto para WhatsApp
    },
  ];

  const dataPets = [
    {
      nome: "Thor",
      teste: "Labrador", // Raça do pet
      foto: "https://www.doglife.com.br/blog/assets/post/plano-de-saude-pet-sem-carencia-662bb2a183b68a52330af61d/plano-de-saude-pet-sem-carencia%20(2).webp",
    },
    {
      nome: "Maria",
      teste: "Poodle", // Raça do pet
      foto: "https://www.doglife.com.br/blog/assets/post/plano-de-saude-pet-sem-carencia-662bb2a183b68a52330af61d/plano-de-saude-pet-sem-carencia%20(2).webp",
    },
    {
      nome: "Madonna",
      teste: "Bulldog",
      foto: "https://www.doglife.com.br/blog/assets/post/plano-de-saude-pet-sem-carencia-662bb2a183b68a52330af61d/plano-de-saude-pet-sem-carencia%20(2).webp",
    },
  ];

  return (
    <>
      <div className={styles["row1"]}>
        <DropDown
          options={dataClientes}
          titulo={"Selecione um cliente*"}
          icon={PiUserCircleThin}
          cliente={editedEvent.cliente || {}}
        />

        <DropDown
          options={dataPets}
          titulo={"Selecione um Pet*"}
          icon={PiPawPrintThin}
          cliente={editedEvent.cliente.pet || {}}
        />
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
