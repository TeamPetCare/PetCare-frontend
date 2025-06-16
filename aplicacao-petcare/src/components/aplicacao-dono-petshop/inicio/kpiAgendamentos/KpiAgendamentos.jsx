import React, { useState, useEffect } from "react";
import styles from "./KpiAgendamentos.module.css";
import ProgressBar from "react-bootstrap/ProgressBar";
import { MdOutlineDownloadDone, MdCancel } from "react-icons/md";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { HiInformationCircle } from "react-icons/hi2";

const KpiAgendamentos = ({ dadosAgendamentos, month }) => {
  const [porcenNaoPagos, setPorcenNaoPagos] = useState(0);
  const [porcenPagos, setPorcenPagos] = useState(0);
  const [qtdNaoPagos, setQtdNaoPagos] = useState(0);
  const [qtdPagos, setQtdPagos] = useState(0);

  const formatEventMonth = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 7); 
  };

  const filterByMonth = (events, month) => {
    return events.filter((event) => {
      const eventMonth = formatEventMonth(event.scheduleDate);
      return eventMonth === month; 
    });
  };

  const eventosFiltrados = month ? filterByMonth(dadosAgendamentos, month) : [];

  const statusCounts = eventosFiltrados.reduce((acc, item) => {
    acc[item.scheduleStatus] = (acc[item.scheduleStatus] || 0) + 1;
    return acc;
  }, {});

  useEffect(() => {
    const totalAtendimentos = eventosFiltrados.length;
    const naoPagos = eventosFiltrados.filter(
      (item) => item.payment?.paymentStatus === "PENDING"
    ).length;
    const pagos = eventosFiltrados.filter(
      (item) => item.payment?.paymentStatus === "APPROVED"
    ).length;

    setQtdNaoPagos(naoPagos);
    setQtdPagos(pagos);

    setPorcenPagos(
      totalAtendimentos > 0 ? ((pagos / totalAtendimentos) * 100).toFixed(2) : 0
    );
    setPorcenNaoPagos(
      totalAtendimentos > 0 ? ((naoPagos / totalAtendimentos) * 100).toFixed(2) : 0
    );
  }, [eventosFiltrados]);

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
            <p>{statusCounts.AGENDADO || 0}</p>
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
            <p>{statusCounts.CONCLUIDO || 0}</p>
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
            <p>{statusCounts.CANCELADO || 0}</p>
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
              label={`${qtdNaoPagos}`}
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
              label={`${qtdPagos}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default KpiAgendamentos;