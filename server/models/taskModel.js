import db from "../config/dbConfig.js";

// Fetch all full tasks (only for total page)
export const getCountTasks = async () => {
  // Count database length
  const countSql = `SELECT COUNT(id) AS totalPages FROM list`;
  const [rows] = await db.query(countSql);
  return rows;
};

// Fetch all tasks
export const getLimitTasks = async (limit, offset) => {
  // Order list that has a limit item that could be listed, and start where offfset begin
  const sql = `SELECT * FROM list ORDER BY \`order\` ASC LIMIT ? OFFSET ?`;
  const [rows] = await db.query(sql, [limit, (offset - 1) * limit]);
  return rows;
};

// Create a task
export const createTask = async (taskData) => {
  const sql =
    "INSERT INTO list (`order`, title, description, date_input, deadline, checked) VALUES (?, ?, ?, ?, ?, ?)";

  const [rows] = await db.query(sql, [
    taskData.order,
    taskData.title,
    taskData.description,
    taskData.date_input,
    taskData.deadline,
    taskData.checked,
  ]);

  return rows;
};

// Update a task and a checked state
export const updateTask = async (id, taskData) => {
  const sql =
    "UPDATE list SET title = ?, description = ?, date_input = ?, deadline = ?, checked = ? WHERE id = ?";

  const [rows] = db.query(sql, [
    taskData.title,
    taskData.description,
    taskData.date_input,
    taskData.deadline,
    taskData.checked ? 1 : 0,
    id,
  ]);

  return rows;
};


// Update order and checked state
export const updateTaskOrder = (taskData) => {
  const sql =
    "UPDATE list SET `order` = ?, title = ?, description = ?, date_input = ?, deadline = ?, checked = ? WHERE id = ?";

  return new Promise((resolve, reject) => {
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
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};

// Delete a task
export const deleteTask = async (id) => {
  const sql = "DELETE FROM list WHERE id = ?";
  const [rows] = await db.query(sql, [id]);
  return rows;
};
