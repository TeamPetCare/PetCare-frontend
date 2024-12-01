import React, { useState, useEffect, useRef } from "react";
import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import styles from "./Calendario.module.css";
import Event from "./components/Event.jsx";
import ModalConfirmacao from "../../../shared/modalConfirmacao/ModalConfirmacao.jsx";
import { localizer } from "./config/localizer";
import { formats } from "./config/formats";
import { messages } from "./config/messages";

// Função para pegar informações do funcionário
const getFuncionarioInfo = async (employeeId) => {
  const response = await fetch(`/api/funcionarios/${employeeId}`);
  return await response.json();
};

function Calendario({ dadosAgendamentos, onMonthChange }) {
  const [view, setView] = useState("month");
  const [allEvents, setAllEvents] = useState([]);
  const [editedEvent, setEditedEvent] = useState(null);
  const [modalEditEventShow, setModalEditEventShow] = useState(false);
  const [modalConfirmarCancelShow, setModalConfirmarCancelShow] = useState(false);

  useEffect(() => {
    setAllEvents(dadosAgendamentos);
  }, [dadosAgendamentos]);

  useEffect(() => {
    handleMonthNavigate(new Date());
  }, []);

  // Função para lidar com a mudança de visualização
  const handleViewChange = (newView) => {
    setView(newView);
    handleMonthNavigate(new Date());
  };

  // Formatar o horário de término do evento
  const formatEndTime = (startTime, duration) => {
    const [hours, minutes] = duration.split(":").map(Number);
    const endTime = new Date(startTime);
    endTime.setHours(endTime.getHours() + hours);
    endTime.setMinutes(endTime.getMinutes() + minutes);
    return endTime.toISOString();
  };

  // Navegar para o mês selecionado
  const handleMonthNavigate = (date) => {
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formattedMonth = `${year}-${month.toString().padStart(2, "0")}`;
    onMonthChange(formattedMonth);
  };

  // Atualizar um evento
  const handleUpdateEvent = async (updatedEvent) => {
    const funcionario = await getFuncionarioInfo(updatedEvent.employeeId);
    setAllEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === updatedEvent.id
          ? {
              ...event,
              employee: funcionario,
              start: new Date(updatedEvent.scheduleDate),
              end: new Date(formatEndTime(updatedEvent.scheduleDate, updatedEvent.scheduleTime)),
            }
          : event
      )
    );
  };

  // Mostrar mais eventos
  const handleShowMore = (events) => {
    // Logica de mostrar mais eventos
  };

  // Exibir modal de confirmação
  const handleCancelEvent = () => {
    setModalConfirmarCancelShow(true);
  };

  // Abrir modal de edição de evento
  const handleOpenEditModal = (event) => {
    setEditedEvent(event);
    setModalEditEventShow(true);
  };

  // Fechar modal de edição
  const handleCloseEditModal = () => {
    setModalEditEventShow(false);
    setEditedEvent(null);
  };

  // Fechar modal de confirmação
  const handleCloseConfirmacaoModal = () => {
    setModalConfirmarCancelShow(false);
  };

  // Confirmar cancelamento de evento
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
        onNavigate={handleMonthNavigate}
        formats={formats}
        onView={handleViewChange}
        components={{
          event: (eventProps) => (
            <Event
              {...eventProps}
              view={view}
              onCancelEvent={handleCancelEvent}
              onUpdate={handleUpdateEvent}
              onOpenEditModal={() => handleOpenEditModal(eventProps.event)}
            />
          ),
        }}
        onShowMore={handleShowMore}
      />
      <ModalConfirmacao
        onBack={handleCloseConfirmacaoModal}
        confirmAction={handleAcionarCancelEdit}
        menssagem="Deseja realmente finalizar o agendamento?"
        show={modalConfirmarCancelShow}
        onHide={handleCloseConfirmacaoModal}
      />
    </div>
  );
}

export default Calendario;
