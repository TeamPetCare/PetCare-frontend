import React, { useEffect, useState } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { PiUserCirclePlusThin } from "react-icons/pi";
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
  optionKey = "id",
  optionName = "name",
}) {
  const [selectedOption, setSelectedOption] = useState(selectedItem);

  const handleSelectItem = (optionSelected, option) => {
    setSelectedOption(optionSelected);
    onChange({ target: { name: titulo, option } });
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
            <span>
              {selectedOption
                ? selectedOption.length > 25
                  ? `${selectedOption.substring(0, 25)}...`
                  : selectedOption
                : titulo.length > 25
                ? `${titulo.substring(0, 25)}...`
                : titulo}
            </span>
          </div>
        </Dropdown.Toggle>
        <Dropdown.Menu className={styles["super-colors"]}>
          {options.map((option, index) => {
            let displayValue;
            let displayName;

            if (typeof option === "object") {
              displayValue = option[optionKey] || JSON.stringify(option);
              displayName = option[optionName];
            } else {
              displayValue = option;
              displayName = option;
            }

            return (
              <Dropdown.Item
                key={index}
                onClick={() => {
                  !isDisabled && handleSelectItem(displayName, option);
                }}
                id={displayValue}
              >
                {displayName}
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>

      {exibirInformacao && selectedOption && (
        <div className={styles["container-informacao"]}>
          <div>
            {/* Exibe informações adicionais, se necessário */}
            {titulo.includes("pet") ? (
              <div className={styles["container-info-geral"]}>
                <div className={styles["container-img-user"]}>
                  {agendamento?.pet?.petImg != null ? (
                    <img src={agendamento.pet.petImg} alt="Foto do Usuário" />
                  ) : (
                    <PiUserCirclePlusThin size={35} />
                  )}
                </div>
                <div className={styles["container-info-user"]}>
                  <p>{agendamento?.pet?.name}</p>
                  <p className={styles["info-ellipsis"]}>
                    {agendamento?.pet?.race?.raceType}
                  </p>
                </div>
              </div>
            ) : (
              <div className={styles["container-info-geral"]}>
                <div className={styles["container-img-user"]}>
                  {agendamento?.pet?.user?.userImg != null ? (
                    <img
                      src={agendamento.pet.user.userImg}
                      alt="Foto do Usuário"
                    />
                  ) : (
                    <PiUserCirclePlusThin size={35} />
                  )}
                </div>
                <div className={styles["container-info-user"]}>
                  <p>{agendamento?.pet?.user?.name}</p>
                  <a
                    href={`https://wa.me/${agendamento?.payment?.user?.cellphone.replace(
                      /[^0-9]/g,
                      ""
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles["info-ellipsis"]}
                  >
                    {agendamento?.pet?.user?.cellphone}
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
