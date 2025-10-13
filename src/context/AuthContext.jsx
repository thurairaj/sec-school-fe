import {createContext, useContext, useEffect, useMemo, useState} from "react";
import { api } from "../api/axios.api.js";
import {clearTokens, getAccessToken, getRefreshToken, setTokens} from "../api/token.api.js";

const AuthContext = createContext(null);
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [hasTokens, setHasTokens] = useState(
      !!getAccessToken() && !!getRefreshToken()
  );

  useEffect(() => {
    setHasTokens( !!getAccessToken() && !!getRefreshToken())
  },[]);

  const login = async (email, password) => {
    const { data } = await api.post("/auth/login", { email, password });
    setTokens({
      accessToken: data.tokens.access,
      refreshToken: data.tokens.refresh,
    })
    setUser(data.user);
    setHasTokens(true)
  };

  const register = async (email, password, name) => {
    const { data } = await api.post("/auth/login", { email, password, name });
    setTokens({
      accessToken: data.tokens.access,
      refreshToken: data.tokens.refresh,
    })
    setUser(data.user);
    setHasTokens(true)
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } finally {
      clearTokens();
      setUser(null)
      setHasTokens(false)
      setUser(null);
    }
  };
  const value = useMemo(
      () => ({ user, hasTokens, login, register, logout}),
      [user, hasTokens]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
