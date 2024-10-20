import { useEffect } from "react";

const UserWay = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.userway.org/widget.js";
    script.setAttribute("data-account", "vaPMpegUnp");
    script.setAttribute("data-color", "#005472");
    script.setAttribute("data-position", "3");
    script.async = true;

    document.body.appendChild(script);

    return () => {
        document.body.removeChild(script);
    }
  }, []);
  return null;
};

export default UserWay;
