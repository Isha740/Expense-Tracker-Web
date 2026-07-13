import React, { useState, useEffect, useContext } from "react";
import Header from "./components/Header";
import ExpenseTable from "./components/ExpenseTable";
import BudgetLimitCard from "./components/BudgetLimitCard";
import AnalyticsCharts from "./components/AnalyticsCharts";
import AuthScreen from "./components/AuthScreen";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { user, authLoading, logoutUser } = useContext(AuthContext); // Access global user context status
  
  const [expenses, setExpenses] = useState([]);
  const [limit, setLimit] = useState(0);
  const [historicalData, setHistoricalData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [metrics, setMetrics] = useState({
    totalVolumeCount: 0,
    currentMonthSpend: 0,
    mostExpensiveCategory: "None",
    remainingSafeBalance: 0,
    currentLimit: 0
  });

  const EXPENSE_API = "http://localhost:5000/api/expenses";
  const BUDGET_API = "http://localhost:5000/api/budget/current";
  const SUMMARY_API = "http://localhost:5000/api/expenses/monthly-summary";
  const METRICS_API = "http://localhost:5000/api/expenses/dashboard-metrics";

  const getAuthHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${user?.token}`,
  });

  const synchronizeDashboardData = async () => {
    if (!user) return; // Block fetch calls if unauthenticated
    try {
      const [expenseRes, budgetRes, summaryRes, metricsRes] = await Promise.all([
        fetch(EXPENSE_API, { headers: getAuthHeaders() }),
        fetch(BUDGET_API, { headers: getAuthHeaders() }),
        fetch(SUMMARY_API, { headers: getAuthHeaders() }),
        fetch(METRICS_API, { headers: getAuthHeaders() })
      ]);

      if (!expenseRes.ok || !budgetRes.ok || !summaryRes.ok || !metricsRes.ok) {
        throw new Error("Failed to clear data synchronization endpoints");
      }

      setExpenses(await expenseRes.json());
      const budgetData = await budgetRes.json();
      setLimit(budgetData.amount || 0);
      setHistoricalData(await summaryRes.json());
      setMetrics(await metricsRes.json()); 
    } catch (error) {
      console.error("Critical Databank sync failure:", error.message);
    } finally {
      setLoading(false);
    }
  };

  // Re-run the fetch pipeline whenever a user logs in
  useEffect(() => {
    if (user) {
      synchronizeDashboardData();
    }
  }, [user]);

  const handleAddExpense = async (newExpense) => {
    try {
      const response = await fetch(EXPENSE_API, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(newExpense),
      });
      if (!response.ok) throw new Error("Failed to write document to database");
      synchronizeDashboardData();
    } catch (error) {
      console.error("API Post failure:", error.message);
    }
  };

  const handleDeleteExpense = async (_id) => {
    try {
      const response = await fetch(`${EXPENSE_API}/${_id}`, { 
        method: "DELETE",
        headers: getAuthHeaders()
      });
      if (!response.ok) throw new Error("Failed to clear transaction from data cluster");
      synchronizeDashboardData();
    } catch (error) {
      console.error("API Delete pipeline failure:", error.message);
    }
  };

  const handleSetBudgetLimit = async (amountValue) => {
    try {
      const response = await fetch("http://localhost:5000/api/budget", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ amount: amountValue }),
      });
      const data = await response.json();
      if (!response.ok) {
        alert(data.message);
        return false;
      }
      setLimit(data.amount);
      synchronizeDashboardData();
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };
   
  const currentTotalExpense = expenses.reduce((sum, item) => sum + item.amount, 0);
  const isOverBudget = limit > 0 && currentTotalExpense > limit;

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center font-bold text-slate-400 animate-pulse">
        Initializing Secure Gateways.
      </div>
    );
  }

  // If no user context token exists, lock UI out and display login view
  if (!user) {
    return <AuthScreen />;
  }

  return (
    <div className="bg-gray-100 min-h-screen text-slate-800 font-sans antialiased pb-12">
      {/* Pass user profile context variables and logout happens onto header element */}
      <Header userName={user.name} userEmail={user.email} onLogout={logoutUser} />

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-6">
        
        {/* Real time Dynamic Summary row grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Ledger Volume</p>
            <p className="text-2xl font-black text-slate-900 mt-1">
              {metrics.totalVolumeCount} <span className="text-xs font-medium text-slate-400">Txns</span>
            </p>
          </div>
          
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Monthly Spend</p>
            <p className="text-2xl font-black text-rose-600 mt-1">
              ₹{metrics.currentMonthSpend.toLocaleString("en-IN")}
            </p>
          </div>
          
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Remaining Balance</p>
            <p className={`text-2xl font-black mt-1 ${metrics.remainingSafeBalance === 0 && metrics.currentLimit > 0 ? "text-rose-500" : "text-emerald-500"}`}>
              ₹{metrics.remainingSafeBalance.toLocaleString("en-IN")}
            </p>
          </div>
          
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Top Cash Drain</p>
            <p className="text-sm font-bold text-slate-700 mt-2 truncate">{metrics.mostExpensiveCategory}</p>
          </div>
        </div>
      
        <section aria-label="Dashboard Analytics Core">
          <AnalyticsCharts currentExpenses={expenses} historyData={historicalData} />
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-2">
            {loading ? (
              <div className="bg-white p-12 rounded-2xl border border-gray-200 text-center text-slate-400 font-medium shadow-sm animate-pulse">
                Syncing with secure transaction databanks.
              </div>
            ) : (
              <ExpenseTable 
                expenses={expenses}
                totalExpense={currentTotalExpense} 
                isOverBudget={isOverBudget} 
                onAddExpense={handleAddExpense}
                onDeleteExpense={handleDeleteExpense} 
              />
            )}
          </div>

          <aside className="space-y-6">
            <BudgetLimitCard limit={limit} onSetLimit={handleSetBudgetLimit} currentTotalExpense={currentTotalExpense} isOverBudget={isOverBudget} />
          </aside>
        </div>
      </main>
    </div>
  );
}

export default App;