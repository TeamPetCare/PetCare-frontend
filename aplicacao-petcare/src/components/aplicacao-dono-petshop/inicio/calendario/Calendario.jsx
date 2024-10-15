import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import ptBR from "date-fns/locale/pt-BR"; 
import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Calendario.module.css";
import Event from "./event/Event";

const locales = {
  "pt-BR": ptBR, 
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { locale: ptBR }),
  getDay,
  locales,
});

const messages = {
  allDay: "Dia inteiro",
  previous: "Anterior",
  next: "Próximo",
  today: "Hoje",
  month: "Mês",
  week: "Semana",
  day: "Dia",
  agenda: "Agenda",
  date: "Data",
  time: "Hora",
  event: "Evento",
  noEventsInRange: "Nenhum evento neste período.",
  showMore: (total) => `+ Ver mais (${total})`,
};

const formats = {
  dateFormat: "dd", // Exibe o dia do mês (ex: 01, 02)
  dayFormat: (date, culture, localizer) =>
    format(date, "EEEE", { locale: ptBR }), // Exibe o nome completo do dia da semana (ex: segunda-feira)
  weekdayFormat: (date, culture, localizer) =>
    format(date, "EEEE", { locale: ptBR }), // Exibe o nome do dia da semana no cabeçalho (ex: segunda)
  monthHeaderFormat: (date, culture, localizer) =>
    format(date, "MMMM yyyy", { locale: ptBR }), // Exibe o mês e o ano no cabeçalho (ex: Julho 2021)
  dayRangeHeaderFormat: ({ start, end }, culture, localizer) =>
    `${format(start, "dd MMM", { locale: ptBR })} - ${format(end, "dd MMM", {
      locale: ptBR,
    })}`, // Exibe o intervalo de dias
};

const events = [
  {
    title: "Big Meeting",
    paymentStatus: "Pago",
    paymentMethod: "Pix",
    allDay: true,
    hourStart: new Date(2024, 9, 1, 9, 0), // Mês 9 para Outubro
    hourEnd: new Date(2024, 9, 1, 17, 0), // Mês 9 para Outubro
    start: new Date(2024, 9, 1), // Mês 9 para Outubro
    end: new Date(2024, 9, 2), // Mês 9 para Outubro
  },
  {
    title: "Big Meeting 2",
    paymentStatus: "Pendente",
    paymentMethod: "Dinheiro",
    hourStart: new Date(2024, 9, 1, 9, 0), // Mês 9 para Outubro
    hourEnd: new Date(2024, 9, 1, 17, 0), // Mês 9 para Outubro
    start: new Date(2024, 9, 1), // Mês 9 para Outubro
    end: new Date(2024, 9, 2), // Mês 9 para Outubro
  },
  {
    title: "Vacation",
    paymentStatus: "Pago",
    paymentMethod: "Cartão de Crédito",
    hourStart: new Date(2024, 9, 7, 9, 0), // Mês 9 para Outubro
    hourEnd: new Date(2024, 9, 7, 17, 0),
    start: new Date(2024, 9, 7), // Mês 9 para Outubro
    end: new Date(2024, 9, 10), // Mês 9 para Outubro
  },
  {
    title: "Conference",
    paymentStatus: "Pendente",
    paymentMethod: "Pix",
    hourStart: new Date(2024, 9, 1, 9, 0), // Mês 9 para Outubro
    hourEnd: new Date(2024, 9, 1, 17, 0),
    start: new Date(2024, 9, 20), // Mês 9 para Outubro
    end: new Date(2024, 9, 23), // Mês 9 para Outubro
  },
];

function Calendario() {
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [allEvents, setAllEvents] = useState(events);

  function handleAddEvent() {
    for (let i = 0; i < allEvents.length; i++) {
      const d1 = new Date(allEvents[i].start);
      const d2 = new Date(newEvent.start);
      const d3 = new Date(allEvents[i].end);
      const d4 = new Date(newEvent.end);

      if ((d1 <= d2 && d2 <= d3) || (d1 <= d4 && d4 <= d3)) {
        alert("Conflito de Eventos");
        break;
      }
    }
    setAllEvents([...allEvents, newEvent]);
  }

  return (
    <div className="Calendario">
      {/* <h1>Calendar</h1>
            <h2>Add New Event</h2>
            <div>
                <input
                    type="text"
                    placeholder="Add Title"
                    style={{ width: "20%", marginRight: "10px" }}
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                />
                <DatePicker
                    placeholderText="Start Date"
                    style={{ marginRight: "10px" }}
                    selected={newEvent.start}
                    onChange={(start) => setNewEvent({ ...newEvent, start })}
                />
                <DatePicker
                    placeholderText="End Date"
                    selected={newEvent.end}
                    onChange={(end) => setNewEvent({ ...newEvent, end })}
                />
                <button style={{ marginTop: "10px" }} onClick={handleAddEvent}>
                    Add Event
                </button>
            </div> */}
      <Calendar
        messages={messages}
        formats={formats}
        localizer={localizer}
        events={allEvents}
        startAccessor="start"
        endAccessor="end"
        min={new Date(2024, 0, 1, 8, 0)}
        max={new Date(2024, 0, 1, 20, 0)}
        step={30}
        style={{
          height: "90vh",
          width: "79%",
          color: "blue",
          marginTop: "-33px",
          fontSize: "14px",
          fontWeight: 700,
        }}
        components={{
          event: Event,
        }}
        draggableAccessor={(event) => true}
      />
    </div>
  );
}

export default Calendario;
