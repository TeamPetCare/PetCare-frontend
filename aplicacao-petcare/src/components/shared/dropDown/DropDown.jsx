import React, { useEffect, useState } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import styles from "./DropDown.module.css";

function DropDown({
  agendamento,
  options,
  onChange,
  titulo,
  icon: Icon,
  selectedItem,
  exibirInformacao,
  isDisabled,
  isRequired,
}) {
  const [selectedOption, setSelectedOption] = useState(selectedItem);

  useEffect(() => {
    // Sincroniza selectedOption com selectedItem vindo do pai
    setSelectedOption(selectedItem);
  }, [selectedItem]);

  const handleSelectItem = (option) => {
    // Propaga a mudança para o componente pai
    if (onChange) {
      onChange({ target: { name: "scheduleStatus", value: option } });
    }

    // Atualiza o estado local
    setSelectedOption(option);
  };

  return (
    <div className={styles["container"]}>
      <Dropdown data-bs-theme="light" as={ButtonGroup} className={styles["dropdown"]}>
        <Dropdown.Toggle id="dropdown-custom-1" className={styles["custom-btn-dropdown"]} disabled={isDisabled}>
          <div className={styles["user-selected"]}>
            <Icon size={17} />
            {selectedOption || titulo}
          </div>
        </Dropdown.Toggle>
        <Dropdown.Menu className={styles["super-colors"]}>
          {options.map((option, index) => (
            <Dropdown.Item key={index} onClick={() => !isDisabled && handleSelectItem(option)}>
              {option}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      {exibirInformacao && selectedOption && (
        <div className={styles["container-informacao"]}>
          <div>
            {/* Informações adicionais baseadas na opção selecionada */}
            {titulo.includes("pet") ? (
              <div className={styles["container-info-geral"]}>
                <div className={styles["container-img-user"]}>
                  {/* <img src={agendamento.cliente.pet.foto} alt="" /> */}
                </div>
                <div className={styles["container-info-user"]}>
                  <p>{agendamento.pet.name}</p>
                  <p>{agendamento.pet.race.raceType}</p>
                </div>
              </div>
            ) : (
              <div className={styles["container-info-geral"]}>
                <div className={styles["container-img-user"]}>
                  {/* <img src={agendamento.cliente.foto} alt="" /> */}
                </div>
                <div className={styles["container-info-user"]}>
                  <p>{agendamento.payment.user.name}</p>
                  <a
                    href={`https://wa.me/${agendamento.payment.user.cellphone.replace(
                      /[^0-9]/g,
                      ""
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {agendamento.payment.user.cellphone}
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
