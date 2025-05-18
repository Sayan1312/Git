import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const CreateIngredientForm = ({ show, handleClose, handleCreateingredient }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!show) {
      // Очистка формы при закрытии модального окна
      setName("");
      setDescription("");
      setQuantity(1);
    }
  }, [show]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Name is required");
      return;
    }

    if (quantity < 1) {
      alert("Quantity must be at least 1");
      return;
    }

    const newIngredient = {
      id: Date.now(), // простой уникальный ID
      name,
      description,
      quantity,
    };

    handleCreateingredient(newIngredient);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Create Ingredient</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter ingredient name"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value, 10) || 1)}
              required
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Create
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default CreateIngredientForm;
