import { Link } from "react-router-dom";
import { IoIosNotificationsOutline } from "react-icons/io";
import { useMediaQuery } from "react-responsive";
import styles from "./UserHeader.module.css";
import ftUser from "../../../../utils/assets/aplicacao-dono-petshop/ftUser.png";

const UserHeader = () => {
  // Verifica se a tela é maior que 1024px (desktop)
  const isDesktop = useMediaQuery({ minWidth: 1024 });

  return (
    <div className={styles["container"]}>
      <div className={styles["container-notifications"]}>
        <IoIosNotificationsOutline size={28} color="black" />
      </div>
      <Link to="/dono-petshop/meus-dados" className={styles["link-user-profile"]}>
        <div className={styles["container-user"]}>
          <img src={ftUser} alt="Foto do Usuário" />
          {isDesktop && (
            <div className={styles["container-info-profile"]}>
              <h3>Jaqueline Freitas</h3>
              <p>Dono</p>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default UserHeader;
