import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import ExpenseTable from "./components/ExpenseTable";
import BudgetLimitCard from "./components/BudgetLimitCard";
import AnalyticsCharts from "./components/AnalyticsCharts";

function App() {
 
  const [expenses, setExpenses] = useState([]);
  const [limit, setLimit] = useState(0);
  const [loading, setLoading] = useState(true);

  const API_URL = "http://localhost:5000/api/expenses";

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Network response was not stable");
      const data = await response.json();
      setExpenses(data);
    } catch (error) {
      console.error("API Fetch Matrix failure:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  
  const currentTotalExpense = expenses.reduce((sum, item) => sum + item.amount, 0);
  const isOverBudget = limit > 0 && currentTotalExpense > limit;

  const yearlyHistoricalData = [
    { month: "Jan", expenses: 12000, limit: 15000 },
    { month: "Feb", expenses: 18500, limit: 15000 },
    { month: "Mar", expenses: 9400, limit: 15000 },
    { month: "Apr", expenses: 14200, limit: 15000 },
    { month: "May", expenses: 22000, limit: 20000 },
  ];

  const handleAddExpense = async (newExpense) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newExpense),
      });

      if (!response.ok) throw new Error("Failed to write document to database");
      
      fetchExpenses();
    } catch (error) {
      console.error("API Post failure:", error.message);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen text-slate-800 font-sans antialiased pb-12">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-6">
        
        <section aria-label="Dashboard Analytics Core">
          <AnalyticsCharts currentExpenses={expenses} historyData={yearlyHistoricalData} />
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          <div className="lg:col-span-2">
            {loading ? (
              <div className="bg-white p-12 rounded-2xl border border-gray-200 text-center text-slate-400 font-medium shadow-sm animate-pulse">
                Syncing with secure transaction databanks...
              </div>
            ) : (
              <ExpenseTable 
                expenses={expenses}
                totalExpense={currentTotalExpense} 
                isOverBudget={isOverBudget} 
                onAddExpense={handleAddExpense}
              />
            )}
          </div>

          <aside className="space-y-6">
            <BudgetLimitCard limit={limit} setLimit={setLimit} currentTotalExpense={currentTotalExpense} isOverBudget={isOverBudget} />
          </aside>

        </div>
      </main>
    </div>
  );
}

export default App;