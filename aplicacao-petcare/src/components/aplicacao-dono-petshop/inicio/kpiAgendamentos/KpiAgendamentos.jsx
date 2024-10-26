import styles from "./KpiAgendamentos.module.css";
import ProgressBar from "react-bootstrap/ProgressBar";
import { MdOutlineDownloadDone, MdCancel } from "react-icons/md";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { HiInformationCircle } from "react-icons/hi2";
import { useState } from "react";

const KpiAgendamentos = () => {
  const [porcenNaoPagos, setPorcenNaoPagos] = useState(40);
  const [porcenPagos, setPorcenPagos] = useState(70);

  return (
    <div className={styles["container"]}>
      <div className={styles["container-status-agendamentos"]}>
        <div
          className={`${styles["container-status"]} ${styles["container-agendados"]}`}
        >
          <div className={styles["container-title"]}>
            <RiCalendarScheduleFill size={18} className={styles["icon"]} />
            <p>Agendados</p>
          </div>
          <div className={styles["container-dados-first"]}>
            <HiInformationCircle
              size={16}
              className={styles["icon-i"]}
              title="Total de atendimentos agendados, concluídos com sucesso e os cancelados, de acordo com o filtro selecionado."
            />
            <p>10</p>
          </div>
        </div>
        <div
          className={`${styles["container-status"]} ${styles["container-concluidos"]}`}
        >
          <div className={styles["container-title"]}>
            <MdOutlineDownloadDone size={18} className={styles["icon"]} />
            <p>Concluídos</p>
          </div>
          <div className={styles["container-dados"]}>
            <p>10</p>
          </div>
        </div>
        <div
          className={`${styles["container-status"]} ${styles["container-cancelados"]}`}
        >
          <div className={styles["container-title"]}>
            <MdCancel size={18} className={styles["icon"]} />
            <p>Cancelados</p>
          </div>
          <div className={styles["container-dados"]}>
            <p>10</p>
          </div>
        </div>
      </div>

      <div className={styles["container-atendimentos-agendados"]}>
        <div className={styles["container-atendimentos-title"]}>
          <p>Atendimentos Agendados:</p>
          <HiInformationCircle
            size={16}
            className={styles["icon-i"]}
            title="Quantidade de atendimentos agendados pagos e pendentes de pagamento, de acordo com o filtro selecionado"
          />
        </div>

        <div className={styles["progress-container"]}>
          <div className={styles["progress-item"]}>
            <div className={styles["progress-details"]}>
              <p className={styles["progress-title"]}>Não Pagos</p>
            </div>
            <ProgressBar
              className={styles["progress-bar-red"]}
              variant="danger"
              now={porcenNaoPagos}
              label={`${porcenNaoPagos}%`}
            />
          </div>
          <div className={styles["progress-item"]}>
            <div className={styles["progress-details"]}>
              <p className={styles["progress-title"]}>Pagos</p>
            </div>
            <ProgressBar
              className={styles["progress-bar-green"]}
              variant="success"
              now={porcenPagos}
              label={`${porcenPagos}%`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default KpiAgendamentos;
