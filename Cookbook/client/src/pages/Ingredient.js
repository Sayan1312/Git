import React, { useState, useEffect } from "react";
import { Button, ListGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import CreateIngredientForm from '../components/CreateIngredientForm';
import EditIngredientForm from "../components/EditIngredientForm";

const Ingredient = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (recipeId) {
          const recipeRes = await axios.get(`http://localhost:5000/api/recipes/${recipeId}`);
          const ingredientRes = await axios.get(`http://localhost:5000/api/ingredients/recipe/${recipeId}`);
          setRecipe(recipeRes.data);
          setIngredients(ingredientRes.data);
        } else {
          const res = await axios.get('http://localhost:5000/api/ingredients');
          setIngredients(res.data);
        }
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [recipeId]);

  const handleCreateIngredient = async (newIngredient) => {
    try {
      const res = await axios.post("http://localhost:5000/api/ingredients", {
        ...newIngredient,
        recipeId: recipeId,
      });
      setIngredients([...ingredients, res.data]);
      setShowCreateModal(false);
    } catch (error) {
      console.error("Ошибка при создании ингредиента:", error);
    }
  };

  const handleDeleteIngredient = async (ingredientId) => {
    try {
      await axios.delete(`http://localhost:5000/api/ingredients/${ingredientId}`);
      setIngredients(ingredients.filter((i) => i._id !== ingredientId));
      setSelectedIngredient(null);
    } catch (error) {
      console.error("Ошибка при удалении ингредиента:", error);
    }
  };

  const handleEditIngredient = async (editedIngredient) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/ingredients/${editedIngredient._id}`,
        editedIngredient
      );
      setIngredients(
        ingredients.map((i) =>
          i._id === editedIngredient._id ? res.data : i
        )
      );
      setShowEditModal(false);
      setSelectedIngredient(null);
    } catch (error) {
      console.error("Ошибка при редактировании ингредиента:", error);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1450px', margin: 'auto' }}>
      <h2>Ingredients Page</h2>
      {recipeId && <h5>Recipe ID: {recipeId}</h5>}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {recipe && (
            <>
              <h3>Recipe Details</h3>
              <p><strong>Name:</strong> {recipe.title}</p>
              <p><strong>Description:</strong> {recipe.instructions}</p>
            </>
          )}

          <h3 className="mt-4">Ingredients</h3>
          <Button
            className="btn btn-primary btn-lg"
            style={{ float: "right", marginBottom: "20px" }}
            onClick={() => setShowCreateModal(true)}
          >
            Create Ingredient
          </Button>

          <ListGroup>
            {ingredients.map((ingredient) => (
              <ListGroup.Item key={ingredient._id}>
                <strong>{ingredient.name}</strong> — Quantity: {ingredient.quantity?.amount ?? 1} {ingredient.quantity?.unit ?? ''}
                <div className="float-end">
                  <Button variant="danger" size="sm" onClick={() => handleDeleteIngredient(ingredient._id)}>
                    Delete
                  </Button>{' '}
                  <Button variant="warning" size="sm" onClick={() => {
                    setSelectedIngredient(ingredient);
                    setShowEditModal(true);
                  }}>
                    Edit
                  </Button>{' '}
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>

          <CreateIngredientForm
            show={showCreateModal}
            handleClose={() => {
              setShowCreateModal(false);
              setSelectedIngredient(null);
            }}
            handleCreateingredient={(newIngredient) => {
              handleCreateIngredient({ ...newIngredient, recipeId });
            }}
          />

          <EditIngredientForm
            show={showEditModal}
            handleClose={() => {
              setShowEditModal(false);
              setSelectedIngredient(null);
            }}
            handleEditingredient={handleEditIngredient}
            ingredient={selectedIngredient}
          />

        </>
      )}
    </div>
  );
};

export default Ingredient;
