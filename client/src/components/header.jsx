import React, { useState } from "react";
import {
  FaUserCircle,
} from "react-icons/fa";
import { HiWallet } from "react-icons/hi2";

export default function Header() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Dynamic time-based content layout
  const hour = new Date().getHours();
  let greeting = "Good Evening 🌙";

  if (hour < 12) {
    greeting = "Good Morning ☀️";
  } else if (hour < 16) {
    greeting = "Good Afternoon 🌤️";
  }

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-50/80 border-b border-slate-200 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        
        {/*3-Column Grid Layout */}
        <div className="grid grid-cols-2 md:grid-cols-3 items-center gap-4">

          <div className="flex items-center gap-3.5 justify-self-start">
            <div className="h-12 w-12 rounded-xl bg-blue-600 flex items-center justify-center shadow-md shadow-blue-500/20 flex-shrink-0">
              <HiWallet className="text-white text-2xl" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 leading-none">
                Spend<span className="text-blue-600">Sense</span>
              </h1>
              <p className="text-xs text-slate-500 font-medium tracking-wide mt-1.5">
                Be Financially Responsible
              </p>
            </div>
          </div>

          {/* CENTER COLUMN: Centralized Contextual Greeting */}
          <div className="hidden md:flex flex-col items-center justify-center text-center">
            <h2 className="text-lg font-bold text-slate-800 tracking-wide">
              {greeting}, Isha
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Every Expense. Every Insight.
            </p>
          </div>

          {/* RIGHT COLUMN: Profile Control Subsystem */}
          <div className="flex items-center gap-3.5 justify-self-end col-start-2 md:col-start-3">
            
            {/* Profile Menu Wrapper */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-3 p-1.5 rounded-xl hover:bg-slate-200/50 border border-transparent hover:border-slate-200 transition-all duration-200 focus:outline-none"
                aria-haspopup="true"
                aria-expanded={isProfileOpen}
              >
                {/* Matches the vibrant gradient profiles/charts from the visual reference */}
                <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold shadow-sm">
                  IJ
                </div>

                <div className="hidden lg:block text-left">
                  <p className="text-sm font-bold text-slate-800 leading-none">
                    Isha Jain
                  </p>
                </div>
              </button>

              {/* Dropdown Menu Subtree - Clean Light Mode variant */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-3 w-64 rounded-2xl bg-white border border-slate-200 shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-4 py-4 border-b border-slate-100 bg-slate-50/50">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold">
                        IJ
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">
                          Isha Jain
                        </p>
                        <p className="text-xs text-slate-400 font-medium truncate max-w-[150px]">
                          isha@example.com
                        </p>
                      </div>
                    </div>
                  </div>

                  <button className="w-full px-4 py-3 text-left text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition flex items-center gap-3">
                    <FaUserCircle className="text-slate-400" size={16} />
                    Profile Settings
                  </button>

                  <div className="border-t border-slate-100"></div>

                  <button className="w-full px-4 py-3 text-left text-sm font-semibold text-red-500 hover:bg-red-50 transition">
                    Sign Out
                  </button>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </header>
  );
}
