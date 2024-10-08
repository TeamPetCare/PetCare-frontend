import React, { useState } from "react";
import { Link } from "react-router-dom";
import SideBar from "../../shared/SideBar/SideBar";
import logoPetCare from "../../../../utils/assets/logos/logoPetCare.svg";
import { RxHamburgerMenu } from "react-icons/rx";
import styles from "./MobileHeaderApp.module.css";

function MobileHeaderApp({scrollToSection04}) {
    const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  return (
    <div className={styles["container"]}>
      <Link to="/">
        <img
          src={logoPetCare}
          alt="Logo da Pet Care"
          className={styles["logo_pet_care"]}
        />
      </Link>

      <RxHamburgerMenu
        size={"1.6em"}
        className={styles["img_menu_mobile"]}
        onClick={showSidebar}
      />
      {sidebar && <SideBar active={setSidebar} scrollToSection04={scrollToSection04}/>}
    </div>
  );
}

export default MobileHeaderApp;
