import React from "react";
import Styles from "./Suporte.module.css";
import Section01 from "../../../components/site-institucional/suporte/section01/Section01.jsx";
import Section02 from "../../../components/site-institucional/suporte/section02/Section02.jsx";
import FormSuporte from "../../../components/site-institucional/shared/formSuporte/FormSuporte.jsx";
import Footer from "../../../components/site-institucional/shared/Footer/Footer.jsx";

const Suporte = () => {
  return (
    <div>
      <div>
        <Section01></Section01>
        <div className={Styles["container-section02-forms"]}>
          <Section02></Section02>
          <FormSuporte></FormSuporte>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Suporte;