const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  ingredients: [{ name: String, quantity: String }],
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model("Recipe", recipeSchema);