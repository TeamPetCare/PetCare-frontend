import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./FormSuporte.module.css";

const FormSuporte = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState("");
  const [erroTipoUsuario, setErroTipoUsuario] = useState("");
  const [sendFeedback, setSendFeedback] = useState("");
  const [isSendVisible, setIsSendVisible] = useState(false);

  const enviarFormulario = (e) => {
    e.preventDefault();

    if (!name || !email || !phone || !description) {
      setSendFeedback("❗ Por favor, preencha todos os campos.");
      setIsSendVisible(true);
      return;
    }

    if (!tipoUsuario) {
      setErroTipoUsuario("❗ Por favor, selecione um tipo de usuário.");
      return;
    }

    setSendFeedback("✅ Mensagem enviada com sucesso!");
    setName("");
    setEmail("");
    setPhone("");
    setDescription("");
    setTipoUsuario("");
    setErroTipoUsuario("");
    setIsSendVisible(true);
  };

  const limparFormulario = () => {
    setName("");
    setEmail("");
    setPhone("");
    setDescription("");
    setTipoUsuario("");
    setErroTipoUsuario("");
  };

  React.useEffect(() => {
    if (isSendVisible) {
      const timer = setTimeout(() => setIsSendVisible(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isSendVisible]);

  return (
    <div className={styles["container"]}>
      <AnimatePresence>
        {isSendVisible && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={styles["feedback-mensagem-enviar"]}
          >
            {sendFeedback}
          </motion.div>
        )}
      </AnimatePresence>

      <div className={styles["container-forms-titulo"]}>
        <h2>Entre em contato</h2>
      </div>
      <div className={styles["container-forms-background"]}>
        <form onSubmit={enviarFormulario} className={styles["container-forms-conteudo"]}>
          <label htmlFor="name">Nome Completo*</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Digite seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-label="Nome Completo"
            required
          />

          <div className={styles["container-row"]}>
            <div className={styles["container-input"]}>
              <label htmlFor="email">E-mail*</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="E-mail"
                required
              />
            </div>
            <div className={styles["container-input"]}>
              <label htmlFor="phone">Número de Celular*</label>
              <input
                type="text"
                id="phone"
                name="phone"
                placeholder="Digite seu número de celular"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                aria-label="Número de celular"
                required
              />
            </div>
          </div>

          <p className={styles["info-texto"]}>Tipos de usuário:</p>
          <legend className={styles["subheader-texto"]}>Eu sou...</legend>

          <fieldset className={styles["container-opcoes"]}>
            <label className={styles["container-opcao"]}>
              <input
                type="radio"
                name="tipoUsuario"
                value="donoPets"
                checked={tipoUsuario === "donoPets"}
                onChange={(e) => setTipoUsuario(e.target.value)}
              />
              <span className={styles["container-marca-selecao"]}></span>
              Usuário - Dono de Pet/Pets
            </label>
            <label className={styles["container-opcao"]}>
              <input
                type="radio"
                name="tipoUsuario"
                value="donoPetShop"
                checked={tipoUsuario === "donoPetShop"}
                onChange={(e) => setTipoUsuario(e.target.value)}
              />
              <span className={styles["container-marca-selecao"]}></span>
              Usuário - Dono PETSHOP
            </label>
            <label className={styles["container-opcao"]}>
              <input
                type="radio"
                name="tipoUsuario"
                value="funcionarioPetShop"
                checked={tipoUsuario === "funcionarioPetShop"}
                onChange={(e) => setTipoUsuario(e.target.value)}
              />
              <span className={styles["container-marca-selecao"]}></span>
              Usuário - Funcionário PETSHOP
            </label>
          </fieldset>

          {erroTipoUsuario && <p className={styles["erro-mensagem"]}>{erroTipoUsuario}</p>}

          <p className={styles["info-texto"]}>Como podemos ajudá-lo?</p>
          <textarea
            className={styles["container-area-texto"]}
            placeholder="Descreva aqui sua solicitação"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            aria-label="Campo de descrição da solicitação"
            required
          ></textarea>

          <div className={styles["container-grupo-botoes"]}>
            <button type="submit" aria-label="Enviar formulário" className={styles["container-botao-enviar"]}>
              Enviar
            </button>
            <button type="button"
              onClick={limparFormulario}
              className={styles["container-botao-limpar"]}
              aria-label="Limpar campos do formulário"
            >
              Limpar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormSuporte;