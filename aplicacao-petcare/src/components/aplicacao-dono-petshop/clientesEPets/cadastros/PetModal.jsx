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
          const [clientList, raceList, especieList, sizeList] = await Promise.all([
            getAllCustomerAndPets(),
            raceService.getAllRaces(),
            especieService.getAllEspecies(),
            sizeService.getAllSizes(),
          ]);

          setClients(clientList);
          setRaces(raceList);
          setEspecies(especieList);
          setSizes(sizeList);
        } catch (error) {
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

      await petService.createPet(dataToSave);
      toast.success('Pet cadastrado com sucesso!');
      onClose();
    } catch (error) {
      toast.error('Erro ao cadastrar pet. Verifique os dados e tente novamente.');
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className={modalWrapperStyles.backdrop} onClick={onClose}></div>
      <div className={`${modalWrapperStyles.modal} ${petStyles.customModal}`}>
        <h2 className={petStyles.title}>Cadastrar Pets</h2>
        <p className={petStyles.subtitle}>*Campos obrigatórios</p>
        <div className={petStyles.formGroup}>
          {/* Nome, Data de Nascimento e Sexo */}
          <div className={petStyles.row}>
  <div className={`${petStyles.field} ${petStyles.wideInput}`}>
    <label className={petStyles.label}>
      Nome <span>*</span>
    </label>
    <input
      type="text"
      name="petName"
      className={petStyles.input}
      onChange={handleInputChange}
    />
  </div>
  <div className={`${petStyles.field} ${petStyles.narrowInput}`}>
    <label className={petStyles.label}>
      Data de Nascimento <span>*</span>
    </label>
    <input
      type="date"
      name="birthDate"
      className={petStyles.input}
      onChange={handleInputChange}
    />
  </div>
  <div className={`${petStyles.field} ${petStyles.narrowInput}`}>
    <label className={petStyles.label}>
      Sexo <span>*</span>
    </label>
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
</div>


          {/* Espécie, Raça, Cor e Porte */}
          <div className={petStyles.row}>
            <div className={`${petStyles.field} ${petStyles.narrowInput}`}>
              <label className={petStyles.label}>
                Espécie <span>*</span>
              </label>
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
            <div className={`${petStyles.field} ${petStyles.narrowInput}`}>
              <label className={petStyles.label}>
                Raça <span>*</span>
              </label>
              <select
                className={petStyles.input}
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
            <div className={`${petStyles.field} ${petStyles.narrowInput}`}>
              <label className={petStyles.label}>
                Cor <span>*</span>
              </label>
              <input
                type="text"
                name="color"
                className={petStyles.input}
                onChange={handleInputChange}
              />
            </div>
            <div className={`${petStyles.field} ${petStyles.narrowInput}`}>
              <label className={petStyles.label}>
                Porte <span>*</span>
              </label>
              <select
                className={petStyles.input}
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
              >
                <option value="">Selecione o Porte</option>
                {sizes.map((size) => (
                  <option key={size.id} value={size.id}>
                    {size.sizeType}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Observações */}
          <div className={petStyles.field}>
            <label className={petStyles.label}>Observações</label>
            <textarea
              name="observations"
              className={petStyles.fullTextarea}
              onChange={handleInputChange}
              rows="3"
            ></textarea>
          </div>
        </div>

        {/* Botões */}
        <div className={petStyles.buttonGroup}>
          <button className={petStyles.cancelButton} onClick={onClose}>
            Cancelar
          </button>
          <button className={petStyles.submitButton} onClick={handleSubmit}>
            Cadastrar
          </button>
        </div>
      </div>
    </>
  );
};

export default PetModal;
