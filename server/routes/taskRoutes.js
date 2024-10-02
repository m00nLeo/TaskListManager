import express from "express";
import {
  getTasks,
  createTask,
  updateTask,
  updateTasksOrder,
  updateChecked,
  deleteTask,
} from "../controllers/taskController.js";

const router = express.Router();

// GET - Fetch all tasks
router.get("/", getTasks);

// POST - Create a task
router.post("/add", createTask);

// PUT - Update a task
router.put("/update/:id", updateTask);

// PUT - Update task order after drag and drop
router.put("/", updateTasksOrder);

// PUT - Update the checked state
router.put("/:id", updateChecked);

// DELETE - Delete a task
router.delete("/:id", deleteTask);

export default router;
