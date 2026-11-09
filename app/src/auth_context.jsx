import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchUser(token) {
    const response = await fetch("http://127.0.0.1:8000/auth/me/", {
      method: "GET",
      headers: { Authorization: `Token ${token}` },
    });

    if (response.ok) {
      const userData = await response.json();
      setUser(userData);
    } else {
      localStorage.removeItem("authToken");
      setUser(null);
    }
  }

  useEffect(() => {
    async function checkAuth() {
      const token = localStorage.getItem("authToken");

      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        await fetchUser(token);
      } catch (e) {
        localStorage.removeItem("authToken");
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    }

    checkAuth();
  }, []);

  async function login(token) {
    localStorage.setItem("authToken", token);
    try {
      await fetchUser(token);
    } catch (e) {
      localStorage.removeItem("authToken");
      setUser(null);
      throw e;
    }
  }

  function logout() {
    localStorage.removeItem("authToken");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider!");
  return context;
}
