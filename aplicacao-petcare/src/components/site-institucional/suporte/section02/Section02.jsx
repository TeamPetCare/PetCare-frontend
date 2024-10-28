import styles from "./Section02.module.css";
import { MdOutlinePhoneAndroid } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";

const Section02 = () => {
    return (
        <div className={styles["container"]}>
            <div className={styles["container-texto"]}>
                <h1>Tem alguma dúvida</h1>
                <h1>sobre a sua conta?</h1>
                <h1>Precisa de ajuda</h1>
                <h1>para criar uma</h1>
                <h1>conta?</h1>
                <span>Este é o seu meio de comunicação para contatar</span>
                <span>a equipe PetCare! Preencha o formulário e nos</span>
                <span>informe como podemos ajudar</span>
                <br />
                <div className={styles["container-imagens-textos"]}>
                <div className={styles["container-imagem-texto01"]}>
                    <MdOutlinePhoneAndroid color="FFD269" size="50px" />
                    <div className={styles["container-textos01"]}>
                    <span><b>Gostaria de falar diretamente com alguém?</b></span>
                    <span>Ligue para nós em ++55 (11) 98178-3286</span>
                    </div>
                </div>
                <div className={styles["container-imagem-texto02"]}>
                    <FaMapMarkerAlt className={styles["icon-map"]} color="FFD269" size="45px" />
                    <div className={styles["container-textos02"]}>
                    <span><b>Nossa localização:</b></span>
                    <span>Rua Haddock Lobo Número: 595 - São Paulo, Consolação, <br /> CEP: 01414-905, Brasil</span>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}

export default Section02;