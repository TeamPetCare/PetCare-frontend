import React, { useRef } from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import {
  HeaderWithConditional,
  SideBarWithConditional,
} from "./routes/configuracaoPaths.jsx";
import AppRoutes from "./routes/Routes.jsx";
import "./utils/variables.css";
import "./utils/global.css";

import UserCreateTest from './components/user-test/UserCreateTest.jsx'; 


function App() {
  const section04Ref = useRef(null);

  return (
    <Router>
      <HeaderWithConditional section04Ref = {section04Ref}/>
      <SideBarWithConditional />
      <AppRoutes section04Ref={section04Ref} />


      <UserCreateTest />

    </Router>
  );
}

export default App;
