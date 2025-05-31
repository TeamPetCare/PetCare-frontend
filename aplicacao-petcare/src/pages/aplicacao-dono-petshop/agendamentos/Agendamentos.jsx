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
  getScheduleById,
} from "../../../services/scheduleService";
import { deletePayment, updatePayment } from "../../../services/paymentService";
import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { FiSearch } from "react-icons/fi";
import { FaBackward } from "react-icons/fa";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Estilos do Toastify
import { getFileCsvSchedules } from "../../../services/scheduleService"

import Queue from "../../../services/queue.js";
import Stack from "../../../services/stack";

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
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]); // Dados filtrados


  const handleGenerateReport = async () => {
    try {
      // Chama a função do userService para gerar o relatório
      const blob = await getFileCsvSchedules();

      // Cria uma URL temporária para o arquivo
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;

      // Define o nome do arquivo para download
      link.setAttribute('download', 'relatorio_agendamentos.csv');

      // Adiciona o link ao documento e clica para iniciar o download
      document.body.appendChild(link);
      link.click();

      // Remove o link do documento
      link.parentNode.removeChild(link);
      console.log("Relatório gerado com sucesso!");
      toast.success("Relatório gerado com sucesso!", {
        autoClose: 2500,
        onClick: () => {
          window.location.href = 'http://localhost:3000/dono-petshop/agendamentos';
        }
      });
    } catch (error) {
      console.error("Erro ao gerar o relatório:", error);
      toast.error("Erro ao gerar o relatório.");
    }
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
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
          status: agendamento.payment?.paymentStatus ? "Aprovado" : "Pendente",
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
    const stack = new Stack(10);

    const savedStack = localStorage.getItem("scheduleStack");

    if (savedStack) {
        try {
            const restoredItems = JSON.parse(savedStack);
            restoredItems.forEach((item) => stack.push(item));
        } catch (error) {
            console.error("Erro ao tentar parsear o conteúdo do localStorage:", error);
        }
    }

    for (const agendamento of selectedAgendamentos) {
        try {
            const idPayment = agendamento.pagamento.id;
            await deletePayment(idPayment);

            const id = agendamento.idAgendamento;
            await deleteSchedule(id);

            stack.push({
                "id": id,
                "operation": "delete"
            });

        } catch (error) {
            console.error(
                `Erro ao processar agendamento com ID ${agendamento.idAgendamento}:`,
                error.message
            );
        }
    }

    localStorage.setItem("scheduleStack", JSON.stringify(stack.stack));

    toast.success("Agendamento deletado com sucesso", 900);
    fetchData();
};


  const handlePaymentUpdate = async (updatedData) => {
    setDadosAgendamentos((prevData) =>
      prevData.map((item) =>
        item.id === updatedData.id ? { ...item, ...updatedData } : item
      )
    );

    console.log("UPDATE DATA " + JSON.stringify(updatedData))
    const dataToUpdatePayment = {
      id: updatedData.pagamento.id,
      price: updatedData.pagamento.price,
      paymentDate: updatedData.pagamento.paymentDate,
      paymentId: updatedData.pagamento.paymentId,
      paymentStatus: updatedData.pagamento.status === "Pago" ? "APPROVED" : "PENDING",
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
console.log()
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

  document.addEventListener("DOMContentLoaded", () =>{
     const stack = new Stack(10);

     const savedStack = localStorage.getItem("scheduleStack");
     if (savedStack) {
         // Reinsere os itens na stack
         const restoredItems = JSON.parse(savedStack);
         restoredItems.forEach((item) => stack.push(item));
     }else {
      localStorage.setItem("scheduleStack", JSON.stringify([]));
  }  
  })

  const desfazerAgendamento = async () => {
    const stack = new Stack(10);

    const savedStack = localStorage.getItem("scheduleStack");
    if (savedStack) {
        // Reinsere os itens na stack
        const restoredItems = JSON.parse(savedStack);
        restoredItems.forEach((item) => stack.push(item));
    }

    // Verifica se a pilha está vazia antes de tentar fazer pop
    if (stack.isEmpty()) {
        console.error("A pilha está vazia.");
        return;
    }

    const lastItem = stack.pop();
    const operation = lastItem.operation;

    if (operation === "delete") {
        let schedule;
        try {
            schedule = await getScheduleById(lastItem.id);
        } catch (error) {
            console.error(`Erro ao conseguir agendamento por id: ${error.message}`);
            return;
        }

        schedule.deletedAt = null;

        try {
            await updateSchedule(lastItem.id, schedule);
        } catch (error) {
            console.error(`Erro ao editar agendamento: ${error.message}`);
            return;
        }

        toast.success("Agendamento desfeito com sucesso", 900);

    } else if (operation === "create") {
        id = lastItem.id;
        await deleteSchedule(id);
        toast.success("Agendamento deletado desfeito com sucesso", 900);
    }

    localStorage.setItem("scheduleStack", JSON.stringify(stack.stack));
    fetchData();
    console.log("DESFAZER AGENDAMENTO");
};


  useEffect(() => {
    let dadosFiltrados = [];
    dadosFiltrados = (dadosAgendamentos ?? []).filter(item =>
      (item.cliente?.toLowerCase()?.includes(searchTerm.toLowerCase()) ?? false) || 
      (item.pet.nome?.toLowerCase()?.includes(searchTerm.toLowerCase()) ?? false)
    );
  
    setFilteredData(dadosFiltrados);
  }, [searchTerm, dadosAgendamentos]);
  

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
          onGenerateReport={handleGenerateReport}
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
                value={searchTerm}
                onChange={handleSearchChange}
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
          dados={filteredData}
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