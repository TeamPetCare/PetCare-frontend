import Styles from "./MeusDados.module.css";
import { MdEdit, MdUpload, MdDelete } from "react-icons/md";

const MeusDados = () => {
  return (
    <div className={Styles["container-main"]}>
      <button className={Styles["custom-btn"]}>
        <MdEdit /> Editar meus dados
      </button>

      {/* Container da foto do usuário e botões */}
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
      <div className={Styles["container-inputs"]}>
        <span>Nome*</span>
        <input type="text" />
        <span>E-mail</span>
        <input type="text" />
        <span>Cargo*</span>
        <input type="text" />
      </div>
    </div>
  );
};

export default MeusDados;