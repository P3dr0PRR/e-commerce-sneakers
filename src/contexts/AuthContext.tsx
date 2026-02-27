import { createContext, useContext, useState } from "react";
import { loginUser, registerUser } from "../services/auth";

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("sole:token"),
  );
  const [user, setUser] = useState<User | null>(
    JSON.parse(localStorage.getItem("sole:user") || "null"),
  );

  async function login(email: string, password: string) {
    const data = await loginUser(email, password);
    setToken(data.token);
    setUser({ name: data.name, email: data.email });
    localStorage.setItem("sole:token", data.token);
    localStorage.setItem(
      "sole:user",
      JSON.stringify({ name: data.name, email: data.email }),
    );
  }

  async function register(name: string, email: string, password: string) {
    await registerUser(name, email, password);
  }

  function logout() {
    setToken(null);
    setUser(null);
    localStorage.removeItem("sole:token");
    localStorage.removeItem("sole:user");
  }

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
