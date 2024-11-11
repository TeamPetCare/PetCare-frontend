import React, { useRef } from "react";
import Styles from "./Suporte.module.css";
import Section01 from "../../../components/site-institucional/suporte/section01/Section01.jsx";
import Section02 from "../../../components/site-institucional/suporte/section02/Section02.jsx";
import FormSuporte from "../../../components/site-institucional/shared/formSuporte/FormSuporte.jsx";
import Footer from "../../../components/site-institucional/shared/Footer/Footer.jsx";

const Suporte = () => {
  const formRef = useRef(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={Styles["container-suporte"]}>
      <Section01 onContactClick={scrollToForm} />
      
      <div className={Styles["container-section02-forms"]}>
        <Section02 />
        <div ref={formRef}>
          <FormSuporte />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Suporte;