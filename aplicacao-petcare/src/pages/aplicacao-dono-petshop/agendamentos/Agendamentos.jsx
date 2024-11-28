import styles from "./Agendamentos.module.css";
import { ThreeDot } from "react-loading-indicators";
import MainButtonsHeader from "../../../components/aplicacao-dono-petshop/agendamentos/mainButtonsHeader/mainButtonsHeader";
import UserHeader from "../../../components/aplicacao-dono-petshop/shared/userHeader/UserHeader";
import DropDownFilter from "../../../components/shared/dropDownFilter/DropDownFilter";
import TableData from "../../../components/aplicacao-dono-petshop/agendamentos/tableData/TableData";
import { getAllSchedules } from "../../../services/scheduleService";
import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { FiSearch } from "react-icons/fi";

const Agendamentos = () => {
  const [dadosAgendamentos, setDadosAgendamentos] = useState([]); // Inicial como array vazio
  const [loading, setLoading] = useState(false);
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const formattedMonth = firstDayOfMonth.toISOString().slice(0, 7); // Formato YYYY-MM
  const [currentMonth, setCurrentMonth] = useState(formattedMonth);

  const columnNamesAgendamentos = {
    dataHora: "Data/Hora",
    status: "Status",
    servico: "Serviço",
    pet: "Pet",
    whatsapp: "Whatsapp",
    pagamento: "Pagamento",
    observacoes: "Observações",
  };

  const sortableColumnsAgendamentos = ["dataHora", "status"];

  const safeReplace = (value) => {
    return value ? value.replace(/\s+/g, " ") : "";
  };

  const formatDateTime = (date, time) => {
    const optionsDate = { day: "2-digit", month: "2-digit", year: "numeric" };
    const formattedDate = new Date(date).toLocaleDateString(
      "pt-BR",
      optionsDate
    );
    const formattedTime = time ? `${time.slice(0, 5)}h` : "-";
    return { formattedDate, formattedTime };
  };

  const formatData = (dados) => {
    return dados.map((agendamento) => {
      const formatarDataEHorario = (dataCompleta, horarioDuracao) => {
        const dataInicial = new Date(dataCompleta);

        const dia = String(dataInicial.getDate()).padStart(2, "0");
        const mes = String(dataInicial.getMonth() + 1).padStart(2, "0"); // Mês começa em 0
        const ano = dataInicial.getFullYear();
        const dataFormatada = `${dia}/${mes}/${ano}`;

        const [horasDuracao, minutosDuracao, segundosDuracao] = horarioDuracao
          .split(":")
          .map(Number);

        const horaInicial = String(dataInicial.getHours()).padStart(2, "0");
        const minutoInicial = String(dataInicial.getMinutes()).padStart(2, "0");

        dataInicial.setHours(dataInicial.getHours() + horasDuracao);
        dataInicial.setMinutes(dataInicial.getMinutes() + minutosDuracao);
        dataInicial.setSeconds(dataInicial.getSeconds() + segundosDuracao);

        const horaFinal = String(dataInicial.getHours()).padStart(2, "0");
        const minutoFinal = String(dataInicial.getMinutes()).padStart(2, "0");

        return {
          data: dataFormatada,
          intervalo: `${horaInicial}:${minutoInicial}-${horaFinal}:${minutoFinal}`,
        };
      };

      const horarioFormatado = formatarDataEHorario(
        agendamento.scheduleDate,
        agendamento.scheduleTime
      );

      const servicos = agendamento.services
        .map((service) => safeReplace(service.name))
        .join(", ");
      const whatsapp = agendamento.pet?.user?.cellphone || null;
      return {
        dataHora: {
          data: horarioFormatado.data,
          horario: horarioFormatado.intervalo,
        },
        status: agendamento.scheduleStatus,
        servico: servicos,
        pet: {
          nome: agendamento.pet?.name ? safeReplace(agendamento.pet?.name) : "",
          ftPet: agendamento.pet?.petImg,
        },
        whatsapp: whatsapp,
        pagamento: agendamento.payment.paymentMethod,
        observacoes: agendamento.scheduleNote,
      };
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getAllSchedules(currentMonth);

        if (Array.isArray(response)) {
          const formattedData = formatData(response);
          setDadosAgendamentos(formattedData);
        } else {
          console.warn("Formato inesperado de dados:", response);
          setDadosAgendamentos([]);
        }
      } catch (error) {
        console.error("Erro ao buscar agendamentos", error);
        setDadosAgendamentos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentMonth]);

  return (
    <div>
      <div className={styles["header-container"]}>
        <DropDownFilter
          options={[
            { label: "Hoje" },
            { label: "Últimos 7 dias" },
            { label: "Últimos 30 dias" },
            { label: "Tudo" },
            { label: "Data personalizada" },
          ]}
        />
        <MainButtonsHeader />
        <UserHeader />
      </div>
      <div className={styles["container-searchBar"]}>
        <Form
          onSubmit={(e) => e.preventDefault()}
          className={styles["container-form"]}
        >
          <Form.Group
            className="mb-3 position-relative"
            controlId="searchInput"
          >
            <div className={styles["input-icon-wrapper"]}>
              <FiSearch className={styles["search-icon"]} />
              <Form.Control
                className={styles["form-control-input"]}
                type="text"
                placeholder="Procurar por Cliente ou Pet"
              />
            </div>
          </Form.Group>
        </Form>
      </div>
      {loading ? (
        <div className={styles["loading-container"]}>
          <ThreeDot variant="bounce" color="#005472" size="small" />
        </div>
      ) : dadosAgendamentos.length > 0 ? (
        <TableData
          dados={dadosAgendamentos}
          columnNames={columnNamesAgendamentos}
          sortableColumns={sortableColumnsAgendamentos}
        />
      ) : (
        <div>Nenhum dado encontrado para exibir.</div>
      )}
    </div>
  );
};

export default Agendamentos;
