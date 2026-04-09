import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { API_BASE_URL } from "@/config/api";


interface AuthState {
  accessToken: string;
  csrfToken: string;
}

interface AuthContextValue {
  auth: AuthState | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<AuthState | null>(() => {
    const stored = sessionStorage.getItem("admin_auth");
    return stored ? JSON.parse(stored) : null;
  });

  const login = useCallback(async (username: string, password: string) => {
    const res = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || "Credenciais inválidas");
    }
    const data = await res.json();
    const state: AuthState = {
      accessToken: data.access_token,
      csrfToken: data.csrf_token,
    };
    sessionStorage.setItem("admin_auth", JSON.stringify(state));
    setAuth(state);
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem("admin_auth");
    setAuth(null);
  }, []);

  return (
    <AuthContext.Provider value={{ auth, login, logout, isAuthenticated: !!auth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
