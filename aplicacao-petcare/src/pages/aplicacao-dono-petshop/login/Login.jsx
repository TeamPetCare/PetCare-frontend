import React from 'react';
import styles from '../login/Login.module.css';
import petImagem from '../../../utils/assets/login/imagem-pet-login.png';
import MainHeader from '../../../components/site-institucional/shared/MainHeader/MainHeader';

const Login = () => {
  return (
    <div>
      <MainHeader />
     <div className={styles.container}>
      <div className={styles.loginBox}>
        <h2>Faça seu login!</h2>
        <form>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Digite seu email" />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Senha</label>
            <input type="password" id="password" placeholder="Digite sua senha" />
          </div>
          <button type="submit" className={styles.loginButton}>Entrar</button>
        </form>
        <div className={styles.footer}>
          <a href="/" className={styles.forgotPassword}>Esqueceu a senha?</a>
          <a href="/" className={styles.voltarButton}>Voltar</a>
        </div>
        <p className={styles.helpText}>
          Enfrentando dificuldades para fazer login? Este portal de acesso é exclusivo para donos de petshops. Se você é um tutor de pet, acesse a PetCare por este <a href="/">site</a>.
        </p>
        <button className={styles.registerButton}>COMECE AGORA</button>
      </div>
      <div className={styles.imageBox}>
        <img src={petImagem} alt="Pet and owner high five" />
      </div>
    </div>
    </div>
  );
};

export default Login;
