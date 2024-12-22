import React, { useState } from 'react';
import NavigationButtons from './NavigationButtons';
import styles from './Step2Form.module.css';

const Step2Form = ({ onNext, onBack }) => {
  const [petData, setPetData] = useState({}); // Estado para armazenar dados do pet

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPetData((prevData) => ({ ...prevData, [name]: value })); // Atualiza os dados do pet
  };

  const handleNext = () => {
    onNext(petData); // Passa os dados do pet para o próximo passo
  };

  return (
    <div className={styles.formContainer}>
      <h2>Cadastrar Pet</h2>

      {/* Linha 1: Nome, Data de Nascimento, Sexo */}
      <div className={styles.row}>
        <div>
          <label className={styles.radioLabel}>Nome do Pet:</label>
          <input
            type="text"
            name="petName"
            placeholder="Nome do Pet"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label className={styles.radioLabel}>Data de Nascimento:</label>
          <input
            type="date"
            name="birthDate"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label className={styles.radioLabel}>Sexo:</label>
          <div className={styles.radioGroup}>
            <label>
              <input
                type="checkbox"
                name="sexo"
                value="masc"
                onChange={handleInputChange}
              />{' '}
              Masc.
            </label>
            <label>
              <input
                type="checkbox"
                name="sexo"
                value="fem"
                onChange={handleInputChange}
              />{' '}
              Fem.
            </label>
          </div>
        </div>
      </div>

      {/* Linha 2: Espécie, Raça, Cor, Peso */}
      <div className={styles.row}>
        <div>
          <label className={styles.radioLabel}>Espécie:</label>
          <select name="species" onChange={handleInputChange}>
            <option value="">Selecione a Espécie*</option>
            <option value="cachorro">Cachorro</option>
            <option value="gato">Gato</option>
            <option value="outro">Outro</option>
          </select>
        </div>
        <div>
          <label className={styles.radioLabel}>Raça:</label>
          <select name="breed" onChange={handleInputChange}>
            <option value="">Selecione a Raça</option>
            <option value="labrador">Labrador</option>
            <option value="persa">Persa</option>
            <option value="vira-lata">Vira-lata</option>
          </select>
        </div>
        <div>
          <label className={styles.radioLabel}>Cor:</label>
          <input
            type="text"
            name="color"
            placeholder="Cor"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label className={styles.radioLabel}>Peso:</label>
          <input
            type="number"
            name="weight"
            placeholder="Peso"
            onChange={handleInputChange}
          />
        </div>
      </div>

      {/* Linha 3: Porte e Observações */}
      <div className={styles.column}>
        <div>
          <label className={styles.radioLabel}>Porte:</label>
          <select name="size" onChange={handleInputChange}>
            <option value="">Selecione o Porte</option>
            <option value="pequeno">Pequeno</option>
            <option value="médio">Médio</option>
            <option value="grande">Grande</option>
          </select>
        </div>
        <div>
          <textarea
            name="observations"
            placeholder="Observações"
            className={styles.textarea}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <NavigationButtons onBack={onBack} onNext={handleNext} />
    </div>
  );
};

export default Step2Form;