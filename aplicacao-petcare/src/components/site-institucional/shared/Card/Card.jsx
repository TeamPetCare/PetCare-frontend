import styles from "./Card.module.css";
import { FaArrowRightLong } from "react-icons/fa6";

const Card = ({icon: Icon, titulo, descricao, animalSvg, scrollToSection04}) => {
  return (
    <div className={styles["card"]}>
      <div className={styles["card-titulo"]}>
        <div className={styles["card-icon"]}>
         <Icon size={25} />
        </div>
        <h3>{titulo}</h3>
      </div>
      <div className={styles["card-descricao"]}>
        <p>{descricao}</p>
        <button onClick={scrollToSection04}>
          Teste Grátis <FaArrowRightLong className={styles["icon"]} />
        </button>
      </div>
      <img src={animalSvg} alt="Desenho de um animal" />
    </div>
  );
};

export default Card;
