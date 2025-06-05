import React, { useState, useEffect } from "react";
import { Form, Button, Modal } from "react-bootstrap";

const EditIngredientForm = ({ show, handleClose, handleEditingredient, ingredient }) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(1);
  const [unit, setUnit] = useState("");

  useEffect(() => {
    if (ingredient) {
      setName(ingredient.name || "");
      setAmount(ingredient.quantity?.amount || 1);
      setUnit(ingredient.quantity?.unit || "");
    }
  }, [ingredient]);

  const handleEditClick = () => {
    if (!name.trim() || amount <= 0 || !unit.trim()) {
      alert("Все поля обязательны");
      return;
    }

    handleEditingredient({
      _id: ingredient._id,
      name,
      quantity: {
        amount,
        unit,
      },
    });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Ingredient</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="editIngredientName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="editIngredientAmount">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              value={amount}
              min={0.01}
              step={0.01}
              onChange={(e) => setAmount(parseFloat(e.target.value))}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="editIngredientUnit">
            <Form.Label>Unit</Form.Label>
            <Form.Control
              type="text"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              placeholder="например, г, мл, шт"
              required
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleEditClick}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditIngredientForm;
