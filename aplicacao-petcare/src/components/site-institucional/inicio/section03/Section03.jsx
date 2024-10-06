import React, { useState } from "react";
import { motion } from "framer-motion";

import styles from "./Section03.module.css";
import buttonData from "./data/buttonData.js";

const Section03 = () => {
  const [selectedButton, setSelectedButton] = useState(1);

  const handleClick = (id) => {
    setSelectedButton(id);
  };

  return (
    <div className={styles["container-section03"]}>
      <h1>Por que escolher a PetCare?</h1>
      <div className={styles["container-btns"]}>
        {buttonData.map((button) => (
          <button
            key={button.id}
            onClick={() => handleClick(button.id)}
            style={{
              backgroundColor:
                selectedButton === button.id
                  ? "var(--cor-secundaria-amarelo-claro)"
                  : "var(--cor-primaria-azul-escuro)",
              color:
                selectedButton === button.id
                  ? "var(--cor-primaria-azul-escuro)"
                  : "#FFF",
              fontWeight: selectedButton === button.id ? "800" : "700",
            }}
          >
            {button.btnTitulo}
          </button>
        ))}
      </div>

      {selectedButton !== null && (
        <div className={styles["container-beneficio"]}>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2>{buttonData[selectedButton - 1].titulo}</h2>
            <ul>
              {buttonData[selectedButton - 1].descricao.map((line, index) => (
                <li key={index}>{line}</li>
              ))}
            </ul>
          </motion.div>

          <motion.img
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            src={buttonData[selectedButton - 1].imgSrc}
            alt={buttonData[selectedButton - 1].titulo}
          ></motion.img>
        </div>
      )}
    </div>
  );
};

export default Section03;
