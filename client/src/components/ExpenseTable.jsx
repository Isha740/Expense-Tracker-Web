import React, { useState } from "react";
import { FaCalendarAlt, FaEdit, FaTrash, FaPlus, FaTimes } from "react-icons/fa";

export default function ExpenseTable({ expenses, totalExpense, isOverBudget, onAddExpense ,onDeleteExpense}) {
  // Modal toggle state control
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Controlled input states for form processing
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("General");
  const [date, setDate] = useState("");

  const currentMonth = new Date().toLocaleString("default", { month: "long" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !amount || parseFloat(amount) <= 0 || !date) return;

    // Package the user data into our schema block template format
    const newExpense = {
      id: Date.now().toString(), // Generates an instant temp tracking string timestamp
      title,
      amount: parseFloat(amount),
      category,
      date
    };

    onAddExpense(newExpense);
    
    // Reset inputs and cleanly drop the modal drawer open context back down
    setTitle("");
    setAmount("");
    setCategory("General");
    setDate("");
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden h-full relative">
      
      {/* Header Info Banner Section */}
      <div className="p-6 border-b border-gray-100 bg-gray-50/50">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <FaCalendarAlt className="text-blue-600 text-base" />
                Your expenses in <span className="text-blue-600">{currentMonth}</span>
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Detailed breakdown of your current billing cycle logs.
              </p>
            </div>
            
            {/* Grade Action Trigger: Add Button aligned perfectly inside header line */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sm hover:shadow transition-all self-start sm:self-center"
            >
              <FaPlus size={10} />
              New Expense
            </button>
          </div>
          
          {/* Total Sum Highlight Line */}
          <div className="text-left sm:text-right">
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Total Debited</p>
            <p className={`text-2xl font-black tracking-tight transition-colors duration-300 ${
              isOverBudget ? "text-rose-500" : "text-emerald-500"
            }`}>
              ₹{totalExpense.toLocaleString("en-IN")}.00
            </p>
          </div>
        </div>
      </div>

      {/* Table Interface Viewport with strict height boundaries and internal scrolling mechanisms */}
      <div className="overflow-x-auto max-h-[400px] overflow-y-auto custom-scrollbar">
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
            {expenses.map((expense) => (
              <tr key={expense._id} className="hover:bg-gray-50/70 transition-colors duration-150 group">
                <td className="py-4 px-4">
                  <div className="font-semibold text-slate-900">{expense.title}</div>
                  <div className="text-[11px] text-slate-400 font-medium sm:hidden mt-0.5">
                    {expense.category} • {expense.date}
                  </div>
                </td>
                
                <td className="py-4 px-4 hidden sm:table-cell">
                  <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-gray-100 text-slate-600 border border-gray-200/40">
                    {expense.category}
                  </span>
                </td>
                
                <td className="py-4 px-4 text-slate-500 hidden md:table-cell font-mono text-xs">
                  {expense.date}
                </td>
                
                <td className="py-4 px-4 text-right font-bold text-rose-600 font-mono">
                  - ₹{expense.amount.toFixed(2)}
                </td>
                
                <td className="py-4 px-6">
                  <div className="flex items-center justify-center gap-2">
                    <button className="p-2 rounded-lg border border-gray-200 bg-white text-slate-500 hover:text-blue-600 hover:border-blue-200 transition-all duration-150 shadow-sm">
                      <FaEdit size={13} />
                    </button>
                    <button 
                      onClick={() => onDeleteExpense(expense._id)}
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

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          
          {/* Modal Input Window panel */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-2xl w-full max-w-md overflow-hidden p-6 relative animate-in fade-in slide-in-from-bottom-4 duration-300">
            
            {/* Close Button Anchor */}
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-gray-100 rounded-xl transition-all duration-150"
            >
              <FaTimes size={14} />
            </button>

            <div className="mb-5">
              <h4 className="text-base font-bold text-slate-900">Record Transaction</h4>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Log a fresh expenditure onto the database file.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Description</label>
                <input 
                  type="text" placeholder="e.g., AWS Cloud Hosting" value={title} onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-slate-800 placeholder-gray-400 focus:bg-white focus:border-blue-500 transition-all outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Amount (₹)</label>
                  <input 
                    type="number" placeholder="0.00" value={amount} onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-slate-800 placeholder-gray-400 focus:bg-white focus:border-blue-500 transition-all outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Date</label>
                  <input 
                    type="date" value={date} onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-slate-700 focus:bg-white focus:border-blue-500 transition-all outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Category Group</label>
                <select 
                  value={category} onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-slate-700 focus:bg-white focus:border-blue-500 transition-all outline-none appearance-none"
                >
                  <option value="Investments">Investments</option>
                  <option value="Food & Drinks">Food & Drinks</option>
                  <option value="Health">Health</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="General">General</option>
                </select>
              </div>

              <div className="flex items-center gap-3 mt-6">
                <button 
                  type="button" onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2 border border-gray-200 text-slate-500 hover:bg-gray-50 font-bold text-sm rounded-xl transition"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-md shadow-blue-500/10 transition"
                >
                  Save Transaction
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}