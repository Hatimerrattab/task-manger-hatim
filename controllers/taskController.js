const db = require("../models");
const { body, validationResult } = require("express-validator");

//affiche all lists
exports.listTasks = async (req, res) => {
  try {
    const tasks = await db.Task.findAll();
    res.render("tasks/list", { tasks });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.renderCreateTaskForm = (req, res) => {
  res.render("tasks/create");
}; 

//create task
exports.createTask = async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const task = await db.Task.create({ title, description, category });
    res.redirect("/tasks");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//Validation task create
exports.validateTask = [
  body("title")
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage("Title must be between 3 and 100 characters."),
  body("description")
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage("Description must be between 10 and 500 characters."),
  body("category")
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage("Category must be between 3 and 50 characters."),
];


exports.renderEditTaskForm = async (req, res) => {
  try {
    const task = await db.Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.render("tasks/edit", { task });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update task
exports.updateTask = async (req, res) => {
  try {
    const { title, description, category, isCompleted } = req.body;
    const task = await db.Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    task.title = title;
    task.description = description;
    task.category = category;
    task.isCompleted = isCompleted === "on";
    await task.save();
    res.redirect("/tasks");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//delete task
exports.renderDeleteTaskConfirmation = async (req, res) => {
  try {
    const task = await db.Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.render("tasks/delete", { task });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await db.Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    task.isDeleted = true;
    await task.save();
    res.redirect("/tasks");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};