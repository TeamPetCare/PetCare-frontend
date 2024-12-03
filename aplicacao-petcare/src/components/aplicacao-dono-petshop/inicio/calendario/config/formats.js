import format from "date-fns/format";
import ptBR from "date-fns/locale/pt-BR";

export const formats = {
  timeGutterFormat: "HH:mm",
  eventTimeRangeFormat: ({ start, end }) => {
    return `${format(start, "HH:mm", { locale: ptBR })} - ${format(end, "HH:mm", { locale: ptBR })}`;
  },
  agendaTimeRangeFormat: ({ start, end }) => {
    return `${format(start, "HH:mm", { locale: ptBR })} - ${format(end, "HH:mm", { locale: ptBR })}`;
  },
  dayFormat: (date, culture, localizer) => format(date, "dd EEE", { locale: ptBR }),
  weekdayFormat: (date, culture, localizer) => format(date, "EEE", { locale: ptBR }),
  monthHeaderFormat: (date, culture, localizer) => format(date, "MMMM yyyy", { locale: ptBR }),
  weekRangeFormat: ({ start, end }, culture, localizer) => {
    return `${format(start, "dd MMM", { locale: ptBR })} – ${format(end, "dd MMM", { locale: ptBR })}`;
  },
  agendaDateFormat: (date, culture, localizer) => format(date, "EEE dd 'de' MMMM", { locale: ptBR }),
  dayHeaderFormat: (date, culture, localizer) => format(date, "EEE, dd 'de' MMMM", { locale: ptBR }),
  dayRangeHeaderFormat: ({ start, end }, culture, localizer) => {
    return `${format(start, "dd MMMM", { locale: ptBR })} – ${format(end, "dd MMMM", { locale: ptBR })}`;
  },
};