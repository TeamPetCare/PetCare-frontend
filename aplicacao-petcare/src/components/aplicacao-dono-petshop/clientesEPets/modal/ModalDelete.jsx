import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalDelete({ show, handleClose, onDelete  }) {
  const handleDeleteClick = () => {
    onDelete(); // Chama a função passada como prop
    handleClose(); // Fecha o modal após a exclusão
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Exclusão de Registros!</Modal.Title>
      </Modal.Header>
      <Modal.Body>Tem certeza de que deseja excluir os itens selecionados?</Modal.Body>
      <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
      <Button variant="danger" onClick={handleDeleteClick}>Excluir</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalDelete;
