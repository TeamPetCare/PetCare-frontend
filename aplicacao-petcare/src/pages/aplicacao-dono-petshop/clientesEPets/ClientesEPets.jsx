import React, { useState, useEffect } from 'react';
import userService from "../../../services/userService"


import TableData from "../../../components/shared/tableData/TableData";
import UserHeader from "../../../components/aplicacao-dono-petshop/shared/userHeader/UserHeader";
import DropDownFilter from "../../../components/shared/dropDownFilter/DropDownFilter";
import MainButtonsHeader from "../../../components/aplicacao-dono-petshop/clientesEPets/mainButtonsHeader/mainButtonsHeader"
import Form from 'react-bootstrap/Form';
import styles from "./ClientesEPets.module.css";
import ModalWrapper from "../../../components/aplicacao-dono-petshop/cadastroCliente/ModalWrapper";

const ClientesEPets = () => {
  const [clientesData, setclientesData] = useState();
  const [petsData, setPetsData] = useState();
  const [clientesEPetsData, setclientesEPetsData] = useState();

  function recuperarValorClientes() {
    userService.getAllCustomerAndPets()

    
      .then((response) => {
        const data = Array.isArray(response) ? response : [response];

      

        if (!Array.isArray(data)) {
          console.error("Os dados recebidos não são um array.");
          return;
        }
  
        // Mapeia os dados para o formato desejado para clientes
        const clientesFormatados = data.map(cliente => ({
          id: cliente.id,
          cliente: cliente.name,
          whatsapp: cliente.cellphone,
          endereco: cliente.street + ", " + cliente.number + ", " + cliente.district,
          numero_de_pets: cliente.pet.length,
          // Outros campos opcionais podem ser incluídos aqui
        }));

        console.log(clientesFormatados)
        
  
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
        // Extrai os pets de cada cliente e formata
        const petsFormatados = data.flatMap(cliente =>
          cliente.pet.map(pet => ({
            id: pet.id,
            pet: pet.name,
            raça: pet.race.raceType,
            idade: pet.birthdate,
            porte: pet.size.sizeType,
            dono: cliente.name,
            observacoes: pet.petObservations,
            // Outros campos opcionais podem ser incluídos aqui
          }))
        );
        console.log(petsFormatados)
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
  
        // Verifica se os dados recebidos são um array
        if (!Array.isArray(data)) {
          console.error("Os dados recebidos não são um array.");
          return;
        }
  
        // Extrai os dados de clientes e pets
        const clientesEPetsFormatados = data.flatMap(cliente => {
          const clienteBase = {
            id: cliente.id,
            cliente: cliente.name,
            whatsapp: cliente.cellphone,
            endereco: `${cliente.street}, ${cliente.number}, ${cliente.district}`,
            numero_de_pets: cliente.pet.length, // Quantidade de pets
            // Outros campos opcionais podem ser incluídos aqui
          };
  
          // Mapeia os pets do cliente e combina com os dados do cliente
          return cliente.pet.map(pet => ({
            ...clienteBase, // Inclui os dados do cliente
            pet: pet.name,
            raça: pet.race.raceType,
            idade: pet.birthdate,
            porte: pet.size.sizeType,
            observacoes: pet.petObservations,
          }));
        });
  
        console.log(clientesEPetsFormatados);
        setclientesEPetsData(clientesEPetsFormatados);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  

  useEffect(() => {
    recuperarValorClientes();
    recuperarValorPets();
    recuperarValorClientesEPets()
  }, []);

  useEffect(() => {
    // Chama a função de filtro ao carregar os dados
    handleFilterChange(filterOptions[1].label); // Chama o filtro "Clientes & Pets" como padrão
  }, [clientesData, petsData]); // Executa quando os dados são carregados

  const columnNamesClientesEPets = {
    cliente: "Nome do Cliente",
    whatsapp: "WhatsApp",
    endereco: "Endereço",
    numero_de_pets: "Número de Pets",
    // ultimo_agendamento: "Último Agendamento",
    // total_de_agendamentos: "Total de Agendamentos",
    // plano: "Planos",
    pet: "Nome do Pet",
    raça: "Raça",
    idade: "Idade",
    porte: "Porte",
    // ultimo_agendamento: "Último Agendamento",
    // total_de_agendamentos: "Total de Agendamentos",
    observacoes: "Observações",
  };

  
  const sortableColumnsClientesEPets = [
    "numero_de_pets",
    "dt_nascimento"
    // "ultimo_agendamento",
    // "total_de_agendamentos",
  ];

  const columnNamesClientes = {
    cliente: "Nome do Cliente",
    whatsapp: "WhatsApp",
    endereco: "Endereço",
    numero_de_pets: "Número de Pets"
    // ultimo_agendamento: "Último Agendamento",
    // total_de_agendamentos: "Total de Agendamentos",
    // plano: "Planos",
  };

  const sortableColumnsClientes = [
    "numero_de_pets",
    // "ultimo_agendamento",
    // "total_de_agendamentos",
  ];

  const columnNamesPets = {
    pet: "Nome do Pet",
    raça: "Raça",
    idade: "Idade",
    porte: "Porte",
    dono: "Dono",
    // ultimo_agendamento: "Último Agendamento",
    // total_de_agendamentos: "Total de Agendamentos",
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

  let [dados, setDados] = useState();
  let [columnNames, setColumnNames] = useState();
  let [sortableColumns, setSortableColumns] = useState();

 

  const handleFilterChange = (filter) => {
    console.log("Filtro recebido no componente pai:", filter);
    // Aqui você pode atualizar o estado ou executar alguma lógica com o filtro selecionado
    if (filter === "Clientes") {
      setDados(clientesData); // Substitua com os dados reais de clientes
      setColumnNames(columnNamesClientes);
      setSortableColumns(sortableColumnsClientes);
    } else if (filter === "Pets") {
      setDados(petsData); // Substitua com os dados reais de pets
      setColumnNames(columnNamesPets);
      setSortableColumns(sortableColumnsPets);
    } else if (filter === "Clientes & Pets") {
      setDados(clientesEPetsData); // Substitua com os dados reais de clientes e pets combinados
      setColumnNames(columnNamesClientesEPets);
      setSortableColumns(sortableColumnsClientesEPets);
    }
  };

  // function calcularIdade(dataNascimento) {
  //   const nascimento = new Date(dataNascimento);
  //   const hoje = new Date();
  //   const idade = hoje.getFullYear() - nascimento.getFullYear();
  //   const mes = hoje.getMonth() - nascimento.getMonth();
  
  //   if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
  //     return `${idade - 1} anos`;
  //   }
  
  //   return `${idade} anos`;
  // }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <div className={styles["header-container"]}>
        <DropDownFilter options={filterOptions} onFilterChange={handleFilterChange} />
        <MainButtonsHeader onCreateClick={openModal} /> {/* Passando a função */}
        <UserHeader />
      </div>
      <div className={styles["container-searchBar"]}>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control type="input" placeholder="Procurar por Cliente" />
          </Form.Group>
        </Form>
      </div>

      <TableData
        dados={dados}
        columnNames={columnNames}
        sortableColumns={sortableColumns}
      />
      
      {isModalOpen && <ModalWrapper closeModal={closeModal} />} {/* Renderizando o modal */}
    </div>
  );
};

export default ClientesEPets;
