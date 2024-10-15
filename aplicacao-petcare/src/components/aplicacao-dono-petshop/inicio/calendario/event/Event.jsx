import React from "react";
import styles from "./Event.module.css";
import { FaPix, FaCreditCard, FaCashRegister } from "react-icons/fa6";

const paymentIcons = {
  Pix: <FaPix color="#005472" />,
  "Cartão de Crédito": <FaCreditCard color="#005472" />,
  Dinheiro: <FaCashRegister color="#005472" />,
};

const Event = ({ event }) => {
  return (
    <div className={styles["container"]}>
      <h3>{event.title}</h3>
      <div className={styles["container-status"]}>
        <div>
          <p>
            <strong>Status:</strong> {event.paymentStatus}
          </p>
          <div className={styles["container-hours"]}>
            <p>
              {event.hourStart.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}{" "}
              -
              {event.hourEnd.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>
        <div className={styles["container-icon"]}>
          {paymentIcons[event.paymentMethod] || null}
        </div>
      </div>
    </div>
  );
};

export default Event;
