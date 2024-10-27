import React from 'react';
import NavigationButtons from './NavigationButtons';
import styles from './Step1Form.module.css';

const Step1Form = ({ onNext }) => (
  <div className={styles.formContainer}>
    <h2>Cadastrar Cliente</h2>
    <input type="text" placeholder="Nome" />
    <select>
      <option>Preferência de contato</option>
      <option value="whatsapp">WhatsApp</option>
      <option value="email">Email</option>
    </select>
    <input type="text" placeholder="Número de Telefone" />
    <input type="text" placeholder="Endereço" />
    <input type="text" placeholder="CEP" />
    <input type="text" placeholder="Logradouro" />
    <input type="text" placeholder="Número" />
    <input type="text" placeholder="Complemento" />
    <input type="text" placeholder="Bairro" />
    <input type="text" placeholder="Cidade" />
    <NavigationButtons onCancel={() => {}} onNext={onNext} />
  </div>
);

export default Step1Form;
