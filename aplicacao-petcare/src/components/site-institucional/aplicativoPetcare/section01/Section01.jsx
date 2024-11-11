import { Link } from "react-router-dom";
import styles from "./Section01.module.css";
import { motion } from 'framer-motion';

const Section01 = ({
  img,
  preTitulo,
  titulo,
  textoDetalhado,
  iconBotao: IconBotao,
  botao,
}) => {
  return (
        <div className={styles["container"]}>
        <div className={styles["container-texto"]}>
          <div>
            <p>{preTitulo}</p>
            <h1>{titulo}</h1>
            <p>{textoDetalhado}</p>
          </div>
          <div className={styles["accessContainer"]}>
          <button>
            <IconBotao size={20} /> {botao}
          </button>
           <p>OU Acesse a <Link to="/donoPet/login" className={styles["bold"]}>versão web!</Link></p>
          </div>
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
