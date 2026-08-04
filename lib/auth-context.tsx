"use client";
import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

interface AuthContextValue {
  isLoggedIn: boolean;
  ready: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);
const KEY = "loggedIn";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try { setIsLoggedIn(localStorage.getItem(KEY) === "true"); } catch {}
    setReady(true);
  }, []);

  const login = useCallback(() => {
    try { localStorage.setItem(KEY, "true"); } catch {}
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    try { localStorage.setItem(KEY, "false"); } catch {}
    setIsLoggedIn(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, ready, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}