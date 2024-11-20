import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styles from './ModalPut.module.css'; // Supondo que você tenha esse arquivo CSS

function ModalPut({
    showPut,
    handleClosePut,
    onPut,
    dados = [],
    title = "Editar Dados",
    nonEditableFields = [] // Array de campos que não devem ser editáveis
}) {
    const handlePutClick = () => {
        onPut(); // Chama a função passada como prop
        handleClosePut(); // Fecha o modal após a edição
    };


    // converter os dados para o tipo especificado no DTO, precisa?
    const handleShowPut = (cliente) => {
        setClienteAtual({
          id: cliente.id,
          cliente: cliente.cliente,
          WhatsApp: cliente.WhatsApp,
          rua: cliente.rua,
          numero: cliente.numero,
          bairro: cliente.bairro,
          complemento: cliente.complemento,
          cep: cliente.cep,
          numeroDePets: cliente.numeroDePets,
          dtUltimoAgendamento: cliente.dtUltimoAgendamento,
          totalAgendamentos: cliente.totalAgendamentos
        });
      };
      
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setClienteAtual((prevState) => ({
          ...prevState,
          [name]: value
        }));
      };
      

    return (
        <Modal
            show={showPut}
            onHide={handleClosePut}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter" className={styles["title"]}>
                    {title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {dados.length > 0 && (
                    <div>
                        {dados.map((item, index) => (
                            <div key={index} className={styles.container}>
                                {Object.keys(item).map((key, i) => (
                                    <div key={i} className={styles.inputGroup}>
                                        <label>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
                                        {nonEditableFields.includes(key) ? (
                                            // Campo não editável, mas estilizado como os demais
                                            <input
                                                type="text"
                                                value={item[key]}
                                                readOnly // Torna o campo somente leitura
                                                disabled
                                                style={{ opacity: 0.5 }}
                                            />
                                        ) : (
                                            // Campo editável
                                            <input
                                                type="text"
                                                defaultValue={item[key]}
                                                style={{ marginTop: '5px' }}
                                            />
                                        )}
                                    </div>
                                ))}

                                <hr /> {/* Linha para separar cada cliente/pet */}
                            </div>
                        ))}
                    </div>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handlePutClick} className={styles["cancelButton"]}>Fechar</Button>
                <Button variant="secondary" onClick={handleClosePut} className={styles["submitButton"]}>Salvar Alterações</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalPut;
