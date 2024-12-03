import styles from "./Agendamentos.module.css";
import { ThreeDot } from "react-loading-indicators";
import ModalAddAgendamento from "../../../components/aplicacao-dono-petshop/agendamentos/modalAddAgendamento/ModalAddAgendamento";
import MainButtonsHeader from "../../../components/aplicacao-dono-petshop/agendamentos/mainButtonsHeader/mainButtonsHeader";
import UserHeader from "../../../components/aplicacao-dono-petshop/shared/userHeader/UserHeader";
import DropDownFilter from "../../../components/shared/dropDownFilter/DropDownFilter";
import TableData from "../../../components/aplicacao-dono-petshop/agendamentos/tableData/TableData";
import {
  getAllSchedulesMonthly,
  getAllSchedules,
  deleteSchedule,
  updateSchedule,
} from "../../../services/scheduleService";
import { deletePayment, updatePayment } from "../../../services/paymentService";
import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { FiSearch } from "react-icons/fi";
import { FaBackward } from "react-icons/fa";
import { toast } from "react-toastify";

const Agendamentos = () => {
  const [dadosAgendamentos, setDadosAgendamentos] = useState([]); // Inicial como array vazio
  const [loading, setLoading] = useState(false);
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const formattedMonth = firstDayOfMonth.toISOString().slice(0, 7); // Formato YYYY-MM
  const [currentMonth, setCurrentMonth] = useState(formattedMonth);
  const [filter, setFilter] = useState("Tudo");
  const [showModalAgendamento, setShowModalAgendamento] = useState(false);
  const [selectedAgendamentos, setSelectedAgendamentos] = useState([]);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const columnNamesAgendamentos = {
    dataHora: "Data/Hora",
    status: "Status",
    servico: "Serviço",
    pet: "Pet",
    whatsapp: "Whatsapp",
    pagamento: "Pagamento",
    observacoes: "Observações",
  };

  const sortableColumnsAgendamentos = ["dataHora"];

  const safeReplace = (value) => {
    return value ? value.replace(/\s+/g, " ") : "";
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

      const servicos = agendamento.serviceNames.join(", ");

      const whatsapp = agendamento.userCelphoneNumber || null;
      return {
        idAgendamento: agendamento.id,
        idServices: agendamento.serviceIds,
        idPet: agendamento.petId,
        scheduleDate: agendamento.scheduleDate,
        scheduleTime: agendamento.scheduleTime,
        creationDate: agendamento.creationDate,
        dataHora: {
          data: horarioFormatado.data,
          horario: horarioFormatado.intervalo,
        },
        status: agendamento.scheduleStatus,
        servico: servicos,
        pet: {
          nome: agendamento.petName ? agendamento.petName : "",
          ftPet: agendamento.petImg,
          clienteId: agendamento.pet?.user?.id,
        },
        whatsapp: whatsapp,
        pagamento: {
          id: agendamento.payment?.id,
          metodo: agendamento.payment?.paymentMethod,
          status: agendamento.payment?.paymentStatus ? "Pago" : "Pendente",
          paymentDate: agendamento.payment?.paymentDate,
          paymentId: agendamento.payment?.paymentId,
          price: agendamento.payment?.price,
        },
        observacoes: agendamento.scheduleNote,
      };
    });
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await getAllSchedules();

      const filteredData = applyFilter(response, filter);

      const formattedData = formatData(filteredData);
      setDadosAgendamentos(formattedData);
    } catch (error) {
      console.error("Erro ao buscar agendamentos", error);
      setDadosAgendamentos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentMonth, filter]);

  const applyFilter = (dados, filter) => {
    const today = new Date();
    const resetTime = (date) => {
      const resetDate = new Date(date);
      resetDate.setHours(0, 0, 0, 0);
      return resetDate;
    };

    switch (filter) {
      case "Hoje":
        return dados.filter((agendamento) => {
          const agendamentoDate = new Date(agendamento.scheduleDate);
          return (
            resetTime(agendamentoDate).getTime() === resetTime(today).getTime()
          );
        });
      case "Últimos 7 dias":
        const sevenDaysAgo = new Date(today);
        sevenDaysAgo.setDate(today.getDate() - 7);
        return dados.filter((agendamento) => {
          const agendamentoDate = new Date(agendamento.scheduleDate);
          return (
            resetTime(agendamentoDate).getTime() >=
              resetTime(sevenDaysAgo).getTime() &&
            resetTime(agendamentoDate).getTime() <= resetTime(today).getTime()
          );
        });
      case "Últimos 30 dias":
        const thirtyDaysAgo = new Date(today);
        thirtyDaysAgo.setDate(today.getDate() - 30); // Esta linha deve funcionar corretamente
        return dados.filter((agendamento) => {
          const agendamentoDate = new Date(agendamento.scheduleDate);
          return (
            resetTime(agendamentoDate).getTime() >=
              resetTime(thirtyDaysAgo).getTime() &&
            resetTime(agendamentoDate).getTime() <= resetTime(today).getTime()
          );
        });
      case "Tudo":
        return dados;
      case "Data personalizada":
        return dados;
      default:
        return dados;
    }
  };

  const onCreateAgendamento = () => {
    setShowModalAgendamento(true);
  };

  const onDeleteAgendamento = async () => {
    for (const agendamento of selectedAgendamentos) {
      try {
        const idPayment = agendamento.pagamento.id;
        await deletePayment(idPayment);

        const id = agendamento.idAgendamento;
        await deleteSchedule(id);
      } catch (error) {
        console.error(
          `Erro ao processar agendamento com ID ${id}:`,
          error.message
        );
      }
    }

    toast.success("Agendamento deletado com sucesso", 900);
    fetchData();
  };

  const handlePaymentUpdate = async (updatedData) => {
    setDadosAgendamentos((prevData) =>
      prevData.map((item) =>
        item.id === updatedData.id ? { ...item, ...updatedData } : item
      )
    );

    const dataToUpdatePayment = {
      id: updatedData.pagamento.id,
      price: updatedData.pagamento.price,
      paymentDate: updatedData.pagamento.paymentDate,
      paymentId: updatedData.pagamento.paymentId,
      paymentStatus: updatedData.pagamento.status === "Pago" ? true : false,
      paymentMethod: updatedData.pagamento.metodo,
      userId: 13,
    };

    try {
      await updatePayment(dataToUpdatePayment.id, dataToUpdatePayment);
    } catch (error) {
      console.error(`Erro ao editar pagamento`, error.message);
    }

    toast.success("Pagamento editado com sucesso", 900);
    fetchData();
  };

  const handleStatusUpdate = async (updatedData) => {
    setDadosAgendamentos((prevData) =>
      prevData.map((item) =>
        item.id === updatedData.id ? { ...item, ...updatedData } : item
      )
    );

    const dataToUpdateSchedule = {
      id: updatedData.idAgendamento,
      scheduleStatus: updatedData.status
        .toUpperCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, ""),
      scheduleDate: updatedData.scheduleDate,
      scheduleTime: updatedData.scheduleTime,
      creationDate: updatedData.creationDate,
      scheduleNote: updatedData.observacoes,
      petId: updatedData.idPet,
      paymentId: updatedData.pagamento.id,
      serviceIds: updatedData.idServices,
      employeeId: 13,
    };

    try {
      await updateSchedule(dataToUpdateSchedule.id, dataToUpdateSchedule);
    } catch (error) {
      console.error(`Erro ao editar agendamento`, error.message);
    }

    toast.success("Agendamento editado com sucesso", 900);
    fetchData();
  };

  const desfazerAgendamento = () => {
    console.log("DESFAZER AGENDAMENTO")
  }

  return (
    <div>
      <div className={styles["header-container"]}>
        <DropDownFilter
          options={[
            { label: "Tudo" },
            { label: "Hoje" },
            { label: "Últimos 7 dias" },
            { label: "Últimos 30 dias" },
          ]}
          onFilterChange={handleFilterChange}
        />
        <MainButtonsHeader
          onCreateAgendamento={onCreateAgendamento}
          onDeleteAgendamento={onDeleteAgendamento}
        />
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
            <button className={`${styles["custom-btn"]} ${styles["create"]}`} onClick={desfazerAgendamento}>
              <FaBackward /> Desfazer último agendamento
            </button>
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
          onSelectedRowsChange={(rows) => setSelectedAgendamentos(rows)}
          onPaymentUpdate={handlePaymentUpdate}
          onStatusUpdate={handleStatusUpdate} // Adicione isso
        />
      ) : (
        <div>Nenhum dado encontrado para exibir.</div>
      )}

      {showModalAgendamento ? (
        <ModalAddAgendamento
          show={showModalAgendamento}
          handleClose={() => setShowModalAgendamento(false)}
          dados={dadosAgendamentos}
          fetchData={fetchData}
        />
      ) : null}
    </div>
  );
};

export default Agendamentos;
