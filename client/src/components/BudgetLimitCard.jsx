import React, { useState } from "react";
import { FaSlidersH, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

export default function BudgetLimitCard({ limit, onSetLimit, currentTotalExpense, isOverBudget }) {
  const [inputValue, setInputValue] = useState("");
  const currentMonth = new Date().toLocaleString("default", { month: "long" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue || isNaN(inputValue) || inputValue <= 0) return;
    
    await onSetLimit(parseFloat(inputValue));
  };

  const percentSpent = limit ? Math.min((currentTotalExpense / limit) * 100, 100) : 0;

  const isLimitAlreadySetInDb = limit > 0;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden p-6 transition-all duration-300">
      
      {!isLimitAlreadySetInDb ? (
        <div className="animate-in fade-in duration-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
              <FaSlidersH size={18} />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Expense Control</h3>
              <p className="text-xs text-slate-500 font-medium">Set your limit for {currentMonth}.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="budget-limit" className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Monthly max spending Amount (₹)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold text-sm">₹</span>
                <input
                  id="budget-limit"
                  type="number"
                  placeholder="e.g., 20000"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="w-full pl-8 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-slate-800 placeholder-gray-400 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all duration-150 outline-none"
                />
              </div>
            </div>

            <button type="submit" className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-md shadow-blue-500/10 transition-all duration-150">
              Set {currentMonth} Limit
            </button>
          </form>
        </div>
      ) : (
        <div className="animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <FaCheckCircle className={isOverBudget ? "text-rose-500" : "text-emerald-500"} size={18} />
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                {currentMonth} Budget Status
              </span>
            </div>
          </div>

          <div className="space-y-1 mb-5">
            <p className="text-xs text-slate-500 font-medium leading-none">Crossover Limit</p>
            <p className="text-3xl font-black text-slate-900 tracking-tight">
              ₹{limit.toLocaleString("en-IN")}
              <span className="text-xs text-slate-400 font-semibold ml-1.5">/ mo</span>
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-500">
                Spent: <span className="text-slate-800 font-mono">₹{currentTotalExpense.toLocaleString("en-IN")}</span>
              </span>
              <span className={isOverBudget ? "text-rose-600 font-mono" : "text-blue-600 font-mono"}>
                {percentSpent.toFixed(1)}%
              </span>
            </div>
            
            <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden border border-gray-200/50">
              <div
                style={{ width: `${percentSpent}%` }}
                className={`h-full rounded-full transition-all duration-500 ${
                  isOverBudget ? "bg-gradient-to-r from-rose-500 to-red-600" : "bg-gradient-to-r from-blue-500 to-blue-600"
                }`}
              />
            </div>

            {isOverBudget && (
              <div className="flex items-center gap-2 text-rose-600 bg-rose-50 border border-rose-100 rounded-xl p-2.5 mt-3 text-xs font-semibold animate-pulse">
                <FaExclamationTriangle className="flex-shrink-0" />
                <span>Limit crossed!</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}