import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Sync state on load with any active session stored inside local storage memory
  useEffect(() => {
    const storedUser = localStorage.getItem("spendSenseUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setAuthLoading(false);
  }, []);

  const loginUser = (userData) => {
    localStorage.setItem("spendSenseUser", JSON.stringify(userData));
    setUser(userData);
  };

  const logoutUser = () => {
    localStorage.removeItem("spendSenseUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, authLoading, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};