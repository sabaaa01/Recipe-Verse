const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe');

const multer = require('multer');
const path = require('path');

// 🧃 Multer Storage Setup
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// ✅ Create a new recipe (with image)
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const newRecipe = new Recipe({
      title: req.body.title,
      ingredients: JSON.parse(req.body.ingredients),
      instructions: req.body.instructions,
      image: req.file ? req.file.filename : null,
      createdBy: req.userId || null
    });

    const savedRecipe = await newRecipe.save();
    res.status(201).json(savedRecipe);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all recipes
router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find().populate('createdBy', 'email'); // Optional: show who created it
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single recipe by ID
router.get('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a recipe
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { title, instructions } = req.body;
    const ingredients = JSON.parse(req.body.ingredients);

    // Build the updated data object
    const updatedData = {
      title,
      instructions,
      ingredients,
    };

    // If new image is uploaded, add it to the update
    if (req.file) {
      updatedData.image = req.file.filename;  // Store just the filename, no prefix
    }

    // Find and update the recipe
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    // If recipe not found
    if (!updatedRecipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    res.status(200).json(updatedRecipe);
  } catch (err) {
    console.error('Update failed:', err);
    res.status(500).json({ error: 'Failed to update recipe' });
  }
});

// Delete a recipe
router.delete('/:id', async (req, res) => {
  try {
    await Recipe.findByIdAndDelete(req.params.id);
    res.json({ message: 'Recipe deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
