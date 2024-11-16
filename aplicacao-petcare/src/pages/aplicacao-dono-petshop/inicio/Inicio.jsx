import React, { useRef, useState, useEffect } from "react";
import UserHeader from "../../../components/aplicacao-dono-petshop/shared/userHeader/UserHeader";
import styles from "./Inicio.module.css";
import Calendario from "../../../components/aplicacao-dono-petshop/inicio/calendario/Calendario";
import TablePagamentos from "../../../components/aplicacao-dono-petshop/inicio/tablePagamentos/TablePagamentos";
import DropDownFilter from "../../../components/shared/dropDownFilter/DropDownFilter";
import KpiAgendamentos from "../../../components/aplicacao-dono-petshop/inicio/kpiAgendamentos/KpiAgendamentos";
import { getAllSchedules } from "../../../services/scheduleService";

const Inicio = () => {
  const dadosPlanos = [
    {
      cliente: {
        nome: "Diogo Souza Moura",
        foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxw0eitGgbS6Y3kJODK5lGbWxUV8sONkQUZg&s",
        plano: "Mensal",
      },
      status: "Pendente",
      PeríodoTitle: "Set/24",
      Período: "Setembro 2024",
      valorFaltante: "R$ 100.00",
    },
    {
      cliente: {
        nome: "Maria Silva",
        foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxw0eitGgbS6Y3kJODK5lGbWxUV8sONkQUZg&s",
        plano: "Quinzenal",
      },
      status: "Pendente",
      PeríodoTitle: "2ªQ Ago/24",
      Período: "2ª Quinzena Agosto",
      valorFaltante: "R$ 50.00",
    },
    {
      cliente: {
        nome: "Julia Cunha",
        foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxw0eitGgbS6Y3kJODK5lGbWxUV8sONkQUZg&s",
        plano: "Quinzenal",
      },
      status: "Pago",
      PeríodoTitle: "1ªQ Set/24",
      Período: "1ª Quinzena Setembro",
      valorFaltante: "R$0",
    },
    {
      cliente: {
        nome: "Julia Cunha",
        foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxw0eitGgbS6Y3kJODK5lGbWxUV8sONkQUZg&s",
        plano: "Quinzenal",
      },
      status: "Pago",
      PeríodoTitle: "1ªQ Set/24",
      Período: "1ª Quinzena Setembro",
      valorFaltante: "R$0",
    },
    {
      cliente: {
        nome: "Julia Cunha",
        foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxw0eitGgbS6Y3kJODK5lGbWxUV8sONkQUZg&s",
        plano: "Quinzenal",
      },
      status: "Pago",
      PeríodoTitle: "1ªQ Set/24",
      Período: "1ª Quinzena Setembro",
      valorFaltante: "R$0",
    },
    {
      cliente: {
        nome: "Julia Cunha",
        foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxw0eitGgbS6Y3kJODK5lGbWxUV8sONkQUZg&s",
        plano: "Quinzenal",
      },
      status: "Pago",
      PeríodoTitle: "1ªQ Set/24",
      Período: "1ª Quinzena Setembro",
      valorFaltante: "R$0",
    },
    {
      cliente: {
        nome: "Maria Silva",
        foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxw0eitGgbS6Y3kJODK5lGbWxUV8sONkQUZg&s",
        plano: "Quinzenal",
      },
      status: "Pendente",
      PeríodoTitle: "2ªQ Ago/24",
      Período: "2ª Quinzena Agosto",
      valorFaltante: "R$ 50.00",
    },
  ];


  const [allEvents, setAllEvents] = useState([]);
  const formatEndTime = (dateHour, duracao) => {
    const [hours, minutes, seconds] = duracao.split(":").map(Number);
    const dateHourDate = new Date(dateHour)
    dateHourDate.setHours(dateHourDate.getHours() + hours);
    dateHourDate.setMinutes(dateHourDate.getMinutes() + minutes);
    dateHourDate.setSeconds(dateHourDate.getSeconds() + seconds);
    7;

    return dateHourDate.toISOString();
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const servicos = await getAllSchedules();
        console.log(servicos);

        const eventosFormatados = servicos.map((servico) => ({
          ...servico,
          start: new Date(servico.scheduleDate),
          end: new Date(formatEndTime(servico.scheduleDate, servico.scheduleTime)),
        }));
        console.log("Agendamentos Formatados " + eventosFormatados);

        setAllEvents(eventosFormatados);

      } catch (error) {
        console.error("Erro ao carregar serviços:", error);
      }
    };

    loadData();
  }, []);

  const filterOptions = [
    { label: "Tudo" },
    { label: "Ontem" },
    { label: "Hoje" },
    { label: "Últimos 7 dias" },
    { label: "Este mês" },
    { label: "Último mês" },
  ];

  return (
    <div className={styles["container"]}>
      <UserHeader />
      <div className={styles["main-container"]}>
        <Calendario
          dadosAgendamentos={allEvents}
          className={styles["calendario-container"]}
        />
        <div className={styles["kpis-container"]}>
          <div className={styles["first-container"]}>
            <DropDownFilter options={filterOptions} />
            <TablePagamentos dadosPlanos={dadosPlanos} />
          </div>

          <div className={styles["second-container"]}>
            <KpiAgendamentos dadosAgendamentos={allEvents}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inicio;
