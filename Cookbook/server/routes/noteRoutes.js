const express = require("express");
const router = express.Router();
const noteController = require("../controllers/noteController");
router.post("/:recipeId", noteController.addNote);
router.get("/:recipeId", noteController.getNotes);
module.exports = router;
