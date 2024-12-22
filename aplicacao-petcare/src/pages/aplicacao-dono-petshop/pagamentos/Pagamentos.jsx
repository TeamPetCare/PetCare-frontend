import { useState, useEffect } from "react";
import { getAllPayments } from "../../../services/paymentService";
import styles from './Pagamentos.module.css';
import { Line } from 'react-chartjs-2';
import Form from 'react-bootstrap/Form';
import DropDownFilter from "../../../components/shared/dropDownFilter/DropDownFilter";
import UserHeader from "../../../components/aplicacao-dono-petshop/shared/userHeader/UserHeader";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { TrendingUp, DollarSign, Calendar, Activity } from 'lucide-react';
import MainButtonsHeader from "../../../components/aplicacao-dono-petshop/pagamentos/mainButtonsHeader/mainButtonsHeader.jsx";
import { getUserById } from '../../../services/userService';
import { ThreeDot } from "react-loading-indicators";
// import TableRelatorios from "../../../components/aplicacao-dono-petshop/pagamentos/tableRelatorios/TableRelatorios.jsx";
import TableData from "../../../components/aplicacao-dono-petshop/pagamentos/tableData/TableData";
import DropDownFilterChart from "../../../components/aplicacao-dono-petshop/pagamentos/dropDownFilterChart/DropDownFilterChart.jsx"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const Pagamentos = () => {
  const [pagamentosData, setPagamentosData] = useState([]);
  const [pagamentosTableData, setPagamentosTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]); // Dados filtrados
  const [filteredChartData, setFilteredChartData] = useState([]); // Dados filtrados
  const [currentFilter, setCurrentFilter] = useState("Todos"); // Filtro atual
  const [currentFilterChart, setCurrentFilterChart] = useState("Anual"); // Filtro atual

  function formatChartData(data) {
    const labels = [];
    const prices = [];

    const today = new Date(); // Defina a data de hoje aqui

    // Verifica se o filtro é semanal ou mensal, para agrupar os pagamentos.
    if (currentFilterChart === "Semanal") {
      const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
      const weekData = new Array(7).fill(0); // Array para armazenar os valores dos 7 dias da semana

      data.forEach((pagamento) => {
        const pagamentoDate = new Date(pagamento.paymentDate);
        const dayOfWeek = pagamentoDate.getDay();
        weekData[dayOfWeek] += pagamento.price;
      });

      weekData.forEach((total, index) => {
        labels.push(weekDays[index]);
        prices.push(total);
      });
    } else if (currentFilterChart === "Mensal") {
      const monthData = new Array(4).fill(0); // Assumindo 4 semanas no mês

      data.forEach((pagamento) => {
        const pagamentoDate = new Date(pagamento.paymentDate);
        const weekNumber = Math.floor(pagamentoDate.getDate() / 7); // Determina a semana do mês
        monthData[weekNumber] += pagamento.price;
      });

      monthData.forEach((total, index) => {
        labels.push(`Semana ${index + 1}`);
        prices.push(total);
      });
    } else if (currentFilterChart === "Anual") {
      const yearData = new Array(12).fill(0); // 12 meses no ano
      const monthInitials = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

      data.forEach((pagamento) => {
        const pagamentoDate = new Date(pagamento.paymentDate);
        const month = pagamentoDate.getMonth(); // Obtém o índice do mês (0 a 11)
        yearData[month] += pagamento.price;
      });

      yearData.forEach((total, index) => {
        labels.push(monthInitials[index]); // Adiciona as iniciais do mês ao invés de números
        prices.push(total);
      });
    }
    else if (currentFilterChart === "Hoje") {
      const todayPayments = data.filter((pagamento) => {
        const pagamentoDate = new Date(pagamento.paymentDate);
        return pagamentoDate.toLocaleDateString('pt-BR') === today.toLocaleDateString('pt-BR');
      });

      todayPayments.forEach((pagamento) => {
        labels.push(new Date(pagamento.paymentDate).toLocaleTimeString('pt-BR'));
        prices.push(pagamento.price);
      });
    } else {
      // Para "Todos", exibe todas as transações no gráfico.
      data.forEach((pagamento) => {
        labels.push(new Date(pagamento.paymentDate).toLocaleDateString('pt-BR'));
        prices.push(pagamento.price);
      });
    }

    return {
      labels,
      datasets: [
        {
          label: 'Valor dos Pagamentos',
          data: prices,
          fill: true,
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          borderColor: '#005472',
          tension: 0.4,
          borderWidth: 3,
          pointBackgroundColor: '#005472',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 6,
          pointHoverRadius: 8,
          pointHoverBackgroundColor: '#005472',
          pointHoverBorderColor: '#fff',
          pointHoverBorderWidth: 2,
        }
      ]
    };
  }




  function recuperarPagamentos() {
    setIsLoading(true);
    getAllPayments()
      .then((response) => {
        const data = response && Array.isArray(response) ? response : [];
        setPagamentosData(data);
        console.log(data)
      })
      .catch((error) => {
        console.error('Erro ao carregar pagamentos:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }


  function recuperarPagamentosTable() {
    setIsLoading(true);

    getAllPayments()
      .then(async (response) => {
        const data = response && Array.isArray(response) ? response : [];

        // Mapeia os pagamentos e cria uma lista de IDs de usuários
        const userIds = [...new Set(data.map((pagamento) => pagamento.userId))];

        // Recupera todos os usuários de uma vez
        const users = await Promise.all(
          userIds.map((userId) => getUserById(userId).catch(() => null)) // Tratar erros individualmente
        );

        // Cria um mapa de usuários para acesso rápido
        const userMap = users.reduce((acc, user, index) => {
          if (user) {
            acc[userIds[index]] = user;
          } else {
            acc[userIds[index]] = { name: "N/A", cellphone: "N/A" }; // Usuário não encontrado
          }
          return acc;
        }, {});

        // Mapeia os pagamentos e adiciona as informações do usuário
        const pagamentosComDetalhes = data.map((pagamento) => {
          const user = userMap[pagamento.userId]; // Obtém o usuário usando o mapa

          return {
            paymentId: pagamento.paymentId,
            userName: user.name, // Nome do usuário
            paymentMethod: pagamento.paymentMethod,
            paymentStatus: pagamento.paymentStatus ? "Concluído" : "Cancelado",
            paymentDate: new Date(pagamento.paymentDate).toLocaleString(), // Formata a data
            userCellphone: user.cellphone, // Telefone do usuário
            price: pagamento.price.toFixed(2), // Formata o valor
          };
        });

        // Atualiza o estado com os pagamentos completos
        setPagamentosTableData(pagamentosComDetalhes);
        setFilteredData(pagamentosComDetalhes);
        console.log(pagamentosComDetalhes); // Verifica o formato final
      })
      .catch((error) => {
        console.error("Erro ao carregar pagamentos:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }




  useEffect(() => {
    recuperarPagamentos();
    recuperarPagamentosTable()
  }, []);

  useEffect(() => {
    // Chama a função de filtro ao carregar os dados
    handleFilterChange(currentFilter); // Usa o filtro atual
  }, [pagamentosData]); // Executa quando os dados são carregados

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const chartData = formatChartData(pagamentosData);

  const totalAmount = pagamentosData.reduce((sum, payment) => sum + parseFloat(payment.price), 0);

  const averageAmount = pagamentosData.length > 0
    ? totalAmount / pagamentosData.filter(p => !isNaN(p.price)).length
    : 0;


  const filterOptions = [
    { label: "Concluídos" },
    { label: "Todos" },
    { label: "Cancelados" },
  ];

  const filterOptionsChart = [
    { label: "Anual" },
    { label: "Mensal" },
    { label: "Semanal" },
    { label: "Hoje" },
  ];

  const handleFilterChange = (filter) => {
    setCurrentFilter(filter); // Atualiza o filtro atual
    // Filtra os dados com base no filtro selecionado
    if (filter === "Todos") {
      setFilteredData(pagamentosTableData); // Exibe todos os pagamentos
    } else if (filter === "Concluídos") {
      setFilteredData(pagamentosTableData.filter((pagamento) => pagamento.paymentStatus === "Concluído")); // Somente pagamentos concluídos
    } else if (filter === "Cancelados") {
      setFilteredData(pagamentosTableData.filter((pagamento) => pagamento.paymentStatus === "Cancelado")); // Somente pagamentos cancelados
    }
  };

  const handleFilterChangeChart = (filter) => {
    const today = new Date(); // Defina a data de hoje aqui

    setCurrentFilterChart(filter); // Atualiza o filtro atual

    let filteredPagamentos = pagamentosData; // Use os dados de pagamento para o filtro no gráfico

    switch (filter) {
      case "Hoje":
        filteredPagamentos = pagamentosData.filter((pagamento) => {
          const pagamentoDate = new Date(pagamento.paymentDate);
          return pagamentoDate.toLocaleDateString('pt-BR') === today.toLocaleDateString('pt-BR');
        });
        break;
      case "Semanal":
        const weekStart = new Date(today.setDate(today.getDate() - today.getDay())); // Começo da semana
        const weekEnd = new Date(today.setDate(today.getDate() + 6)); // Final da semana
        filteredPagamentos = pagamentosData.filter((pagamento) => {
          const pagamentoDate = new Date(pagamento.paymentDate);
          return pagamentoDate >= weekStart && pagamentoDate <= weekEnd;
        });
        break;
      case "Mensal":
        filteredPagamentos = pagamentosData.filter((pagamento) => {
          const pagamentoDate = new Date(pagamento.paymentDate);
          return pagamentoDate.getMonth() === today.getMonth() && pagamentoDate.getFullYear() === today.getFullYear();
        });
        break;
      case "Anual":
        filteredPagamentos = pagamentosData.filter((pagamento) => {
          const pagamentoDate = new Date(pagamento.paymentDate);
          return pagamentoDate.getFullYear() === today.getFullYear();
        });
        break;
      case "Todos":
        filteredPagamentos = pagamentosData; // Exibe todos os pagamentos
        break;
      default:
        break;
    }

    // Atualiza os dados filtrados do gráfico
    setFilteredChartData(filteredPagamentos);
  };





  const handleGenerateReport = async () => {
    try {
      // Chama a função do userService para gerar o relatório
      const blob = await userService.getFileCsvCustomerAndPets();

      // Cria uma URL temporária para o arquivo
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;

      // Define o nome do arquivo para download
      link.setAttribute('download', 'relatorio_clientes_pets.csv');

      // Adiciona o link ao documento e clica para iniciar o download
      document.body.appendChild(link);
      link.click();

      // Remove o link do documento
      link.parentNode.removeChild(link);
      console.log("Relatório gerado com sucesso!");
      toast.success("Relatório gerado com sucesso!", {
        autoClose: 2500,
        onClick: () => {
          window.location.href = 'http://localhost:3000/dono-petshop/clientes-pets';
        }
      });
    } catch (error) {
      console.error("Erro ao gerar o relatório:", error);
      toast.error("Erro ao gerar o relatório.");
    }
  };

  useEffect(() => {
    // Filtra os dados com base no termo de pesquisa e no filtro atual
    let dadosFiltrados = (pagamentosTableData ?? []).filter((item) => {
      const clienteInclui = item.userName?.toLowerCase().includes(searchTerm.toLowerCase());
      const petInclui = item.userCellphone?.toLowerCase().includes(searchTerm.toLowerCase());
      const filtroAtivo =
        currentFilter === "Todos" ||
        (currentFilter === "Concluídos" && item.paymentStatus === "Concluído") ||
        (currentFilter === "Cancelados" && item.paymentStatus === "Cancelado");

      return (clienteInclui || petInclui) && filtroAtivo;
    });

    setFilteredData(dadosFiltrados);
  }, [searchTerm, currentFilter, pagamentosTableData]); // Executa sempre que searchTerm ou filtros mudarem

  const columnPayments = {
    paymentId: "ID Transação",
    userName: "Cliente",
    paymentMethod: "Pagamento",
    paymentStatus: "Status",
    paymentDate: "Data/Hora",
    userCellphone: "WhatsApp",
    price: "Valor - R$"
  };

  const sortableColumnsPayments = [
    "paymentStatus",
    "paymentDate",
    "price"
  ];


  return (
    <>
      <div className={styles["header-container2"]}>
        <DropDownFilterChart options={filterOptionsChart} onFilterChange={handleFilterChangeChart} />
        <MainButtonsHeader onGenerateReport={handleGenerateReport} />
        <UserHeader />
      </div>

      <div className={`${styles["container"]} min-h-screen bg-gray-50 p-8`}>
        <div className="max-w-7xl mx-auto">
          <div className={styles["container-kpis"]}>
            <div className="bg-white rounded-xl ">
              <div className="flex items-center gap-4">
                <div style={{paddingBottom: "15px"}}>
                  <p className={styles["texto-receita-distribuicao"]}>Receita - Distribuição</p>
                  <p className={styles["valor-receita-distribuicao"]}>
                    R$ {totalAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl ">
              <div className="flex items-center gap-4">
                <div style={{paddingBottom: "15px"}}>
                  <p className={styles["texto-media-pagamentos"]}>Média por Pagamentos</p>
                  <p className={styles["valor-media-pagamentos"]}>
                    R$ {averageAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl ">
              <div className="flex items-center gap-4">
                <div style={{paddingBottom: "15px"}}>
                  <p className={styles["texto-total-transacoes"]}>Total de Transações</p>
                  <p className={styles["valor-total-transacoes"]}>{pagamentosData.length}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            {isLoading ? (
              <div className="flex items-center justify-center h-[250px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <Line
                data={chartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false
                    },
                    tooltip: {
                      backgroundColor: 'rgba(17, 24, 39, 0.9)',
                      titleFont: {
                        size: 13,
                        weight: '600'
                      },
                      bodyFont: {
                        size: 12
                      },
                      padding: 12,
                      cornerRadius: 8,
                      callbacks: {
                        label: function (context) {
                          return `R$ ${context.raw.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
                        }
                      }
                    }
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      grid: {
                        color: 'rgba(0, 0, 0, 0.05)',
                        drawBorder: false
                      },
                      ticks: {
                        callback: (value) => `R$ ${value.toLocaleString('pt-BR')}`,
                        font: {
                          size: 12
                        }
                      }
                    },
                    x: {
                      grid: {
                        display: false
                      },
                      ticks: {
                        font: {
                          size: 12
                        }
                      }
                    }
                  }
                }}
                height={250}
              />
            )}
          </div>
        </div>
        <div className={styles["header-container"]}>
          <div className={styles["container-searchBar"]}>
            <Form onSubmit={(e) => e.preventDefault()}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Control
                  type="input"
                  placeholder="Procurar por Cliente"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </Form.Group>
            </Form>
          </div>
          <p style={{ fontSize: '15px' }}>Filtrar por Status:</p>
          <DropDownFilter options={filterOptions} onFilterChange={handleFilterChange} />
        </div>
        {loading ? (
          <div className={styles["loading-container"]}>
            <ThreeDot variant="bounce" color="#005472" size="small" />
          </div>
        ) : (
          <TableData
            filtro={currentFilter}
            dados={filteredData}
            columnNames={columnPayments}
            sortableColumns={sortableColumnsPayments}
          />
        )}
      </div>
    </>
  );
};

export default Pagamentos;