import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { UserData } from "../models/ResponseToken";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    sessionStorage.getItem("token")
  );
  const [userData, setUserData] = useState<UserData | null>(() => {
    const userData = sessionStorage.getItem("userData");
    return userData ? JSON.parse(userData) : null;
  });

  useEffect(() => {
    if (token) sessionStorage.setItem("token", token);
    else sessionStorage.removeItem("token");
  }, [token]);

  useEffect(() => {
    if (userData) sessionStorage.setItem("userData", JSON.stringify(userData));
    else sessionStorage.removeItem("userData");
  }, [userData]);
  return (
    <AuthContext.Provider value={{ token, setToken, userData, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};
