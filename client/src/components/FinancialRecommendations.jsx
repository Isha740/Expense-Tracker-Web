import React from "react";
import { FaCompass, FaArrowUpRightFromSquare, FaCaretUp } from "react-icons/fa6";

export default function FinancialRecommendations({ currentTotalExpense, limit }) {
  // 1. DYNAMIC SYSTEM TRIGGER RULES
  const currentDate = new Date();
  const dayOfMonth = currentDate.getDate();
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  
  // Rule A: Is it the end of the month? (Showing during the final 5 days of the cycle for premium UX evaluation)
  const isEndOfMonth = (lastDayOfMonth - dayOfMonth) <= 5;
  
  // Rule B: Is the financial buffer margin at least ₹500?
  const savingsBuffer = limit - currentTotalExpense;
  const hasSufficientBuffer = savingsBuffer >= 500;

  // Render Engine Guard Clause: Drop out cleanly if system evaluation constraints aren't satisfied
  if (!isEndOfMonth || !hasSufficientBuffer || limit === 0) return null;

  // Industry Curated Mock Recommendation Models
  const investmentVehicles = [
    { id: "sip-1", type: "Index Mutual Fund", name: "UTI Nifty 50 Index Fund", returns: "14.2% p.a.", risk: "Low-Moderate" },
    { id: "stock-1", type: "Large Cap Equity", name: "Reliance Industries Ltd.", returns: "CAGR ~16.5%", risk: "Moderate" },
    { id: "sip-2", type: "Small Cap Alpha SIP", name: "Quant Small Cap Fund", returns: "22.4% p.a.", risk: "High Risk" }
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 animate-in fade-in slide-in-from-bottom-4 duration-300">
      
      {/* Header Context Section */}
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex-shrink-0">
          <FaCompass size={18} />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-bold text-slate-900">Wealth Optimizer</h4>
            <span className="inline-flex items-center px-1.5 py-0.5 rounded-md text-[10px] font-bold bg-emerald-100 text-emerald-700 uppercase">Alpha v1</span>
          </div>
          <p className="text-[11px] text-slate-500 font-medium">Surplus threshold metric met. Deploying capital strategies.</p>
        </div>
      </div>

      {/* Dynamic Summary Metric Card */}
      <div className="bg-slate-50 border border-slate-100 rounded-xl p-3.5 mb-4 flex items-center justify-between">
        <div>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider leading-none">Unallocated Capital</p>
          <p className="text-xl font-black text-slate-800 tracking-tight mt-1">₹{savingsBuffer.toLocaleString("en-IN")}.00</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-md inline-flex items-center gap-1">
            <FaCaretUp /> Allocate
          </p>
        </div>
      </div>

      {/* Recommendations Feed List Grid */}
      <div className="space-y-3">
        {investmentVehicles.map((vehicle) => (
          <div 
            key={vehicle.id}
            className="p-3 border border-gray-100 hover:border-blue-200 rounded-xl bg-white hover:bg-slate-50/50 transition-all duration-200 flex items-center justify-between group cursor-pointer shadow-sm shadow-gray-50"
          >
            <div className="space-y-1 min-w-0">
              <span className="text-[9px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-md">
                {vehicle.type}
              </span>
              <h5 className="text-xs font-bold text-slate-800 truncate max-w-[170px] mt-1">{vehicle.name}</h5>
              <p className="text-[10px] text-slate-400 font-medium">Risk Layer: <span className="text-slate-600 font-semibold">{vehicle.risk}</span></p>
            </div>
            
            <div className="text-right flex-shrink-0 flex items-center gap-2">
              <div>
                <p className="text-xs font-black text-emerald-600 font-mono">{vehicle.returns}</p>
                <p className="text-[9px] text-slate-400 font-medium uppercase leading-none mt-0.5">Est. Yield</p>
              </div>
              <FaArrowUpRightFromSquare size={10} className="text-slate-300 group-hover:text-blue-500 transition-colors ml-1" />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}