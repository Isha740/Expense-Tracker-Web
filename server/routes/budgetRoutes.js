import express from "express";
import Budget from "../models/Budget.js";

const router = express.Router();

// 1. FETCH CURRENT MONTH'S BUDGET CONFIGURATION
router.get("/current", async (req, res) => {
  try {
    const currentMonthYear = new Date().toLocaleString("default", { month: "long", year: "numeric" });
    const budget = await Budget.findOne({ monthYear: currentMonthYear });
    
    res.status(200).json(budget || { amount: 0, isNotSet: true });
  } catch (error) {
    res.status(500).json({ message: "Failed to pull budget settings", error: error.message });
  }
});

// 2. CONFIGURE NEW MONTHLY BUDGET THRESHOLD (WITH STRICT TIME GUARDS)
router.post("/", async (req, res) => {
  try {
    const { amount } = req.body;
    
    // Core Temporal Logic Engagements
    const currentDate = new Date();
    const currentDay = currentDate.getDate(); 
    const currentMonthYear = currentDate.toLocaleString("default", { month: "long", year: "numeric" });

    // CONDITION 1: Time Perimeter Guard (Only allow settings within the first half of the month)
    if (currentDay > 15) {
      return res.status(403).json({ 
        message: "Operation Denied: Monthly limits can only be set during the first half of the month (Days 1-15)." 
      });
    }

    // CONDITION 2: One month should have only one limit set
    const existingBudget = await Budget.findOne({ monthYear: currentMonthYear });
    if (existingBudget) {
      return res.status(400).json({ 
        message: "Operation Denied: A budget threshold has already been established for this month cycle." 
      });
    }

    const newBudget = new Budget({
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