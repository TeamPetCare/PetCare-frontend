import { Link } from "react-router-dom";
import styles from "./UserHeader.module.css";
import ftUser from "../../../../utils/assets/aplicacao-dono-petshop/ftUser.png";
import { IoIosNotificationsOutline } from "react-icons/io";

const UserHeader = () => {
  return (
    <div className={styles["container"]}>
      <div className={styles["container-notifications"]}>
        <IoIosNotificationsOutline size={28} color="black" />
      </div>
      <Link to="/dono-petshop/meus-dados" className={styles["link-user-profile"]}>
        <div className={styles["container-user"]}>
          <img src={ftUser} alt="Foto do Usuário" />
          <div className={styles["container-info-profile"]}>
            <h3>Jaqueline Freitas</h3>
            <p>Gerente</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default UserHeader;
