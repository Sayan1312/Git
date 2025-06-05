import React, { useState, useEffect } from "react";
import { Button, Card, Modal, Form, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import CreateRecipe from "../components/CreateRecipe";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateRecipeId, setUpdateRecipeId] = useState(null);
  const [updateRecipeName, setUpdateRecipeName] = useState("");
  const [updateRecipeDescription, setUpdateRecipeDescription] = useState("");
  const [updateRecipeCookingTime, setUpdateRecipeCookingTime] = useState(0);

  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/recipes")
      .then((res) => setRecipes(res.data))
      .catch((err) => {
        console.error("Ошибка загрузки рецептов:", err);
        alert("Не удалось загрузить рецепты.");
      });
  }, []);

  const handleDelete = async (recipeId) => {
    try {
      await axios.delete(`http://localhost:5000/api/recipes/${recipeId}`);
      setRecipes((prev) => prev.filter((r) => r._id !== recipeId));
    } catch (err) {
      console.error("Ошибка при удалении рецепта:", err);
      alert("Не удалось удалить рецепт.");
    }
  };

  const handleUpdate = async () => {
    try {
      const updatedRecipe = {
        name: updateRecipeName,
        description: updateRecipeDescription,
        cookingTime: updateRecipeCookingTime,
      };

      const res = await axios.put(
        `http://localhost:5000/api/recipes/${updateRecipeId}`,
        updatedRecipe
      );

      setRecipes((prev) =>
        prev.map((r) => (r._id === updateRecipeId ? res.data : r))
      );
      setShowUpdateModal(false);
    } catch (err) {
      console.error("Ошибка при обновлении рецепта:", err);
      alert("Не удалось обновить рецепт.");
    }
  };

  const handleShowCreateModal = () => setShowCreateModal(true);
  const handleCloseCreateModal = () => setShowCreateModal(false);

  const handleCreateRecipe = async (newName, newDescription, newCookingTime) => {
    try {
      const res = await axios.post("http://localhost:5000/api/recipes", {
        name: newName,
        description: newDescription,
        cookingTime: newCookingTime,
        rating: 0,
      });

      setRecipes([...recipes, res.data]);
      setShowCreateModal(false);
    } catch (err) {
      console.error("Ошибка при создании рецепта:", err);
      alert("Не удалось создать рецепт.");
    }
  };

  const handleSetRating = async (id, rating) => {
    if (rating < 0 || rating > 5) return;

    try {
      const recipe = recipes.find((r) => r._id === id);
      const updated = { ...recipe, rating };

      const res = await axios.put(`http://localhost:5000/api/recipes/${id}`, updated);

      setRecipes((prevRecipes) =>
        prevRecipes.map((r) => (r._id === id ? res.data : r))
      );
    } catch (err) {
      console.error("Ошибка при обновлении рейтинга:", err);
      alert("Не удалось обновить рейтинг.");
    }
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
        <h3 className="mb-3">Recipes</h3>

        <Row>
          {recipes.map((recipe) => (
            <Col key={recipe._id} lg={4} className="mb-4">
              <Card style={{ background: "#C0C0C0" }}>
                <Card.Body>
                  <Card.Title>{recipe.name}</Card.Title>
                  <Card.Text>{recipe.description}</Card.Text>
                  <Card.Text><strong>Cooking Time:</strong> {recipe.cookingTime || 0} minutes</Card.Text>

                  <div className="mb-2">
                    <strong>Rating:</strong> {renderStars(recipe._id, recipe.rating || 0)}
                  </div>

                  <Link to={`/${recipe._id}`}>
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
                      setUpdateRecipeId(recipe._id);
                      setUpdateRecipeName(recipe.name);
                      setUpdateRecipeDescription(recipe.description);
                      setUpdateRecipeCookingTime(recipe.cookingTime || 0);
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
                    onClick={() => handleDelete(recipe._id)}
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

            <Form.Group className="mb-3" controlId="updateRecipeCookingTime">
              <Form.Label>Cooking Time (minutes)</Form.Label>
              <Form.Control
                type="number"
                value={updateRecipeCookingTime}
                onChange={(e) =>
                  setUpdateRecipeCookingTime(parseInt(e.target.value, 10) || 0)
                }
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

