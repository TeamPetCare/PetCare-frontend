import { Link } from "react-router-dom";
import { IoIosNotificationsOutline } from "react-icons/io";
import { PiUserCirclePlusThin } from "react-icons/pi";
import { GoDotFill } from "react-icons/go";
import { useMediaQuery } from "react-responsive";
import styles from "./UserHeader.module.css";
import ftUser from "../../../../utils/assets/aplicacao-dono-petshop/ftUser.png";
import { useEffect, useState } from "react";

const UserHeader = () => {
  // Verifica se a tela é maior que 1024px (desktop)
  const isDesktop = useMediaQuery({ minWidth: 1024 });
  const [userData, setUserData] = useState();

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("userData")));
  }, []);

  return (
    <div className={styles["container"]}>
      <div className={styles["container-notifications"]}>
        <IoIosNotificationsOutline size={28} color="black" />
        <span className={styles["notification-dot"]}>
          <GoDotFill color="red" size={18} />
        </span>
      </div>

      <Link
        to="/dono-petshop/meus-dados"
        className={styles["link-user-profile"]}
      >
        <div className={styles["container-user"]}>
          {userData?.userImage != "Not found" ? (
            <img src={userData?.userImage} alt="Foto do Usuário" />
          ) : (
            <PiUserCirclePlusThin size={35} />
          )}
          {isDesktop && (
            <div className={styles["container-info-profile"]}>
              <h3>{userData?.name}</h3>
              <p>
                {userData?.role == "ROLE_ADMIN"
                  ? "Administrador"
                  : "Funcionário"}
              </p>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default UserHeader;