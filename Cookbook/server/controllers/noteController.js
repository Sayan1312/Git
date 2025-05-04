const Note = require("../models/Note");
exports.addNote = async (req, res) => {
  try {
    const note = await Note.create({
      recipeId: req.params.recipeId,
      userId: req.body.userId,
      text: req.body.text
    });
    res.status(201).json(note);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ recipeId: req.params.recipeId });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};