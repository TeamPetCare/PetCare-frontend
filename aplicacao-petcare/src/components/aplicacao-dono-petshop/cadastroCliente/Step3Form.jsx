import React from 'react';
import NavigationButtons from './NavigationButtons';
import styles from './Step3Form.module.css';

const Step3Form = ({ onBack }) => (
  <div className={styles.formContainer}>
    <h2>Atribuir Plano</h2>
    <div>
      <label><input type="checkbox" /> Plano Mensal</label>
      <label><input type="checkbox" /> Plano Quinzenal</label>
      <label><input type="checkbox" /> Nenhum</label>
    </div>
    <div>
      <label><input type="checkbox" /> Pet 1</label>
      <label><input type="checkbox" /> Pet 2</label>
    </div>
    <div className={styles.price}>Preço: R$ XXX,XX</div>
    <NavigationButtons onBack={onBack} onNext={() => alert('Cliente cadastrado com sucesso!')} isFinalStep />
  </div>
);

export default Step3Form;
