import React, { useState } from "react";
import styles from "./SideBar.module.css";
import logoBrancoPetCare from "../../../../utils/assets/logos/logoBrancoPetCare.svg";
import ItemSideBar from "./components/itemSideBar/ItemSideBar.jsx";
import { GoSidebarExpand, GoHomeFill, GoSidebarCollapse } from "react-icons/go";
import {
  RiUser3Fill,
  RiUser3Line,
  RiCalendarScheduleFill,
  RiCalendarScheduleLine,
  RiLogoutCircleLine,
  RiArrowDropDownLine,
  RiArrowDropUpLine,
} from "react-icons/ri";
import {
  IoWalletOutline,
  IoWallet,
  IoSettingsOutline,
  IoSettingsSharp,
} from "react-icons/io5";
import { HiOutlineClipboardList, HiClipboardList } from "react-icons/hi";
import { AiFillEdit, AiOutlineEdit } from "react-icons/ai";
import { BsPeople, BsPeopleFill } from "react-icons/bs";
import { PiHeadset, PiHeadsetFill } from "react-icons/pi";

const sectionsGeral = [
  { titulo: "Início", icon: GoHomeFill },
  { titulo: "Clientes & Pets", icon: RiUser3Line },
  { titulo: "Agendamentos", icon: RiCalendarScheduleLine },
];

const sectionsFinanceiro = [
  { titulo: "Pagamentos", icon: IoWallet },
  { titulo: "Planos", icon: HiClipboardList },
];

const sectionsGestão = [{ titulo: "Cadastros", icon: AiFillEdit }];

const sectionsConfig = [
  { titulo: "Gerenciar Funcionários", icon: BsPeople },
  { titulo: "Meus Dados", icon: IoSettingsOutline },
];

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [openIndex, setOpenIndex] = useState(0);

  const toggleSideBar = () => {
    setIsOpen(!isOpen);
  };

  const handleToggleItem = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className={`${styles["container"]} ${!isOpen ? styles["open"] : ""}`}>
      <div>
        <div className={styles["sidebar-top"]}>
          <img src={logoBrancoPetCare} alt="" />
          {!isOpen ? (
            <GoSidebarCollapse
              size={25}
              className={styles["icon-sidebar"]}
              onClick={toggleSideBar}
            />
          ) : (
            <GoSidebarExpand
              size={25}
              className={styles["icon-sidebar"]}
              onClick={toggleSideBar}
            />
          )}
        </div>

        <div className={styles["sidebar-middle"]}>
          <ItemSideBar
            titulo="GERAL"
            sections={sectionsGeral}
            isOpenAtributte={openIndex === 0} // Aberto se o índice for 0
            onToggle={() => handleToggleItem(0)} // Passa a função para o clique
          />

          <ItemSideBar
            titulo="FINANCEIRO"
            sections={sectionsFinanceiro}
            isOpenAtributte={openIndex === 1} // Aberto se o índice for 1
            onToggle={() => handleToggleItem(1)} // Passa a função para o clique
          />

          <ItemSideBar
            titulo="GESTÃO"
            sections={sectionsGestão}
            isOpenAtributte={openIndex === 2} // Aberto se o índice for 2
            onToggle={() => handleToggleItem(2)} // Passa a função para o clique
          />

          <ItemSideBar
            titulo="CONFIGURAÇÕES"
            sections={sectionsConfig}
            isOpenAtributte={openIndex === 3} // Aberto se o índice for 3
            onToggle={() => handleToggleItem(3)} // Passa a função para o clique
          />
        </div>
      </div>

      <div className={styles["sidebar-bottom"]}>
        <ul className={styles["sidebar-section-item"]}>
          <li className={styles["item-sidebar"]}>
            <div>
              <PiHeadset size={18} className={styles["icon-section-item"]} />
              <p>Suporte</p>
            </div>
          </li>
          <li className={styles["item-sidebar"]}>
            <div>
              <RiLogoutCircleLine
                size={18}
                className={styles["icon-section-item"]}
              />
              <p>Sair</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
