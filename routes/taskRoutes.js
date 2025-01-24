const express = require("express");
const taskController = require("../controllers/taskController");

const router = express.Router();

// Task Routes
router.get("/", taskController.listTasks);
router.get("/create", taskController.renderCreateTaskForm);
router.post("/", taskController.validateTask, taskController.createTask);
router.get("/:id/edit", taskController.renderEditTaskForm);
router.post("/:id", taskController.validateTask, taskController.updateTask);
router.get("/:id/delete", taskController.renderDeleteTaskConfirmation);
router.post("/:id/delete", taskController.deleteTask);

module.exports = router;