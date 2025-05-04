const express = require("express");
const router = express.Router();
const ratingController = require("../controllers/ratingController");
router.post("/:recipeId", ratingController.addRating);
router.get("/:recipeId", ratingController.getAverageRating);
module.exports = router;
