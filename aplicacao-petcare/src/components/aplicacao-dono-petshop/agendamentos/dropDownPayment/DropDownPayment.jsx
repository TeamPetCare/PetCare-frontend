import React, { useState } from "react";
import styles from "./DropDownPayment.module.css";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaPix } from "react-icons/fa6";
import { IoIosCard } from "react-icons/io";
import { GrMoney } from "react-icons/gr";
import { MdDisabledByDefault } from "react-icons/md";

const DropDownPayment = ({ status, options, metodo }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(status);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectStatus = (status) => {
    setSelectedStatus(status);
    setIsOpen(false);
  };

  const getStatusStyles = (metodo) => {
    switch (metodo) {
      case "PIX":
        return {
          icon: FaPix,
        };
      case "CARTAO_DEBITO":
        return {
          icon: IoIosCard,
        };
      case "CARTAO_CREDITO":
        return {
          icon: IoIosCard,
        };
        case "DINHEIRO":
        return {
          icon: GrMoney,
        };
      default:
        return {
          icon: MdDisabledByDefault,
        };
    }
  };

  const { icon: Icon } = getStatusStyles(metodo);

  return (
    <div className={styles["dropdown"]}>
      <button className={styles["dropdown-btn"]} onClick={toggleDropdown}>
        {Icon && <Icon size={16} style={{ marginRight: "8px" }} />}
        <span>{selectedStatus}</span>
        <span className={styles["dropdown-icon"]}>
          {isOpen ? <IoIosArrowUp size={12} /> : <IoIosArrowDown size={12} />}
        </span>
      </button>
      {isOpen && (
        <div className={styles["dropdown-menu"]}>
          {options.map((status) => {
            return (
              <div
                key={status}
                className={styles["dropdown-item"]}
                onClick={() => selectStatus(status)}
              >
                {status}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DropDownPayment;
