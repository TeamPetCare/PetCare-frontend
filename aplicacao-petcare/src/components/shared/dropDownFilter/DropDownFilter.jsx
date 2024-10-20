import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import styles from './DropDownFilter.module.css'; 

function DropDownFilter({ options }) {
  const [selectedFilter, setSelectedFilter] = useState('Filtros');

  const handleSelect = (eventKey) => {
    setSelectedFilter(eventKey);
    console.log("Filtro selecionado:", eventKey);
  };

  return (
    <>
      <Dropdown as={ButtonGroup} onSelect={handleSelect}>
        <Dropdown.Toggle id="dropdown-custom-1" className={styles["custom-btn"]}>
          {selectedFilter}
        </Dropdown.Toggle>
        <Dropdown.Menu className={styles["super-colors"]}>
          {options.map((option, index) => (
            <Dropdown.Item eventKey={option.label} key={index}>
              {option.label}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}

export default DropDownFilter;
