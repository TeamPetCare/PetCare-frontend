import Styles from "./MeusDados.module.css";
import { MdEdit, MdUpload, MdDelete, MdLock } from "react-icons/md";

const MeusDados = () => {
  return (
    <div className={Styles["container-main"]}>
      <div className={Styles["section01"]}>
        <button className={Styles["custom-btn"]}>
          <MdEdit /> Editar meus dados
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

      <div className={Styles["section02"]}>
        <div className={Styles["container-inputs"]}>
          <span>Nome*</span>
          <input className={Styles["input-nome"]} type="text" />
          <span>E-mail</span>
          <input className={Styles["input-e-mail"]} type="text" />
          <span>Cargo*</span>
          <select className={Styles["select-cargo"]}>
            <option value="">Selecione um cargo</option>
            <option value="gerente">Gerente</option>
            <option value="funcionario">Funcionário</option>
          </select>
        </div>

        <div className={Styles["button-container"]}>
          <button className={Styles["custom-btn"]}>
            <MdLock /> Redefinir minha senha
          </button>
        </div>
      </div>

    </div>
  );
};

export default MeusDados;