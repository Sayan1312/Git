import React, { useState, useEffect } from "react";
import { Button, ListGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Recipes from '../recipe_data.json';
import Ingredients from '../ingredient_data.json';
import CreateIngredientForm from '../components/CreateIngredientForm';
import EditIngredientForm from "../components/EditIngredientForm";
import CommentForm from '../components/Comment';

const Ingredient = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      if (recipeId) {
        const foundRecipe = Recipes.find((r) => r.id === Number(recipeId));
        setRecipe(foundRecipe);
        setIngredients(Ingredients.filter((i) => i.recipeId === Number(recipeId)));
      } else {
        setIngredients(Ingredients);
      }
      setLoading(false);
    }, 1000);
  }, [recipeId]);

  const handleCreateIngredient = (newIngredient) => {
    setIngredients([...ingredients, newIngredient]);
    setShowCreateModal(false);
  };

  const handleDeleteIngredient = (ingredientId) => {
    setIngredients(ingredients.filter((i) => i.id !== ingredientId));
    setSelectedIngredient(null);
  };

  const handleEditIngredient = (editedIngredient) => {
    setIngredients(ingredients.map((i) =>
      i.id === editedIngredient.id ? { ...i, ...editedIngredient } : i
    ));
    setShowEditModal(false);
    setSelectedIngredient(null);
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
              <p><strong>Name:</strong> {recipe.name}</p>
              <p><strong>Description:</strong> {recipe.description}</p>
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
              <ListGroup.Item key={ingredient.id}>
                <strong>{ingredient.name}</strong> — Quantity: {ingredient.quantity ?? 1}
                <div>Description: {ingredient.description}</div>
                <div className="float-end">
                  <Button variant="danger" size="sm" onClick={() => handleDeleteIngredient(ingredient.id)}>
                    Delete
                  </Button>{' '}
                  <Button variant="warning" size="sm" onClick={() => {
                    setSelectedIngredient(ingredient);
                    setShowEditModal(true);
                  }}>
                    Edit
                  </Button>{' '}
                  <Button variant="info" size="sm" onClick={() => {
                    setSelectedIngredient(ingredient);
                    setShowCommentModal(true);
                  }}>
                    Comment
                  </Button>
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
              handleCreateIngredient({ ...newIngredient, recipeId: Number(recipeId) });
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

          <CommentForm
            show={showCommentModal}
            handleClose={() => {
              setShowCommentModal(false);
              setSelectedIngredient(null);
            }}
          />
        </>
      )}
    </div>
  );
};

export default Ingredient;
