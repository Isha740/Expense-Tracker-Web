import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Transaction description title is mandatory"],
      trim: true, 
    },
    amount: {
      type: Number,
      required: [true, "Transaction numeric amount is mandatory"],
      min: [0, "Financial debit values cannot be negative numbers"],
    },
    category: {
      type: String,
      required: true,
      default: "General",
      enum: ["Food & Drinks", "Health", "Entertainment","Investments","General"], // Restricts entries to valid tags
    },
    date: {
      type: String,
      required: [true, "Transaction timestamp validation date is required"],
      validate: {
        validator: function (value) {
          const inputDate = new Date(value);
          const today = new Date();
          today.setHours(23, 59, 59, 999); 
          return inputDate <= today;
        },
        message: "Please select a valid date for the transaction."
      }
    },
  },
  { 
    timestamps: true, 
  }
);

const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;