import styles from "./Section06.module.css";
import DivFuncionalidades from "./components/DivFuncionalidades";

import imgDesktopAreaAtendimento from "../../../../utils/assets/site-institucional/inicio/imgDesktopAreaAtendimento.png";
import imgDesktopFinanceiro from "../../../../utils/assets/site-institucional/inicio//imgDesktopFinanceiro.png";
import imgDesktopRelatorios from "../../../../utils/assets/site-institucional/inicio//imgDesktopRelatorios.png";


const Section06 = () => {
  const dados = [
    {
      id: 1,
      imgSrc: imgDesktopAreaAtendimento,
      titulo: "Área de Atendimento",
      descricao: [
        "Gerenciamento de Agendamentos",
        "Coleta de Informações dos Pets",
        "Filtragem de Requisições",
        "Histórico de Atendimentos",
        "Chat de Atendimento ao Cliente",
        "Lembretes de agendamentos",
        "Pagamentos com PIX rápidos",
      ],
    },
    {
      id: 2,
      imgSrc: imgDesktopFinanceiro,
      titulo: "Financeiro e Administrativo",
      descricao: [
        "Consultas de pagamentos",
        "Controle de clientes",
        "Controle de funcionários",
        "Pagamentos dos seus planos",
      ],
    },
    {
      id: 3,
      imgSrc: imgDesktopRelatorios,
      titulo: "Relatórios",
      descricao: [
        "Relatório de Agendamentos",
        "Relatório de clientes",
        "Relatório dos Funcionários",
        "Relatório de Pagamentos",
        "Pagamentos Online",
      ],
    },
  ];
  return (
    <div className={styles["container"]}>
      <div className={styles["container-texto"]}>
        <h1>Todas as funcionalidades do sistema</h1>
        <p>
          Maximize a eficiência do seu petshop: Descubra todas as
          funcionalidades que facilitam a gestão e aumentam a rentabilidade.
        </p>
      </div>
      <div className={styles["container-funcionalidades"]}>
        <DivFuncionalidades dados={dados[0]} />
        <DivFuncionalidades className={styles["div-funcionalidade-reverso"]} dados={dados[1]} />
        <DivFuncionalidades dados={dados[2]} />
      </div>
    </div>
  );
};

export default Section06;
