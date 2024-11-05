import express from "express";
import {
  getTasks,
  createTask,
  updateTask,
  updateTasksOrder,
  deleteTask,
} from "../controllers/taskController.js";

const router = express.Router();

// GET - Fetch all tasks
router.get("/", getTasks);

// POST - Create a task
router.post("/add", createTask);

// PATCH - Update a task
router.patch("/update/:id", updateTask);

// PATCH - Update the checked state
router.patch("/:id", updateTask);

// PUT - Update task order after drag and drop
router.put("/", updateTasksOrder);

// DELETE - Delete a task
router.delete("/delete/:id", deleteTask);

export default router;
