import React, { useState } from 'react';
import NavigationButtons from './NavigationButtons';
import styles from './Step1Form.module.css';

const Step1Form = ({ onNext }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState(''); // Alterado para email
  const [phoneNumber, setPhoneNumber] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');
  const [cep, setCep] = useState('');
  const [district, setDistrict] = useState('');
  const [city, setCity] = useState('');
  const [cpfClient, setCpfClient] = useState('');

  const handleNext = () => {
    const data = { 
      name, 
      email, // Alterado para email
      phoneNumber,
      street,
      number,
      complement,
      cep,
      district,
      city,
      cpfClient
    }; // Coleta os dados do formulário
    onNext(data); // Passa os dados para o ModalWrapper
  };

  return (
    <div className={styles.formContainer}>
      <h2>Cadastrar Cliente</h2>
      <input 
        type="text" 
        placeholder="Nome" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
      
      {/* Campo de entrada de email em vez de preferências de contato */}
      <input 
        type="email" 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      
      <input 
        type="text" 
        placeholder="Número de Telefone" 
        value={phoneNumber} 
        onChange={(e) => setPhoneNumber(e.target.value)} 
      />

      <h5>Endereço</h5>
      <div className={styles.addressContainer}>
        <input 
          type="text" 
          placeholder="CEP" 
          value={cep} 
          onChange={(e) => setCep(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Logradouro" 
          value={street} 
          onChange={(e) => setStreet(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Número" 
          value={number} 
          onChange={(e) => setNumber(e.target.value)} 
        />
      </div>
      
      <div className={styles.additionalInfoContainer}>
        <input 
          type="text" 
          placeholder="Complemento" 
          value={complement} 
          onChange={(e) => setComplement(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Bairro" 
          value={district} 
          onChange={(e) => setDistrict(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Cidade" 
          value={city} 
          onChange={(e) => setCity(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="CPF" 
          value={cpfClient} 
          onChange={(e) => setCpfClient(e.target.value)} 
        />
      </div>
      
      <NavigationButtons onCancel={() => {}} onNext={handleNext} />
    </div>
  );
};

export default Step1Form;
