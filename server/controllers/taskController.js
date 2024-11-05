import * as taskModel from "../models/taskModel.js";

// Fetch / Read all tasks
export const getTasks = async (req, res) => {
  try {
    const currentPage = parseInt(req.query.page) || 1; // Offset
    const pagePerSheet = parseInt(req.query.page_per_sheet) || 3; // Limit

    // Get the Limit task aand the count Data
    const [limitData, countData] = await Promise.all([
      taskModel.getLimitTasks(pagePerSheet, currentPage),
      taskModel.getCountTasks(),
    ]);

    const response = {
      result: limitData,
      page: currentPage,
      totalPages: Math.ceil(countData[0].totalPages / pagePerSheet),
      dataLength: countData[0].totalPages,
    };

    res.json(response);
  } catch (err) {
    res.json(err);
  }
};

// Create a new task
export const createTask = async (req, res) => {
  const { order, title, description, date_input, deadline } = req.body;
  const taskData = {
    order,
    title,
    description,
    date_input,
    deadline,
    checked: false, // Default checked value
  };

  try {
    const response = await taskModel.createTask(taskData);
    res.send({ id: response.insertId, ...taskData });
  } catch (err) {
    res.json(err);
  }
};

// Update a task and checked state (by axios.patch)
export const updateTask = async (req, res) => {
  const { id } = req.params;
  const taskData = req.body;

  try {
    const response = await taskModel.updateTask(id, taskData);
    res.send(response);
  } catch (err) {
    res.json(err);
  }
};

// Update task order after drag and drop
export const updateTasksOrder = (req, res) => {
  const reorderedList = req.body;

  try {
    for (const task of reorderedList) {
      taskModel.updateTaskOrder(task);
    }

    res.send("Order updated successfully!");
  } catch (err) {
    res.json(err);
  }
};

// Delete a task
export const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await taskModel.deleteTask(id);
    res.send(result);
  } catch (err) {
    res.json(err);
  }
};
