import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

function CreateLists({ show, handleClose, handleCreate }) {
  const [newListName, setNewListName] = useState('');
  const [newListDescription, setNewListDescription] = useState('');

  const handleCreateClick = () => {
    handleCreate(newListName, newListDescription);
    setNewListName('');
    setNewListDescription('');
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title style={{ fontSize: '2rem' }}>Create List</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="newListName">
            <Form.Label style={{ fontSize: '1.5rem' }}>List Name</Form.Label>
            <Form.Control
              type="text"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              style={{ fontSize: '1.2rem', height: '50px' }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="newListDescription">
            <Form.Label style={{ fontSize: '1.5rem' }}>List Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              value={newListDescription}
              onChange={(e) => setNewListDescription(e.target.value)}
              maxLength={50}
              style={{ fontSize: '1.2rem', height: '100px' }}
            />
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

export default CreateLists;