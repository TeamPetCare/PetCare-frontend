import React, { useState, useEffect } from "react";
import UserHeader from "../../../components/aplicacao-dono-petshop/shared/userHeader/UserHeader";
import styles from "./Inicio.module.css";
import Calendario from "../../../components/aplicacao-dono-petshop/inicio/calendario/Calendario";
import TablePagamentos from "../../../components/aplicacao-dono-petshop/inicio/tablePagamentos/TablePagamentos";
import KpiAgendamentos from "../../../components/aplicacao-dono-petshop/inicio/kpiAgendamentos/KpiAgendamentos";
import { getAllSchedules } from "../../../services/scheduleService";

// Função utilitária para formatar a data final do evento
const formatEndTime = (dateHour, duration) => {
  const [hours, minutes, seconds] = duration.split(":").map(Number);
  const date = new Date(dateHour);
  date.setHours(date.getHours() + hours);
  date.setMinutes(date.getMinutes() + minutes);
  date.setSeconds(date.getSeconds() + seconds);
  return date.toISOString();
};

// Função utilitária para formatar o mês para o nome completo
const formatMonthToExtenso = (month) => {
  const months = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];
  const [year, monthNumber] = month.split("-").map(Number);
  return `${months[monthNumber - 1]} ${year}`;
};

const Inicio = () => {
  const [allEvents, setAllEvents] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(null);

  // Função para atualizar o mês atual
  const handleMonthChange = (month) => {
    setCurrentMonth(month);
    console.log("Mês atual:", month);
  };

  // Definir o mês atual ao carregar a página
  useEffect(() => {
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const formattedMonth = firstDayOfMonth.toISOString().slice(0, 7); // Formato YYYY-MM
    setCurrentMonth(formattedMonth);
  }, []);

  // Carregar os dados dos agendamentos sempre que o mês mudar
  useEffect(() => {
    if (currentMonth) {
      console.log("OLÁAAA")
      loadData();
    }
  }, [currentMonth]);

  // Função para carregar os dados de agendamentos
  const loadData = async () => {
    try {
      console.log("Buscando dados do backend para:", currentMonth);
      const servicos = await getAllSchedules(currentMonth);

      const formattedEvents = servicos.map((servico) => ({
        ...servico,
        start: new Date(servico.scheduleDate),
        end: new Date(formatEndTime(servico.scheduleDate, servico.scheduleTime)),
      }));

      setAllEvents(formattedEvents);
    } catch (error) {
      console.error("Erro ao carregar serviços:", error);
    }
  };

  return (
    <div className={styles["container"]}>
      <UserHeader />
      <div className={styles["main-container"]}>
        <Calendario
          dadosAgendamentos={allEvents}
          onMonthChange={handleMonthChange}
          className={styles["calendario-container"]}
        />
        <div className={styles["kpis-container"]}>
          <div className={styles["first-container"]}>
            <h3>Pagamentos dos Planos</h3>
            <TablePagamentos />
          </div>

          <div className={styles["second-container"]}>
            <h3>Resumo do Mês - {currentMonth && formatMonthToExtenso(currentMonth)}</h3>
            <KpiAgendamentos dadosAgendamentos={allEvents} month={currentMonth} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inicio;
