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

  const [petData, setPetData] = useState(pet);
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
      // const dataOriginal = pet[0].dtNascimento;
      // const dataFormatada = formatarDataParaIso(dataOriginal);
      // setDataFormatadaCore(dataFormatada);

      setPetAtual({
        ...pet[0]
        // dtNascimento: dataFormatada
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setPetAtual((prevState) => ({
      ...prevState,
      [name]:
        name === "dtNascimento" && value.includes("/") // Checa se é uma data no formato DD/MM/YYYY
          ? value.split("/").reverse().join("-") // Converte para YYYY-MM-DD ao salvar no estado
          : value, // Para outros casos, apenas salva o valor
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Antes da conversão:", pet);

    // Converte a data para ISO antes de enviar
    const dataConvertida = formatarDataParaIso(pet.dtNascimento);
    console.log("Data convertida para ISO:", dataConvertida);

    // Simula um evento para passar a data convertida ao handleInputChange
    setPetData({ dtNascimento: dataConvertida })

    console.log("O fdp aí ó:")
    console.log(pet)

    onPut(petData); // Envia o objeto atualizado
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
    const { value } = e.target; // Formato: YYYY-MM-DD
    if (value) {
      // Atualiza o estado com a data em formato DD/MM/YYYY
      const [ano, mes, dia] = value.split("-");
      setPetAtual((prevState) => ({
        ...prevState,
        dtNascimento: `${ano}-${mes}-${dia}`, // Armazena no formato DD/MM/YYYY
      }));
    }
    setIsDateInput(false); // Retorna ao campo de texto, se necessário
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
                value={
                  pet.dtNascimento && pet.dtNascimento.includes("/")
                    ? pet.dtNascimento.split("/").reverse().join("-") // Converte para YYYY-MM-DD
                    : pet.dtNascimento || ""
                }
                onBlur={handleBlur} // Lógica opcional ao desfocar
                onChange={handleInputChange} // Usa um único manipulador
              />
            ) : (
              <Form.Control
                type="text"
                name="dtNascimento"
                value={
                  pet.dtNascimento
                    ? pet.dtNascimento.includes("T") // Checa se a data está no formato ISO com "T"
                      ? pet.dtNascimento.split("T")[0].split("-").reverse().join("/") // Converte YYYY-MM-DD para DD/MM/YYYY
                      : pet.dtNascimento.includes("-") // Verifica se está no formato YYYY-MM-DD
                        ? pet.dtNascimento.split("-").reverse().join("/") // Converte para DD/MM/YYYY
                        : pet.dtNascimento // Se já estiver no formato esperado, mantém
                    : ""
                }
                onChange={handleInputChange}
                onFocus={handleFocus}
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
              value={new Date(pet.dtUltimoAgendamento).toLocaleDateString('pt-BR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              }) || "Sem dados"}
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
