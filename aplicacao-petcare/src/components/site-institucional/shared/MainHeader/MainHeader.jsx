import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import MobileHeader from "../MobileHeader/MobileHeader.jsx";
import DesktopHeader from "../DesktopHeader/DesktopHeader.jsx";

function MainHeader({ scrollToSection04 }) {
  const isMobile = useMediaQuery({ query: "(max-width: 1023px)" });
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });

  return (
    <>
      {isMobile && <MobileHeader scrollToSection04={scrollToSection04} />}
      {isDesktop && <DesktopHeader scrollToSection04={scrollToSection04} />}
    </>
  );
}

export default MainHeader;
