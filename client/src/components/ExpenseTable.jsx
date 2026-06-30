import React from "react";
import { FaTrash, FaEdit, FaArrowDown, FaCalendarAlt } from "react-icons/fa";

export default function ExpenseTable() {
  const mockExpenses = [
    { id: "1", title: "Adobe Creative Cloud", amount: 1599, category: "Software", date: "2026-06-02" },
    { id: "2", title: "Starbucks Coffee", amount: 350, category: "Food & Drinks", date: "2026-06-03" },
    { id: "3", title: "Equinox Gym Membership", amount: 4500, category: "Health", date: "2026-06-04" },
  ];

  // Dynamic Calculation (Pre-calculating for backend parity)
  const totalExpense = mockExpenses.reduce((sum, item) => sum + item.amount, 0);

  // Dynamic Month Resolution
  const currentMonth = new Date().toLocaleString("default", { month: "long" });

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden h-full">
      
      {/* Header Info Banner Section */}
      <div className="p-6 border-b border-gray-100 bg-gray-50/50">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <FaCalendarAlt className="text-blue-600 text-base" />
              Your expenses in <span className="text-blue-600">{currentMonth}</span>
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Detailed breakdown of your current billing cycle logs.
            </p>
          </div>
          
          {/* Total Sum Highlight Line */}
          <div className="text-left sm:text-right mt-2 sm:mt-0">
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Total Debited</p>
            <p className="text-2xl font-black text-rose-500 tracking-tight">
              ₹{totalExpense.toLocaleString("en-IN")}.00
            </p>
          </div>
        </div>
      </div>

      {/* Responsive Table Subsystem */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200 text-xs font-bold uppercase tracking-wider text-slate-400 bg-gray-50/30">
              <th className="py-3 px-6">Transaction</th>
              <th className="py-3 px-6 hidden sm:table-cell">Category</th>
              <th className="py-3 px-6 hidden md:table-cell">Date</th>
              <th className="py-3 px-6 text-right">Amount</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          
          <tbody className="divide-y divide-gray-100 text-sm font-medium text-slate-700">
            {mockExpenses.map((expense) => (
              <tr 
                key={expense.id} 
                className="hover:bg-gray-50/70 transition-colors duration-150 group"
              >
                {/* Title & Mobile Responsive Meta Info */}
                <td className="py-4 px-4">
                  <div className="font-semibold text-slate-900">{expense.title}</div>
                  <div className="text-[11px] text-slate-400 font-medium sm:hidden mt-0.5">
                    {expense.category} • {expense.date}
                  </div>
                </td>
                
                {/* Category (Hidden on mobile screens) */}
                <td className="py-4 px-4 hidden sm:table-cell">
                  <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-gray-100 text-slate-600 border border-gray-200/40">
                    {expense.category}
                  </span>
                </td>
                
                {/* Date (Hidden on mobile screens) */}
                <td className="py-4 px-4 text-slate-500 hidden md:table-cell font-mono text-xs">
                  {expense.date}
                </td>
                
                {/* Amount formatted with soft red debit style */}
                <td className="py-4 px-4 text-right font-bold text-rose-600 font-mono">
                  - ₹{expense.amount.toFixed(2)}
                </td>
                
                {/* Edit / Delete Action Targets */}
                <td className="py-4 px-6">
                  <div className="flex items-center justify-center gap-2">
                    <button 
                      title="Edit Transaction"
                      className="p-2 rounded-lg border border-gray-200 bg-white text-slate-500 hover:text-blue-600 hover:border-blue-200 transition-all duration-150 shadow-sm"
                    >
                      <FaEdit size={13} />
                    </button>
                    <button 
                      title="Delete Transaction"
                      className="p-2 rounded-lg border border-gray-200 bg-white text-slate-500 hover:text-rose-600 hover:border-rose-200 transition-all duration-150 shadow-sm"
                    >
                      <FaTrash size={13} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
