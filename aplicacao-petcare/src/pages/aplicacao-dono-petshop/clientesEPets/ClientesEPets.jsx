import TableData from "../../../components/shared/tableData/TableData";

const ClientesEPets = () => {
  const dadosClientes = [
    {
      id: 1,
      cliente: "João Silva",
      whatsapp: "(11) 97839-2929",
      endereco: "Rua A, 123, Guaianases",
      numero_de_pets: 2,
      ultimo_agendamento: "10/09/2024",
      total_de_agendamentos: 5,
      plano: "Mensal",
    },
    {
      id: 2,
      cliente: "Maria Oliveira",
      whatsapp: "(11) 93456-7890",
      endereco: "Rua B, 456, São Paulo",
      numero_de_pets: 1,
      ultimo_agendamento: "05/08/2024",
      total_de_agendamentos: 3,
      plano: "Quinzenal",
    },
    {
      id: 3,
      cliente: "Carlos Pereira",
      whatsapp: "(11) 91234-5678",
      endereco: "Rua C, 789, Santo Amaro",
      numero_de_pets: 4,
      ultimo_agendamento: "20/07/2024",
      total_de_agendamentos: 8,
      plano: "Nenhum",
    },
    {
      id: 4,
      cliente: "Ana Costa",
      whatsapp: "(11) 97654-3210",
      endereco: "Rua D, 101, Moema",
      numero_de_pets: 3,
      ultimo_agendamento: "15/06/2024",
      total_de_agendamentos: 10,
      plano: "Mensal",
    },
    {
      id: 5,
      cliente: "Pedro Santos",
      whatsapp: "(11) 93210-9876",
      endereco: "Rua E, 202, Bela Vista",
      numero_de_pets: 1,
      ultimo_agendamento: "30/09/2024",
      total_de_agendamentos: 2,
      plano: "Quinzenal",
    },
    {
      id: 6,
      cliente: "Luciana Fernandes",
      whatsapp: "(11) 94321-6543",
      endereco: "Rua F, 303, Pinheiros",
      numero_de_pets: 2,
      ultimo_agendamento: "25/08/2024",
      total_de_agendamentos: 6,
      plano: "Nenhum",
    },
  ];

  const columnNamesClientes = {
    cliente: "Cliente",
    whatsapp: "WhatsApp",
    endereco: "Endereço",
    numero_de_pets: "Número de Pets",
    ultimo_agendamento: "Último Agendamento",
    total_de_agendamentos: "Total de Agendamentos",
    plano: "Planos",
  };

  const sortableColumnsClientes = [
    "ultimo_agendamento",
    "total_de_agendamentos",
  ];

  const dadosPets = [
    {
      id: 1,
      pet: "Rex",
      raça: "Labrador",
      idade: "3 anos",
      porte: "Grande",
      dono: "João Silva",
      ultimo_agendamento: "10/09/2024",
      total_de_agendamentos: 5,
      observacoes: "Alergia a shampoo\nUsa ração especial",
    },
    {
      id: 2,
      pet: "Bella",
      raça: "Labrador",
      idade: "2 anos",
      porte: "Médio",
      dono: "João Silva",
      ultimo_agendamento: "10/09/2024",
      total_de_agendamentos: 5,
      observacoes: "Alergia a shampoo\nUsa ração especial",
    },
    {
      id: 3,
      pet: "Teddy",
      raça: "Labrador",
      idade: "6 meses",
      porte: "Pequeno",
      dono: "João Silva",
      ultimo_agendamento: "10/09/2024",
      total_de_agendamentos: 0,
      observacoes: "",
    },
    {
      id: 4,
      pet: "Luna",
      raça: "Labrador",
      idade: "6 meses",
      porte: "Pequeno",
      dono: "João Silva",
      ultimo_agendamento: "10/09/2024",
      total_de_agendamentos: 10,
      observacoes: "Alergia a shampoo",
    },
    {
      id: 5,
      pet: "Coco",
      raça: "Poodle",
      idade: "3 anos",
      porte: "Pequeno",
      dono: "João Silva",
      ultimo_agendamento: "10/09/2024",
      total_de_agendamentos: 4,
      observacoes: "Usa ração especial",
    },
    {
      id: 6,
      pet: "Molly",
      raça: "Poodle",
      idade: "2 anos",
      porte: "Pequeno",
      dono: "João Silva",
      ultimo_agendamento: "10/09/2024",
      total_de_agendamentos: 4,
      observacoes: "Alergia a shampoo\nUsa ração especial",
    },
    {
      id: 7,
      pet: "Buddy",
      raça: "Poodle",
      idade: "2 anos",
      porte: "Pequeno",
      dono: "João Silva",
      ultimo_agendamento: "10/09/2024",
      total_de_agendamentos: 4,
      observacoes: "",
    },
    {
      id: 8,
      pet: "Daisy",
      raça: "Poodle",
      idade: "6 meses",
      porte: "Pequeno",
      dono: "João Silva",
      ultimo_agendamento: "10/09/2024",
      total_de_agendamentos: 4,
      observacoes: "Alergia a shampoo\nUsa ração especial",
    },
    {
      id: 9,
      pet: "Rocky",
      raça: "Labrador",
      idade: "6 meses",
      porte: "Grande",
      dono: "João Silva",
      ultimo_agendamento: "10/09/2024",
      total_de_agendamentos: 4,
      observacoes: "Alergia a shampoo\nUsa ração especial",
    },
    {
      id: 10,
      pet: "Charlie",
      raça: "Labrador",
      idade: "6 meses",
      porte: "Grande",
      dono: "João Silva",
      ultimo_agendamento: "10/09/2024",
      total_de_agendamentos: 4,
      observacoes: "Alergia a shampoo\nUsa ração especial",
    },
  ];

  const columnNamesPets = {
    pet: "Pet",
    raça: "Raça",
    idade: "Idade",
    porte: "Porte",
    dono: "Dono",
    ultimo_agendamento: "Último Agendamento",
    total_de_agendamentos: "Total de Agendamentos",
    observacoes: "Observações",
  };
  
  const sortableColumnsPets = [
    "idade",
    "ultimo_agendamento",
    "total_de_agendamentos",
  ];

  return (
    <div>
      <TableData
        dados={dadosClientes}
        columnNames={columnNamesClientes}
        sortableColumns={sortableColumnsClientes}
      />
    </div>
  );
};

export default ClientesEPets;
