import React from "react";
import { Link } from "react-router-dom";
import styles from "./SideBar.module.css";
import logoBrancoPetCare from "../../../../utils/assets/logos/logoBrancoPetCare.svg";
import ItemSideBar from "./components/itemSideBar/ItemSideBar.jsx";
import LogOut from "../../../shared/logOut/LogOut.jsx";
import { GoHomeFill } from "react-icons/go";
import { TbLayoutSidebarLeftCollapseFilled, TbMenu } from "react-icons/tb";
import {
  RiLogoutCircleLine,
  RiUser3Fill,
  RiCalendarScheduleFill,
} from "react-icons/ri";
import { IoWallet, IoSettingsSharp } from "react-icons/io5";
import { HiClipboardList } from "react-icons/hi";
import { AiFillEdit } from "react-icons/ai";
import { BsPeopleFill } from "react-icons/bs";
import { PiHeadsetFill } from "react-icons/pi";

const icons = {
  general: GoHomeFill,
  clientsPets: RiUser3Fill,
  appointments: RiCalendarScheduleFill,
  payments: IoWallet,
  plans: HiClipboardList,
  registrations: AiFillEdit,
  employees: BsPeopleFill,
  myData: IoSettingsSharp,
  support: PiHeadsetFill,
  logout: RiLogoutCircleLine,
};

const sectionsGeral = [
  { titulo: "Início", icon: icons.general, link: "/dono-petshop/inicio" },
  {
    titulo: "Clientes & Pets",
    icon: icons.clientsPets,
    link: "/dono-petshop/clientes-pets",
  },
  {
    titulo: "Agendamentos",
    icon: icons.appointments,
    link: "/dono-petshop/agendamentos",
  },
];

const sectionsFinanceiro = [
  {
    titulo: "Pagamentos",
    icon: icons.payments,
    link: "/dono-petshop/pagamentos",
  },
  { titulo: "Planos", icon: icons.plans, link: "/dono-petshop/planos" },
];

const sectionsGestão = [
  {
    titulo: "Cadastros",
    icon: icons.registrations,
    link: "/dono-petshop/cadastros",
  },
];
const sectionsConfig = [
  {
    titulo: "Funcionários",
    icon: icons.employees,
    link: "/dono-petshop/gerenciar-funcionarios",
  },
  {
    titulo: "Meus Dados",
    icon: icons.myData,
    link: "/dono-petshop/meus-dados",
  },
  { titulo: "Suporte", icon: icons.support, link: "/dono-petshop/suporte" },
];

const SideBar = ({ isSideBarOpen, toggleSideBar }) => {
  const [openIndex, setOpenIndex] = React.useState("geral");
  const [modalSairShow, setModalSairShow] = React.useState(false);

  const handleToggleItem = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <>
      {/* Botão de Hambúrguer para telas menores */}
      <div className={styles["hamburger-menu"]} onClick={toggleSideBar}>
        <TbMenu size={25} />
      </div>

      <div
        className={`${styles.container} ${styles.sideBar} ${
          isSideBarOpen ? styles.open : styles.closed
        }`}
      >
        <div className={styles["sidebar-top"]}>
          <img src={logoBrancoPetCare} alt="Logo PetCare" />
          <div className={styles["toggle-btn"]} onClick={toggleSideBar}>
            <TbLayoutSidebarLeftCollapseFilled
              size={29}
              className={styles["icon-sidebar"]}
            />
          </div>
        </div>

        <div className={styles["sidebar-middle-bottom"]}>
          <div className={styles["sidebar-middle"]}>
            <ItemSideBar
              titulo="GERAL"
              sections={sectionsGeral}
              isOpenAtributte={openIndex === "geral"}
              onToggle={() => handleToggleItem("geral")}
            />
            <ItemSideBar
              titulo="FINANCEIRO"
              sections={sectionsFinanceiro}
              isOpenAtributte={openIndex === "financeiro"}
              onToggle={() => handleToggleItem("financeiro")}
            />
            <ItemSideBar
              titulo="GESTÃO"
              sections={sectionsGestão}
              isOpenAtributte={openIndex === "gestao"}
              onToggle={() => handleToggleItem("gestao")}
            />
            <ItemSideBar
              titulo="CONFIGURAÇÕES"
              sections={sectionsConfig}
              isOpenAtributte={openIndex === "config"}
              onToggle={() => handleToggleItem("config")}
            />
          </div>

          <div className={styles["sidebar-bottom"]}>
            <ul className={styles["sidebar-section-item"]}>
              <Link
                className={styles["link-section"]}
                onClick={() => setModalSairShow(true)}
              >
                <li className={styles["item-sidebar"]}>
                  <div>
                    {React.createElement(icons.logout, {
                      size: 18,
                      className: styles["icon-section-item"],
                    })}
                    <p>Sair</p>
                  </div>
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </div>

      {/* Modal de Sair */}
      <LogOut show={modalSairShow} onHide={() => setModalSairShow(false)} />
    </>
  );
};

export default SideBar;
