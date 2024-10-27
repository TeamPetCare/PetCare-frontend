import React from 'react';
import NavigationButtons from './NavigationButtons';
import styles from './Step3Form.module.css';
import cachorroImg from '../../../utils/assets/aplicacao-dono-petshop/cadastroCliente/cachorro.jpg';

const Step3Form = ({ onBack }) => (
  <div className={styles.formContainer}>
    <h2>Atribuir Plano</h2>
    
    <div className={styles.row}>
      {/* Coluna da esquerda: Planos */}
      <div className={styles.column}>
        <label className={styles.label}>Selecione o Plano</label>
        <div className={styles.checkboxGroup}>
          <label className={styles.checkboxLabel}>
            <input type="checkbox" /> Plano Mensal
          </label>
          <label className={styles.checkboxLabel}>
            <input type="checkbox" /> Plano Quinzenal
          </label>
          <label className={styles.checkboxLabel}>
            <input type="checkbox" /> Nenhum
          </label>
        </div>
      </div>

      {/* Coluna da direita: Pets */}
      <div className={styles.column}>
        <label className={styles.label}>Quais pets irão utilizar este plano?</label>
        <div className={styles.checkboxGroup}>
          <label className={styles.checkboxLabel}>
            <input type="checkbox" />
            <div className={styles.petInfo}>
              <img src={cachorroImg} alt="Cachorro" className={styles.petImage} />
              <div className={styles.petDetails}>
                <div>Thor</div>  
                <div>Labrador</div>   
              </div>
            </div>
          </label>
          <label className={styles.checkboxLabel}>
            <input type="checkbox" />
            <div className={styles.petInfo}>
              <img src={cachorroImg} alt="Cachorro" className={styles.petImage} />
              <div className={styles.petDetails}>
              <div>Thor</div>  
              <div>Labrador</div> 
              </div>
            </div>
          </label>
        </div>
      </div>
    </div>

    {/* Preço do plano */}
    <div className={styles.price}>Preço: R$ XXX,XX</div>

    {/* Botões de navegação */}
    <NavigationButtons onBack={onBack} onNext={() => alert('Cliente cadastrado com sucesso!')} isFinalStep />
  </div>
);

export default Step3Form;