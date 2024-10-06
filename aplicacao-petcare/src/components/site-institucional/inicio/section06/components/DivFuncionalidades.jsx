import styles from "./DivFuncionalidades.module.css";
import { AiFillCheckCircle } from "react-icons/ai";
import { motion } from "framer-motion";

const DivFuncionalidades = ({ dados, className }) => {
  return (
    <div className={`${styles["container"]} ${className}`}>
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.0 }}
        className={styles["container-texto"]} 
      >
          <h3>{dados.titulo}</h3>
          <ul>
            {dados.descricao.map((item, index) => (
              <li key={index}>
                <div>
                  <AiFillCheckCircle size={14} />
                  <p>{item}</p>
                </div>
              </li>
            ))}
          </ul>
      </motion.div>

      <motion.img 
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.0 }}
      src={dados.imgSrc} alt="Imagem de um computador" />
    </div>
  );
};

export default DivFuncionalidades;
