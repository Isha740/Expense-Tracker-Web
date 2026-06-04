import React from "react";
import Header from "./components/Header";

function App() {
  return (
    /* Flipped background from slate to a clean, uniform neutral gray canvas */
    <div className="bg-gray-100 min-h-screen text-slate-800 font-sans antialiased">
      
      {/* Our premium light-themed navigation bar */}
      <Header />

      {/* Main Dashboard Layout Container */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        
        {/* Placeholder row showing where our high-performance metric cards will go next */}
        {/* <div className="border-2 border-dashed border-gray-200 rounded-2xl h-32 flex items-center justify-center text-gray-400 font-medium bg-white shadow-sm">
          Metrics Section (Balance, Income, Expenses, Savings Rate) will dock here
        </div> */}

        {/* Placeholder grid for the core analytics engine (Charts, Forms, and Transaction History) */}
        {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2 border-2 border-dashed border-gray-200 rounded-2xl h-96 flex items-center justify-center text-gray-400 font-medium bg-white shadow-sm">
            Analytics & Data Visualization Panel (Charts)
          </div>
          <div className="border-2 border-dashed border-gray-200 rounded-2xl h-96 flex items-center justify-center text-gray-400 font-medium bg-white shadow-sm">
            Transaction Processing Module (Form & History)
          </div>
        </div> */}

      </main>
    </div>
  );
}

export default App;