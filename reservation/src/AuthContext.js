import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    if (token) {
      try {
        const user = JSON.parse(atob(token.split(".")[1])); 
        setIsAdmin(user.role === "admin");
      } catch (error) {
        console.error("Error decoding token:", error);
        setIsAdmin(false);
      }
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    const user = JSON.parse(atob(token.split(".")[1])); 
    setIsLoggedIn(true);
    setIsAdmin(user.role === "admin");
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
