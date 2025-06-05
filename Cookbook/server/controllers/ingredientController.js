const Ingredient = require('../models/ingredientModel');

// Создать ингредиент
exports.createIngredient = async (req, res) => {
  try {
    const ingredient = new Ingredient(req.body);
    const saved = await ingredient.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Получить все ингредиенты
exports.getAllIngredients = async (req, res) => {
  try {
    const ingredients = await Ingredient.find();
    res.json(ingredients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Получить ингредиенты по рецепту
exports.getIngredientsByRecipeId = async (req, res) => {
  try {
    const ingredients = await Ingredient.find({ recipeId: req.params.recipeId });
    res.json(ingredients);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Обновить ингредиент
exports.updateIngredient = async (req, res) => {
  try {
    const updated = await Ingredient.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Удалить ингредиент
exports.deleteIngredient = async (req, res) => {
  try {
    await Ingredient.findByIdAndDelete(req.params.id);
    res.json({ message: 'Ingredient deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
