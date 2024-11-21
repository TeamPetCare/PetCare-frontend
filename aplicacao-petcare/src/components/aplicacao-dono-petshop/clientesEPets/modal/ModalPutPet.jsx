import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import styles from './ModalPut.module.css'; // Supondo que você tenha esse arquivo CSS
import { getAllCustomerAndPets } from '../../../../services/userService'; // Import do método correto
import raceService from '../../../../services/racaService';
import especieService from '../../../../services/especieService';
import sizeService from '../../../../services/sizeService';
import { createPet, deletePet, getPetById, getAllPets, updatePet } from "../../../../services/petService";

function ModalPutPet({
  showPut,
  handleClosePut,
  onPut = () => { },
  title = "Editar Pet",
  pet = {},
  setPetAtual,
  nonEditableFields = [],
}) {

  const [petData, setPetData] = useState({});
  const [clients, setClients] = useState([]);
  const [races, setRaces] = useState([]);
  const [especies, setEspecies] = useState([]);
  const [sizes, setSize] = useState([]);
  const [selectedClient, setSelectedClient] = useState('');
  const [selectedRace, setSelectedRace] = useState('');
  const [selectedEspecie, setSelectedEspecie] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [dataFormatadaCore, setDataFormatadaCore] = useState("");
  const [isDateInput, setIsDateInput] = useState(false);
  const [tempDate, setTempDate] = useState(pet.dtNascimento);

  useEffect(() => {
    // Buscar clientes
    const fetchClients = async () => {
      try {
        const clientList = await getAllCustomerAndPets(); // Usando o método correto
        console.log('Clientes carregados:', clientList); // Verifique o que está sendo retornado
        setClients(clientList);
      } catch (error) {
        console.error('Erro ao buscar clientes:', error);
      }
    };

    // Buscar raças
    const fetchRaces = async () => {
      try {
        const raceList = await raceService.getAllRaces();
        console.log('Raças carregadas:', raceList); // Verifique o que está sendo retornado
        setRaces(raceList);
      } catch (error) {
        console.error('Erro ao buscar raças:', error);
      }
    };


    // Buscar espécies
    const fetchEspecies = async () => {
      try {
        const especieList = await especieService.getAllEspecies();
        console.log('Espécies carregadas:', especieList); // Verifique o que está sendo retornado
        setEspecies(especieList);
      } catch (error) {
        console.error('Erro ao buscar espécies:', error);
      }
    };

    const fetchSizes = async () => {
      try {
        const sizeList = await sizeService.getAllSizes();
        console.log('Portes carregados:', sizeList); // Verifique o que está sendo retornado
        setSize(sizeList);
      } catch (error) {
        console.error('Erro ao buscar Tamanhos:', error);
      }
    };

    fetchClients();
    fetchRaces();
    fetchEspecies();
    fetchSizes();
  }, []);


  useEffect(() => {
    if (showPut && pet && !pet.id) {
      const dataOriginal = pet[0].dtUltimoAgendamento;
      const dataFormatada = formatarDataParaIso(dataOriginal);
      setDataFormatadaCore(dataFormatada);

      setPetAtual({
        ...pet[0],
      });

    }
  }, [showPut, pet.id, setPetAtual]);

  const formatarDataParaIso = (data) => {
    if (!data) return "";
    const partes = data.split("/");
    if (partes.length === 3) {
      const [dia, mes, ano] = partes;
      return `${ano}-${mes.padStart(2, "0")}-${dia.padStart(2, "0")}`;
    }
    return data;
  };

  const formatarDataParaExibicao = (data) => {
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (!nonEditableFields.includes(name)) {
      setPetAtual((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(pet); // Agora reflete diretamente o estado principal
    onPut(pet); // Envia o estado atualizado para o componente principal
    handleClosePut();
  };

  const handleFocus = () => {
    setIsDateInput(true);
  };

  const handleBlur = () => {
    if (!pet.dtNascimento) {
      setIsDateInput(false);
    }
  };

  const handleDateChange = (e) => {
    const { value } = e.target;
    // Se for uma data válida, converta para o formato DD/MM/YYYY
    if (value) {
      const [ano, mes, dia] = value.split("-");
      setTempDate(`${dia}/${mes}/${ano}`);
      setPet((prevState) => ({
        ...prevState,
        dtNascimento: `${dia}/${mes}/${ano}`, // Armazena no formato DD/MM/YYYY
      }));
    }
    setIsDateInput(false); // Volta ao input de texto
  };

  return (
    <Modal
      show={showPut}
      onHide={handleClosePut}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className={styles["modal"]}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className={styles["title"]}>
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit} className={styles["container"]}>
          {/* Cliente */}
          <Form.Group controlId="formCliente">
            <Form.Label>Cliente</Form.Label>
            <Form.Control
              as="select"
              name="dono"
              value={pet.dono || ""}
              onChange={handleInputChange}
              readOnly={nonEditableFields.includes("dono")}
            >
              <option value="">Selecione o Cliente</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          {/* Nome do Pet */}
          <Form.Group controlId="formNomePet">
            <Form.Label>Nome do Pet</Form.Label>
            <Form.Control
              type="text"
              name="pet"
              value={pet.pet || ""}
              onChange={handleInputChange}
              readOnly={nonEditableFields.includes("pet")}
            />
          </Form.Group>

          {/* Espécie */}
          <Form.Group controlId="formEspecie">
            <Form.Label>Espécie</Form.Label>
            <Form.Control
              as="select"
              name="especie"
              value={pet.especie || ""}
              onChange={handleInputChange}
              disabled={nonEditableFields.includes("especie")}
            >
              <option value="">Selecione a Espécie</option>
              {especies.map((especie) => (
                <option key={especie.id} value={especie.id}>
                  {especie.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          {/* Raça */}
          <Form.Group controlId="formRaca">
            <Form.Label>Raça</Form.Label>
            <Form.Control
              as="select"
              name="raca"
              value={pet.raca || ""}
              onChange={handleInputChange}
              disabled={nonEditableFields.includes("raca")}
            >
              <option value="">Selecione a Raça</option>
              {races.map((raca) => (
                <option key={raca.id} value={raca.id}>
                  {raca.raceType}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          {/* Porte (Size) */}
          <Form.Group controlId="formPorte">
            <Form.Label>Porte</Form.Label>
            <Form.Control
              as="select"
              name="porte"
              value={pet.porte || ""}
              onChange={handleInputChange}
              disabled={nonEditableFields.includes("porte")}
            >
              <option value="">Selecione o Porte</option>
              {sizes.map((size) => (
                <option key={size.id} value={size.id}>
                  {size.sizeType}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          {/* Sexo */}
          <Form.Group controlId="formSexo">
            <Form.Label>Sexo</Form.Label>
            <Form.Control
              as="select"
              name="sexo"
              value={pet.sexo || ""}
              onChange={handleInputChange}
              disabled={nonEditableFields.includes("sexo")}
            >
              <option value="">Selecione o Sexo</option>
              <option value="Macho">Macho</option>
              <option value="Fêmea">Fêmea</option>
              <option value={pet.sexo} selected>{pet.sexo}</option>

            </Form.Control>
          </Form.Group>

          {/* Data de Nascimento */}
          <Form.Group controlId="formDataNascimento">
            <Form.Label>Data de Nascimento</Form.Label>
            {isDateInput ? (
              <Form.Control
                type="date"
                name="dtNascimento"
                value={pet.dtNascimento
                  .split("/")
                  .reverse()
                  .join("-")} // Converte para o formato YYYY-MM-DD
                onBlur={handleBlur}
                onChange={handleDateChange}
              />
            ) : (
              <Form.Control
                type="text"
                name="dtNascimento"
                value={pet.dtNascimento || ""}
                onChange={handleInputChange}
                onFocus={handleFocus} // Altera o tipo para 'date' quando o campo receber foco
              />
            )}
          </Form.Group>

          {/* Peso Estimado */}
          <Form.Group controlId="formPesoEstimado">
            <Form.Label>Peso Estimado</Form.Label>
            <Form.Control
              type="number"
              name="pesoEstimado"
              value={pet.pesoEstimado || 0}
              onChange={handleInputChange}
              readOnly={nonEditableFields.includes("pesoEstimado")}
            />
          </Form.Group>

          {/* Cor */}
          <Form.Group controlId="formCor">
            <Form.Label>Cor</Form.Label>
            <Form.Control
              type="text"
              name="cor"
              value={pet.cor || ""}
              onChange={handleInputChange}
              readOnly={nonEditableFields.includes("cor")}
            />
          </Form.Group>

          {/* Observações */}
          <Form.Group controlId="formObservacoes">
            <Form.Label>Observações</Form.Label>
            <Form.Control
              as="textarea"
              name="observacoes"
              value={pet.observacoes || ""}
              onChange={handleInputChange}
              readOnly={nonEditableFields.includes("observacoes")}
            />
          </Form.Group>

          {/* Data do Último Agendamento */}
          <Form.Group controlId="formDtUltimoAgendamento">
            <Form.Label>Data do Último Agendamento</Form.Label>
            <Form.Control
              type="text"
              name="dtUltimoAgendamento"
              value={pet.dtUltimoAgendamento || "Sem dados"}
              readOnly
              disabled
            />
          </Form.Group>

          {/* Total de Agendamentos */}
          <Form.Group controlId="formTotalAgendamentos">
            <Form.Label>Total de Agendamentos</Form.Label>
            <Form.Control
              type="number"
              name="totalAgendamentos"
              value={pet.totalAgendamentos || 0}
              readOnly
              disabled
            />
          </Form.Group>

          {/* Botões */}
          <Button variant="primary" type="submit" className={styles["submitButton"]}>
            Salvar Alterações
          </Button>
          <Button variant="secondary" onClick={handleClosePut} className={styles["cancelButton"]}>
            Fechar
          </Button>
        </Form>

      </Modal.Body>
      <Modal.Footer>

      </Modal.Footer>
    </Modal>
  );
}

export default ModalPutPet;
