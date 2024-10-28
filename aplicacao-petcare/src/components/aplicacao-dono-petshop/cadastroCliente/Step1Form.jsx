import React, { useState } from 'react';
import NavigationButtons from './NavigationButtons';
import styles from './Step1Form.module.css';

const Step1Form = ({ onNext }) => {
  const [name, setName] = useState('');
  const [contactPreference, setContactPreference] = useState(''); // Estado para preferência de contato
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleNext = () => {
    const data = { name, contactPreference, phoneNumber }; // Coleta os dados do formulário
    onNext(data); // Passa os dados para o ModalWrapper
  };

  return (
    <div className={styles.formContainer}>
      <h2>Cadastrar Cliente</h2>
      
      {/* Nome */}
      <input
        type="text"
        placeholder="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      
      {/* Preferência de contato e número de telefone */}
      <div className={styles.contactContainer}>
        <select value={contactPreference} onChange={(e) => setContactPreference(e.target.value)}>
          <option>Preferência de contato</option>
          <option value="whatsapp">WhatsApp</option>
          <option value="email">Email</option>
        </select>
        <input
          type="text"
          placeholder="Número de Telefone"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>
      
      {/* Endereço */}
      <h5>Endereço</h5>
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
      
      <NavigationButtons onCancel={() => {}} onNext={handleNext} />
    </div>
  );
};

export default Step1Form;
