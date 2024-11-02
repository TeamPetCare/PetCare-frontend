import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
  useRef,
} from "react";
import styles from "./Event.module.css";
import { FaPix, FaCreditCard, FaCashRegister } from "react-icons/fa6";
import EditEventModal from "./editEventModal/EditEventModal";
import { toast } from 'react-toastify';

const paymentIcons = {
  Pix: <FaPix color="#005472" size={14} />,
  "Cartão de Crédito": <FaCreditCard color="#005472" size={14} />,
  Dinheiro: <FaCashRegister color="#005472" size={14} />,
};

const Event = forwardRef(({ event, view, onCancelEvent, onUpdate }, ref) => {
  const formatTime = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedEvent, setEditedEvent] = useState({ ...event });
  const [statusClass, setStatusClass] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(!showModal);
    setIsEditing(false);
    setEditedEvent({ ...event });
    console.log("chameii");
  };
  const eventRef = useRef();

  useImperativeHandle(ref, () => ({
    handleOpenModalEvent: () => {
      handleOpenModal(); // Chama a função para abrir o modal de edição
      console.log("Abrindo modal para o evento:", editedEvent.title);
    },
    handleCancelEvent: () => {
      const updatedEvent = { ...editedEvent, status: "Cancelado" };
      console.log("Passei aqui, status: ", updatedEvent);
      setEditedEvent(updatedEvent);
      onCancelEvent(updatedEvent); 
      toast.success("Evento cancelado com sucesso!"); // Exibe o toast
      setShowConfirmModal(true); 
    },
  }));

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleEdit = (e) => {
    // e.stopPropagation();
    setIsEditing(true);
  };

  const handleSave = () => {
    onUpdate(editedEvent);
    handleCloseModal();
    // window.location.reload();
  };

  const handleCancelAction = (e) => {
    e.stopPropagation();
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setEditedEvent((prevEvent) => {
      const updatedEvent = { ...prevEvent };

      if (name === "paymentStatus") {
        updatedEvent.paymentStatus = value === "pago";
      } else {
        updatedEvent[name] = value;
      }

      if (name === "startTime" || name === "endTime") {
        const timeParts = value.split(":").map(Number);
        const dateKey = name === "startTime" ? "start" : "end";
        const updatedDate = new Date(updatedEvent[dateKey]);
        updatedDate.setHours(timeParts[0]);
        updatedDate.setMinutes(timeParts[1]);
        updatedEvent[dateKey] = updatedDate.toISOString();
      }

      return updatedEvent;
    });
  };

  // const handleCancelEvent = () => {
  //   const updatedEvent = { ...editedEvent, status: "Cancelado" };
  //   console.log("Passei aqui, status: ", updatedEvent);
  //   setEditedEvent(updatedEvent);
  //   onCancelEvent(updatedEvent); 
  //   setShowConfirmModal(true); 
  // };


  useEffect(() => {
    const statusClass =
      editedEvent.status === "Concluído"
        ? styles.concluido
        : editedEvent.status === "Agendado"
        ? styles.agendado
        : editedEvent.status === "Cancelado"
        ? styles.cancelado
        : "";

    setStatusClass(statusClass);
  }, [editedEvent.status]);

  let timeDisplay;

  if (view === "week") {
    timeDisplay = (
      <div
        className={`${styles.container} ${statusClass}`}
        style={{ height: "100%" }}
      >
        <div className={styles["container-status"]}>
          <div>
            <div className={styles["container-hours"]}>
              <p
                style={{
                  fontWeight: "700",
                  fontSize: ".9em",
                  fontFamily: "Montserrat",
                  lineHeight: ".9em",
                  marginBottom: ".2em",
                }}
              >
                {event.title}
              </p>
            </div>
            <p
              style={{
                fontWeight: "600",
                fontSize: ".8em",
                fontFamily: "Montserrat",
                lineHeight: ".9em",
              }}
            >
              {formatTime(event.start)} - {formatTime(event.end)}
            </p>
            <p style={{ fontSize: ".8em" }}>
              Pag.: {event.paymentStatus ? "Pago" : "Pendente"}
            </p>
          </div>
        </div>
      </div>
    );
  } else if (view === "day") {
    timeDisplay = (
      <div
        className={`${styles.container} ${statusClass}`}
        style={{ height: "100%" }}
      >
        <div className={styles["container-status"]}>
          <div>
            <div className={styles["container-hours"]}>
              <p
                style={{
                  fontWeight: "700",
                  fontSize: "1.1em",
                  fontFamily: "Montserrat",
                  lineHeight: ".9em",
                }}
              >
                {event.title}
              </p>
            </div>
            <p
              style={{
                fontWeight: "600",
                fontSize: "1em",
                fontFamily: "Montserrat",
              }}
            >
              {formatTime(event.start)} - {formatTime(event.end)}
            </p>
            <p style={{ fontSize: ".9em" }}>
              Pag.: {event.paymentStatus ? "Pago" : "Pendente"}
            </p>
          </div>
          <div
            className={styles["container-icon"]}
            style={{ padding: "8px 9px", top: "50%" }}
          >
            {paymentIcons[event.paymentMethod] || null}
          </div>
        </div>
      </div>
    );
  } else if (view === "agenda") {
    timeDisplay = (
      <div
        className={`${styles.container} ${statusClass}`}
        style={{
          backgroundColor: "transparent",
          width: "unset",
          position: "unset",
        }}
      >
        <div className={styles["container-status"]}>
          <div>
            <h3 style={{ fontSize: "1em", fontWeight: "700", margin: "0" }}>
              {event.title}
            </h3>
            <p style={{ fontSize: "1em", fontWeight: "300" }}>
              Pag.: {event.paymentStatus ? "Pago" : "Pendente"}
            </p>
          </div>
          <div
            className={styles["container-icon"]}
            style={{ position: "unset" }}
          >
            {paymentIcons[event.paymentMethod] || null}
          </div>
        </div>
      </div>
    );
  } else if (view === "month") {
    timeDisplay = (
      <div className={`${styles.container} ${statusClass}`}>
        <div className={styles["container-status"]}>
          <div style={{ width: "100%" }}>
            <div className={styles["container-hours"]}>
              <p
                style={{
                  fontWeight: "700",
                  fontSize: ".85em",
                  fontFamily: "Montserrat",
                  lineHeight: ".9em",
                  width: "95%",
                }}
              >
                {event.title}
              </p>
              <p style={{ fontSize: ".8em" }}>
                Pag.: {event.paymentStatus ? "Pago" : "Pendente"}
              </p>
            </div>
            <p
              style={{
                fontWeight: "700",
                fontSize: ".8em",
                fontFamily: "Montserrat",
              }}
            >
              {formatTime(event.start)} - {formatTime(event.end)}
            </p>
          </div>
        </div>
      </div>
    );
  } else {
    timeDisplay = <p>Visualização não reconhecida</p>;
  }

  return (
    <div className={styles["container-div"]} onClick={handleOpenModal}>
      {timeDisplay}
      <EditEventModal
        show={showModal}
        handleOpen={handleOpenModal}
        handleClose={handleCloseModal}
        editedEvent={editedEvent}
        handleChange={handleChange}
        isEditing={isEditing}
        handleSave={handleSave}
        handleEdit={handleEdit}
        handleCancelEvent={onCancelEvent}
        handleCancelAction={handleCancelAction}
        event={event}
      />
    </div>
  );
});

export default Event;
