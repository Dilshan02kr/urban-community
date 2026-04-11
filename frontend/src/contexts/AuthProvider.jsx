import { ROUTES } from "@/constants/routes";
import { authService } from "@/services/auth.service";
import { getSessionValue, setSession } from "@/utils/session";
import { createContext, useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    const accessToken = getSessionValue("accessToken");
    if (accessToken) setIsAuthenticated(true);
    setIsAuthReady(true);
  }, []);

  // Listen for 401 events dispatched by the API interceptor so we can
  // update React state instead of doing a hard page reload.
  useEffect(() => {
    const handleUnauthorized = () => {
      setIsAuthenticated(false);
    };
    window.addEventListener("auth:unauthorized", handleUnauthorized);
    return () =>
      window.removeEventListener("auth:unauthorized", handleUnauthorized);
  }, []);

  const login = async (email, password) => {
    try {
      const body = await authService.login(email, password);
      const data = body.data.data;
      if (body.status === 200) {
        setIsAuthenticated(true);
        setSession("accessToken", data.token);
        setSession("user", JSON.stringify(data.user));
        if (data.user.role === "citizen") {
          Navigate(ROUTES.DASHBOARD);
        } else if (data.user.role === "organization") {
          Navigate(ROUTES.ORGANIZATION_PROFILE);
        }
      }
      return data;
    } catch (error) {
      throw error.response.data.message || "Login failed. Please try again.";
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("user");
    Navigate(ROUTES.LOGIN);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isAuthReady, login, logout }}
    >
      {children}
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
