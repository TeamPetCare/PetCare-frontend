import styles from "./NotFound.module.css";

const NotFound = () => {
  return (
    <div className={styles["container"]}>
        <h1>Oops!</h1>
        <h3>404 - PÁGINA NÃO ENCONTRADA</h3>
        <p>
          A página que você está procurando pode ter sido removida, o nome
          pode ter sido alterado ou está temporariamente indisponível.
        </p>
        <button onClick={() => window.location.href = "/"}>Ir para Início</button>
    </div>
  );
};

export default NotFound;
