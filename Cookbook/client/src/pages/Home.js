import React, { useState } from "react";
import { Button, Card, Modal, Form, Row, Col } from "react-bootstrap";
import CreateRecipe from "../components/CreateRecipe";
import { Link } from "react-router-dom";
import Recipes from "../recipe_data.json";

const Home = () => {
  const [recipes, setRecipes] = useState(
    Recipes.map((recipe) => ({
      ...recipe,
      rating: recipe.rating ?? 0,
    }))
  );

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateRecipeId, setUpdateRecipeId] = useState(null);
  const [updateRecipeName, setUpdateRecipeName] = useState("");
  const [updateRecipeDescription, setUpdateRecipeDescription] = useState("");

  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleDelete = (recipeId) => {
    setRecipes((prevRecipes) =>
      prevRecipes.filter((recipe) => recipe.id !== recipeId)
    );
  };

  const handleUpdate = () => {
    setRecipes((prevRecipes) =>
      prevRecipes.map((recipe) =>
        recipe.id === updateRecipeId
          ? {
              ...recipe,
              name: updateRecipeName,
              description: updateRecipeDescription,
            }
          : recipe
      )
    );
    setShowUpdateModal(false);
  };

  const handleShowCreateModal = () => setShowCreateModal(true);
  const handleCloseCreateModal = () => setShowCreateModal(false);

  const handleCreateRecipe = (newRecipeName, newRecipeDescription) => {
    const newRecipe = {
      id: recipes.length + 1,
      name: newRecipeName,
      description: newRecipeDescription,
      rating: 0,
    };
    setRecipes([...recipes, newRecipe]);
    setShowCreateModal(false);
  };

  const handleSetRating = (id, rating) => {
    if (rating < 0 || rating > 5) return;

    setRecipes((prevRecipes) =>
      prevRecipes.map((recipe) =>
        recipe.id === id ? { ...recipe, rating } : recipe
      )
    );
  };

  const renderStars = (id, currentRating) => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          style={{
            cursor: "pointer",
            color: i <= currentRating ? "#ffc107" : "#e4e5e9",
            fontSize: "1.5rem",
          }}
          onClick={() => handleSetRating(id, i)}
        >
          ★
        </span>
      );
    }

    return <div>{stars}</div>;
  };

  return (
    <div style={{ background: "#D3D3D3", padding: "20px", minHeight: "100vh" }}>
      <h2 className="mb-4">Home Page</h2>

      <div className="mb-3">
        <Button
          variant="light"
          style={{ fontSize: "1.1rem", padding: "12px 14px" }}
          onClick={handleShowCreateModal}
          className="mt-3"
        >
          Create Recipe
        </Button>
      </div>

      <div style={{ background: "#FFFFFF", padding: "40px", borderRadius: "3px" }}>
        <h3 className="mb-3">Example Recipes</h3>

        <Row>
          {recipes.map((recipe) => (
            <Col key={recipe.id} lg={4} className="mb-4">
              <Card style={{ background: "#C0C0C0" }}>
                <Card.Body>
                  <Card.Title>{recipe.name}</Card.Title>
                  <Card.Text>{recipe.description}</Card.Text>

                  <div className="mb-2">
                    <strong>Rating:</strong> {renderStars(recipe.id, recipe.rating)}
                  </div>

                  <Link to={`/${recipe.id}`}>
                    <Button
                      variant="info"
                      className="ml-2"
                      style={{
                        fontSize: "1.1rem",
                        padding: "5px 12px",
                        marginBottom: "10px",
                        marginRight: "7px",
                      }}
                    >
                      Detail
                    </Button>
                  </Link>

                  <Button
                    variant="warning"
                    className="ml-2"
                    style={{
                      fontSize: "1.1rem",
                      padding: "5px 12px",
                      marginBottom: "10px",
                      marginRight: "5px",
                    }}
                    onClick={() => {
                      setShowUpdateModal(true);
                      setUpdateRecipeId(recipe.id);
                      setUpdateRecipeName(recipe.name);
                      setUpdateRecipeDescription(recipe.description);
                    }}
                  >
                    Update
                  </Button>

                  <Button
                    variant="danger"
                    className="ml-2"
                    style={{
                      fontSize: "1.1rem",
                      padding: "5px 12px",
                      marginBottom: "10px",
                    }}
                    onClick={() => handleDelete(recipe.id)}
                  >
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      <CreateRecipe
        show={showCreateModal}
        handleClose={handleCloseCreateModal}
        handleCreate={handleCreateRecipe}
      />

      <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)} dialogClassName="modal-90w">
        <Modal.Header closeButton>
          <Modal.Title>Update Recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="updateRecipeName">
              <Form.Label>Recipe Name</Form.Label>
              <Form.Control
                type="text"
                value={updateRecipeName}
                onChange={(e) => setUpdateRecipeName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="updateRecipeDescription">
              <Form.Label>Recipe Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={updateRecipeDescription}
                onChange={(e) => setUpdateRecipeDescription(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowUpdateModal(false)}
            style={{ fontSize: "1.1rem", padding: "10px 20px" }}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleUpdate}
            style={{ fontSize: "1.1rem", padding: "10px 20px" }}
          >
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Home;
