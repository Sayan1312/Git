import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

function CreateItems({ show, handleClose, handleCreateItem }) {
  const [newItemName, setNewItemName] = useState('');
  const [newItemQuantity, setNewItemQuantity] = useState('');

  const handleCreateClick = () => {
    handleCreateItem(newItemName, newItemQuantity);
    setNewItemName('');
    setNewItemQuantity('');
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title style={{ fontSize: '2rem' }}>Create Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="newItemName">
            <Form.Label style={{ fontSize: '1.5rem' }}>Item Name</Form.Label>
            <Form.Control
              type="text"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              style={{ fontSize: '1.2rem', height: '50px' }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="newItemDescription">
            <Form.Label style={{ fontSize: '1.5rem' }}>Quantity</Form.Label>
         <input class="form-control" type="number" onChange={(e) => setNewItemQuantity(e.target.value)} />
         </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} style={{ fontSize: '1.2rem', padding: '10px 20px' }}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleCreateClick} style={{ fontSize: '1.2rem', padding: '10px 20px' }}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateItems;