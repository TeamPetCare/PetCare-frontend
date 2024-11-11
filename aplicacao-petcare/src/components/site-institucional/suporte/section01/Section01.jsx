import styles from "./Section01.module.css";

const Section01 = ({ onContactClick }) => {
    return (
        <div className={styles["container"]}>
            <div className={styles["container-texto"]}>
                <button onClick={onContactClick}>Entre em Contato</button>
                <div className={styles["container-texto-central"]}>
                    <h1 className={styles["texto-central-azul"]}>A PetCare está aqui para apoiar sua prática</h1>
                    <h1 className={styles["texto-central-amarelo"]}>antes mesmo de começar!</h1>
                </div>
                <span>Unimos tecnologia de ponta com uma experiência personalizada e acessível</span>
            </div>
        </div>
    );
}

export default Section01;