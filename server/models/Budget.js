import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema(
  {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    amount: {
      type: Number,
      required: [true, "Budget limit amount is mandatory"],
      min: [1, "Budget limit must be greater than zero"]
    },
    monthYear: {
      type: String,
      required: true
    },
  },
  { timestamps: true }
);

const Budget = mongoose.model("Budget", budgetSchema);
export default Budget;