import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import taskRoutes from "./routes/taskRoutes.js";

const app = express();
const Port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Use task routes
app.use("/", taskRoutes);

app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});
