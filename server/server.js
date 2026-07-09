import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import expenseRouter from "./routes/expenseRoutes.js"; // Import router

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware Points
app.use(cors());
app.use(express.json());

// Database Initialization
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Cluster integrated and active."))
  .catch((err) => console.error("Database connection error:", err));

app.use("/api/expenses", expenseRouter); 

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "healthy", timestamp: new Date() });
});

app.listen(PORT, () => {
  console.log(`Express API server running smoothly on port ${PORT}`);
});