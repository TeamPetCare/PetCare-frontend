import { useState, useEffect } from "react";
import { getAllPayments } from "../../../services/paymentService";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Pagamentos = () => {
  const [pagamentosData, setPagamentosData] = useState([]);

  // Função para formatar os dados do gráfico
  function formatChartData(data) {
    const labels = [];
    const prices = [];

    data.forEach((pagamento) => {
      labels.push(new Date(pagamento.paymentDate).toLocaleDateString());  // Adiciona a data no formato "dd/mm/yyyy"
      prices.push(pagamento.price);  // Adiciona o valor do pagamento
    });

    return {
      labels: labels,
      datasets: [
        {
          label: 'Valor dos Pagamentos (R$)',
          data: prices,
          fill: false,  // Desativa o preenchimento sob a linha
          borderColor: '#005472',  // Cor da linha
          tension: 0.1,  // Suaviza a linha
          borderWidth: 2,
          pointBackgroundColor: '#005472', // Cor dos pontos
          pointRadius: 5, // Tamanho dos pontos
        }
      ]
    };
  }

  // Função para recuperar os dados dos pagamentos
  function recuperarPagamentos() {
    getAllPayments()
      .then((response) => {
        const data = response && Array.isArray(response) ? response : [];
        setPagamentosData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    recuperarPagamentos();
  }, []);

  // Dados do gráfico
  const chartData = formatChartData(pagamentosData);

  return (
    <div>
      <h1>PAGAMENTOS</h1>
      <Line
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Gráfico de Pagamentos por Data'
            },
            tooltip: {
              callbacks: {
                label: function(tooltipItem) {
                  return `R$ ${tooltipItem.raw.toFixed(2)}`;
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Valor (R$)'
              }
            },
            x: {
              title: {
                display: true,
                text: 'Data'
              }
            }
          }
        }}
      />
    </div>
  );
};

export default Pagamentos;
