import mysql from "mysql2/promise.js";
import "dotenv/config";

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD_KEY,
  database: process.env.DB_DATABASE,
});

export default db;
