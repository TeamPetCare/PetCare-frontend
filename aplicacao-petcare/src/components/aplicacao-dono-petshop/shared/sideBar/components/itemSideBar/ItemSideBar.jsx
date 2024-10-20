import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./ItemSideBar.module.css";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";

const ItemSideBar = ({ titulo, sections, isOpenAtributte, onToggle }) => {
  const [isOpen, setIsOpen] = useState(isOpenAtributte);
  const [activeIndex, setActiveIndex] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const currentSectionIndex = sections.findIndex(
      (section) => section.link === location.pathname
    );
    setActiveIndex(currentSectionIndex !== -1 ? currentSectionIndex : null);
  }, [location, sections]);

  const toogleSideBar = () => {
    setIsOpen(!isOpen);
    onToggle();
  };

  const handleItemClick = (index) => {
    setActiveIndex(index);
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
          <li
            className={`${styles["item-sidebar"]} ${
              activeIndex === index ? styles["active"] : ""
            }`}
            key={index}
            onClick={() => handleItemClick(index)}
          >
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
