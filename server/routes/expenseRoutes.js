import express from "express";
import Expense from "../models/Expense.js";
import Budget from "../models/Budget.js";

const router = express.Router();

router.get("/dashboard-metrics", async (req, res) => {
  try {
    const currentYear = new Date().getFullYear();
    const currentMonthLong = new Date().toLocaleString("default", { month: "long" });
    const currentMonthYearStr = new Date().toLocaleString("default", { month: "long", year: "numeric" }); // "July 2026"

    const expenses = await Expense.find();
    
    // 1. Total Multi-Month Volume
    const totalVolumeCount = expenses.length;

    // 2. Total Current Monthly Spend
    let currentMonthSpend = 0;
    let categoryMap = {};

    expenses.forEach((item) => {
      if (!item.date) return;
      const d = new Date(item.date);
      if (!isNaN(d) && d.getFullYear() === currentYear) {
        if (d.toLocaleString("default", { month: "long" }) === currentMonthLong) {
          currentMonthSpend += item.amount;
        }
        categoryMap[item.category] = (categoryMap[item.category] || 0) + item.amount;
      }
    });

    // 3. Most Expensive Category Card
    let mostExpensiveCategory = "None";
    let maxCatAmount = 0;
    Object.keys(categoryMap).forEach((cat) => {
      if (categoryMap[cat] > maxCatAmount) {
        maxCatAmount = categoryMap[cat];
        mostExpensiveCategory = cat;
      }
    });

    // 4. Remaining Safe Balance Calculation
    const activeBudget = await Budget.findOne({ monthYear: currentMonthYearStr });
    const currentLimit = activeBudget ? activeBudget.amount : 0;
    const remainingSafeBalance = currentLimit > 0 ? Math.max(currentLimit - currentMonthSpend, 0) : 0;

    res.status(200).json({
      totalVolumeCount,
      currentMonthSpend,
      mostExpensiveCategory: mostExpensiveCategory !== "None" ? `${mostExpensiveCategory} (₹${maxCatAmount})` : "None",
      remainingSafeBalance,
      currentLimit
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to compile metric calculations", error: error.message });
  }
});

router.get("/monthly-summary", async (req, res) => {
  try {
    const currentYear = new Date().getFullYear(); // Dynamically isolates the current tracking year (2026)

    const expenses = await Expense.find();
    const budgets = await Budget.find();

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    let summaryMap = {};
    monthNames.forEach((m) => {
      summaryMap[m] = { month: m, expenses: 0, limit: 0 };
    });

    expenses.forEach((item) => {
      if (!item.date) return;
      const dateObj = new Date(item.date);
      
      if (!isNaN(dateObj) && dateObj.getFullYear() === currentYear) {
        const mName = monthNames[dateObj.getMonth()];
        summaryMap[mName].expenses += item.amount;
      }
    });

    budgets.forEach((b) => {
      // b.monthYear looks like "July 2026", so splitting it to check month and year matches
      const [bMonthName, bYearString] = b.monthYear.split(" ");
      
      if (parseInt(bYearString) === currentYear) {
        const shortMonth = bMonthName.substring(0, 3); // "July" -> "Jul"
        if (summaryMap[shortMonth]) {
          summaryMap[shortMonth].limit = b.amount;
        }
      }
    });

    const finalChartArray = monthNames.map((m) => summaryMap[m]);
    
    res.status(200).json(finalChartArray);
  } catch (error) {
    res.status(500).json({ message: "Failed to generate monthly tracking logs", error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ createdAt: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve transaction logs", error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, amount, category, date } = req.body;
    const newExpense = new Expense({ title, amount, category, date });
    const savedExpense = await newExpense.save();
    res.status(201).json(savedExpense);
  } catch (error) {
    res.status(400).json({ message: "Failed to log entry onto the database", error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedExpense = await Expense.findByIdAndDelete(id);

    if (!deletedExpense) {
      return res.status(404).json({ message: "Transaction record not found" });
    }

    res.status(200).json({ message: "Transaction entry removed securely from database" });
  } catch (error) {
    res.status(500).json({ message: "Deletions processing pipeline failure", error: error.message });
  }
});

export default router;