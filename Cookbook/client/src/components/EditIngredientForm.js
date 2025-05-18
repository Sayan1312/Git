import React, { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";

const EditIngredientForm = ({ show, handleClose, handleEditIngredient }) => {
  const [editIngredientName, setEditIngredientName] = useState("");
  const [editIngredientDescription, setEditIngredientDescription] = useState("");

  const handleEditClick = () => {
    handleEditIngredient({
      name: editIngredientName,
      description: editIngredientDescription,
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
            <Form.Label>Ingredient Name</Form.Label>
            <Form.Control
              type="text"
              value={editIngredientName}
              onChange={(e) => setEditIngredientName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="editIngredientDescription">
            <Form.Label>Ingredient Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              value={editIngredientDescription}
              onChange={(e) => setEditIngredientDescription(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleEditClick}>
          Edit Ingredient
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditIngredientForm;
