import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import expenseRouter from "./routes/expenseRoutes.js"; // Import router
import budgetRouter from "./routes/budgetRoutes.js";
import userRouter from "./routes/userRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware Points
app.use(cors());
app.use(express.json());
app.use("/api/users", userRouter); // Authentication routes
app.use("/api/expenses", expenseRouter);
app.use("/api/budget", budgetRouter);

// Database Initialization
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Cluster integrated and active."))
  .catch((err) => console.error("Database connection error:", err));

app.use("/api/expenses", expenseRouter); 
app.use("/api/budget", budgetRouter);

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "healthy", timestamp: new Date() });
});

app.listen(PORT, () => {
  console.log(`Express API server running smoothly on port ${PORT}`);
});