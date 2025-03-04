import { useState } from "react";
import Styles from "./MeusDados.module.css";
import { MdEdit, MdUpload, MdDelete, MdLock, MdSave } from "react-icons/md";
import UserHeader from "../../../components/aplicacao-dono-petshop/shared/userHeader/UserHeader";

const MeusDados = () => {
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [isButtonActive, setIsButtonActive] = useState(true);
  const [isEditing, setIsEditing] = useState(false); // Estado do botão de edição

  const togglePasswordSection = () => {
    setShowPasswordSection((prev) => !prev);
    setIsButtonActive((prev) => !prev);
  };

  const toggleEditMode = () => {
    setIsEditing((prev) => !prev); // Alterna entre editar e salvar
  };

  return (
    <div className={Styles["container-main"]}>
      <UserHeader />
      <div className={Styles["container-section01-section02"]}>
        <div className={Styles["section01"]}>
          <button 
            className={`${Styles["custom-btn"]} ${isEditing ? Styles["btn-save"] : ""}`}
            onClick={toggleEditMode}
          >
            {isEditing ? <MdSave /> : <MdEdit />} {isEditing ? "Salvar meus dados" : "Editar meus dados"}
          </button>

          <div className={Styles["user-photo-container"]}>
            <div className={Styles["user-photo"]}>
              <img
                src="https://blog.casadoprodutor.com.br/wp-content/uploads/2018/04/gatinho.jpg"
                alt="Foto do Usuário"
                className={Styles["user-photo-img"]}
              />
              <div className={Styles["buttons-container"]}>
                <button className={Styles["btn-upload"]}>
                  <MdUpload />
                </button>
                <button className={Styles["btn-delete"]}>
                  <MdDelete />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className={Styles["container-section02-password"]}>
          <div className={Styles["section02"]}>
            <div className={Styles["container-inputs"]}>
              <span>Nome*</span>
              <input className={Styles["input-nome"]} type="text" disabled={!isEditing} />
              
              <span>E-mail</span>
              <input className={Styles["input-e-mail"]} type="text" disabled={!isEditing} />
              
              <span>Cargo*</span>
              <select className={Styles["select-cargo"]} disabled={!isEditing}>
                <option value="">Selecione um cargo</option>
                <option value="gerente">Gerente</option>
                <option value="funcionario">Funcionário</option>
              </select>
            </div>

            <div className={Styles["button-container"]}>
              {isButtonActive ? (
                <button className={Styles["custom-btn"]} onClick={togglePasswordSection}>
                  <MdLock /> Redefinir minha senha
                </button>
              ) : (
                <span className={Styles["custom-span-reset"]} onClick={togglePasswordSection}>
                  <MdLock /> Redefinir minha senha
                </span>
              )}
            </div>
          </div>

          <div className={`${Styles["section-change-password"]} ${showPasswordSection ? Styles["visible"] : ""}`}>
            <div className={Styles["container-actual-new-password"]}>
              <div className={Styles["space-actual-password"]}>
                <span>Senha atual*</span>
                <input type="text" />
              </div>
              <div className={Styles["space-new-password"]}>
                <span>Nova Senha*</span>
                <input type="text" />
              </div>
            </div>
            <div className={Styles["button-space"]}>
              <button className={Styles["custom-btn-yellow"]}>Redefinir</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeusDados;