"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

interface User {
  _id: string;
  username: string;
  email: string;
  fullName: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string) => Promise<void>;
  register: (token: string) => Promise<void>; // Simple implementation: register just logs in
  logout: () => void;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const checkAuth = async () => {
    const storedToken = localStorage.getItem("access_token");
    if (!storedToken) {
      setToken(null);
      setIsLoading(false);
      return;
    }

    setToken(storedToken);

    try {
      const { data } = await api.get("/auth/profile");
      setUser(data);
    } catch (error) {
      console.error("Auth check failed", error);
      localStorage.removeItem("access_token");
      setToken(null);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (newToken: string) => {
    localStorage.setItem("access_token", newToken);
    setToken(newToken);
    await checkAuth();
    router.push("/");
  };

  const register = async (newToken: string) => {
    localStorage.setItem("access_token", newToken);
    setToken(newToken);
    await checkAuth();
    router.push("/");
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    setToken(null);
    setUser(null);
    router.push("/login");
  };

  // ... existing code ...
  const [sessionExpired, setSessionExpired] = useState(false);

  // Setup Axios Interceptor for 401s
  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // If we are already logged out, ignore
          if (localStorage.getItem("access_token")) {
            setSessionExpired(true);
          }
        }
        return Promise.reject(error);
      },
    );

    return () => {
      api.interceptors.response.eject(interceptor);
    };
  }, []);

  const handleSessionExpired = () => {
    setSessionExpired(false);
    logout();
  };

  // ... existing code ...

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        checkAuth,
      }}
    >
      {children}

      {/* Session Expired Dialog */}
      {sessionExpired && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-slate-900 border border-white/10 rounded-2xl p-6 shadow-2xl text-center">
            <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">⚠️</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Session Expired
            </h3>
            <p className="text-slate-400 mb-6">
              Your session has ended due to inactivity. Please log in again to
              continue.
            </p>
            <button
              onClick={handleSessionExpired}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-medium transition-colors"
            >
              OK, Log In
            </button>
          </div>
        </div>
      )}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
