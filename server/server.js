import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Initialize hidden configuration variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); // Parses incoming request bodies into JSON objects

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Cluster integrated and active."))
  .catch((err) => console.error("Database connection error:", err));

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "healthy", timestamp: new Date() });
});

app.listen(PORT, () => {
  console.log(`Express API server running smoothly on port ${PORT}`);
});