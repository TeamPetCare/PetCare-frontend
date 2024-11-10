import React, { useEffect, useState } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import styles from "./DropDown.module.css";

function DropDown({
  agendamento,
  options,
  titulo,
  icon: Icon,
  selectedItem,
  exibirInformacao,
  isDisabled,
  isRequired, // Nova prop
}) {
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    if (agendamento) {
      setSelectedOption(selectedItem);
    } else if (titulo.includes("status")) {
      setSelectedOption("Agendado"); 
    } else {
      setSelectedOption(titulo);
    }
  }, [agendamento, titulo]); 

  const handleSelectItem = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className={styles["container"]}>
      <Dropdown
        data-bs-theme="light"
        as={ButtonGroup}
        className={styles["dropdown"]}
      >
        <Dropdown.Toggle
          id="dropdown-custom-1"
          className={styles["custom-btn-dropdown"]}
          disabled={isDisabled}
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
              onClick={() => !isDisabled && handleSelectItem(option)}
            >
              {option}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      {exibirInformacao && selectedOption && (
        <div className={styles["container-informacao"]}>
          <div>
            {titulo.includes("pet") ? (
              <div className={styles["container-info-geral"]}>
                <div className={styles["container-img-user"]}>
                  <img src={agendamento.cliente.pet.foto} alt="" />
                </div>
                <div className={styles["container-info-user"]}>
                  <p>{agendamento.cliente.pet.nome}</p>
                  <p>{agendamento.cliente.pet.raca}</p>
                </div>
              </div>
            ) : (
              <div className={styles["container-info-geral"]}>
                <div className={styles["container-img-user"]}>
                  <img src={agendamento.cliente.foto} alt="" />
                </div>
                <div className={styles["container-info-user"]}>
                  <p>{agendamento.cliente.nome}</p>
                  <a
                    href={`https://wa.me/${agendamento.cliente.whatsapp.replace(
                      /[^0-9]/g,
                      ""
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {agendamento.cliente.whatsapp}
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default DropDown;
