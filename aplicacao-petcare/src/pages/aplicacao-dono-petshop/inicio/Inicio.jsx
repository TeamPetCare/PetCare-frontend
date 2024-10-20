import React, { useRef, useState } from "react";
import UserHeader from "../../../components/aplicacao-dono-petshop/shared/userHeader/UserHeader";
import styles from "./Inicio.module.css";
import Calendario from "../../../components/aplicacao-dono-petshop/inicio/calendario/Calendario";
import TablePagamentos from "../../../components/aplicacao-dono-petshop/inicio/tablePagamentos/TablePagamentos";
import DropDownFilter from "../../../components/shared/dropDownFilter/DropDownFilter";
import KpiAgendamentos from "../../../components/aplicacao-dono-petshop/inicio/kpiAgendamentos/KpiAgendamentos";

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

  const events = [
    {
      id: "1",
      title: "Tosa",
      paymentStatus: false,
      paymentMethod: "Dinheiro",
      start: new Date(2024, 9, 1, 8, 30, 0, 0),
      end: new Date(2024, 9, 1, 9, 30, 0, 0),
      status: "Concluído",
    },
    {
      id: "2",
      title: "Big Meeting",
      paymentStatus: true,
      paymentMethod: "Pix",
      start: new Date(2024, 9, 1, 10, 30, 0, 0),
      end: new Date(2024, 9, 1, 11, 30, 0, 0),
      status: "Cancelado",
    },
    {
      id: "3",
      title: "Tosa",
      paymentStatus: false,
      paymentMethod: "Dinheiro",
      start: new Date(2024, 9, 1, 14, 30, 0, 0),
      end: new Date(2024, 9, 1, 15, 30, 0, 0),
      status: "Agendado",
    },
    {
      id: "4",
      title: "Big Meeting",
      paymentStatus: true,
      paymentMethod: "Pix",
      start: new Date(2024, 9, 1, 17, 30, 0, 0),
      end: new Date(2024, 9, 1, 18, 0, 0, 0),
      status: "Concluído",
    },
    {
      id: "5",
      title: "Vacation",
      paymentStatus: true,
      paymentMethod: "Cartão de Crédito",
      start: new Date(2024, 9, 7, 10, 30, 0, 0),
      end: new Date(2024, 9, 7, 12, 30, 0, 0),
      status: "Agendado",
    },
    {
      id: "6",
      title: "Banho + Tosa",
      paymentStatus: false,
      paymentMethod: "Pix",
      start: new Date(2024, 9, 12, 10, 35, 0, 0),
      end: new Date(2024, 9, 12, 12, 30, 0, 0),
      status: "Cancelado",
    },
  ];

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
          dadosAgendamentos={events}
          className={styles["calendario-container"]}
        />
        <div className={styles["kpis-container"]}>
          <div className={styles["first-container"]}>
            <DropDownFilter options={filterOptions} />
            <TablePagamentos dadosPlanos={dadosPlanos} />
          </div>

          <div className={styles["second-container"]}>
            <KpiAgendamentos />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inicio;
