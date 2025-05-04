const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
    recipeId: { type: mongoose.Schema.Types.ObjectId, ref: "Recipe", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    value: { type: Number, required: true, min: 1, max: 5 }
  });
  module.exports = mongoose.model("Rating", ratingSchema);