import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./ItemSideBar.module.css";
import {
  RiUser3Fill,
  RiUser3Line,
  RiCalendarScheduleFill,
  RiCalendarScheduleLine,
  RiLogoutCircleLine,
  RiArrowDropDownLine,
  RiArrowDropUpLine,
} from "react-icons/ri";

const ItemSideBar = ({ titulo, sections, isOpenAtributte, onToggle }) => {
  const [isOpen, setIsOpen] = useState(isOpenAtributte);

  const toogleSideBar = () => {
    setIsOpen(!isOpen);
    onToggle();
  };

  return (
    <div className={styles["sidebar-section"]}>
      <div className={styles["sidebar-section-title"]} onClick={toogleSideBar}>
        <h2>{titulo}</h2>
        {!isOpenAtributte ? (
          <RiArrowDropDownLine size={24} />
        ) : (
          <RiArrowDropUpLine size={24} />
        )}
      </div>

      <ul
        className={`${styles["sidebar-section-item"]} ${
          !isOpenAtributte ? styles["close"] : ""
        }`}
      >
        {sections.map((section, index) => (
          <li className={styles["item-sidebar"]} key={index}>
            <Link to={section.link} className={styles["link-section"]}>
              <div>
                <section.icon
                  size={18}
                  className={styles["icon-section-item"]}
                />
                <p>{section.titulo}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemSideBar;
