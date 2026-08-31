"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AuthUser {
  email: string;
  name: string;
}

type LoginResult = "ok" | "not_registered" | "invalid_email";
type SignupResult = "ok" | "already_exists" | "invalid_email";

interface AuthContextType {
  user: AuthUser | null;
  login: (email: string) => LoginResult;
  signup: (email: string, name: string) => SignupResult;
  logout: () => void;
}

// ─── Storage Keys ─────────────────────────────────────────────────────────────

const USERS_KEY = "pegador_users";
const SESSION_KEY = "pegador_session";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function readUsers(): AuthUser[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? (JSON.parse(raw) as AuthUser[]) : [];
  } catch {
    return [];
  }
}

function writeUsers(users: AuthUser[]): void {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function readSession(): string | null {
  try {
    return localStorage.getItem(SESSION_KEY);
  } catch {
    return null;
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  // Hydrate from localStorage on mount
  useEffect(() => {
    const sessionEmail = readSession();
    if (!sessionEmail) return;
    const users = readUsers();
    const found = users.find(
      (u) => u.email.toLowerCase() === sessionEmail.toLowerCase(),
    );
    if (found) setUser(found);
  }, []);

  const login = useCallback((email: string): LoginResult => {
    if (!isValidEmail(email)) return "invalid_email";
    const users = readUsers();
    const found = users.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase(),
    );
    if (!found) return "not_registered";
    localStorage.setItem(SESSION_KEY, found.email);
    setUser(found);
    return "ok";
  }, []);

  const signup = useCallback((email: string, name: string): SignupResult => {
    if (!isValidEmail(email)) return "invalid_email";
    const users = readUsers();
    const exists = users.some(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase(),
    );
    if (exists) return "already_exists";
    const newUser: AuthUser = {
      email: email.trim(),
      name: name.trim() || email.split("@")[0],
    };
    writeUsers([...users, newUser]);
    return "ok";
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}
