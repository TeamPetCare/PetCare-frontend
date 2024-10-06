import React, { useState } from "react";
import { motion } from "framer-motion";
import sendEmail from "../../../../services/emailService.js";
import SendEmailJs from "../../shared/sendEmailJs/SendEmailJs.jsx";
import styles from "./Section04.module.css";
import imgPataGatoHumano from "../../../../utils/assets/site-institucional/inicio/imgPataGatoHumano.png";

const Section04 = () => {
  const [formData, setFormData] = useState({
    nomeCompleto: "",
    email: "",
    telefone: "",
  });

  const [modalMessage, setModalMessage] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [show, setShow] = useState(false);

  const limparCampos = () => {
    setFormData({
      nomeCompleto: "",
      email: "",
      telefone: "",
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.nomeCompleto || !formData.email || !formData.telefone) {
      setModalMessage("Por favor, preencha todos os campos.");
      setModalVisible(true);
      setShow(true);
      return;
    }

    sendEmail(formData).then(
      (response) => {
        setModalMessage("✅ Email enviado com sucesso!");
        setModalVisible(true);
        setShow(true);
        limparCampos();
      },
      (error) => {
        setModalMessage("❌ Erro ao enviar o email. Tente novamente.");
        setModalVisible(true);
        setShow(true);
      }
    );
  };

  const closeModal = () => {
    setModalVisible(false);
    setShow(false);
  };

  return (
    <div className={styles.container}>
      <SendEmailJs
        modalMessage={modalMessage}
        isModalVisible={isModalVisible}
        closeModal={closeModal}
        showStatus={show}
        setShow={setShow}
      />
      <div className={styles["container-texto"]}>
        <div className={styles["container-titulo"]}>
          <h3>Experimente grátis por 15 dias – sem compromisso!</h3>
          <p>
            Veja como nosso sistema simplifica o gerenciamento de agendamentos e
            melhora a eficiência do seu petshop.
          </p>
        </div>

        <div className={styles["container-form"]}>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="nomeCompleto"
              placeholder="Nome Completo"
              value={formData.nomeCompleto}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="tel"
              name="telefone"
              placeholder="Telefone"
              value={formData.telefone}
              onChange={handleChange}
            />
            <p>
              Ao finalizar o formulário de cadastro, li e estou ciente dos{" "}
              <strong>Termos de Uso</strong> e da{" "}
              <strong>Política de Privacidade</strong> da PetCare.
            </p>
            <button type="submit">Finalizar Cadastro</button>
          </form>
        </div>
      </div>

      <motion.img
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        src={imgPataGatoHumano}
        alt="Imagem decorativa"
      ></motion.img>
    </div>
  );
};

export default Section04;
