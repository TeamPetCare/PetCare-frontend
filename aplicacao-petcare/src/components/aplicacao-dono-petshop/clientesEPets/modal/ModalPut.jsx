import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styles from './ModalPut.module.css'; // Supondo que você tenha esse arquivo CSS

function ModalPut({ showPut, handleClosePut, onPut, dados = [], title = "Editar Dados" }) {
    const handlePutClick = () => {
        onPut(); // Chama a função passada como prop
        handleClosePut(); // Fecha o modal após a edição
    };

    return (
        <Modal
            show={showPut} onHide={handleClosePut}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
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
                                        <input
                                            type="text"
                                            defaultValue={item[key]}
                                            className="form-control"
                                            style={{ marginTop: '5px' }}
                                        />
                                    </div>
                                ))}
                                <hr /> {/* Linha para separar cada cliente/pet */}
                            </div>
                        ))}
                    </div>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClosePut}>Fechar</Button>
                <Button variant="primary" onClick={handlePutClick}>Salvar Alterações</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalPut;
