const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  cookingTime: { type: Number, required: true }, // ← Новое поле
  rating: { type: Number, default: 0 }
});

module.exports = mongoose.model('Recipe', recipeSchema);