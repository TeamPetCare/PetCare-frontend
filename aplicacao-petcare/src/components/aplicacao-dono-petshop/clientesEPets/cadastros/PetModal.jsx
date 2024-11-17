import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import raceService from '../../../../services/racaService';
import especieService from '../../../../services/especieService';
import { getAllCustomerAndPets } from '../../../../services/userService'; // Import do método correto
import modalWrapperStyles from './ModalWrapper.module.css'; // Estilo genérico do modal
import petStyles from './PetModal.module.css'; // Estilo específico para PetModal
import { createPet, deletePet, getPetById, getAllPets, updatePet } from "../../../../services/petService";


const PetModal = ({ isOpen, onClose }) => {
  const [petData, setPetData] = useState({});
  const [clients, setClients] = useState([]);
  const [races, setRaces] = useState([]);
  const [especies, setEspecies] = useState([]);
  const [selectedClient, setSelectedClient] = useState('');
  const [selectedRace, setSelectedRace] = useState('');
  const [selectedEspecie, setSelectedEspecie] = useState('');

  useEffect(() => {
    // Buscar clientes
    const fetchClients = async () => {
      try {
        const clientList = await getAllCustomerAndPets(); // Usando o método correto
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
        setEspecies(especieList);
      } catch (error) {
        console.error('Erro ao buscar espécies:', error);
      }
    };

    fetchClients();
    fetchRaces();
    fetchEspecies();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPetData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const dataToSave = {
        ...petData,
        ownerId: selectedClient,
        raceId: selectedRace,
        especieId: selectedEspecie,
      };
      await createPet(dataToSave);
      toast.success('Pet cadastrado com sucesso!');
      onClose();
    } catch (err) {
      console.error('Erro ao cadastrar pet:', err);
      toast.error('Erro ao cadastrar pet. Tente novamente.');
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className={modalWrapperStyles.backdrop} onClick={onClose}></div>
      <div className={`${modalWrapperStyles.modal} ${petStyles.customModal}`}>
        <h2 className={petStyles.title}>Cadastrar Pet</h2>
        <div className={petStyles.formGroup}>
          {/* Cliente */}
          <div className={petStyles.row}>
            <label>Cliente</label>
            <select
              className={petStyles.select}
              value={selectedClient}
              onChange={(e) => setSelectedClient(e.target.value)}
            >
              <option value="">Selecione o Cliente</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              ))}
            </select>
          </div>
  
          {/* Nome do Pet */}
          <div className={petStyles.row}>
            <label>Nome do Pet</label>
            <input
              type="text"
              name="petName"
              placeholder="Nome do Pet"
              className={petStyles.fullInput}
              onChange={handleInputChange}
            />
          </div>
  
          {/* Espécie */}
          <div className={petStyles.row}>
            <label>Espécie</label>
            <select
              className={petStyles.select}
              value={selectedEspecie}
              onChange={(e) => setSelectedEspecie(e.target.value)}
            >
              <option value="">Selecione a Espécie</option>
              {especies.map((especie) => (
                <option key={especie.id} value={especie.id}>
                  {especie.name}
                </option>
              ))}
            </select>
          </div>
  
          {/* Raça */}
          <div className={petStyles.row}>
            <label>Raça</label>
            <select
              className={petStyles.select}
              value={selectedRace}
              onChange={(e) => setSelectedRace(e.target.value)}
            >
              <option value="">Selecione a Raça</option>
              {races.map((race) => (
                <option key={race.id} value={race.id}>
                  {race.raceType}
                </option>
              ))}
            </select>
          </div>
  
          {/* Data de Nascimento e Sexo */}
          <div className={petStyles.row}>
            <div className={petStyles.halfWidth}>
              <label>Data de Nascimento</label>
              <input
                type="date"
                name="birthDate"
                className={petStyles.fullInput}
                onChange={handleInputChange}
              />
            </div>
            <div className={petStyles.halfWidth}>
              <label>Sexo</label>
              <input
                type="text"
                name="sexo"
                placeholder="Sexo"
                className={petStyles.fullInput}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
  
        {/* Botões */}
        <div className={petStyles.buttonGroup}>
          <button className={petStyles.submitButton} onClick={handleSubmit}>
            Cadastrar
          </button>
          <button className={petStyles.cancelButton} onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </>
  );
  
  
};

export default PetModal;