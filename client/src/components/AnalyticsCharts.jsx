import React from "react";
import { 
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid 
} from "recharts";

export default function AnalyticsCharts({ currentExpenses, historyData }) {
  
  // 1. DATA TRANSFORM ENGINE: Group current table entries by category for the Pie Chart
  const categoryMap = currentExpenses.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {});

  const totalCurrentSpent = currentExpenses.reduce((sum, item) => sum + item.amount, 0);

  const pieData = Object.keys(categoryMap).map((cat) => ({
    name: cat,
    value: categoryMap[cat],
    percentage: ((categoryMap[cat] / totalCurrentSpent) * 100).toFixed(1)
  }));

  // Clean, minimal premium color palette matching your references
  const PIE_COLORS = ["#2563eb", "#06b6d4", "#10b981", "#f59e0b", "#64748b"];

  return (
    /* Side-by-Side Flex Layout stretching symmetrically below your main ledger */
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      {/* LEFT CHART: Spending Category Matrix Breakdown */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col h-[350px]">
        <div>
          <h4 className="text-sm font-bold text-slate-900 tracking-wide">Allocation Mix</h4>
          <p className="text-[11px] text-slate-500 font-medium">Percentage distribution by structural expense category.</p>
        </div>
        
        <div className="flex-1 min-h-0 mt-2">
          {pieData.length === 0 ? (
            <div className="h-full flex items-center justify-center text-xs text-slate-400">No active data streams logged.</div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="45%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`₹${value.toLocaleString("en-IN")}`, "Spent"]}
                  contentStyle={{ backgroundColor: "#0f172a", borderRadius: "12px", border: "none", color: "#f8fafc", fontSize: "12px" }}
                />
                <Legend verticalAlign="bottom" iconType="circle" iconSize={8} wrapperStyle={{ fontSize: "11px", fontWeight: "600" }} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* RIGHT CHART: Historical Macro-Trend Multi-Month Bar Graph */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col h-[350px]">
        <div>
          <h4 className="text-sm font-bold text-slate-900 tracking-wide">Macro Horizon Ledger</h4>
          <p className="text-[11px] text-slate-500 font-medium">Year-to-date analysis. <span className="text-rose-500 font-semibold">Red</span> indicates breached thresholds.</p>
        </div>

        <div className="flex-1 min-h-0 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={historyData} margin={{ top: 10, right: 5, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} fontWeight={600} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={10} fontWeight={500} tickLine={false} axisLine={false} />
              <Tooltip 
                formatter={(value) => [`₹${value.toLocaleString("en-IN")}`, "Total Expensed"]}
                contentStyle={{ backgroundColor: "#0f172a", borderRadius: "12px", border: "none", color: "#f8fafc", fontSize: "12px" }}
              />
              {/* Dynamic Mapping: Evaluates if spending crossed limits to assign color nodes */}
              <Bar dataKey="expenses" radius={[6, 6, 0, 0]} maxBarSize={32}>
                {historyData.map((entry, index) => {
                  const exceeded = entry.expenses > entry.limit;
                  return <Cell key={`bar-cell-${index}`} fill={exceeded ? "#f43f5e" : "#2563eb"} />;
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}