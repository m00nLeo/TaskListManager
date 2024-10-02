import db from "../config/dbConfig.js";

// Fetch all tasks
export const getAllTasks = (callback) => {
  const sql = "SELECT * FROM list";
  db.query(sql, callback);
};

// Create a task
export const createTask = (taskData, callback) => {
  const sql =
    "INSERT INTO list (`order`, title, description, date_input, deadline, checked) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(
    sql,
    [
      taskData.order,
      taskData.title,
      taskData.description,
      taskData.date_input,
      taskData.deadline,
      taskData.checked,
    ],
    callback
  );
};

// Update a task
export const updateTask = (id, taskData, callback) => {
  const sql =
    "UPDATE list SET title = ?, description = ?, date_input = ?, deadline = ? WHERE id = ?";
  db.query(
    sql,
    [
      taskData.title,
      taskData.description,
      taskData.date_input,
      taskData.deadline,
      id,
    ],
    callback
  );
};

// Update order and checked state
export const updateTaskOrder = (taskData, callback) => {
  const sql =
    "UPDATE list SET `order` = ?, title = ?, description = ?, date_input = ?, deadline = ?, checked = ? WHERE id = ?";
  db.query(
    sql,
    [
      taskData.order,
      taskData.title,
      taskData.description,
      taskData.date_input,
      taskData.deadline,
      taskData.checked,
      taskData.id,
    ],
    callback
  );
};

// Update the checked state
export const updateTaskChecked = (id, checked, callback) => {
  const sql = `UPDATE list SET checked = ? WHERE id = ?`;
  db.query(sql, [checked ? 1 : 0, id], callback);
};

// Delete a task
export const deleteTask = (id, callback) => {
  const sql = "DELETE FROM list WHERE id = ?";
  db.query(sql, [id], callback);
};
