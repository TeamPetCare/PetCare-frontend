import styles from "./Section01.module.css";

const Section01 = () => {
    return (
        <div className={styles["container"]}>
            <div className={styles["container-texto"]}>
                <button>Entre em Contato</button>
                <div className={styles["container-texto-central"]}>
                    <h1>A PetCare está aqui para apoiar sua prática</h1>
                    <h1 className={styles["texto-central-amarelo"]}>antes mesmo de você começar!</h1>
                </div>
                <span>Unimos tecnologia de ponta com uma experiência personalizada e acessível</span>
            </div>
        </div>
    );
}

export default Section01;