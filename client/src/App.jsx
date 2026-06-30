import React from "react";
import Header from "./components/Header";
import ExpenseTable from "./components/ExpenseTable";
import BudgetLimitCard from "./components/BudgetLimitCard"; // Import statement

function App() {
  return (
    <div className="bg-gray-100 min-h-screen text-slate-800 font-sans antialiased">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        
        {/* Top metrics summary row placeholder */}
        {/* <div className="border border-gray-200 rounded-2xl h-32 flex items-center justify-center text-gray-400 font-medium bg-white shadow-sm mb-6">
          Metrics Summary Row (Cards Placeholder)
        </div> */}

        {/* 2-Column Main Structural Split */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* LEFT SIDE: Core Table Log */}
          <div className="lg:col-span-2">
            <ExpenseTable />
          </div>

          {/* RIGHT SIDE: Interactive Expense Threshold Control */}
          <div>
            <BudgetLimitCard />
          </div>

        </div>

      </main>
    </div>
  );
}

export default App;