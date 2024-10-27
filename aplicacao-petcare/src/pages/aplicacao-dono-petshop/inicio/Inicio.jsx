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
      funcionario: "Jaqueline",
      cliente: {
        nome: "Julia Cunha",
        whatsapp: "11912345678", // Removido +55 e espaços
        foto: "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg",
        pet: {
          nome: "Thor",
          teste: "Labrador",
          foto: "https://www.doglife.com.br/blog/assets/post/plano-de-saude-pet-sem-carencia-662bb2a183b68a52330af61d/plano-de-saude-pet-sem-carencia%20(2).webp",
        },
      },
      observacoes: "Thor apresentava caspa antes do atendimento, mas agora está limpo. O dono prefere tosar apenas a parte de trás do corpo."
    },
    {
      id: "2",
      title: "Big Meeting",
      paymentStatus: true,
      paymentMethod: "Pix",
      start: new Date(2024, 9, 1, 10, 30, 0, 0),
      end: new Date(2024, 9, 1, 11, 30, 0, 0),
      status: "Cancelado",
      funcionario: "Jaqueline",
      cliente: {
        nome: "José",
        whatsapp: "11987654321", // Removido +55 e espaços
        foto: "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg",
        pet: {
          nome: "Maria",
          teste: "Poodle",
          foto: "https://www.doglife.com.br/blog/assets/post/plano-de-saude-pet-sem-carencia-662bb2a183b68a52330af61d/plano-de-saude-pet-sem-carencia%20(2).webp",
        },
      },
      observacoes: "Maria está em tratamento de pele e requer atenção especial com produtos hipoalergênicos."
    },
    {
      id: "3",
      title: "Tosa",
      paymentStatus: false,
      paymentMethod: "Dinheiro",
      start: new Date(2024, 9, 1, 14, 30, 0, 0),
      end: new Date(2024, 9, 1, 15, 30, 0, 0),
      status: "Agendado",
      funcionario: "Jaqueline",
      cliente: {
        nome: "Heitor Lima",
        whatsapp: "11923456789", // Removido +55 e espaços
        foto: "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg",
        pet: {
          nome: "Madonna",
          teste: "Bulldog",
          foto: "https://www.doglife.com.br/blog/assets/post/plano-de-saude-pet-sem-carencia-662bb2a183b68a52330af61d/plano-de-saude-pet-sem-carencia%20(2).webp",
        },
      },
      observacoes: "Madonna gosta de ser acariciada durante o banho. O dono prefere horários tranquilos."
    },
    {
      id: "4",
      title: "Big Meeting",
      paymentStatus: true,
      paymentMethod: "Pix",
      start: new Date(2024, 9, 1, 17, 30, 0, 0),
      end: new Date(2024, 9, 1, 18, 0, 0, 0),
      status: "Concluído",
      funcionario: "Isaac",
      cliente: {
        nome: "Leo",
        whatsapp: "11934567890", // Removido +55 e espaços
        foto: "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg",
        pet: {
          nome: "Bobby",
          teste: "Beagle",
          foto: "https://www.doglife.com.br/blog/assets/post/plano-de-saude-pet-sem-carencia-662bb2a183b68a52330af61d/plano-de-saude-pet-sem-carencia%20(2).webp",
        },
      },
      observacoes: "Bobby teve problemas de alergia anteriormente, cuidado com produtos perfumados."
    },
    {
      id: "5",
      title: "Vacation",
      paymentStatus: true,
      paymentMethod: "Cartão de Crédito",
      start: new Date(2024, 9, 7, 10, 30, 0, 0),
      end: new Date(2024, 9, 7, 12, 30, 0, 0),
      status: "Agendado",
      funcionario: "Jaqueline",
      cliente: {
        nome: "Julia Cunha",
        whatsapp: "11912345678", // Removido +55 e espaços
        foto: "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg",
        pet: {
          nome: "Thor",
          teste: "Labrador",
          foto: "https://www.doglife.com.br/blog/assets/post/plano-de-saude-pet-sem-carencia-662bb2a183b68a52330af61d/plano-de-saude-pet-sem-carencia%20(2).webp",
        },
      },
      observacoes: "Thor já foi tosado e está acostumado a longas sessões, mas não gosta de secador."
    },
    {
      id: "6",
      title: "Banho + Tosa",
      paymentStatus: false,
      paymentMethod: "Pix",
      start: new Date(2024, 9, 12, 10, 35, 0, 0),
      end: new Date(2024, 9, 12, 12, 30, 0, 0),
      status: "Cancelado",
      funcionario: "Isaac",
      cliente: {
        nome: "Heitor Lima",
        whatsapp: "11923456789", // Removido +55 e espaços
        foto: "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg",
        pet: {
          nome: "Madonna",
          teste: "Bulldog",
          foto: "https://www.doglife.com.br/blog/assets/post/plano-de-saude-pet-sem-carencia-662bb2a183b68a52330af61d/plano-de-saude-pet-sem-carencia%20(2).webp",
        },
      },
      observacoes: "Madonna está na fase de adaptação, preferindo ambientes calmos e pouco barulhentos."
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
