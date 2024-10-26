import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import styles from "./DropDown.module.css";

function DropDown({ agendamento, options, titulo, icon: Icon, selectedItem, exibirInformacao }) {
  const [selectedOption, setSelectedOption] = useState(selectedItem);

  const handleSelectItem = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className={styles["container"]}>
      <Dropdown data-bs-theme="light" as={ButtonGroup} className={styles["dropdown"]}>
        <Dropdown.Toggle
          id="dropdown-custom-1"
          className={styles["custom-btn-dropdown"]}
        >
          <div className={styles["user-selected"]}>
            <Icon size={17} />
            {selectedOption ? selectedOption : titulo}
          </div>
        </Dropdown.Toggle>
        <Dropdown.Menu className={styles["super-colors"]}>
          {options.map((option, index) => (
            <Dropdown.Item 
              key={index} 
              onClick={() => handleSelectItem(option)}
            >
              {option}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      {exibirInformacao && selectedOption && (
        <div className={styles["container-informacao"]}>
          <div>
            <span>Cliente: {selectedOption}</span>
            <span>Serviço: {selectedOption.servico?.nome}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default DropDown;
