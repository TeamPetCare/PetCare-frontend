import styles from "./Section01.module.css";
import { motion } from 'framer-motion';

const Section01 = ({
  img,
  preTitulo,
  titulo,
  textoDetalhado,
  iconBotao: IconBotao,
  botao,
  scrollToSection04
}) => {
  return (
        <div className={styles["container"]}>
        <div className={styles["container-texto"]}>
          <div>
            <p>{preTitulo}</p>
            <h1>{titulo}</h1>
            <p>{textoDetalhado}</p>
          </div>
          <button onClick={scrollToSection04}>
            <IconBotao size={20} /> {botao}
          </button>
        </div>
  
        <motion.div 
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className={styles["container-img"]}>
          <img src={img} alt="" />
        </motion.div>
      </div>
  );
};

export default Section01;
