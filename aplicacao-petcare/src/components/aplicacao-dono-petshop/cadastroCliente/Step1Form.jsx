import React, { useState } from 'react';
import NavigationButtons from './NavigationButtons';
import userService from "../../../services/userService";
import styles from './Step1Form.module.css';



const Step1Form = ({ onNext }) => {
  const [formData, setFormData] = useState({
    name: '',
    contactPreference: 'whatsapp', // Padrão
    cellphone: '',
    cep: '',
    street: '',
    number: '',
    complement: '',
    district: '',
    city: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Impede o comportamento padrão do formulário
    try {
      await userService.createUser(formData); // Envia os dados para o backend
      onNext(); // Chama a função para ir para o próximo passo
    } catch (error) {
      console.error("Error creating user:", error);
      // Aqui você pode adicionar um tratamento de erro, como mostrar uma mensagem
    }
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <h2>Cadastrar Cliente</h2>
      
      {/* Nome */}
      <input
        type="text"
        name="name"
        placeholder="Nome"
        value={formData.name}
        onChange={handleChange}
        required
      />
      
      {/* Preferência de contato e número de telefone */}
      <div className={styles.contactContainer}>
        <select
          name="contactPreference"
          value={formData.contactPreference}
          onChange={handleChange}
        >
          <option value="whatsapp">WhatsApp</option>
          <option value="email">Email</option>
        </select>
        <input
          type="text"
          name="cellphone"
          placeholder="Número de Telefone"
          value={formData.cellphone}
          onChange={handleChange}
          required
        />
      </div>
      
      {/* Endereço */}
      <h5>Endereço</h5>
      <div className={styles.addressContainer}>
        <input
          type="text"
          name="cep"
          placeholder="CEP"
          value={formData.cep}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="street"
          placeholder="Logradouro"
          value={formData.street}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="number"
          placeholder="Número"
          value={formData.number}
          onChange={handleChange}
          required
        />
      </div>
      
      {/* Complemento, bairro e cidade */}
      <div className={styles.additionalInfoContainer}>
        <input
          type="text"
          name="complement"
          placeholder="Complemento"
          value={formData.complement}
          onChange={handleChange}
        />
        <input
          type="text"
          name="district"
          placeholder="Bairro"
          value={formData.district}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="city"
          placeholder="Cidade"
          value={formData.city}
          onChange={handleChange}
          required
        />
      </div>
      
      <NavigationButtons onCancel={() => {}} onNext={handleSubmit} />
    </form>
  );
};

export default Step1Form;
