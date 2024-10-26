import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import styles from "./DropDown.module.css";

function DropDown({ options = [], titulo, icon: Icon, cliente = {} }) {
  const [selectedFilter, setSelectedFilter] = useState(titulo);
  const [selectedOption, setSelectedOption] = useState(cliente);

  useEffect(() => {
    if (cliente && cliente.nome && options.length > 0) {
      const matchedClient = options.find(
        (option) => option.nome === cliente.nome
      );
      if (matchedClient) {
        setSelectedFilter(matchedClient.nome);
        setSelectedOption(matchedClient);
        console.log("Deu match");
      }
    }
  }, [cliente, options]);

  const handleSelect = (eventKey) => {
    const selected = options.find((option) => option.nome === eventKey);
    if (selected) {
      setSelectedFilter(selected.nome);
      setSelectedOption(selected);
      console.log(selected);
    }
  };

  return (
    <div className={styles["container"]}>
      <Dropdown
        data-bs-theme="light"
        variant="danger"
        as={ButtonGroup}
        onSelect={handleSelect}
        className={styles["dropdown"]}
      >
        <Dropdown.Toggle
          id="dropdown-custom-1"
          className={styles["custom-btn-dropdown"]}
        >
          <div className={styles["user-selected"]}>
            <Icon size={17} />
            {selectedFilter}
          </div>
        </Dropdown.Toggle>
        <Dropdown.Menu className={styles["super-colors"]}>
          {options.map((option, index) => (
            <Dropdown.Item eventKey={option.nome} key={index}>
              {option.nome}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      <div className={styles["container-informacao"]}>
        {selectedOption && selectedOption.nome ? (
          <div className={styles["container-informacao"]}>
            <div className={styles["container-img-user"]}>
              <img src={selectedOption.foto} alt="Foto do usuário/pet" />
            </div>
            <div>
              <p>{selectedOption.nome}</p>
              <a href={selectedOption.whatsappLink} target="_blank" rel="noopener noreferrer">{selectedOption.whatsapp}</a>
            </div>
            {selectedOption.pet && selectedOption.pet.length > 0 && (
              <div>
                {selectedOption.pet.map((pet, index) => (
                  <div key={index}>
                    <div className={styles["container-img-user"]}>
                      <img src={pet.foto} alt={`Foto de ${pet.nome}`} />
                    </div>
                    <p>{pet.nome}</p>
                    <p>{pet.teste}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div>Selecione uma opção</div>
        )}
      </div>
    </div>
  );
}

export default DropDown;
