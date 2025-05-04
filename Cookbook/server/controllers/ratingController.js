const Rating = require("../models/Rating");
exports.addRating = async (req, res) => {
  try {
    const rating = await Rating.create({
      recipeId: req.params.recipeId,
      userId: req.body.userId,
      value: req.body.value
    });
    res.status(201).json(rating);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
exports.getAverageRating = async (req, res) => {
  try {
    const ratings = await Rating.find({ recipeId: req.params.recipeId });
    if (ratings.length === 0) return res.json({ average: 0 });
    const avg = ratings.reduce((sum, r) => sum + r.value, 0) / ratings.length;
    res.json({ average: avg.toFixed(2), count: ratings.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
