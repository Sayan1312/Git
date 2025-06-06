import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

function CreateRecipe({ show, handleClose, handleCreate }) {
  const [newRecipeName, setNewRecipeName] = useState('');
  const [newRecipeDescription, setNewRecipeDescription] = useState('');
  const [cookingTime, setCookingTime] = useState('');

  const handleCreateClick = () => {
    if (!newRecipeName.trim() || !newRecipeDescription.trim() || cookingTime <= 0) {
      alert("Все поля обязательны и время готовки должно быть положительным числом");
      return;
    }

    handleCreate(newRecipeName, newRecipeDescription, Number(cookingTime));
    setNewRecipeName('');
    setNewRecipeDescription('');
    setCookingTime('');
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title style={{ fontSize: '2rem' }}>Create Recipe</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="newRecipeName">
            <Form.Label style={{ fontSize: '1.5rem' }}>Recipe Name</Form.Label>
            <Form.Control
              type="text"
              value={newRecipeName}
              onChange={(e) => setNewRecipeName(e.target.value)}
              style={{ fontSize: '1.2rem', height: '50px' }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="newRecipeDescription">
            <Form.Label style={{ fontSize: '1.5rem' }}>Recipe Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              value={newRecipeDescription}
              onChange={(e) => setNewRecipeDescription(e.target.value)}
              style={{ fontSize: '1.2rem', height: '100px' }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="cookingTime">
            <Form.Label style={{ fontSize: '1.5rem' }}>Cooking Time (minutes)</Form.Label>
            <Form.Control
              type="number"
              min="1"
              value={cookingTime}
              onChange={(e) => setCookingTime(e.target.value)}
              style={{ fontSize: '1.2rem', height: '50px' }}
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

export default CreateRecipe;