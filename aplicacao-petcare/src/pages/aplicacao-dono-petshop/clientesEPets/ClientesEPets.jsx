import React, { useState, useEffect } from 'react';
import userService from "../../../services/userService";
import TableData from "../../../components/shared/tableData/TableData";
import UserHeader from "../../../components/aplicacao-dono-petshop/shared/userHeader/UserHeader";
import DropDownFilter from "../../../components/shared/dropDownFilter/DropDownFilter";
import MainButtonsHeader from "../../../components/aplicacao-dono-petshop/clientesEPets/mainButtonsHeader/mainButtonsHeader";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styles from "./ClientesEPets.module.css";
import ModalWrapper from "../../../components/aplicacao-dono-petshop/cadastroCliente/ModalWrapper";
import ModalDelete from "../../../components/aplicacao-dono-petshop/shared/modal/ModalDelete"
import { useSelectedData } from "./SelectedDataContext";

const ClientesEPets = () => {
  const [clientesData, setclientesData] = useState([]);
  const [petsData, setPetsData] = useState([]);
  const [clientesEPetsData, setclientesEPetsData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // Dados filtrados
  const [searchTerm, setSearchTerm] = useState('');
  const [currentFilter, setCurrentFilter] = useState("Clientes"); // Filtro atual
  const { selectedData } = useSelectedData() || {};



  async function deletarClientes() {
    if (selectedData && selectedData.length > 0) {
      try {
        const response = await userService.deleteCustomers(selectedData);
        console.log("Clientes deletados com sucesso:", response);
        alert("Cliente(s) deletado(s) com sucesso!")
        window.location.reload()
      } catch (error) {
        console.error("Erro ao deletar clientes:", error);
      }
    } else {
      console.log("Nenhum cliente selecionado para deletar.");
    }
  }



  useEffect(() => {
    console.log("Dados transferidos DE OUTRA Componente:", selectedData);
    // Aqui você pode renderizar os dados transferidos ou fazer o que precisar
  }, [selectedData])

  // Funções para recuperar os dados
  function recuperarValorClientes() {
    userService.getAllCustomerAndPets()
      .then((response) => {
        const data = Array.isArray(response) ? response : [response];
        const clientesFormatados = data.map(cliente => ({
          id: cliente.id,
          cliente: cliente.name,
          whatsapp: cliente.cellphone,
          endereco: cliente.street + ", " + cliente.number + ", " + cliente.district,
          numero_de_pets: cliente.pet.length,
        }));
        setclientesData(clientesFormatados);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function recuperarValorPets() {
    userService.getAllCustomerAndPets()
      .then((response) => {
        const data = Array.isArray(response) ? response : [response];
        const petsFormatados = data.flatMap(cliente =>
          cliente.pet.map(pet => ({
            id: pet.id,
            pet: pet.name,
            raça: pet.race.raceType,
            idade: pet.birthdate,
            porte: pet.size.sizeType,
            dono: cliente.name,
            observacoes: pet.petObservations,
          }))
        );
        setPetsData(petsFormatados);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function recuperarValorClientesEPets() {
    userService.getAllCustomerAndPets()
      .then((response) => {
        const data = Array.isArray(response) ? response : [response];
        const clientesEPetsFormatados = data.flatMap(cliente => {
          const clienteBase = {
            id: cliente.id,
            cliente: cliente.name,
            whatsapp: cliente.cellphone,
            endereco: `${cliente.street}, ${cliente.number}, ${cliente.district}`,
            numero_de_pets: cliente.pet.length,
          };
          return cliente.pet.map(pet => ({
            ...clienteBase,
            pet: pet.name,
            raça: pet.race.raceType,
            idade: pet.birthdate,
            porte: pet.size.sizeType,
            observacoes: pet.petObservations,
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
    cliente: "Nome do Cliente",
    whatsapp: "WhatsApp",
    endereco: "Endereço",
    numero_de_pets: "Número de Pets",
    pet: "Nome do Pet",
    raça: "Raça",
    idade: "Idade",
    porte: "Porte",
    observacoes: "Observações",
  };

  const sortableColumnsClientesEPets = [
    "numero_de_pets",
    "dt_nascimento"
  ];

  const columnNamesClientes = {
    cliente: "Nome do Cliente",
    whatsapp: "WhatsApp",
    endereco: "Endereço",
    numero_de_pets: "Número de Pets"
  };

  const sortableColumnsClientes = [
    "numero_de_pets",
  ];

  const columnNamesPets = {
    pet: "Nome do Pet",
    raça: "Raça",
    idade: "Idade",
    porte: "Porte",
    dono: "Dono",
    observacoes: "Observações",
  };

  const sortableColumnsPets = [
    "dt_nascimento",
  ];

  const filterOptions = [
    { label: "Clientes & Pets" },
    { label: "Clientes" },
    { label: "Pets" },
  ];

  const handleFilterChange = (filter) => {
    console.log("Filtro recebido no componente pai:", filter);
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <div>
      <div className={styles["header-container"]}>
        <DropDownFilter options={filterOptions} onFilterChange={handleFilterChange} />
        <MainButtonsHeader onCreateClick={openModal}
         onDeleteClick={selectedData.length > 0 ? handleShow : null}
         disableDeleteButton={selectedData.length === 0} // Passa a condição para desabilitar o botão
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

      <TableData
        dados={filteredData} // Usa os dados filtrados
        columnNames={currentFilter === "Clientes" ? columnNamesClientes : currentFilter === "Pets" ? columnNamesPets : columnNamesClientesEPets}
        sortableColumns={currentFilter === "Clientes" ? sortableColumnsClientes : currentFilter === "Pets" ? sortableColumnsPets : sortableColumnsClientesEPets}
      />

      {isModalOpen && <ModalWrapper closeModal={closeModal} />}

      {show && <ModalDelete show={show} handleClose={handleClose} onDelete={deletarClientes()} />}


    </div>
  );
};

export default ClientesEPets;
