import React, { useRef, useState } from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import {
  HeaderWithConditional,
  SideBarWithConditional,
} from "./routes/configuracaoPaths.jsx";
import AppRoutes from "./routes/Routes.jsx";
import "./utils/variables.css";
import "./utils/global.css";
import styles from "./App.module.css";

import UserCreateTest from './components/user-test/UserCreateTest.jsx'; 


function App() {
  const section04Ref = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSideBar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (

    <Router>
      <HeaderWithConditional section04Ref = {section04Ref} className={styles["container-menor"]}/>
      <AppRoutes section04Ref={section04Ref} />
    </Router>
  );
}

export default App;