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
import { getAllServicos } from '../../../../services/servicosService.js'; // Importe a função

function Calendario({ dadosAgendamentos }) {
  const [view, setView] = useState("month");
  const [eventsOnDate, setEventsOnDate] = useState([]);
  const [modalEditEventShow, setModalEditEventShow] = useState(false);
  const [editedEvent, setEditedEvent] = useState(null);
  const [allEvents, setAllEvents] = useState([]);
  const [modalConfirmarCancelShow, setModalConfirmarCancelShow] =
    useState(false);
  const [eventToCancel, setEventToCancel] = useState(null);
  const eventRefs = useRef({});

  const menssagemConfirmarCancel = `<h4>Deseja realmente finalizar o agendamento? Ao prosseguir, o cliente será notificado da conclusão e o serviço será registrado como concluído.</h4>`;

  useEffect(() => {
    const loadData = async () => {
      try {
        const servicos = await getAllServicos(); 
        console.log(servicos); 
        setAllEvents(servicos);
      } catch (error) {
        console.error('Erro ao carregar serviços:', error);
      }
    };

    loadData(); 
  }, []); 

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

  const handleAcionarCancelEdit = () => {
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
        popup={true}
        formats={formats}
        onView={setView}
        components={{
          event: (eventProps) => (
            <Event
              {...eventProps}
              view={view}
              onCancelEvent={handleCancelEvent}
              onUpdate={handleUpdateEvent}
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
