import React from 'react';
import NavigationButtons from './NavigationButtons';
import styles from './Step3Form.module.css';
import cachorroImg from '../../../../utils/assets/aplicacao-dono-petshop/cadastroCliente/cachorro.jpg';

const Step3Form = ({ onBack, onSubmit }) => (
  <div className={styles.formContainer}>
    <h2>Atribuir Plano</h2>
    
    <div className={styles.row}>
      <div className={styles.column}>
        <label className={styles.label}>Selecione o Plano</label>
        <div className={styles.checkboxGroup}>
          <label className={styles.checkboxLabel}>
            <input type="radio" />Mensal
          </label>
          <label className={styles.checkboxLabel}>
            <input type="radio" />Quinzenal
          </label>
          <label className={styles.checkboxLabel}>
            <input type="radio" />Nenhum
          </label>
        </div>
      </div>

      <div className={styles.column}>
        <label className={styles.label}>Quais pets irão utilizar este plano?</label>
        <div className={styles.checkboxGroup}>
          <label className={styles.checkboxLabel}>
            <input type="checkbox" />
            <div className={styles.petInfo}>
              <img src={cachorroImg} alt="Cachorro" className={styles.petImage} />
              <span>Nome do Pet</span>
            </div>
          </label>
          {/* Adicione mais opções conforme necessário */}
        </div>
      </div>
    </div>

    <NavigationButtons onBack={onBack} onNext={onSubmit} />
  </div>
);

export default Step3Form;
