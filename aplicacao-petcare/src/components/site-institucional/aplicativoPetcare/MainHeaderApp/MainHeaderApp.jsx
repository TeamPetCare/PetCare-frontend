import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";

import MobileHeaderApp from "../MobileHeaderApp/MobileHeaderApp.jsx";
import DesktopHeaderApp from "../DesktopHeaderApp/DesktopHeaderApp.jsx";

function MainHeaderApp({ scrollToSection04 }) {
  const isMobile = useMediaQuery({ query: "(max-width: 1023px)" });
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });

  return (
    <>
      {isMobile && <MobileHeaderApp scrollToSection04={scrollToSection04} />}
      {isDesktop && <DesktopHeaderApp scrollToSection04={scrollToSection04} />}
    </>
  );
}

export default MainHeaderApp;
