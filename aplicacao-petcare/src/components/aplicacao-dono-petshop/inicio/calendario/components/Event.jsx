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
import { toast } from "react-toastify";
import { getUserById } from "../../../../../services/userService";
import { updateSchedule } from "../../../../../services/scheduleService";
import { updatePayment } from "../../../../../services/paymentService";

const paymentIcons = {
  PIX: <FaPix color="#005472" size={14} />,
  CARTAO_DEBITO: <FaCreditCard color="#005472" size={14} />,
  CARTAO_CREDITO: <FaCreditCard color="#005472" size={14} />,
  DINHEIRO: <FaCashRegister color="#005472" size={14} />,
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
  const [originalEvent, setOriginalEvent] = useState({ ...event });
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showMoreVisible, setShowMoreVisible] = useState(true);
  const [tempEditedEvent, setTempEditedEvent] = useState({ ...event });

  const capitalizeFirstLetter = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };

  const handleOpenModal = () => {
    setShowModal(!showModal);
    setShowMoreVisible(false);
    setIsEditing(false);

    const overlayElements = document.querySelectorAll('[class*="rbc-overlay"]');
    overlayElements.forEach((element) => {
      const handleClick = (e) => {
        e.stopPropagation();
      };
      element.addEventListener("click", handleClick);

      return () => {
        element.removeEventListener("click", handleClick);
      };
    });
  };

  // Fechar o modal sem salvar
  const handleCloseModal = () => {
    setShowModal(false);
    setShowMoreVisible(true);
  };

  const handleEdit = (e) => {
    setIsEditing(true);
  };

  function formatTimeHours(dateTime) {
    const date = new Date(dateTime);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  }

  const handleSave = async () => {
    const updatedData = {
      id: tempEditedEvent.id,
      scheduleStatus: tempEditedEvent.scheduleStatus,
      scheduleDate: tempEditedEvent.scheduleDate,
      scheduleTime: formatTimeHours(tempEditedEvent.scheduleDate),
      creationDate: tempEditedEvent.creationDate,
      scheduleNote: tempEditedEvent.scheduleNote,
      petId: tempEditedEvent.pet.id || null,
      paymentId: tempEditedEvent.payment?.id || null,
      serviceIds: tempEditedEvent.services.map((service) => service.id),
      employeeId: tempEditedEvent.employee?.id || null,
    };

    const paymentData = {
      id: tempEditedEvent.payment?.id,
      price: tempEditedEvent.payment?.price || 0.0, 
      paymentDate: tempEditedEvent.payment?.paymentDate || new Date().toISOString(), 
      paymentId: tempEditedEvent.payment?.paymentId || null,
      paymentStatus: tempEditedEvent.payment?.paymentStatus || false, 
      paymentMethod: tempEditedEvent.payment?.paymentMethod ,
      userId: tempEditedEvent.pet.user.id || null, // ID do usuário
    };

    try {
    
      await updateSchedule(updatedData.id, updatedData);
      onUpdate(updatedData);
      if (tempEditedEvent.payment?.id) {
        await updatePayment(paymentData.id, paymentData);
      }

      toast.success("Evento atualizado com sucesso!", {
        autoClose: 2000,
      });

      setOriginalEvent(tempEditedEvent); 
      setEditedEvent(tempEditedEvent);
      handleCloseModal(); 
    } catch (error) {
      console.error("Erro ao salvar o evento:", error);
      toast.error(
        `Falha ao salvar o evento. Detalhes: ${
          error.message || "Tente novamente."
        }`
      );
    }
  };

  const handleCancelAction = (e) => {
    e.stopPropagation();
    setIsEditing(false);
    setEditedEvent({ ...originalEvent }); 
    setTempEditedEvent({ ...originalEvent });
    setTimeout(() => {
      handleCloseModal();
    }, 100);
  };

  const getFuncionarioInfo = async (id) => {
    try {
      const funcionarioInfo = await getUserById(id);
      return funcionarioInfo;
    } catch (error) {
      console.error("Erro ao buscar informações do funcionario: " + error);
    }
  };

  async function handleFuncionarioUpdate(event, updatedEvent) {
    try {
      const funcionario = await getFuncionarioInfo(event.target.value.id);
      if (funcionario) {
        updatedEvent.employee = funcionario;
      }

      return funcionario;
    } catch (error) {
      console.error("Erro ao atualizar informações do funcionário:", error);
    }
  }
  const handleChange = (event) => {
    const { name, value } = event.target;

    setTempEditedEvent((prevEvent) => {
      const updatedEvent = { ...prevEvent };
      if (name.includes("Configure um status")) {
        updatedEvent.scheduleStatus = event.target.option
          .toUpperCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");
      } else if (name.includes("Selecione um funcionário")) {
        handleFuncionarioUpdate(event, updatedEvent).then((updatedEmployee) => {
          updatedEvent.employee = updatedEmployee;
          setTempEditedEvent(updatedEvent);
        });
      } else if (name === "paymentStatus") {
        updatedEvent.payment.paymentStatus =
          value === "true" || value === "false" ? JSON.parse(value) : value;
      } else if (name === "observacoes") {
        updatedEvent.scheduleNote = value;
      }
      return updatedEvent;
    });
  };

  useEffect(() => {
    const statusClass =
      editedEvent.scheduleStatus === "CONCLUIDO"
        ? styles.concluido
        : editedEvent.scheduleStatus === "AGENDADO"
        ? styles.agendado
        : editedEvent.scheduleStatus === "CANCELADO"
        ? styles.cancelado
        : "";

    setStatusClass(statusClass);
  }, [editedEvent.scheduleStatus]);

  useEffect(() => {
    setTempEditedEvent(editedEvent);
  }, [editedEvent]);

  useEffect(() => {
    setOriginalEvent({ ...event }); 
    setEditedEvent({ ...event });
    setTempEditedEvent({ ...event });
  }, [event]);

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
                {event.services.map((service) => service.name).join(", ")}
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
              Pag.: {event.payment.paymentStatus ? "Pago" : "Pendente"}
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
                  fontSize: ".9em",
                  fontFamily: "Montserrat",
                  lineHeight: ".9em",
                }}
              >
                {event.services.map((service) => service.name).join(", ")}
              </p>
            </div>
            <p
              style={{
                fontWeight: "500",
                fontSize: ".8em",
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
            style={{ padding: "4px 5px", top: "20%" }}
          >
            {paymentIcons[event.payment?.paymentMethod] || null}
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
              {event.services.map((service) => service.name).join(", ")}
            </h3>
            <p style={{ fontSize: "1em", fontWeight: "300" }}>
              Status: {capitalizeFirstLetter(event.scheduleStatus)} | Pag.:{" "}
              {event.paymentStatus ? "Pago" : "Pendente"}
            </p>
          </div>
          <div
            className={styles["container-icon"]}
            style={{ position: "unset", padding: ".3em .5em" }}
          >
            {paymentIcons[event.payment?.paymentMethod] || null}
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
              <div>
                <p
                  style={{
                    fontWeight: "700",
                    fontSize: ".85em",
                    fontFamily: "Montserrat",
                    lineHeight: ".9em",
                    width: "95%",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {event.services.map((service) => service.name).join(", ")}
                </p>
              </div>

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
        key={editedEvent.id + JSON.stringify(tempEditedEvent.scheduleDate)}
        show={showModal}
        handleOpen={handleOpenModal}
        handleClose={handleCloseModal}
        editedEvent={tempEditedEvent}
        handleChange={handleChange}
        isEditing={isEditing}
        handleSave={handleSave}
        handleEdit={handleEdit}
        handleCancelEvent={() => {
          onCancelEvent();
          setTempEditedEvent({ ...originalEvent });
        }}
        handleCancelAction={handleCancelAction}
        event={event}
      />
    </div>
  );
});

export default Event;
