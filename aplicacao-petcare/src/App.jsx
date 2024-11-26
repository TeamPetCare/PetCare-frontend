import React, { useRef, useState, useEffect } from "react";
import { BrowserRouter as Router,  } from "react-router-dom";
import { ToastContainer } from "react-toastify";
// import { decode as jwtDecode } from "jwt-decode"; // Importação corrigida

import "react-toastify/dist/ReactToastify.css";
import "./utils/variables.css";
import "./utils/global.css";
import styles from "./App.module.css";
import {
  HeaderWithConditional,
  SideBarWithConditional,
} from "./routes/configuracaoPaths.jsx";
import AppRoutes from "./routes/Routes.jsx";

function App() {
  const section04Ref = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSideBar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={10000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <HeaderWithConditional
        section04Ref={section04Ref}
        className={styles["container-menor"]}
      />
      <AppRoutes section04Ref={section04Ref} />
    </Router>
  );
}

export default App;
