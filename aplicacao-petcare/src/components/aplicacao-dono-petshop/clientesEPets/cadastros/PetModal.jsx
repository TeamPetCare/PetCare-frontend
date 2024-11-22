import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import raceService from '../../../../services/racaService';
import especieService from '../../../../services/especieService';
import { getAllCustomerAndPets } from '../../../../services/userService';
import petService from '../../../../services/petService';
import sizeService from '../../../../services/sizeService';
import modalWrapperStyles from './ModalWrapper.module.css';
import petStyles from './PetModal.module.css';

const PetModal = ({ isOpen, onClose }) => {
  const [petData, setPetData] = useState({
    petName: '',
    sexo: '',
    color: '',
    birthDate: '',
    observations: '',
  });

  const [clients, setClients] = useState([]);
  const [races, setRaces] = useState([]);
  const [especies, setEspecies] = useState([]);
  const [sizes, setSizes] = useState([]);

  const [selectedClient, setSelectedClient] = useState('');
  const [selectedRace, setSelectedRace] = useState('');
  const [selectedEspecie, setSelectedEspecie] = useState('');
  const [selectedSize, setSelectedSize] = useState('');

  useEffect(() => {
    if (isOpen) {
      const fetchData = async () => {
        try {
          console.log('Iniciando a busca de dados...');
          const [clientList, raceList, especieList, sizeList] = await Promise.all([
            getAllCustomerAndPets(),
            raceService.getAllRaces(),
            especieService.getAllEspecies(),
            sizeService.getAllSizes(),
          ]);

          console.log('Clientes carregados:', clientList);
          console.log('Raças carregadas:', raceList);
          console.log('Espécies carregadas:', especieList);
          console.log('Tamanhos carregados:', sizeList);

          setClients(clientList);
          setRaces(raceList);
          setEspecies(especieList);
          setSizes(sizeList);
        } catch (error) {
          console.error('Erro ao buscar dados:', error);
          toast.error('Erro ao carregar os dados. Tente novamente.');
        }
      };

      fetchData();
    }
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPetData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const dataToSave = {
        name: petData.petName,
        gender: petData.sexo,
        color: petData.color,
        birthDate: petData.birthDate,
        observations: petData.observations,
        specieId: parseInt(selectedEspecie, 10),
        raceId: parseInt(selectedRace, 10),
        sizeId: parseInt(selectedSize, 10),
        userId: parseInt(selectedClient, 10),
      };

      console.log('Dados para salvar:', dataToSave);
      await petService.createPet(dataToSave);
      toast.success('Pet cadastrado com sucesso!');
      onClose();
    } catch (error) {
      console.error('Erro ao cadastrar pet:', error);
      toast.error('Erro ao cadastrar pet. Verifique os dados e tente novamente.');
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
          <div className={petStyles.field}>
            <label className={petStyles.label}>Cliente</label>
            <select
              className={petStyles.input}
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
          <div className={petStyles.field}>
            <label className={petStyles.label}>Nome do Pet</label>
            <input
              type="text"
              name="petName"
              placeholder="Nome do Pet"
              className={petStyles.input}
              onChange={handleInputChange}
            />
          </div>

          {/* Espécie */}
          <div className={petStyles.field}>
            <label className={petStyles.label}>Espécie</label>
            <select
              className={petStyles.input}
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
          <div className={petStyles.field}>
  <label className={petStyles.label}>Raça</label>
  <select
    className={petStyles.input}
    value={selectedRace}
    onChange={(e) => setSelectedRace(e.target.value)}
  >
    <option value="">Selecione a Raça</option>
    {races?.map((race) => (
      <option key={race.id} value={race.id}>
        {race.raceType}
      </option>
    ))}
  </select>
</div>


          {/* Porte */}
          <div className={petStyles.field}>
  <label className={petStyles.label}>Porte</label>
  <select
    className={petStyles.input}
    value={selectedSize}
    onChange={(e) => setSelectedSize(e.target.value)}
  >
    <option value="">Selecione o Porte</option>
    {sizes?.map((size) => (
      <option key={size.id} value={size.id}>
        {size.sizeType}
      </option>
    ))}
  </select>
</div>


          {/* Data de Nascimento */}
          <div className={petStyles.field}>
            <label className={petStyles.label}>Data de Nascimento</label>
            <input
              type="date"
              name="birthDate"
              className={petStyles.input}
              onChange={handleInputChange}
            />
          </div>

          {/* Sexo */}
          <div className={petStyles.field}>
            <label className={petStyles.label}>Sexo</label>
            <select
              name="sexo"
              className={petStyles.input}
              value={petData.sexo || ''}
              onChange={handleInputChange}
            >
              <option value="">Selecione o Sexo</option>
              <option value="Macho">Macho</option>
              <option value="Fêmea">Fêmea</option>
            </select>
          </div>

          {/* Observações */}
          <div className={petStyles.field}>
            <label className={petStyles.label}>Observações</label>
            <textarea
              name="observations"
              placeholder="Observações sobre o Pet"
              className={petStyles.input}
              onChange={handleInputChange}
              rows="3"
            ></textarea>
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
