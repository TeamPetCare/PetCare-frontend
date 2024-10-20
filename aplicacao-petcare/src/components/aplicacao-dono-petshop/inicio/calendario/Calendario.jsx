import React, { useState, useEffect } from "react";
import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import styles from "./Calendario.module.css";
import Event from "./components/Event.jsx";
import { localizer } from "./config/localizer";
import { formats } from "./config/formats";
import { messages } from "./config/messages";

function Calendario({ dadosAgendamentos }) {
  const [allEvents, setAllEvents] = useState(dadosAgendamentos);
  const [view, setView] = useState("month");
  const [eventsOnDate, setEventsOnDate] = useState([]);

  // Função para excluir um evento
  const handleDeleteEvent = (eventId) => {
    setAllEvents((prevEvents) =>
      prevEvents.filter((event) => event.id !== eventId)
    );
  };

  const handleUpdateEvent = (updatedEvent) => {
    setAllEvents((prevEvents) => {
      const updatedEvents = prevEvents.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      );
      console.log("Eventos após atualização:", updatedEvents); // Log para depuração
      return updatedEvents;
    });
  };

  const handleShowMore = (events, date) => {
    setEventsOnDate(events);
  };

  // useEffect para verificar alterações em allEvents
  useEffect(() => {
    // Este efeito pode ser usado para outras atualizações ou side effects, se necessário
    console.log("Eventos atualizados:", allEvents);
  }, [allEvents]);

  return (
    <div className={styles["calendario"]}>
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
        onView={(newView) => setView(newView)}
        components={{
          event: (eventProps) => (
            <Event
              {...eventProps}
              view={view}
              onDelete={handleDeleteEvent}
              onUpdate={handleUpdateEvent}
            />
          ),
        }}
        onShowMore={handleShowMore}
      />
    </div>
  );
}

export default Calendario;
