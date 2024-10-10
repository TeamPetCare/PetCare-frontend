import React from 'react';
import styles from '../login/Login.module.css';
import petImagem from '../../../utils/assets/login/imagem-pet-login.png';
import MainHeader from '../../../components/site-institucional/shared/MainHeader/MainHeader';

// Importando os ícones
import { FaUserAlt } from "react-icons/fa";
import { IoLockClosed } from "react-icons/io5";
import { PiEyeSlashFill } from "react-icons/pi";

const Login = () => {
  return (
    <div>
      <MainHeader />
      <div className={styles.container}>
        <div className={styles.loginBox}>
          <h2>Faça seu login!</h2>
          <form>
            {/* Grupo de input do email com ícone */}
            <div className={styles.inputGroup}>
              <div className={styles.inputWrapper}>
                {/* Ícone de usuário */}
                <FaUserAlt className={styles.icon} />
                <input type="email" id="email" placeholder="Digite seu email" />
              </div>
            </div>

            {/* Grupo de input de senha com ícone */}
            <div className={styles.inputGroup}>
              <div className={styles.inputWrapper}>
                {/* Ícone de cadeado */}
                <IoLockClosed className={styles.icon} />
                <input type="password" id="password" placeholder="Digite sua senha" />
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
            <p className={styles.negrito}>Enfrentando dificuldades para fazer login?</p>Este portal de acesso é exclusivo para donos de petshops. Se você é um tutor de pet, acesse a PetCare por este <a href="/">site</a>.
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
