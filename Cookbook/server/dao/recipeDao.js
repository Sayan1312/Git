const Recipe = require('../models/recipeModel');

const recipeDao = {
  // Get all recipes
  async getAllRecipes() {
    return await Recipe.find().populate('author');
  },

  // Get a recipe by ID
  async getRecipeById(id) {
    return await Recipe.findById(id).populate('author');
  },

  // Create a new recipe
  async createRecipe(data) {
    const recipe = new Recipe(data);
    return await recipe.save();
  },

  // Update a recipe by ID
  async updateRecipe(id, data) {
    return await Recipe.findByIdAndUpdate(id, data, { new: true });
  },

  // Delete a recipe by ID
  async deleteRecipe(id) {
    return await Recipe.findByIdAndDelete(id);
  }
};

module.exports = recipeDao;
