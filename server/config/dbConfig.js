import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "to_do_list",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database.");
});

export default db;
