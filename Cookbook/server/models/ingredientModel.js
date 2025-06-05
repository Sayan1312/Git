const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: {
    amount: { type: Number, required: true },         // Например: 100
    unit: { type: String, required: true }            // Например: "г", "мл", "шт", "ложка"
  },
  recipeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', required: true }
});

module.exports = mongoose.model('Ingredient', ingredientSchema);
