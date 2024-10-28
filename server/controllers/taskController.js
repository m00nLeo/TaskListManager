import * as taskModel from "../models/taskModel.js";

// Fetch / Read all tasks
export const getTasks = (req, res) => {
  const currentPage = parseInt(req.query.page) || 1; // Offset
  const pagePerSheet = parseInt(req.query.page_per_sheet) || 3; // Limit

  taskModel.getLimitTasks(pagePerSheet, currentPage, (errLimit, limitData) => {
    if (errLimit) return res.json(errLimit);
    taskModel.getCountTasks((err, result) => {
      if (err) return res.json(err);
      const response = {
        data: limitData,
        result: limitData,
        page: currentPage,
        totalPages: Math.ceil(result[0].totalPages / pagePerSheet),
      };
      return res.json(response);
    });
  });
};

// Create a new task
export const createTask = (req, res) => {
  const { order, title, description, date_input, deadline } = req.body;
  const taskData = {
    order,
    title,
    description,
    date_input,
    deadline,
    checked: false, // Default checked value
  };

  taskModel.createTask(taskData, (err, result) => {
    if (err) return res.json(err);
    res.send({ id: result.insertId, ...taskData });
  });
};

// Update a task
export const updateTask = (req, res) => {
  const { id } = req.params;
  const taskData = req.body;

  taskModel.updateTask(id, taskData, (err, result) => {
    if (err) return res.json(err);
    res.send(result);
  });
};

// Update task order after drag and drop
export const updateTasksOrder = (req, res) => {
  const reorderedList = req.body;

  reorderedList.map((task) => {
    taskModel.updateTaskOrder(task, (err) => {
      if (err) return res.json(err);
    });
  });

  res.status(200).send("Order updated successfully!");
};

// Update checked state
export const updateChecked = (req, res) => {
  const { id } = req.params;
  const { checked } = req.body;

  taskModel.updateTaskChecked(id, checked, (err, result) => {
    if (err) return res.json(err);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json({ message: "Task updated successfully" });
  });
};

// Delete a task
export const deleteTask = (req, res) => {
  const { id } = req.params;
  taskModel.deleteTask(id, (err, result) => {
    if (err) return res.json(err);
    res.send(result);
  });
};
