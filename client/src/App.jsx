import React, { useState } from "react";
import Header from "./components/Header";
import ExpenseTable from "./components/ExpenseTable";
import BudgetLimitCard from "./components/BudgetLimitCard";

function App() {
  // FAANG Signal: The true operational data state of the application
  const [expenses, setExpenses] = useState([
    { id: "1", title: "Adobe Creative Cloud", amount: 1599, category: "Software", date: "2026-06-02" },
    { id: "2", title: "Starbucks Coffee", amount: 350, category: "Food & Drinks", date: "2026-06-03" },
    { id: "3", title: "Equinox Gym Membership", amount: 4500, category: "Health", date: "2026-06-04" },
  ]);

  const [limit, setLimit] = useState(0);

  // Dynamic aggregation math computed on every state shift
  const currentTotalExpense = expenses.reduce((sum, item) => sum + item.amount, 0);
  const isOverBudget = limit > 0 && currentTotalExpense > limit;

  // Handler function passed to children to safely mutate top-level state
  const handleAddExpense = (newExpense) => {
    setExpenses((prevExpenses) => [newExpense, ...prevExpenses]);
  };

  return (
    <div className="bg-gray-100 min-h-screen text-slate-800 font-sans antialiased">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* LEFT SIDE: Core Table Log - Now consumes real state and mutation action triggers */}
          <div className="lg:col-span-2">
            <ExpenseTable 
              expenses={expenses}
              totalExpense={currentTotalExpense} 
              isOverBudget={isOverBudget} 
              onAddExpense={handleAddExpense}
            />
          </div>

          {/* RIGHT SIDE: Budget Tracker */}
          <div>
            <BudgetLimitCard 
              limit={limit} 
              setLimit={setLimit} 
              currentTotalExpense={currentTotalExpense}
              isOverBudget={isOverBudget}
            />
          </div>

        </div>
      </main>
    </div>
  );
}

export default App;