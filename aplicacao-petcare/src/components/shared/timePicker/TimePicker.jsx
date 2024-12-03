import React, { useState } from "react";
import styles from "./TimePicker.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { ptBR } from "date-fns/locale";

const TimePicker = ({ dtInicial, dtFinal, isDisabled, onDateChange }) => {
  const [startDate, setStartDate] = useState(dtInicial);
  const [endDate, setEndDate] = useState(dtFinal);

  const formatDateToCustomISO = (date) => {
    if (!date) return null;

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  };

  const handleDateChange = (dateType, date) => {
    if (dateType === "start") {
      if (endDate && date > endDate) {
        toast.error("A data inicial não pode ser posterior à data final.", { autoClose: 2100 });
        return;
      }
      setStartDate(date);
    } else {
      if (startDate && date < startDate) {
        toast.error("A data final não pode ser anterior à data inicial.", { autoClose: 2100 });
        return;
      }
      setEndDate(date);
    }

    if (onDateChange) {
      onDateChange({
        startDate: formatDateToCustomISO(dateType === "start" ? date : startDate),
        endDate: formatDateToCustomISO(dateType === "end" ? date : endDate),
      });
    }
  };

  return (
    <div
      style={{ display: "flex", gap: "10px", alignItems: "center" }}
      className={styles["container"]}
    >
      <div>
        <label>Data/Hora Inicial*</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => handleDateChange("start", date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          showTimeSelect
          dateFormat="dd/MM/yyyy HH:mm"
          placeholderText="Selecione uma data inicial"
          locale={ptBR}
          disabled={isDisabled}
        />
      </div>

      <div>
        <label>Data/Hora Final*</label>
        <DatePicker
          selected={endDate}
          onChange={(date) => handleDateChange("end", date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          showTimeSelect
          dateFormat="dd/MM/yyyy HH:mm"
          placeholderText="Selecione uma data final"
          locale={ptBR}
          disabled={isDisabled}
        />
      </div>
    </div>
  );
};

export default TimePicker;