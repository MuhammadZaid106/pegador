"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import {
  ADMIN_EMAIL,
  AUTH_COOKIE_NAME,
  ADMIN_COOKIE_NAME,
  isAdminEmail,
} from "@/constants/auth";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AuthUser {
  email: string;
  name: string;
}

type LoginResult = "ok" | "not_registered" | "invalid_email";
type SignupResult = "ok" | "already_exists" | "invalid_email";

interface AuthContextType {
  user: AuthUser | null;
  isAdmin: boolean;
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

function setCookie(name: string, value: string, days = 7) {
  if (typeof document === "undefined") return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

function deleteCookie(name: string) {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax`;
}

function readUsers(): AuthUser[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    let users = raw ? (JSON.parse(raw) as AuthUser[]) : [];

    // Ensure default admin user exists
    const hasAdmin = users.some(
      (u) => u.email.toLowerCase() === ADMIN_EMAIL.toLowerCase(),
    );
    if (!hasAdmin) {
      const adminUser: AuthUser = {
        email: ADMIN_EMAIL,
        name: "Zaid Admin",
      };
      users = [adminUser, ...users];
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
    }
    return users;
  } catch {
    return [
      {
        email: ADMIN_EMAIL,
        name: "Zaid Admin",
      },
    ];
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

  // Hydrate from localStorage and sync cookies on mount
  useEffect(() => {
    const users = readUsers();
    const sessionEmail = readSession();
    if (!sessionEmail) return;

    const found = users.find(
      (u) => u.email.toLowerCase() === sessionEmail.toLowerCase(),
    );
    if (found) {
      setUser(found);
      setCookie(AUTH_COOKIE_NAME, found.email);
      if (isAdminEmail(found.email)) {
        setCookie(ADMIN_COOKIE_NAME, "true");
      }
    }
  }, []);

  const login = useCallback((email: string): LoginResult => {
    if (!isValidEmail(email)) return "invalid_email";
    const users = readUsers();
    const found = users.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase(),
    );
    if (!found) return "not_registered";

    localStorage.setItem(SESSION_KEY, found.email);
    setCookie(AUTH_COOKIE_NAME, found.email);

    if (isAdminEmail(found.email)) {
      setCookie(ADMIN_COOKIE_NAME, "true");
    } else {
      deleteCookie(ADMIN_COOKIE_NAME);
    }

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
    deleteCookie(AUTH_COOKIE_NAME);
    deleteCookie(ADMIN_COOKIE_NAME);
    setUser(null);
  }, []);

  const isAdmin = isAdminEmail(user?.email);

  return (
    <AuthContext.Provider value={{ user, isAdmin, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}
