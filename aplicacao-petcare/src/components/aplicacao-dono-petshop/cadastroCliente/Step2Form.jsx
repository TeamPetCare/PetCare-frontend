import React from 'react';
import NavigationButtons from './NavigationButtons';
import styles from './Step2Form.module.css';

const Step2Form = ({ onNext, onBack }) => (
  <div className={styles.formContainer}>
    <h2>Cadastrar Pet</h2>
    
   {/* Linha 1: Nome, Data de Nascimento, Sexo */}
   <div className={styles.row}>
      <div>
        <label className={styles.radioLabel}>Nome do Pet:</label>
        <input type="text" placeholder="Nome do Pet" />
      </div>
      <div>
        <label className={styles.radioLabel}>Data de Nascimento:</label>
        <input type="date" placeholder="Data de Nascimento" />
      </div>
      <div>
        <label className={styles.radioLabel}>Sexo:</label>
        <div className={styles.radioGroup}>
          <label>
            <input type="checkbox" name="sexo" value="masc" /> Masc.
          </label>
          <label>
            <input type="checkbox" name="sexo" value="fem" /> Fem.
          </label>
        </div>
      </div>
    </div>


    {/* Linha 2: Espécie, Raça, Cor, Peso */}
    <div className={styles.row}>
      <div>
        <label className={styles.radioLabel}>Espécie:</label>
        <select>
          <option>Espécie</option>
        </select>
      </div>
      <div>
        <label className={styles.radioLabel}>Raça:</label>
        <select>
          <option>Raça</option>
        </select>
      </div>
      <div>
        <label className={styles.radioLabel}>Cor:</label>
        <input type="text" placeholder="Cor" />
      </div>
      <div>
        <label className={styles.radioLabel}>Peso:</label>
        <input type="number" placeholder="Peso" />
      </div>
    </div>
    
    {/* Linha 3: Porte e Observações */}
    <div className={styles.column}>
      <div>
        <label className={styles.radioLabel}>Porte:</label>
        <select>
          <option>Porte</option>
        </select>
      </div>
      <div>
        {/* <label className={styles.radioLabel}>Observações:</label> */}
        <textarea placeholder="Observações" className={styles.textarea} />
      </div>
    </div>
    
    <NavigationButtons onBack={onBack} onNext={onNext} />
  </div>
);

export default Step2Form;
