"use client";

import { createContext, useContext, useEffect, useState } from "react";

type User = { id: string; nome: string; email: string };

type AuthContextType = {
  user: User | null;
  isLoggedIn: boolean;
  logout: () => void;
};

// Cria o contexto vazio inicialmente
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provedor que envolve toda a aplicação
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Lê o cookie salvo no login
    const cookie = document.cookie
      .split("; ")
      .find((c) => c.startsWith("admin="));

    if (cookie) {
      try {
        const decoded = decodeURIComponent(cookie.split("=")[1]);
        setUser(JSON.parse(decoded)); // Salva o usuário no contexto
      } catch {
        setUser(null);
      }
    }
  }, []);

  const logout = () => {
    document.cookie = "admin=; Max-Age=0; path=/;";
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para acessar o contexto com segurança
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth deve estar dentro de <AuthProvider>");
  return context;
};
