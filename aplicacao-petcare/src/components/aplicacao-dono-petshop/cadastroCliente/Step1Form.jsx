import React from 'react';
import NavigationButtons from './NavigationButtons';
import styles from './Step1Form.module.css';

const Step1Form = ({ onNext }) => (
  <div className={styles.formContainer}>
    <h2>Cadastrar Cliente</h2>
    
    {/* Nome */}
    <input type="text" placeholder="Nome" />
    
    {/* Preferência de contato e número de telefone */}
    <div className={styles.contactContainer}>
      <select>
        <option>Preferência de contato</option>
        <option value="whatsapp">WhatsApp</option>
        <option value="email">Email</option>
      </select>
      <input type="text" placeholder="Número de Telefone" />
    </div>
    
    {/* Endereço */}
    <h3>Endereço</h3>
    <div className={styles.addressContainer}>
      <input type="text" placeholder="CEP" />
      <input type="text" placeholder="Logradouro" />
      <input type="text" placeholder="Número" />
    </div>
    
    {/* Complemento, bairro e cidade */}
    <div className={styles.additionalInfoContainer}>
      <input type="text" placeholder="Complemento" />
      <input type="text" placeholder="Bairro" />
      <input type="text" placeholder="Cidade" />
    </div>
    
    <NavigationButtons onCancel={() => {}} onNext={onNext} />
  </div>
);

export default Step1Form;