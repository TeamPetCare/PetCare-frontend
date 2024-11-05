import React from 'react';
import NavigationButtons from './NavigationButtons';
import styles from './Step2Form.module.css';

const Step2Form = ({ onNext, onBack }) => (
  <div className={styles.formContainer}>
    <h2>Cadastrar Pet</h2>
    <input type="text" placeholder="Nome do Pet" />
    <input type="date" placeholder="Data de Nascimento" />
    <div>
      <label><input type="radio" name="sexo" value="masc" /> Masculino</label>
      <label><input type="radio" name="sexo" value="fem" /> Feminino</label>
    </div>
    <select><option>Espécie</option></select>
    <select><option>Raça</option></select>
    <input type="text" placeholder="Cor" />
    <input type="number" placeholder="Peso" />
    <select><option>Porte</option></select>
    <textarea placeholder="Observações" className={styles.textarea} />
    <NavigationButtons onBack={onBack} onNext={onNext} />
  </div>
);

export default Step2Form;
