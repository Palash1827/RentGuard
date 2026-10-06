import { createContext, useContext, useEffect, useState } from "react";
import { api, setUnauthorizedHandler, tokenStore } from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(Boolean(tokenStore.get()));

  // restore session on page load
  useEffect(() => {
    if (!tokenStore.get()) return;
    api.me()
      .then(setUser)
      .catch(() => tokenStore.clear())
      .finally(() => setLoading(false));
  }, []);

  // any 401 from the API logs the user out
  useEffect(() => {
    setUnauthorizedHandler(() => {
      tokenStore.clear();
      setUser(null);
    });
    return () => setUnauthorizedHandler(null);
  }, []);

  const applyAuth = (result) => {
    tokenStore.set(result.token);
    setUser(result.user);
    return result.user;
  };

  const login = async (email, password) => applyAuth(await api.login({ email, password }));
  const register = async (name, email, password) => applyAuth(await api.register({ name, email, password }));
  const logout = () => {
    tokenStore.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
