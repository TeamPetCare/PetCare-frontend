import React, { useState } from 'react';
import styles from './Login.module.css';
import mulher from '../../../utils/assets/login/imagem-dono-pet-login.png';
import Logo from '../../../utils/assets/logos/logoPetCare.svg';
import Google from '../../../utils/assets/login/logoGoogle.png';
import olhoaberto from '../../../utils/assets/login/olhoaberto.png';
import olhofechado from '../../../utils/assets/login/olhofechado.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Simula uma requisição de autenticação
    try {
      // Aqui, você faria uma requisição ao backend para autenticar o usuário
      // const response = await fetch('https://sua-api.com/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password })
      // });

      // Simulação de resposta com token de autenticação
      const response = { token: 'fake-jwt-token' }; // Substitua isso com o token real da resposta

      if (response.token) {
        // Armazena o token no localStorage ou sessionStorage com base na seleção de "Lembre de mim"
        if (rememberMe) {
          localStorage.setItem('authToken', response.token);
        } else {
          sessionStorage.setItem('authToken', response.token);
        }
        alert('Login realizado com sucesso!');
      } else {
        alert('Falha ao realizar login.');
      }
    } catch (error) {
      console.error('Erro ao realizar login:', error);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <img src={Logo} alt="Petcare Logo" className={styles.logo} />
        <nav className={styles.nav}>
          <a href="/login" className={styles.link}>Login</a>
          <a href="/register" className={styles.register}>Cadastre-se</a>
          <a href="/download" className={styles.download}>Baixe o aplicativo</a>
          <a href="/help" className={styles.help}>Central de Ajuda</a>
        </nav>
      </header>

      <div className={styles.main}>
        <div className={styles.formContainer}>
          <h1>Bem-vindo(a) novamente! <span role="img" aria-label="wave">👋</span></h1>
          <p>Não possui uma conta? <a href="/register">Registre-se</a></p>
          
          <form className={styles.form} onSubmit={handleLogin}>
            <div className={styles.inputGroup}>
              <label>Email</label>
              <input 
                type="email" 
                placeholder="Seu email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Senha</label>
              <div className={styles.passwordWrapper}>
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className={styles.eyeButton}
                  onClick={togglePasswordVisibility}
                >
                  <img
                    src={passwordVisible ? olhofechado : olhoaberto}
                    alt={passwordVisible ? 'Ocultar senha' : 'Mostrar senha'}
                    className={styles.eyeIcon}
                  />
                </button>
              </div>
            </div>

            <div className={styles.options}>
              <div className={styles.rememberMe}>
                <input 
                  type="checkbox" 
                  id="remember" 
                  checked={rememberMe} 
                  onChange={(e) => setRememberMe(e.target.checked)} 
                />
                <label htmlFor="remember">Lembre de mim</label>
              </div>
              <a href="/forgot-password" className={styles.forgotPassword}>Esqueceu a senha?</a>
            </div>

            <button type="submit" className={styles.loginButton}>Log in</button>

            <div className={styles.separator}>Ou com</div>
            <button type="button" className={styles.googleButton}>
              <img src={Google} alt="Google logo" /> Log in com Google
            </button>
          </form>
        </div>
        
        <div className={styles.imageContainer}>
          <img src={mulher} alt="Mulher com cachorro" />
        </div>
      </div>
    </div>
  );
};

export default Login;
