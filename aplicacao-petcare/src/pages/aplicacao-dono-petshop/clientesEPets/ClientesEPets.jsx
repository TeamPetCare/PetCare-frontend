import React, { useState, useEffect } from 'react';
import userService from "../../../services/userService";
import petService from "../../../services/petService";
import TableData from "../../../components/aplicacao-dono-petshop/clientesEPets/tableData/TableData";
import UserHeader from "../../../components/aplicacao-dono-petshop/shared/userHeader/UserHeader";
import DropDownFilter from "../../../components/shared/dropDownFilter/DropDownFilter";
import MainButtonsHeader from "../../../components/aplicacao-dono-petshop/clientesEPets/mainButtonsHeader/mainButtonsHeader";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styles from "./ClientesEPets.module.css";
import ModalWrapper from "../../../components/aplicacao-dono-petshop/clientesEPets/cadastroCliente/ModalWrapper";
import ModalDelete from "../../../components/aplicacao-dono-petshop/clientesEPets/modal/ModalDelete"
import ModalPut from "../../../components/aplicacao-dono-petshop/clientesEPets/modal/ModalPut"
import { toast, ToastContainer } from 'react-toastify'; // Importando ToastContainer e toast
import 'react-toastify/dist/ReactToastify.css'; // Estilos do Toastify
// import { RiWhatsappFill } from "react-icons/ri";
import { useSelectedData } from "./SelectedDataContext";
import { ThreeDot } from "react-loading-indicators"; 
import ClientModal from '../../../components/aplicacao-dono-petshop/clientesEPets/cadastros/ClientModal';
import PlanModal from '../../../components/aplicacao-dono-petshop/clientesEPets/cadastros/PlanModal';
import PetModal from '../../../components/aplicacao-dono-petshop/clientesEPets/cadastros/PetModal';
import { getAllCustomerAndPets } from '../../../services/userService';

const ClientesEPets = () => {
  const [clientesData, setclientesData] = useState([]);
  const [petsData, setPetsData] = useState([]);
  const [clientesEPetsData, setclientesEPetsData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // Dados filtrados
  const [searchTerm, setSearchTerm] = useState('');
  const [currentFilter, setCurrentFilter] = useState("Clientes"); // Filtro atual
  const { selectedData } = useSelectedData() || {};
  const [loading, setLoading] = useState(false);

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

  async function deletarClientes() {
    if (selectedData && selectedData.length > 0) {
      try {
        const response = await userService.deleteCustomers(selectedData);
        console.log("Cliente(s) deletado(s) com sucesso:", response);
        toast.success("Cliente(s) deletado(s) com sucesso!", {
          autoClose: 2500,
          onClick: () => {
            window.location.href = 'http://localhost:3000/dono-petshop/clientes-pets';
          }
        });
        recuperarValorClientes()
      } catch (error) {
        console.error("Erro ao deletar cliente(s):", error);
        
      }
    } else {
      console.log("Nenhum cliente selecionado para deletar.");
      toast.error("Nenhum cliente selecionado para deletar.");
    }
  }

  async function deletarPets() {
    if (selectedData && selectedData.length > 0) {
      try {
        const response = await userService.deletePet(selectedData);
        console.log("Pet(s) deletado(s) com sucesso:", response);
        toast.success("Pet(s) deletado(s) com sucesso!", {
          autoClose: 2500,
          onClick: () => {
            window.location.href = 'http://localhost:3000/dono-petshop/clientes-pets';
          }
        });
        recuperarValorClientes()
      } catch (error) {
        console.error("Erro ao deletar pet(s):", error);
        toast.error("Erro ao deletar pet(s)");
      }
    } else {
      console.log("Nenhum cliente selecionado para deletar.");
      toast.error("Nenhum cliente selecionado para deletar.");
    }
  }



  useEffect(() => {
    console.log("Dados selecionados:", selectedData);
    // Aqui você pode renderizar os dados transferidos ou fazer o que precisar
  }, [selectedData])

  // Funções para recuperar os dados
  function recuperarValorClientes() {
    setLoading(true); // Ativa o loading antes de iniciar a requisição
    getAllCustomerAndPets()
      .then((response) => {
        const data = Array.isArray(response) ? response : [response];
        const clientesFormatados = data.map(cliente => ({
          id: cliente.id,
          cliente: cliente.name,
          whatsapp: cliente.cellphone,
          rua: cliente.street,
          numero: cliente.number,
          bairro: cliente.district,
          complemento: cliente.complement,
          numero_de_pets: cliente.pet.length,
          dt_ultimo_agendamento: new Date(cliente.lastSchedule).toLocaleDateString('pt-BR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          }),
          total_agendamentos: cliente.totalSchedules,
        }));
        setclientesData(clientesFormatados);
        setLoading(false); // Desativa o loading após a resposta
      })
      .catch((error) => {
        console.log(error);
        setLoading(false); // Desativa o loading em caso de erro
      });
  }

  // "lastSchedule": "2024-11-15T15:00:00",
	// 	"totalSchedules": 8

  function recuperarValorPets() {
    getAllCustomerAndPets()
      .then((response) => {
        const data = Array.isArray(response) ? response : [response];
        const petsFormatados = data.flatMap(cliente =>
          cliente.pet.map(pet => ({
            id: pet.id,
            pet: pet.name,
            especie: pet.specie.name,
            sexo: pet.gender,
            raça: pet.race.raceType,
            dt_nascimento: new Date(pet.birthdate).toLocaleDateString('pt-BR', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit'
            }),
            porte: pet.size.sizeType,
            peso_estimado: pet.estimatedWeight,
            cor: pet.color,
            dono: cliente.name,
            dt_ultimo_agendamento: new Date(pet.lastSchedule).toLocaleDateString('pt-BR', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit'
            }),
            total_agendamentos: pet.totalSchedules,
            observacoes: pet.petObservations,
            plano: pet.plan.planType.name
          }))
        );
        setPetsData(petsFormatados);
        setLoading(false); // Desativa o loading após a resposta
      })
      .catch((error) => {
        console.log(error);
        setLoading(false); // Desativa o loading em caso de erro
      });
  }

  function recuperarValorClientesEPets() {
    getAllCustomerAndPets()
      .then((response) => {
        const data = Array.isArray(response) ? response : [response];
        const clientesEPetsFormatados = data.flatMap(cliente => {
          const clienteBase = {
            id: cliente.id,
            cliente: cliente.name,
            whatsapp: cliente.cellphone,
            endereco: `${cliente.street}, ${cliente.number}, ${cliente.district}, ${cliente.complement}`,
            numero_de_pets: cliente.pet.length,
          };
          return cliente.pet.map(pet => ({
            ...clienteBase,
            pet: pet.name,
            raça: pet.race.raceType,
            dt_nascimento: new Date(pet.birthdate).toLocaleDateString('pt-BR', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit'
            }),
            porte: pet.size.sizeType,
            observacoes: pet.petObservations,
            plano: pet.plan.planType.name
          }));
        });
        setclientesEPetsData(clientesEPetsFormatados);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    recuperarValorClientes();
    recuperarValorPets();
    recuperarValorClientesEPets();
  }, []);

  useEffect(() => {
    // Chama a função de filtro ao carregar os dados
    handleFilterChange(currentFilter); // Usa o filtro atual
  }, [clientesData, petsData, clientesEPetsData]); // Executa quando os dados são carregados

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    // Filtra os dados com base no termo de pesquisa e no filtro atual
    let dadosFiltrados = [];
    if (currentFilter === "Clientes") {

      dadosFiltrados = (clientesData ?? []).filter(cliente =>
        cliente.cliente.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else if (currentFilter === "Pets") {
      dadosFiltrados = (petsData ?? []).filter(pet =>
        pet.pet.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else if (currentFilter === "Clientes & Pets") {
      dadosFiltrados = (clientesEPetsData ?? []).filter(item =>
        item.cliente.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.pet.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredData(dadosFiltrados);
  }, [searchTerm, currentFilter, clientesData, petsData, clientesEPetsData]);

  const columnNamesClientesEPets = {
    cliente: "Cliente",
    whatsapp: "WhatsApp",
    endereco: "Endereço",
    numero_de_pets: "Número de Pets",
    pet: "Pet",
    raça: "Raça",
    dt_nascimento: "Nascimento (Estimado)",
    porte: "Porte",
    observacoes: "Observações",
    plano: "Plano"
  };

  const sortableColumnsClientesEPets = [
    "numero_de_pets",
    "dt_nascimento"
  ];

  const columnNamesClientes = {
    cliente: "Cliente",
    whatsapp: "WhatsApp",
    rua: "Rua",
    numero: "Nº Rua",
    bairro: "Bairro",
    complemento: "Complemento",
    numero_de_pets: "Número de Pets",
    dt_ultimo_agendamento: "Último Agendamento",
    total_agendamentos: "Total Agendamentos "
  };

  const sortableColumnsClientes = [
    "numero_de_pets",
    "dt_ultimo_agendamento",
    "total_agendamentos"
  ];

  const columnNamesPets = {
    pet: "Pet",
    especie: "Espécie",
    sexo: "Sexo",
    raça: "Raça",
    dt_nascimento: "Nasc. (Estimado)",
    porte: "Porte",
    peso_estimado: "Peso.KG (Estimado)",
    cor: "Cor",
    dono: "Dono",
    observacoes: "Observações",
    dt_ultimo_agendamento: "Último Agend.",
    total_agendamentos: "Total Agend.",
    plano: "Plano"
  };

  const sortableColumnsPets = [
    "dt_nascimento", 
    "dt_ultimo_agendamento",
    "total_agendamentos"
  ];

  const filterOptions = [
    { label: "Clientes & Pets" },
    { label: "Clientes" },
    { label: "Pets" },
  ];

  const handleFilterChange = (filter) => {
    // console.log("Filtro recebido no componente pai:", filter);
    setCurrentFilter(filter); // Atualiza o filtro atual
    // Chama a função para filtrar os dados de acordo com o filtro
    if (filter === "Clientes") {
      setFilteredData(clientesData);
    } else if (filter === "Pets") {

      setFilteredData(petsData);
    } else if (filter === "Clientes & Pets") {
      setFilteredData(clientesEPetsData);
    }
  };


  // Esse modal é o do create cliente
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Esse aqui é o modal do delete
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Esse aqui é o modal de edição
  const [showPut, setShowPut] = useState(false);
  const handleClosePut = () => setShowPut(false);
  const handleShowPut = () => setShowPut(true);

  // Esse é o modal de crate de pet
  const [showAddPet, setAddPet] = useState(false);
  const handleCloseAddPet = () => setAddPet(false);
  const handleShowAddPet = () => setAddPet(true);

  // Esse é o modal de atribuição de plano 
  const [showAssignPlain, setAssignPlain] = useState(false);
  const handleCloseAssignPlain = () => setAssignPlain(false);
  const handleShowAssignPlain = () => setAssignPlain(true);


  return (
    <div>
      <div className={styles["header-container"]}>
        <DropDownFilter options={filterOptions} onFilterChange={handleFilterChange} />
        <MainButtonsHeader  filter={currentFilter}
         onDeleteClickCliente={selectedData.length > 0 ? handleShow : null}
         onCreateClickCliente={openModal} 
         onCreatePet={handleShowAddPet} 
         onAssignPlain={handleShowAssignPlain} 
         disableDeleteButton={selectedData.length === 0} // Passa a condição para desabilitar o botão
         onGenerateReport={handleGenerateReport} 
        />
        <UserHeader />
      </div>
      <div className={styles["container-searchBar"]}>
        <Form onSubmit={(e) => e.preventDefault()}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control
              type="input"
              placeholder="Procurar por Cliente ou Pet"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </Form.Group>
        </Form>
      </div>

      {loading ? (
        <div className={styles["loading-container"]}>
          <ThreeDot variant="bounce" color="#005472" size="small" /> 
        </div>
      ) : (
        <TableData
          onPut={selectedData.length >= 1 && selectedData.length < 2 ? handleShowPut : null}
          filtro={currentFilter}
          dados={filteredData}
          columnNames={currentFilter === "Clientes" ? columnNamesClientes : currentFilter === "Pets" ? columnNamesPets : columnNamesClientesEPets}
          sortableColumns={currentFilter === "Clientes" ? sortableColumnsClientes : currentFilter === "Pets" ? sortableColumnsPets : sortableColumnsClientesEPets}
        />
      )}

{/* // Para o modal de criar cliente */}
{isModalOpen && <ClientModal isOpen={isModalOpen} onClose={closeModal} />}

{/* // Para o modal de criar pet */}
{showAddPet && <PetModal isOpen={showAddPet} onClose={handleCloseAddPet} />}

{/* // Para o modal de atribuir plano */}
{showAssignPlain && <PlanModal isOpen={showAssignPlain} onClose={handleCloseAssignPlain} pets={petsData} />}

{/* Modal de deletar */}
{show && <ModalDelete show={show} handleClose={handleClose} onDelete={deletarClientes} />}

{/* Modal de update */}
{showPut && <ModalPut showPut={showPut} handleClosePut={handleClosePut} onPut={deletarClientes} dados={selectedData} title="Editar Cliente" />}


    </div>
  );
};

export default ClientesEPets;
