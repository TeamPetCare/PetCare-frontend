import React, { useState, useEffect, useRef } from "react";
import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import styles from "./Calendario.module.css";
import Event from "./components/Event.jsx";
import ModalConfirmacao from "../../../shared/modalConfirmacao/ModalConfirmacao.jsx";
import EditEventModal from "./components/editEventModal/EditEventModal.jsx";
import { localizer } from "./config/localizer";
import { formats } from "./config/formats";
import { messages } from "./config/messages";

function Calendario({ dadosAgendamentos }) {
  const [view, setView] = useState("month");
  const [eventsOnDate, setEventsOnDate] = useState([]);
  const [modalEditEventShow, setModalEditEventShow] = useState(false);
  const [editedEvent, setEditedEvent] = useState(null);

  const [allEvents, setAllEvents] = useState([]);
  const [modalConfirmarCancelShow, setModalConfirmarCancelShow] =
    useState(false);
  const [eventToCancel, setEventToCancel] = useState(null); // Armazena o evento que será cancelado
  const eventRefs = useRef({}); // Referências para os eventos

  const menssagemConfirmarCancel = `<h4>Deseja realmente finalizar o agendamento? Ao prosseguir, o cliente será notificado da conclusão e o serviço será registrado como concluído.</h4>`;

  useEffect(() => {
    setAllEvents(dadosAgendamentos);
    console.log("Dados de Agendamentos:", dadosAgendamentos);
  }, [dadosAgendamentos]);

  const handleUpdateEvent = (updatedEvent) => {
    setAllEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
  };

  const handleShowMore = (events) => {
    setEventsOnDate(events);
  };

  const handleCancelEvent = (eventId) => {
    // setEventToCancel(eventId); // Armazena o evento que será cancelado
    setModalConfirmarCancelShow(true);
  };

  const handleOpenEditModal = (event) => {
    setEditedEvent(event);
    setModalEditEventShow(true);
  };

  const handleCloseEditModal = () => {
    setModalEditEventShow(false);
    setEditedEvent(null);
  };

  const handleCloseConfirmacaoModal = () => {
    setModalConfirmarCancelShow(false);
  };

  const eventRef = useRef(); 

  const handleAcionarCancelEdit = () => {
    if (eventRef.current) {
      eventRef.current.handleCancelEvent(); 
    }
    handleCloseConfirmacaoModal();
  };

  return (
    <div className={styles.calendario}>
      <Calendar
        messages={messages}
        localizer={localizer}
        events={allEvents}
        startAccessor="start"
        endAccessor="end"
        step={30}
        style={{
          height: "90vh",
          color: "var(--cor-primaria-azul-escuro)",
          marginTop: "-33px",
          fontSize: "14px",
          fontWeight: 700,
          overflowY: "auto",
        }}
        formats={formats}
        onView={setView}
        components={{
          event: (eventProps) => (
            <Event
              {...eventProps}
              view={view}
              onCancelEvent={handleCancelEvent}
              onUpdate={handleUpdateEvent}
              onOpenEditModal={() => handleOpenEditModal(eventProps.event)}
              ref={eventRef}
            />
          ),
        }}
        onShowMore={handleShowMore}
      />
      <ModalConfirmacao
        onBack={handleCloseConfirmacaoModal}
        confirmAction={handleAcionarCancelEdit}
        menssagem={menssagemConfirmarCancel}
        show={modalConfirmarCancelShow}
        onHide={handleCloseConfirmacaoModal}
      />
    </div>
  );
}

export default Calendario;
