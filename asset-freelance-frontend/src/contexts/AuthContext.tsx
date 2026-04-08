import { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface AuthContextValue {
  isAuthenticated: boolean;
  login: (accessToken: string, csrfToken: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function isStoredAuth(): boolean {
  return !!sessionStorage.getItem("admin_auth");
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(isStoredAuth);

  const login = useCallback((accessToken: string, csrfToken: string) => {
    sessionStorage.setItem("admin_auth", JSON.stringify({ accessToken, csrfToken }));
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem("admin_auth");
    setIsAuthenticated(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
