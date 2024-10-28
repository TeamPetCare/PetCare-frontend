import React from "react";
import styles from "./FormSuporte.module.css";
import BackgroundTitulo from "../../../../utils/assets/site-institucional/suporte/BackgroundFormsTitulo.svg";

const FormSuporte = () => { 
    return (
        <div className={styles["container"]}>
            <div className={styles["container-forms-titulo"]}>
                <h2>Entre em contato</h2>
            </div>
            <div className={styles["container-forms-background"]}>
                <form className={styles["container-forms-conteudo"]}>
                    {/* Campo Nome Completo */}
                    <label htmlFor="name">Nome Completo*</label>
                    <input type="text" id="name" name="name" />

                    {/* Campos Email e Número na mesma linha */}
                    <div className={styles.row}>
                        <div className={styles["input-group"]}>
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" name="email" />
                        </div>
                        <div className={styles["input-group"]}>
                            <label htmlFor="other">Número:</label>
                            <input type="text" id="other" name="other" />
                        </div>
                    </div>

                    {/* Texto "Tipos de usuário:" */}
                    <p className={styles["info-text"]}>Tipos de usuário:</p>

                    {/* Texto "Eu sou..." */}
                    <p className={styles["subheader-text"]}>Eu sou...</p>

                    {/* Opções de Seleção */}
                    <div className={styles.options}>
                        <label className={styles.option}>
                            <input type="radio" name="userType" value="petOwner" />
                            <span className={styles.checkmark}></span>
                            Usuário - Dono de Pet/Pets
                        </label>
                        <label className={styles.option}>
                            <input type="radio" name="userType" value="petshopOwner" />
                            <span className={styles.checkmark}></span>
                            Usuário - Dono PETSHOP
                        </label>
                        <label className={styles.option}>
                            <input type="radio" name="userType" value="petshopEmployee" />
                            <span className={styles.checkmark}></span>
                            Usuário - Funcionário PETSHOP
                        </label>
                    </div>

                    {/* Texto "Como podemos ajudá-lo?" */}
                    <p className={styles["info-text"]}>Como podemos ajudá-lo?</p>

                    {/* Campo de descrição com placeholder */}
                    <textarea
                        className={styles.textarea}
                        placeholder="Descreva aqui sua solicitação"
                    ></textarea>

                    {/* Botões de Enviar e Limpar */}
                    <div className={styles.buttonGroup}>
                        <button type="submit" className={styles.submitButton}>Enviar</button>
                        <button type="reset" className={styles.clearButton}>Limpar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FormSuporte;