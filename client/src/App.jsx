import React, { useState } from "react";
import Header from "./components/Header";
import ExpenseTable from "./components/ExpenseTable";
import BudgetLimitCard from "./components/BudgetLimitCard";
import AnalyticsCharts from "./components/AnalyticsCharts";
import FinancialRecommendations from "./components/FinancialRecommendations";

function App() {
  // Application Data Core
  const [expenses, setExpenses] = useState([
    { id: "1", title: "Adobe Creative Cloud", amount: 1599, category: "Software", date: "2026-06-02" },
    { id: "2", title: "Starbucks Coffee", amount: 350, category: "Food & Drinks", date: "2026-06-03" },
    { id: "3", title: "Equinox Gym Membership", amount: 4500, category: "Health", date: "2026-06-04" },
    { id: "4", title: "AWS Cloud Infrastructure", amount: 2800, category: "Software", date: "2026-06-05" },
    { id: "5", title: "Swiggy Delivery", amount: 620, category: "Food & Drinks", date: "2026-06-06" },
  ]);

  const [limit, setLimit] = useState(0);

  // Computing operational values live
  const currentTotalExpense = expenses.reduce((sum, item) => sum + item.amount, 0);
  const isOverBudget = limit > 0 && currentTotalExpense > limit;

  // Year-to-date historical performance tracking matrix (Jan - May)
  const yearlyHistoricalData = [
    { month: "Jan", expenses: 12000, limit: 15000 },
    { month: "Feb", expenses: 18500, limit: 15000 }, // Over threshold -> Red
    { month: "Mar", expenses: 9400, limit: 15000 },
    { month: "Apr", expenses: 14200, limit: 15000 },
    { month: "May", expenses: 22000, limit: 20000 }, // Over threshold -> Red
  ];

  const handleAddExpense = (newExpense) => {
    setExpenses((prevExpenses) => [newExpense, ...prevExpenses]);
  };

  return (
    <div className="bg-gray-100 min-h-screen text-slate-800 font-sans antialiased pb-12">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-6">
        
        <section aria-label="Dashboard Analytics Core">
          <AnalyticsCharts 
            currentExpenses={expenses} 
            historyData={yearlyHistoricalData} 
          />
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* LEFT CONTENT BLOCK: Main operational ledger */}
          <div className="lg:col-span-2">
            <ExpenseTable 
              expenses={expenses}
              totalExpense={currentTotalExpense} 
              isOverBudget={isOverBudget} 
              onAddExpense={handleAddExpense}
            />
          </div>

          {/* RIGHT SIDEBAR PANEL: Interactive threshold cap logic */}
          <aside className="space-y-6">
            <BudgetLimitCard 
              limit={limit} 
              setLimit={setLimit} 
              currentTotalExpense={currentTotalExpense}
              isOverBudget={isOverBudget}
            />

            <FinancialRecommendations 
              currentTotalExpense={currentTotalExpense} 
              limit={limit} 
            />
          </aside>

        </div>
      </main>
    </div>
  );
}

export default App;