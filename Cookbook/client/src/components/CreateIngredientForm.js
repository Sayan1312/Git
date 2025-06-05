import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const CreateIngredientForm = ({ show, handleClose, handleCreateingredient }) => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState({ amount: 1, unit: "gr" });

  useEffect(() => {
    if (!show) {
      // Очистка формы при закрытии модального окна
      setName("");
      setQuantity({ amount: 1, unit: "gr" });
    }
  }, [show]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Name is required");
      return;
    }

    if (quantity.amount < 1) {
      alert("Quantity amount must be at least 1");
      return;
    }

    if (!quantity.unit.trim()) {
      alert("Quantity unit is required");
      return;
    }

    const newIngredient = {
      id: Date.now(), // уникальный ID для временного использования на фронте
      name,
      quantity, // объект с amount и unit
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
            <Form.Label>Quantity Amount</Form.Label>
            <Form.Control
              type="number"
              min={1}
              value={quantity.amount}
              onChange={(e) =>
                setQuantity({ ...quantity, amount: parseInt(e.target.value, 10) || 1 })
              }
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Quantity Unit</Form.Label>
            <Form.Control
              type="text"
              value={quantity.unit}
              onChange={(e) => setQuantity({ ...quantity, unit: e.target.value })}
              placeholder="e.g. gr, мl, pi"
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
