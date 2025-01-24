const db = require("../models");
const { body, validationResult } = require("express-validator");

// Create a category
exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await db.Category.create({ name });
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//validqtion category ك
exports.validateCategory = [
  body("name")
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage("Name must be between 3 and 50 characters."),
];

//all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await db.Category.findAll();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};