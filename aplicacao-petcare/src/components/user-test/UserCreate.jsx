import React, { useState } from 'react';
import userService from '../../services/userService'; 

const UserCreate = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    role: '', // Pode ser um valor fixo ou selecionado
    street: '',
    number: '',
    complement: '',
    cep: '',
    district: '',
    city: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await userService.createUser(userData);
      console.log('User created:', response);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <div>
      <h2>Create User</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <input type="text" name="role" placeholder="Role" onChange={handleChange} required />
        <input type="text" name="street" placeholder="Street" onChange={handleChange} required />
        <input type="number" name="number" placeholder="Number" onChange={handleChange} required />
        <input type="text" name="complement" placeholder="Complement" onChange={handleChange} required />
        <input type="text" name="cep" placeholder="CEP" onChange={handleChange} required />
        <input type="text" name="district" placeholder="District" onChange={handleChange} required />
        <input type="text" name="city" placeholder="City" onChange={handleChange} required />
        <button type="submit">Create User</button>
      </form>
    </div>
  );
};

export default UserCreate;
