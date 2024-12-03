import React, { useState } from "react";
import styles from "./DropDownStatus.module.css"; 
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"; 

const DropDownStatus = ({ status, options, onSelectStatus }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(status); 

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectStatus = (status) => {
    setSelectedStatus(status); 
    setIsOpen(false); 
    onSelectStatus && onSelectStatus(status);
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case "Agendado":
        return {
          circleColor: "#0052CE", 
          backgroundColor: "#AFDDED", 
        };
      case "Concluído":
        return {
          circleColor: "#008337",
          backgroundColor: "rgba(115, 214, 115, 0.502)", 
        };
      case "Cancelado":
        return {
          circleColor: "#CE0000", 
          backgroundColor: "#FFCACA", 
        };
      default:
        return {
          circleColor: "#000000", 
          backgroundColor: "#FFFFFF", 
        };
    }
  };

  const { circleColor, backgroundColor } = getStatusStyles(selectedStatus); 

  return (
    <div className={styles["dropdown"]}>
      <button
        className={styles["dropdown-btn"]}
        onClick={toggleDropdown}
        style={{ backgroundColor }}
      >
        <div
          className={styles["circle-status"]}
          style={{ backgroundColor: circleColor }} 
        ></div>
        <span>{selectedStatus}</span>
        <span className={styles["dropdown-icon"]}>
          {isOpen ? (
            <IoIosArrowUp size={12} /> 
          ) : (
            <IoIosArrowDown size={12} /> 
          )}
        </span>
      </button>
      {isOpen && (
        <div className={styles["dropdown-menu"]}>
          {options.map((status) => (
            <div
              key={status}
              className={styles["dropdown-item"]}
              onClick={() => selectStatus(status)}
            >
              {status}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropDownStatus;
