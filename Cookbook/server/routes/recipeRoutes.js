const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

// Get all recipes
router.get('/', recipeController.getRecipes);

// Get a recipe by ID
router.get('/:id', recipeController.getRecipeById);

// Create a new recipe
router.post('/', recipeController.createRecipe);

// Update a recipe by ID
router.put('/:id', recipeController.updateRecipe);

// Delete a recipe by ID
router.delete('/:id', recipeController.deleteRecipe);

module.exports = router;
