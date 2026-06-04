import React from "react";
import Header from "./components/Header";
import ExpenseTable from "./components/ExpenseTable";

function App() {
  return (
    <div className="bg-gray-100 min-h-screen text-slate-800 font-sans antialiased">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        
        {/* Top metrics dashboard bar preview */}
        {/* <div className="border border-gray-200 rounded-2xl h-32 flex items-center justify-center text-gray-400 font-medium bg-white shadow-sm mb-6">
          Metrics Summary Row (Cards Placeholder)
        </div> */}

        {/* 2-Column Main Structural Split */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* LEFT SIDE: Consumes 2/3 of the screen spacing on large viewports */}
          <div className="lg:col-span-2">
            <ExpenseTable />
          </div>

          {/* RIGHT SIDE: Reserved space for your next custom modules */}
          <div className="border-2 border-dashed border-gray-300 rounded-2xl h-96 flex items-center justify-center text-gray-400 font-medium bg-white shadow-sm p-6">
            Something Else (Reserved Column Space)
          </div>

        </div>

      </main>
    </div>
  );
}

export default App;