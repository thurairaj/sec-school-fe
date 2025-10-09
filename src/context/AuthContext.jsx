import { createContext, useContext, useEffect, useState } from "react";
import { api, attachAccessToken } from "../api/axios.api.js";

const AuthContext = createContext(null);
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  attachAccessToken(() => token);

  useEffect(() => {
    const onRef = (e) => setToken(e.details);
    window.addEventListener("token:refreshed", onRef);
    return () => window.removeEventListener("token:refreshed", onRef);
  });

  const login = async (email, password) => {
    const { data } = await api.post("/auth/login", { email, password });
    setToken(data.accessToken);
    setUser(data.user);
  };

  const register = async (email, password, name) => {
    const { data } = await api.post("/auth/login", { email, password, name });
    setToken(data.accessToken);
    setUser(data.user);
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } finally {
      setToken(null);
      setUser(null);
    }
  };
  const value = { token, user, login, register, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
