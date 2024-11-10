import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import styles from "./Layout.module.css";
import SideBar from "../../../components/aplicacao-dono-petshop/shared/sideBar/SideBar";
import UserHeader from "../../../components/aplicacao-dono-petshop/shared/userHeader/UserHeader";

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSideBar = () => {
    setIsSidebarOpen(prevState => !prevState);
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.sidebar} ${isSidebarOpen ? styles['sidebar-open'] : styles['sidebar-closed']}`}>
        <SideBar isSideBarOpen={isSidebarOpen} toggleSideBar={toggleSideBar} />
      </div>
      <div className={`${styles.content} ${isSidebarOpen ? styles['sidebar-open'] : styles['sidebar-closed']}`}>
        {children}
      </div>
    </div>
  );
};

export default Layout;
