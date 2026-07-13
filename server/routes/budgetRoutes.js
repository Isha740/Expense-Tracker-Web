import express from "express";
import Budget from "../models/Budget.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// 1. Fetch current month's budget
router.get("/current", protect, async (req, res) => {
  try {
    const currentMonthYear = new Date().toLocaleString("default", { month: "long", year: "numeric" });
    const budget = await Budget.findOne({user: req.user._id, monthYear: currentMonthYear });
    
    res.status(200).json(budget || { amount: 0, isNotSet: true });
  } catch (error) {
    res.status(500).json({ message: "Failed to pull budget settings", error: error.message });
  }
});

// 2. Configure new monthly budget limits
router.post("/", protect, async (req, res) => {
  try {
    const { amount } = req.body;
    
    // Core Logic Engagements
    const currentDate = new Date();
    const currentDay = currentDate.getDate(); 
    const currentMonthYear = currentDate.toLocaleString("default", { month: "long", year: "numeric" });

    // CONDITION 1: Time restrictions (Only allow settings within the first half of the month)
    if (currentDay > 15) {
      return res.status(403).json({ 
        message: "Operation Denied: Monthly limits can only be set during the first half of the month (Days 1-15)." 
      });
    }

    // CONDITION 2: One month should have only one limit set
    const existingBudget = await Budget.findOne({ user: req.user._id, monthYear: currentMonthYear });
    if (existingBudget) {
      return res.status(400).json({ 
        message: "Operation Denied: A budget limit has already been added for this month." 
      });
    }

    const newBudget = new Budget({
      user: req.user._id,
      amount: parseFloat(amount),
      monthYear: currentMonthYear
    });

    const savedBudget = await newBudget.save();
    res.status(201).json(savedBudget);
  } catch (error) {
    res.status(500).json({ message: "Server configuration failure", error: error.message });
  }
});

export default router;