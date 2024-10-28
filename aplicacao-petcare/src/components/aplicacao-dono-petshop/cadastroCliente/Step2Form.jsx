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
            name="petName" // Adiciona name para o input
            placeholder="Nome do Pet"
            onChange={handleInputChange} // Chama a função de mudança
          />
        </div>
        <div>
          <label className={styles.radioLabel}>Data de Nascimento:</label>
          <input
            type="date"
            name="birthDate" // Adiciona name para o input
            onChange={handleInputChange} // Chama a função de mudança
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
                onChange={handleInputChange} // Chama a função de mudança
              />{' '}
              Masc.
            </label>
            <label>
              <input
                type="checkbox"
                name="sexo"
                value="fem"
                onChange={handleInputChange} // Chama a função de mudança
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
            <option value="">Selecione a Espécie</option>
            {/* Adicione opções de espécies aqui */}
          </select>
        </div>
        <div>
          <label className={styles.radioLabel}>Raça:</label>
          <select name="breed" onChange={handleInputChange}>
            <option value="">Selecione a Raça</option>
            {/* Adicione opções de raças aqui */}
          </select>
        </div>
        <div>
          <label className={styles.radioLabel}>Cor:</label>
          <input
            type="text"
            name="color" // Adiciona name para o input
            placeholder="Cor"
            onChange={handleInputChange} // Chama a função de mudança
          />
        </div>
        <div>
          <label className={styles.radioLabel}>Peso:</label>
          <input
            type="number"
            name="weight" // Adiciona name para o input
            placeholder="Peso"
            onChange={handleInputChange} // Chama a função de mudança
          />
        </div>
      </div>

      {/* Linha 3: Porte e Observações */}
      <div className={styles.column}>
        <div>
          <label className={styles.radioLabel}>Porte:</label>
          <select name="size" onChange={handleInputChange}>
            <option value="">Selecione o Porte</option>
            {/* Adicione opções de porte aqui */}
          </select>
        </div>
        <div>
          <textarea
            name="observations" // Adiciona name para o textarea
            placeholder="Observações"
            className={styles.textarea}
            onChange={handleInputChange} // Chama a função de mudança
          />
        </div>
      </div>

      <NavigationButtons onBack={onBack} onNext={handleNext} />
    </div>
  );
};

export default Step2Form;
