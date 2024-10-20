import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./SideBar.module.css";
import logoBrancoPetCare from "../../../../utils/assets/logos/logoBrancoPetCare.svg";
import ItemSideBar from "./components/itemSideBar/ItemSideBar.jsx";
import LogOut from "../../../shared/logOut/LogOut.jsx";
import { GoHomeFill } from "react-icons/go";
import { TbLayoutSidebarRightCollapseFilled } from "react-icons/tb";
import { RiLogoutCircleLine } from "react-icons/ri";
import { RiUser3Fill, RiCalendarScheduleFill } from "react-icons/ri";
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
  {
    titulo: "Início",
    icon: icons.general,
    link: "/dono-petshop/inicio",
  },
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
  {
    titulo: "Planos",
    icon: icons.plans,
    link: "/dono-petshop/planos",
  },
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
  {
    titulo: "Suporte",
    icon: icons.support,
    link: "/dono-petshop/suporte",
  },
];

const SideBar = ({ isOpen, toggleSideBar }) => {
  const [openIndex, setOpenIndex] = useState(0);
  const [modalSairShow, setModalSairShow] = useState(false);

  const handleToggleItem = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div
      className={`${styles.container} ${styles.sideBar} ${
        isOpen ? "" : styles.closed
      } ${!isOpen ? styles.open : ""}`}
    >
      <div>
        <div className={styles["sidebar-top"]}>
          <img src={logoBrancoPetCare} alt="" />
          <div
            className={`${styles["toggle-btn"]} ${
              !isOpen ? styles["open-toggle-btn"] : ""
            }`}
            onClick={toggleSideBar}
          >
            <TbLayoutSidebarRightCollapseFilled
              size={29}
              className={`${styles["icon-sidebar"]} ${
                isOpen ? styles.open : ""
              }`}
              onClick={toggleSideBar}
            />
          </div>
        </div>

        <div className={styles["sidebar-middle"]}>
          <ItemSideBar
            titulo="GERAL"
            sections={sectionsGeral}
            isOpenAtributte={openIndex === 0}
            onToggle={() => handleToggleItem(0)}
          />

          <ItemSideBar
            titulo="FINANCEIRO"
            sections={sectionsFinanceiro}
            isOpenAtributte={openIndex === 1}
            onToggle={() => handleToggleItem(1)}
          />

          <ItemSideBar
            titulo="GESTÃO"
            sections={sectionsGestão}
            isOpenAtributte={openIndex === 2}
            onToggle={() => handleToggleItem(2)}
          />

          <ItemSideBar
            titulo="CONFIGURAÇÕES"
            sections={sectionsConfig}
            isOpenAtributte={openIndex === 3}
            onToggle={() => handleToggleItem(3)}
          />
        </div>
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

      {/* Modal de Sair */}
      <LogOut show={modalSairShow} onHide={() => setModalSairShow(false)} />
    </div>
  );
};

export default SideBar;
