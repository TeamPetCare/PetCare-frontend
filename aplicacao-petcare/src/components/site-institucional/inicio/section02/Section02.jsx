import styles from "./Section02.module.css";
import { PiPawPrintFill } from "react-icons/pi";

const Section02 = () => {
  return (
    <div className={styles["container"]}>
      <div className={styles["beneficios"]}>
        <div className={styles["item-beneficio"]}>
          <div>
            <PiPawPrintFill />
            <h3>Agendamentos Sem Estresse</h3>
          </div>
          <p>Organize os horários de forma fácil e sem erros. Agendou? Pronto!</p>
        </div>
        <div className={styles["item-beneficio"]}>
          <div>
            <PiPawPrintFill />
            <h3>Dados que Fazem a Diferença</h3>
          </div>
          <p>Veja relatórios claros e entenda o que realmente importa para otimizar seus serviços.</p>
        </div>
        <div className={styles["item-beneficio"]}>
          <div>
            <PiPawPrintFill />
            <h3>Clientes Sempre Satisfeitos</h3>
          </div>
          <p>Com lembretes automáticos e uma interface amigável, seus clientes vão amar a conveniência.</p>
        </div>
      </div>
    </div>
  );
};

export default Section02;
