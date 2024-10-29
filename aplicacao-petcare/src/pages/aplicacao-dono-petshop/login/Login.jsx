import React, { useState } from 'react';
import styles from '../login/Login.module.css';
import petImagem from '../../../utils/assets/login/imagem-pet-login.png';
import userService from '../../../services/userService';
import { toast, ToastContainer } from 'react-toastify'; // Importando ToastContainer e toast
import 'react-toastify/dist/ReactToastify.css'; // Estilos do Toastify
// Importando os ícones
import { FaUserAlt } from "react-icons/fa";
import { IoLockClosed } from "react-icons/io5";
import { PiEyeSlashFill } from "react-icons/pi";

const Login = () => {
  // Consts para armazenar as credenciais
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const loginData = { email, password };
      const response = await userService.loginUser(loginData);

      toast.success("Login bem-sucedido! Você será redirecionado...", {
        autoClose: 2500, 
        onClose: () => {
          window.location.href = 'http://localhost:3000/dono-petshop/inicio';
        },
        onClick: () => {
          window.location.href = 'http://localhost:3000/dono-petshop/inicio';
        }
      });

    } catch (error) {
      console.error('Erro no login:', error);
      setError('Email ou senha incorretos');
      
      toast.error("Email ou senha incorretos. Tente novamente.");
    }
  };

  return (
    <div>
      <ToastContainer /> {/* Adicionando o ToastContainer aqui */}
      <div className={styles.container}>
        <div className={styles.loginBox}>
          <h2>Faça seu login!</h2>
          <form onSubmit={handleLogin}>
            <div className={styles.inputGroup}>
              <div className={styles.inputWrapper}>
                <FaUserAlt className={styles.icon} />
                <input type="email" id="email" placeholder="Digite seu email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <PiEyeSlashFill className={styles.eyeIcon} />
              </div>
            </div>
            {/* Grupo de input de senha com ícone */}
            <div className={styles.inputGroup}>
              <div className={styles.inputWrapper}>
                <IoLockClosed className={styles.icon} />
                <input type="password" id="password" placeholder="Digite sua senha" value={password} onChange={(e) => setPassword(e.target.value)} />
                {/* Ícone de "olho" para visualização da senha */}
                <PiEyeSlashFill className={styles.eyeIcon} />
              </div>
            </div>
            <button type="submit" className={styles.loginButton}>Entrar</button>
          </form>
          <div className={styles.footer}>
            <a href="/" className={styles.forgotPassword}>Esqueceu a senha?</a>
            <a href="/" className={styles.voltarButton}>Voltar</a>
          </div>
          <p className={styles.helpText}>
            <span className={styles.negrito}>Enfrentando dificuldades para fazer login?</span> Este portal de acesso é exclusivo para donos de petshops. Se você é um tutor de pet, acesse a PetCare por este <a href="/">site</a>.
          </p>
          <div className={styles.footer}>
            <a href="/" className={styles.helpText2}>Ainda não é cliente?</a>
            <button className={styles.registerButton}>COMECE AGORA</button>
          </div>
        </div>
        <div className={styles.imageBox}>
          <img src={petImagem} alt="Pet and owner high five" />
        </div>
      </div>
    </div>
  );
};

export default Login;