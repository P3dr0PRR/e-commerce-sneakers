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
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);

 async function login(email: string, password: string) {
    const data = await loginUser(email, password);
    setToken(data.token);   
    setUser({ name: data.name, email: data.email });
 }

 async function register(name: string, email: string, password: string) {
    await registerUser(name, email, password);
 }

 function logout() {
    setUser(null);
    setToken(null);
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