import React, { useState } from "react";
import styles from "./TimePicker.module.css"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ptBR } from "date-fns/locale";

const TimePicker = ({ dtInicial, dtFinal, isDisabled }) => {
  const [startDate, setStartDate] = useState(dtInicial);
  const [endDate, setEndDate] = useState(dtFinal);

  return (
    <div style={{ display: "flex", gap: "10px", alignItems: "center" }} className={styles["container"]}>
      <div>
      <label>Data/Hora Inicial*</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
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
          onChange={(date) => setEndDate(date)}
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
